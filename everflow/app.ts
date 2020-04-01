import Vue, { ComponentOptions } from 'vue';
import * as _ from 'lodash';
import VueRouter, { RouterMode } from 'vue-router';
import IApp from './interfaces/i-app';
import Storage from './utils/storage';
import History from './history';
import UserModel from './models/user-model';
import Language from './utils/language';
import errors from './errors/--init--';
import * as interfaces from './interfaces/--init--';

/**
 * Creates an Everflow App object. The primary application object.
 * @class
 */
export default class App implements IApp
{
    currentView: Vue;
    user: any;
    storage: Storage;
    history: History;
    ready: boolean = false;
    readyPermission: boolean = false;
    readyCallbacks: Array<any> = [];
    config: any;
    router: VueRouter;
    language: Language;
    globals: any = {};
    requestErrorHandlers: any = {};


    /**
     * Initializes App
     * @constructor
     * @param {interfaces.IModel} User - a user model object 
     * @param {object} config - everflow config
     */
    constructor(userClass: interfaces.IModel, config: any, plugins: Array<any>)
    {
        this.config = config
        this.user = new userClass();
        this.storage = new Storage(config.storage);
        this.language = new Language(this);
        Vue.use(VueRouter);
        _.forEach(plugins, function(plugin, index, arr){
            Vue.use(plugin);
        });
    }

    /**
     * Configure global everflow settings
     * @function processConfig
     * @private
     */
    private processConfig(): void
    {
        // easy disable for console messages in production
        if (window.console)
        {
            if (!this.config.debug)
            {
                window.console.log = function(){};
            }
        }
    }

    /**
     * Load the user model specified in the constructor
     * @function loadModels
     * @private
     */
    private loadModels(): void
    {
        //Load app dependant models
        var app = this;
        // CRITICAL
        this.user.load(function () {
            app.ready = true; //sets app state to ready.
        }, this.storage);
        // END - CRITICAL
        // ASYNC INTERVAL WAIT - APP LOADED USER
        var appReadyInterval = setInterval(function () {
            if (window.app.ready) {
                clearInterval(appReadyInterval);
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
            }
        }, 200);
        // END ASYNC INTERVAL WAIT
    }

    /**
     * Start the EverFlow application
     * @function run
     * @param {Array<object>} routes - array of routes to be served by the app
     */
    run(routes: Array<any>): void 
    {
        window.app = this;
        var routerMode: RouterMode = null;
        if (_.isEmpty(this.config.routerMode))
        {
            throw new errors.ConfigRouterModeError();
        }
        routerMode = this.config.routerMode;
        var mountId: string = null;
        if (_.isEmpty(this.config.mountId))
        {
            throw new errors.ConfigMountError();
        }
        mountId = this.config.mountId;
        if (_.isEmpty(routes))
        {
            throw new errors.RoutesEmptyError();
        }
        this.router = new VueRouter({
            mode: routerMode,
            routes // short for routes: routes
        });
        this.currentView = new Vue({
            router: this.router
        }).$mount('#'+mountId);
        //Create new history wrapper for vuejs router history.
        window.app.history = new History();
        this.history = window.app.history;
        this.processConfig();
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
        this.currentView.$router.push({ name: name, params: data});
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
