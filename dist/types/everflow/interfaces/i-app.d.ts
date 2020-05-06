import VueRouter from 'vue-router';
import Storage from '../utils/storage';
import History from '../history';
import Language from '../utils/language';
export default interface IApp {
    storage: Storage;
    go(name: string): void;
    go(name: string, data: any): void;
    history: History;
    language: Language;
    ready: boolean;
    readyPermission: boolean;
    readyCallbacks: Array<any>;
    readyCallback(callback: any): void;
    config: any;
    bearerToken: string;
    $router: VueRouter;
}
