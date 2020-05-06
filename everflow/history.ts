import App from './app';
import VueRouter from 'vue-router';

/**
 * Creates an Everflow History object.
 * @class
 */
export default class History
{
    router: VueRouter;

    /**
     * Initializes App
     * @constructor
     * @param {object} App - everflow app object
     */
    constructor(app: App)
    {
        this.router = app.$router;
    }

    /**
     * Makes the router go forward once
     * @function forward
     * @param {number} x - amount of times to go forward
     */
    forward(x: number = 1)
    {
        this.router.go(Math.abs(x));
    }

    /**
     * Makes the router go back
     * @function back
     * @param {number} x - amount of times to go back
     */
    back(x: number = 1)
    {
        if (x > 0) { x = x * -1; }
        this.router.go(x);
    }
}
