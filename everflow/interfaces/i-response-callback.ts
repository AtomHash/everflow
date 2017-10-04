import IResponse from './i-response';
import IApp from './i-app';

export default interface IResponseCallback {
    response: IResponse;
    app: IApp;
    status: number;
    fields: any;
    error();
    error400();
    error401();
    error500();
    errorOther(status: number);
    entry();
}
