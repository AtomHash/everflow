import Response from './response';
import IApp from './interfaces/i-app';
import IResponseCallback from './interfaces/i-response-callback';
export default class ResponseCallback implements IResponseCallback {
    response: Response;
    app: IApp;
    status: number;
    fields: any;
    params: any;
    constructor(response: Response, params?: any);
    setFields(): void;
    checkForError(): void;
    error(): void;
    error400(): void;
    error401(): void;
    error500(): void;
    entry(): void;
}
