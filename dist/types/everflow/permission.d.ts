import IPermission from './interfaces/i-permission';
import IApp from './interfaces/i-app';
export default class Permission implements IPermission {
    app: IApp;
    status: boolean;
    constructor(action?: boolean);
    action(): void;
    condition(): boolean;
    success(): void;
    failure(): void;
}
