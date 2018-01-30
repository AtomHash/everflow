import Permission from '../permission';
import Utils from '../utils/utils';

export default class UnAuthenticatedPermission extends Permission
{
    route = '';
    constructor(route: string='dashboard')
    {
        super(false);
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
