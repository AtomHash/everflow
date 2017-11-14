export default class Request {
    config: any;
    endPoint: string;
    callback: any;
    authorize: boolean;
    method: string;
    data: any;
    dataType: string;
    headers: object;
    attempts: number;
    maxTime: number;
    constructor(endPoint: string, callback: any, authorize?: boolean);
    retry(attempts?: number): Request;
    timeout(maxTime?: number): Request;
    post(data: any): void;
    get(): void;
    put(data: any): void;
    update(data: any): void;
    private send();
}
