import * as _ from 'lodash';
import Permission from '../permission';

/**
 * User is not authenticated permission
 * @class
 */
export default class UnAuthenticatedPermission extends Permission
{
    route = '';

    /**
     * Initializes UnAuthenticatedPermission
     * @constructor
     * @param {string} route - named route to navigate to after failure()
     */
    constructor(route: string='dashboard')
    {
        super();
        this.route = route;
        this.action();
    }

    condition(): boolean
    {
        if (_.isNil(this.app.user.token) || _.isEmpty(this.app.user.token))
        {
            return true;
        }
    }

    failure()
    {
        this.app.go(this.route);
    }
}
