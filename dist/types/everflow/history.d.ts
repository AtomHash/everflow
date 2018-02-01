import VueRouter from 'vue-router';
export default class History {
    router: VueRouter;
    forward(x?: number): void;
    back(x?: number): void;
}
