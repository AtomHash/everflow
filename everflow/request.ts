import Axios, { AxiosInstance, AxiosPromise } from 'axios';
import Utils from './utils/utils';
import Response from './response';
import Display from './utils/display';
import errors from './errors/--init--';

export default class Request 
{
    config: any = window['app'].config;
    endPoint:string = "";
    authorize: boolean = false;
    method: string = "";
    data: any = null;
    responseType: string = "json";
    headers: object = {};
    retries: number = 0;
    maxTime: number = 8000;

    constructor(url: string, authorize: boolean = false)
    {
        this.endPoint = url;
        this.authorize = authorize;
    }

    addHeader(name, value): Request
    {
        this.headers[name] = value
        return this;
    }

    static getAxiosEngine(): AxiosInstance
    {
        return Axios.create({
            baseURL: window['app'].config.baseURL,
            timeout: 8000,
        });
    }

    retry(retries: number = 3): Request
    {
        this.retries = retries;
        return this;
    }

    timeout(miliseconds: number = 8000): Request
    {
        this.maxTime = miliseconds;
        return this;
    }

    get(): AxiosPromise
    {
        //Display.loader.on();
        this.method = "GET";
        return this.construct();
    }

    delete(): AxiosPromise
    {
        //Display.loader.on();
        this.method = "DELETE";
        return this.construct();
    }

    put(data: any): AxiosPromise
    {
        //Display.loader.on();
        this.method = "PUT";
        this.data = data;
        return this.construct();
    }

    post(data: any): AxiosPromise
    {
        //Display.loader.on();
        this.method = "POST";
        this.data = data;
        return this.construct();
    }

    patch(data: any): AxiosPromise
    {
        //Display.loader.on();
        this.method = "PATCH";
        this.data = data;
        return this.construct();
    }

/*
    update(data: any): AxiosPromise
    {
        //Display.loader.on();
        this.method = "UPDATE";
        this.data = data;
        return this.construct();
    }
*/

    private construct() : AxiosPromise
    {
        var url: string = '';
        if (this.authorize)
        {
            this.addHeader('Authorization', `Bearer ${window.app.user.token}`)
        }
        //added to support external links
        if (this.endPoint.toLowerCase()['startsWith']('http')) {
            url = this.endPoint;
        } else {
            // make sure entry point starts with /
            if (window['app'].config.debug)
            {
                /*
                if (!this.endPoint['startsWith']('/'))
                {
                    throw new errors.RequestEndPointFormatError();
                }
                */
            }
            url = window['app'].config.baseURL + this.endPoint;
        }
        var config = {
            url: url,
            method: this.method,
            headers: this.headers,
            responseType: this.responseType,
            timeout: this.maxTime,
            data: this.data
        };
        var ax = Axios.create(config);
        let self= this;
        var retryFunction = function (error) {
            console.log(error);
            console.log(config);
            console.log(config['retries']);
            var errorCode = Utils.isNull(error.response)? error.request.status : error.response.status;
            config['retries'] = config['retries'] - 1;
            if (errorCode === 500 && config['retries'] > 0) {
                console.log('retrying...');
                return ax[`${config.method.toLowerCase()}`](config.url, config)
            }
            console.log('promised error');
            return Promise.reject(error);
        }
        ax.interceptors.response.use(undefined, retryFunction);
        ax.interceptors.request.use(undefined, retryFunction);
        // add retires to config
        config['retries'] = self.retries;
        return ax[`${config.method.toLowerCase()}`](config.url, config)
    }
}
