import VueRouter from 'vue-router';
export default class History {
    router: VueRouter;
    forward(): void;
    forwardX(x: number): void;
    back(): void;
    backX(x: number): void;
}
