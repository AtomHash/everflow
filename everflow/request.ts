import Axios, { AxiosInstance, AxiosPromise, AxiosResponse } from 'axios';
import * as _ from 'lodash';
import errors from './errors/--init--';

/**
 * Creates an Everflow Request object. Intergrates Axios into the Everflow framework.
 * @class
 */
export default class Request 
{
    config: any = window.app.config;
    endPoint:string = '';
    authorize: boolean = false;
    method: string = '';
    data: any = null;
    responseType: string = 'json';
    headers: object = {};
    retries: number = 0;
    maxTime: number = 8000;

    /**
     * Initializes the Request
     * @constructor
     * @param {string} url - request url
     * @param {boolean} authorize - if true add JWT to request 
     */
    constructor(url: string, authorize: boolean = false)
    {
        this.endPoint = url;
        this.authorize = authorize;
    }

    /**
     * Perform multiple requests and end at the same time.
     * @function multiple
     * @param {Array<AxiosPromise>} requests - multiple Requests to handle
     * @static
     */
    static multiple(requests: Array<AxiosPromise>): Promise<AxiosResponse<any>[]>
    {
        return Axios.all(requests)
    }

    /**
     * Axios spread function to handle mutiple response callbacks
     * @function spread
     * @param {callable} callback - callback with a paramter for each response in Request.multiple([])
     * @static
     */
    static spread(callback): (array: {}[]) => {}
    {
        return Axios.spread(callback)
    }

    /**
     * Get Axios default engine
     * @function getAxiosEngine
     * @static
     */
    static getAxiosEngine(): AxiosInstance
    {
        return Axios
    }

    /**
     * Add header to Request
     * @function addHeader
     * @param {string} name - name of header
     * @param {string} value - value of header
     */
    addHeader(name, value): Request
    {
        this.headers[name] = value
        return this;
    }

    /**
     * Retry the Request on failure(HTTP 500)
     * @function retry
     * @param {string} retries - default 3
     */
    retry(retries: number = 3): Request
    {
        this.retries = retries;
        return this;
    }

    /**
     * Timeout in miliseconds before the Request is terminated
     * @function timeout
     * @param {string} miliseconds - default 8000 = 8s
     */
    timeout(miliseconds: number = 8000): Request
    {
        this.maxTime = miliseconds;
        return this;
    }

    /**
     * Set Request to HTTP method of GET and execute
     * @function get
     */
    get(): AxiosPromise
    {
        this.method = 'GET';
        return this.build();
    }

    /**
     * Set Request to HTTP method of DELETE and execute
     * @function delete
     */
    delete(): AxiosPromise
    {
        this.method = 'DELETE';
        return this.build();
    }

    /**
     * Set Request to HTTP method of PUT and execute
     * @function put
     * @param {object} data - data to be sent to server
     */
    put(data: any): AxiosPromise
    {
        this.method = 'PUT';
        this.data = data;
        return this.build();
    }

    /**
     * Set Request to HTTP method of POST and execute
     * @function post
     * @param {object} data - data to be sent to server
     */
    post(data: any): AxiosPromise
    {
        this.method = 'POST';
        this.data = data;
        return this.build();
    }

    /**
     * Set Request to HTTP method of PATCH and execute
     * @function patch
     * @param {object} data - data to be sent to server
     */
    patch(data: any): AxiosPromise
    {
        //Display.loader.on();
        this.method = 'PATCH';
        this.data = data;
        return this.build();
    }

    /**
     * Build an Axios object with the specified options
     * @function build
     * @private
     */
    private build() : AxiosPromise
    {
        var url: string = '';
        if (this.authorize)
        {
            this.addHeader('Authorization', `Bearer ${window.app.user.token}`)
        }
        //added to support external links
        if (_.startsWith(this.endPoint.toLowerCase(), 'http'))
        {
            url = this.endPoint;
        } else {
            // make sure entry point starts with /
            if (window.app.config.debug)
            {
                if (_.endsWith(window.app.config.baseURL, '/'))
                {
                    throw new errors.RequestBaseurlFormatError();
                }
                if (!_.startsWith(this.endPoint, '/'))
                {
                    throw new errors.RequestEndPointFormatError();
                }
                if (_.has(window.app.config, 'prefix'))
                {
                    if (!_.startsWith(window.app.config.prefix, '/') || _.endsWith(window.app.config.prefix, '/'))
                    {
                        throw new errors.RequestPrefixFormatError();
                    }
                }
            }
            var prefix = "";
            if (_.has(window.app.config, 'prefix'))
            {
                prefix = `/${window.app.config.prefix}`;
            }
            url = window.app.config.baseURL + prefix + this.endPoint;
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
        var iRetryFunction = function (error)
        {
            var errorCode = _.isNil(error.response)? error.request.status : error.response.status;
            config['retries'] = config['retries'] - 1;
            if (errorCode === 500 && config['retries'] > 0) {
                return ax[`${config.method.toLowerCase()}`](config.url, config)
            }
            return Promise.reject(error);
        }
        ax.interceptors.response.use(undefined, iRetryFunction);
        ax.interceptors.request.use(undefined, iRetryFunction);
        // add retires to config
        config['retries'] = self.retries;
        return ax[`${config.method.toLowerCase()}`](config.url, config)
    }
}
