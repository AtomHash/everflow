import IPermission from './interfaces/i-permission';
import IApp from './interfaces/i-app';

export default class Permission implements IPermission
{
    app: IApp;
    status: boolean;

    constructor(action: boolean = true)
    {
        this.app = window.app;
        this.status = this.condition();
        if (action) 
        {
           this.action();
        }
    }

    action(): void
    {
        if (this.status)
        {
            this.success();
        }
        else
        {
            this.failure();
        }
    }

    //Override
    condition(): boolean
    {
        return false;
        //condition and action
    }

    success(): void
    {
        //if condition is true
    }

    failure(): void
    {
        //if condition is false
    }
}
