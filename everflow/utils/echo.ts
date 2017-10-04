import Utils from './utils';

export default class Echo
{

    private static allow(): boolean
    {
        var app = window.app;
        var allow: boolean = false;
        if (app.config.debug)
        {
            allow = !Utils.isEmpty(typeof console)
        }
        return allow;
    }

    static log(data: any = null)
    {
        if (Echo.allow())
        {
            window['console']['log'](data);
        }
    }

    static warn(message: string = null)
    {
        if (Echo.allow())
        {
            window['console']['warn'](message);
        }
    }

    static error(message: string = null)
    {
        if (Echo.allow())
        {
            window['console']['error']('[everflow]: ' +message);
        }
        throw new Error('[everflow.echo.runtime]');
    }
}
