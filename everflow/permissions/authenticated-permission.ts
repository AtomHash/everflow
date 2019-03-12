import * as _ from 'lodash';
import Permission from '../permission';

/**
 * User is authenticated permission
 * @class
 */
export default class AuthenticatedPermission extends Permission
{
    route = '';
    data = {};
    successCallback: Function = null;
    failureCallback: Function = null;

    /**
     * Initializes AuthenticatedPermission
     * @constructor
     * @param {string} route - named route to navigate to after failure()
     */
    constructor(page: any = null, params: any = null)
    {
        super(page);
        if (!_.isNil(params))
        {
             if (params.hasOwnProperty('route'))
             {
                 this.route = params.route;
             }
             if (params.hasOwnProperty('data'))
             {
                 this.data = params.data;
             }
             if (params.hasOwnProperty('callbacks'))
             {
                 if (params.callbacks.hasOwnProperty('success'))
                 {
                     this.successCallback = params.callbacks.success;
                 }
                 if (params.callbacks.hasOwnProperty('failure'))
                 {
                     this.failureCallback = params.callbacks.failure;
                 }
             }
        }
        this.action();
    }

    condition(): boolean
    {
        if (!_.isNil(this.app.user.token) || !_.isEmpty(this.app.user.token))
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    success(): void
    {
        if (!_.isNil(this.successCallback))
        {
            this.successCallback(this.page);
        }
    }

    failure(): void
    {
        if (!_.isNil(this.failureCallback))
        {
            this.failureCallback(this.page);
        }
        else
        {
            this.app.go(this.route, this.data);
        }
    }
}
