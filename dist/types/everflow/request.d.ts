import { AxiosInstance, AxiosPromise } from 'axios';
export default class Request {
    config: any;
    endPoint: string;
    authorize: boolean;
    method: string;
    data: any;
    responseType: string;
    headers: object;
    retries: number;
    maxTime: number;
    constructor(url: string, authorize?: boolean);
    addHeader(name: any, value: any): Request;
    static getAxiosEngine(): AxiosInstance;
    retry(retries?: number): Request;
    timeout(miliseconds?: number): Request;
    get(): AxiosPromise;
    delete(): AxiosPromise;
    put(data: any): AxiosPromise;
    post(data: any): AxiosPromise;
    patch(data: any): AxiosPromise;
    private construct();
}
