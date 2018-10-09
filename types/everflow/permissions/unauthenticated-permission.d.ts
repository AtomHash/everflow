import Permission from '../permission';
export default class UnAuthenticatedPermission extends Permission {
    route: string;
    constructor(route?: string);
    condition(): boolean;
    failure(): void;
}
