import Vue from 'vue';
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
    constructor(user: any, config: any);
    loadModels(): void;
    isOnline(): boolean;
    go(name: string, data?: any): void;
    readyCallback(callback: any): void;
}
