import Vue from 'vue';
import VueRouter from 'vue-router';
import IApp from './interfaces/i-app';
import Storage from './utils/storage';
import History from './history';
import Language from './utils/language';
import * as interfaces from './interfaces/__init__';
export default class App implements IApp {
    currentView: Vue;
    user: any;
    storage: Storage;
    history: History;
    ready: boolean;
    readyPermission: boolean;
    readyCallbacks: Array<any>;
    config: any;
    router: VueRouter;
    language: Language;
    constructor(User: interfaces.IModel, config: any);
    private loadModels();
    run(routes: any): void;
    isOnline(): boolean;
    go(name: string, data?: any): void;
    readyCallback(callback: any): void;
}
