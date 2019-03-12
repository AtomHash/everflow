import Permission from '../permission';
export default class UnAuthenticatedPermission extends Permission {
    route: string;
    data: {};
    successCallback: Function;
    failureCallback: Function;
    constructor(page?: any, params?: any);
    condition(): boolean;
    success(): void;
    failure(): void;
}
