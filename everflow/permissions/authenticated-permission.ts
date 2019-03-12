import * as _ from 'lodash';
import Permission from '../permission';

/**
 * User is authenticated permission
 * @class
 */
export default class AuthenticatedPermission extends Permission
{
    route = '';

    /**
     * Initializes AuthenticatedPermission
     * @constructor
     * @param {string} route - named route to navigate to after failure()
     */
    constructor(route: string='signin')
    {
        super();
        this.route = route;
        this.action();
    }

    condition(): boolean
    {
        if (!_.isNil(this.app.user.token) || !_.isEmpty(this.app.user.token))
        {
            return true;
        }
    }

    failure(): void
    {
        //Return to signin
        this.app.go(this.route);
    }
}
