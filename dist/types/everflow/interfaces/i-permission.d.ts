import IApp from './i-app';
export default interface IPermission {
    app: IApp;
    status: boolean;
    condition(): boolean;
    success(): void;
    failure(): void;
    action(): void;
}
