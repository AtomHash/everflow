import App from './app';
import VueRouter from 'vue-router';
export default class History {
    router: VueRouter;
    constructor(app: App);
    forward(x?: number): void;
    back(x?: number): void;
}
