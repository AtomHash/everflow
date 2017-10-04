import IResponse from './i-response';
import IApp from './i-app';
export default interface IResponseCallback {
    response: IResponse;
    app: IApp;
    status: number;
    fields: any;
    error(): any;
    error400(): any;
    error401(): any;
    error500(): any;
    errorOther(status: number): any;
    entry(): any;
}
