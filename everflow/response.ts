import Utils from './utils/utils';
import IResponse from './interfaces/i-response'

export default class Response implements Response
{
    status: number      = null;
    message: string     = "";
    data: any           = {};

    constructor(data: any)
    {
        if (Utils.json.isObject(data))
        {
            this.status = parseInt(data.status); //Make sure it is a number...
            this.message = data.message;
            this.data = data.data;
        }
    }

}