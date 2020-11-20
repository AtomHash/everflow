import App from './app';
import VueRouter from 'vue-router';
/**
 * Creates an Everflow History object.
 * @class
 */
export default class History {
    router: VueRouter;
    /**
     * Initializes App
     * @constructor
     * @param {object} App - everflow app object
     */
    constructor(app: App);
    /**
     * Makes the router go forward once
     * @function forward
     * @param {number} x - amount of times to go forward
     */
    forward(x?: number): void;
    /**
     * Makes the router go back
     * @function back
     * @param {number} x - amount of times to go back
     */
    back(x?: number): void;
}
