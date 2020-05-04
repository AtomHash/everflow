import { AxiosInstance, AxiosPromise, AxiosResponse, Method, ResponseType } from 'axios';
import App from './app';
export default class Request {
    everflowApp: App;
    endPoint: string;
    authorize: boolean;
    method: Method;
    data: any;
    responseType: ResponseType;
    headers: object;
    retries: number;
    maxTime: number;
    disableAllButtons: boolean;
    constructor(everflowApp: App, url: string, authorize?: boolean);
    static multiple(requests: Array<AxiosPromise>): Promise<AxiosResponse<any>[]>;
    static spread(callback: any): (array: {}[]) => {};
    static getAxiosEngine(): AxiosInstance;
    addHeader(name: any, value: any): Request;
    retry(retries?: number): Request;
    disableAll(): this;
    timeout(miliseconds?: number): Request;
    get(): AxiosPromise;
    delete(data?: any): AxiosPromise;
    put(data: any): AxiosPromise;
    post(data: any): AxiosPromise;
    patch(data: any): AxiosPromise;
    private build;
}
