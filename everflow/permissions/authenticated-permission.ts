/*
 * Defined permission for user authentication...
 *
*/

import Permission from '../permission';
import Utils from '../utils/utils';

export default class AuthenticatedPermission extends Permission
{
    route = "";
    constructor(route: string="signin")
    {
        super(false);
        this.route = route;
        this.action();
    }

    condition(): boolean
    {
        return !this.app.user.token.isEmpty();
    }

    failure(): void
    {
        //Return to signin
        this.app.go(this.route);
    }

}
