import VueRouter from 'vue-router';
import Storage from '../utils/storage';
import Language from '../utils/language';
export default interface IApp {
    storage: Storage;
    go(name: string): void;
    go(name: string, data: any): void;
    language: Language;
    ready: boolean;
    readyPermission: boolean;
    readyCallbacks: Array<any>;
    readyCallback(callback: any): void;
    config: any;
    $router: VueRouter;
    $globals: any;
}
