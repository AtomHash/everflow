import { Store } from 'vuex';
import VueRouter from 'vue-router';
import { IApp, IAppOptions } from './interfaces';
import Storage from './utils/storage';
import Request from './request';
import Language from './language';
declare module 'vue/types/vue' {
    interface Vue {
        $app: App;
    }
}
/**
 * Creates an Everflow App object. The primary application object.
 * @class
 */
export default class App implements IApp {
    request: Request;
    storage: Storage;
    ready: boolean;
    readyPermission: boolean;
    readyCallbacks: Array<CallableFunction>;
    config: any;
    language: Language;
    $globals: any;
    requestErrorHandlers: any;
    $router: VueRouter;
    /**
     * Initializes App
     * @constructor
     * @param {interfaces.IModel} User - a user model object
     * @param {object} config - everflow config
     */
    constructor(config: any, appOptions: IAppOptions);
    /**
    * Vue Router init helper function
    * @function __routerInit
    * @param {Array<RouteConfig>} routes - An array of routes for Vue Router
    * @param {RouterOptions} routerOptions - Vue Router options object
    * @private
    */
    private __routerInit;
    /**
     * Load user defined callbacks on app load
     * @function loadReadyCallbacks
     * @private
     */
    private loadReadyCallbacks;
    /**
     * Start the EverFlow application
     * @function run
     * @param {Array<RouteConfig>} routes - array of routes to be served by the app
     * @param {Object} injects - use name: plugin syntax
     */
    run(store: Store<any>, injects?: any): void;
    /**
     * $router.push, goes to page name
     * @function go
     * @param {string} name - name of route to navigate to
     * @param {object} data - params to send to the new route
     */
    go(name: string, data?: any): void;
    /**
     * Add callbacks to trigger once app is loaded (models are loaded)
     * @function readyCallback
     * @param {CallableFunction} callback - a callback to trigger on app ready
     */
    readyCallback(callback: CallableFunction): void;
}
