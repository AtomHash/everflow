import Permission from '../permission';
import Utils from '../utils/utils';

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
        return this.app.user.token.isEmpty();
    }

    failure()
    {
        this.app.go(this.route);
    }
}
