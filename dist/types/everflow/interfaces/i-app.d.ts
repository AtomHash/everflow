import Vue from 'vue';
import Storage from '../utils/storage';
import History from '../history';
export default interface IApp {
    currentView: Vue;
    user: any;
    storage: Storage;
    go(name: string): void;
    go(name: string, data: any): void;
    history: History;
    ready: boolean;
    readyPermission: boolean;
    readyCallbacks: Array<any>;
    readyCallback(callback: any): void;
    config: any;
}
