import IPermission from './interfaces/i-permission';
import IApp from './interfaces/i-app';

/**
 * Creates an Everflow Permission object. Permissions are used for checking on Page load
 * @class
 */
export default class Permission implements IPermission
{
    app: IApp;
    status: boolean;
    page: any = null;

    /**
     * Initializes Permission and triggers condition function
     * @constructor
     */
    constructor(page: any = null)
    {
        this.app = window.app;
        this.page = page;
        this.status = this.condition();
    }

    /**
     * Triggers success() or failure() depending on the condition() status
     * @function action
     */
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

    /**
     * Override to add a condition to trigger on action()
     * @function condition
     * @override
     */
    condition(): boolean
    {
        return false;
    }

    /**
     * Action to trigger on condition is true
     * @function success
     * @override
     */
    success(): void
    {
        // if condition is true
    }

    /**
     * Action to trigger on condition is false
     * @function failure
     * @override
     */
    failure(): void
    {
        // if condition is false
    }
}
