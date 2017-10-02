import Vue from 'vue';
import VueRouter, { RouterMode } from 'vue-router';
import Storage from './utils/storage';
import History from './history';
import IApp from './interfaces/i-app';
export default class App implements IApp {
    currentView: Vue;
    user: any;
    storage: Storage;
    history: History;
    ready: boolean;
    readyPermission: boolean;
    readyCallbacks: Array<any>;
    config: any;
    vue: Vue;
    router: VueRouter;
    mountId: string;
    routerMode: RouterMode;
    constructor(user: any, config: any);
    setRouterMode(): void;
    setMount(): void;
    loadModels(): void;
    run(routes: any): void;
    isOnline(): boolean;
    go(name: string, data?: any): void;
    readyCallback(callback: any): void;
}
