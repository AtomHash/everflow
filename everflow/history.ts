import VueRouter from 'vue-router';

export default class History
{
    router = window.app.currentView['$router'];

    forward()
    {
        this.router.go(1);
    }

    forwardX( x: number )
    {
        this.router.go(Math.abs(x));
    }

    back()
    {
        this.router.go(-1);
    }

    backX( x: number )
    {
        if (x > 0) { x = x * -1; }
        this.router.go(x);
    }
}
