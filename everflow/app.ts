import Vue, { ComponentOptions } from 'vue';
import VueRouter, { RouterMode } from 'vue-router';
import Utils from './utils/utils'
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

    /**
     * Initializes App
     * @constructor
     * @param {interfaces.IModel} User - a user model object 
     * @param {object} config - everflow config
     */
    constructor(User: interfaces.IModel, config: any)
    {
        this.config = config
        this.user = new User();
        this.storage = new Storage(config.storage);
        this.language = new Language(this);
        this.loadModels();
        Vue.use(VueRouter);
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
        this.user.load(function (value) {
            if (!Utils.isNull(value))
            {
                app.user.map(value);
            }
            app.ready = true; //sets app state to ready.
        }, this.storage);
        // END - CRITICAL
        // INTERVAL WAIT - APP LOADED USER
        var appReadyInterval = setInterval(function () {
            if (window.app.ready) {
                clearInterval(appReadyInterval);
                var status: boolean = true;
                for (var callback of app.readyCallbacks) {
                    if (!Utils.isFunction(callback)) {
                        var result = callback.function();
                        status = result;
                    }
                }
                if (status) {
                    for (var callback of app.readyCallbacks) {
                        if (Utils.isFunction(callback)) {
                            new callback();
                        }
                    }
                }
            }
        }, 200);
        // END INTERVAL WAIT
    }

    /**
     * Add header to Request
     * @function run
     * @param {Array<object>} routes - array of routes to be served by the app
     */
    run(routes: Array<any>): void 
    {
        window.app = this;
        var routerMode: RouterMode = null;
        if (Utils.isEmpty(this.config.routerMode))
        {
            throw new errors.ConfigRouterModeError();
        }
        routerMode = this.config.routerMode;
        var mountId: string = null;
        if (Utils.isEmpty(this.config.mountId))
        {
            throw new errors.ConfigMountError();
        }
        mountId = this.config.mountId;
        if (Utils.isEmpty(routes))
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
    }

    /**
     * Add header to Request
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
