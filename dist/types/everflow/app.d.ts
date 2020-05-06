import Vue from 'vue';
import IApp from './interfaces/i-app';
import Storage from './utils/storage';
import History from './history';
import Language from './utils/language';
declare module 'vue/types/vue' {
    interface Vue {
        $everflowApp: App;
    }
}
/**
 * Creates an Everflow App object. The primary application object.
 * @class
 */
export default class App implements IApp {
    vue: Vue;
    user: any;
    storage: Storage;
    history: History;
    ready: boolean;
    readyPermission: boolean;
    readyCallbacks: Array<any>;
    config: any;
    language: Language;
    $globals: any;
    requestErrorHandlers: any;
    /**
     * Initializes App
     * @constructor
     * @param {interfaces.IModel} User - a user model object
     * @param {object} config - everflow config
     */
    constructor(userClass: any, config: any, plugins: Array<any>);
    /**
     * Configure global everflow settings
     * @function processConfig
     * @private
     */
    private processConfig;
    /**
     * Load the user model specified in the constructor
     * @function loadModels
     * @private
     */
    private loadModels;
    /**
     * Start the EverFlow application
     * @function run
     * @param {Array<object>} routes - array of routes to be served by the app
     */
    run(routes: Array<any>): void;
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
     * @param {callable} callback - a callback to trigger on app ready
     */
    readyCallback(callback: any): void;
}
