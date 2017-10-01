import Permission from '../permission';
export default class AuthenticatedPermission extends Permission {
    route: string;
    constructor(route?: string);
    condition(): boolean;
    failure(): void;
}
