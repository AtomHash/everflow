export default class Response implements Response {
    status: number;
    message: string;
    data: any;
    constructor(data: any);
}
