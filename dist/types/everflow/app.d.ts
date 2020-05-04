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
    constructor(userClass: any, config: any, plugins: Array<any>);
    private processConfig;
    private loadModels;
    run(routes: Array<any>): void;
    go(name: string, data?: any): void;
    readyCallback(callback: any): void;
}
