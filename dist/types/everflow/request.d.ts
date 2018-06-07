import { AxiosInstance, AxiosPromise, AxiosResponse } from 'axios';
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
    disableAllButtons: boolean;
    constructor(url: string, authorize?: boolean);
    static multiple(requests: Array<AxiosPromise>): Promise<AxiosResponse<any>[]>;
    static spread(callback: any): (array: {}[]) => {};
    static getAxiosEngine(): AxiosInstance;
    addHeader(name: any, value: any): Request;
    retry(retries?: number): Request;
    disableAll(): this;
    timeout(miliseconds?: number): Request;
    get(): AxiosPromise;
    delete(): AxiosPromise;
    put(data: any): AxiosPromise;
    post(data: any): AxiosPromise;
    patch(data: any): AxiosPromise;
    private build;
}
