import Vue, { ComponentOptions } from 'vue';
import Vuex from 'vuex';
import { Store } from 'vuex'
import VueRouter, { RouterOptions, RouteConfig, RouterMode } from 'vue-router';
import IApp from './interfaces/i-app';
import Storage from './utils/storage';
import UserModel from './models/user-model';
import Language from './utils/language';
import errors from './errors/--init--';
import * as interfaces from './interfaces/--init--';
import Everflow from './plugin/everflow-plugin';

declare module 'vue/types/vue' {
    interface Vue {
        $everflowApp: App
    }
}

/**
 * Creates an Everflow App object. The primary application object.
 * @class
 */
 export default class App implements IApp
 {
     bearerToken: string;
     storage: Storage;
     ready: boolean = false;
     readyPermission: boolean = false;
     readyCallbacks: Array<any> = [];
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
     constructor(config: any, routes: Array<RouteConfig>, routerOptions?: RouterOptions, vuePlugins?: Array<any>)
     {
         this.config = config;
         this.storage = new Storage(config.storage);
         this.language = new Language(this);
         this.__routerInit(routes, routerOptions);
         Vue.use(Vuex);
         if(vuePlugins){
             vuePlugins.forEach(function(plugin, index, arr){
                 Vue.use(plugin);
             });
         }
     }

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
     * Load the user model specified in the constructor
     * @function loadModels
     * @private
     */
     private loadModels(): void
     {
         this.ready = true; //sets app state to ready.
         // CRITICAL
        /*
        this.user.load(function () {
            console.log('called Models Load in everflow.js')
            app.ready = true; //sets app state to ready.
            var status: boolean = true;
                for (let callback of app.readyCallbacks)
                {
                    if (!_.isFunction(callback))
                    {
                        if (_.isFunction(callback.function))
                        {
                            callback.function();
                        }
                    } else {
                        callback();
                    }
                }
        }, this.storage);
        */
        // END - CRITICAL
    }

    /**
     * Start the EverFlow application
     * @function run
     * @param {Array<RouteConfig>} routes - array of routes to be served by the app
     */
     run(store: Store<any>, injects: any = {}): void
     {
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
         Object.assign({},vueOptions,injects);

         const vueOptionsMerged = {...vueOptions, ...injects};

         // Create new vue object
         new Vue(vueOptionsMerged).$mount('#'+mountId);

         // Create new history wrapper for vuejs router history.
         // this.history = new History(this);
         this.loadModels();
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
     * @param {callable} callback - a callback to trigger on app ready
     */
     readyCallback(callback)
     {
         this.readyCallbacks.push(callback);
     }
 }