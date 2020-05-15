import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import VueI18n from 'vue-i18n';
import VueRouter, { RouterOptions, RouteConfig, RouterMode } from 'vue-router';
import { IApp, IAppOptions } from './interfaces';
import Storage from './utils/storage';
import Request from './request';
import Language from './language';
import errors from './errors';
import Everflow from './plugin/everflow-plugin';

declare module 'vue/types/vue' {
    interface Vue {
        $app: App
    }
}

/**
 * Creates an Everflow App object. The primary application object.
 * @class
 */
 export default class App implements IApp
 {
     request: Request;
     storage: Storage;
     ready: boolean = false;
     readyPermission: boolean = false;
     readyCallbacks: Array<CallableFunction> = [];
     config: any;
     language: Language;
     $globals: any = {};
     requestErrorHandlers: any = {};
     $router: VueRouter;


    /**
     * Initializes App
     * @constructor
     * @param {interfaces.IModel} User - a user model object 
     * @param {object} config - everflow config
     */
     constructor(config: any, appOptions: IAppOptions)
     {
         if (!appOptions.routerOptions)
         {
             // default to object
             appOptions.routerOptions = {};
         }
         if (!appOptions.vuePlugins)
         {
             // default to array
             appOptions.vuePlugins = [];
         }
         this.config = config;
         this.storage = new Storage(config.storage);
         this.__routerInit(appOptions.routes, appOptions.routerOptions);
         Vue.use(Vuex);
         if (appOptions.defaultI18nMessages)
         {
             Vue.use(VueI18n);
             this.language = new Language(this, appOptions.defaultI18nMessages);
         }
         if(appOptions.vuePlugins)
         {
             appOptions.vuePlugins.forEach(function(plugin, index, arr){
                 Vue.use(plugin);
             });
         }
     }


     /**
     * Vue Router init helper function
     * @function __routerInit
     * @param {Array<RouteConfig>} routes - An array of routes for Vue Router
     * @param {RouterOptions} routerOptions - Vue Router options object
     * @private
     */
     private __routerInit(routes: Array<RouteConfig>, routerOptions?: RouterOptions)
     {
         Vue.use(VueRouter);
         if (!routerOptions)
         {
             routerOptions = {};
         }
         var routerMode: RouterMode = null;
         if (!this.config.routerMode)
         {
             throw new errors.ConfigRouterModeError();
         }
         routerMode = this.config.routerMode;
         if (!routes)
         {
             throw new errors.RoutesEmptyError();
         }
         const everflowDefaultRouterOptions: RouterOptions = {
             mode: routerMode,
             routes: routes
         };
         // Merge router options from defaults and user inputted
         const routerOptionsMerged = {...everflowDefaultRouterOptions, ...routerOptions};
         this.$router = new VueRouter(routerOptionsMerged);
     }

    /**
     * Load user defined callbacks on app load
     * @function loadReadyCallbacks
     * @private
     */
     private loadReadyCallbacks(): void
     {
         for (let callback of this.readyCallbacks)
         {
             // if (!isFunction(callback))
             // {
             //     if (isFunction(callback.function))
             //     {
             //         callback.function();
             //     }
             // } else {
             //     callback();
             // }
             callback(this);
         }
         this.ready = true;
    }

    /**
     * Start the EverFlow application
     * @function run
     * @param {Array<RouteConfig>} routes - array of routes to be served by the app
     * @param {Object} injects - use name: plugin syntax
     */
     run(store: Store<any>, injects: any = {}): void
     {
         // init Request object
         this.request = new Request(this.config.apiURL);
         Vue.use(Everflow, { everflowApp: this });
         var mountId: string = null;
         if (!this.config.mountId)
         {
             throw new errors.ConfigMountError();
         }
         mountId = this.config.mountId;

         // Merge everflow vue options with injects (options for vue)
         const vueOptions = {
             router: this.$router,
             store: store
         };

         // Setup vue-i18n
         if (this.language)
         {
             vueOptions['i18n'] = this.language.i18n;
         }
         Object.assign({}, vueOptions, injects);

         const vueOptionsMerged = {...vueOptions, ...injects};

         // Create new vue object
         new Vue(vueOptionsMerged).$mount('#'+mountId);

         // Load user custom callbacks for when the app starts
         this.loadReadyCallbacks();
     }

    /**
     * $router.push, goes to page name
     * @function go
     * @param {string} name - name of route to navigate to
     * @param {object} data - params to send to the new route
     */
     go(name: string, data: any = {})
     {
         this.$router.push({ name: name, params: data});
     }

    /**
     * Add callbacks to trigger once app is loaded (models are loaded)
     * @function readyCallback
     * @param {CallableFunction} callback - a callback to trigger on app ready
     */
     readyCallback(callback: CallableFunction)
     {
         this.readyCallbacks.push(callback);
     }
 }