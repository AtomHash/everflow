import Axios, { AxiosInstance, AxiosPromise, AxiosResponse, Method, ResponseType } from 'axios';
import * as _ from 'lodash';
import errors from './errors/--init--';
import App from './app';

/**
 * Creates an Everflow Request object. Intergrates Axios into the Everflow framework.
 * @class
 */
 export default class Request 
 {
     everflowApp: App;
     endPoint:string = '';
     authorize: boolean = false;
     method: Method;
     data: any = null;
     responseType: ResponseType = 'json';
     headers: object = {};
     retries: number = 0;
     maxTime: number = 8000;
     disableAllButtons = false;

    /**
     * Initializes the Request
     * @constructor
     * @param {string} url - request url
     * @param {boolean} authorize - if true add JWT to request 
     */
     constructor(everflowApp: App, url: string, authorize: boolean = false)
     {
         this.everflowApp = everflowApp;
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
     * Disable all buttons on page while in-progress
     * @function disableAll
     */
     disableAll()
     {
         this.disableAllButtons = true;
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
     delete(data?: any): AxiosPromise
     {
         this.method = 'DELETE';
         if (!_.isNil(data))
         {
             this.data = data;
         }
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
             this.addHeader('Authorization', `Bearer ${this.everflowApp.user.token}`)
         }
        //added to support external links
        if (_.startsWith(this.endPoint.toLowerCase(), 'http'))
        {
            url = this.endPoint;
        } else {
            // make sure entry point starts with /
            if (this.everflowApp.config.debug)
            {
                if (_.endsWith(this.everflowApp.config.baseURL, '/'))
                {
                    throw new errors.RequestBaseurlFormatError();
                }
                if (!_.startsWith(this.endPoint, '/'))
                {
                    throw new errors.RequestEndPointFormatError();
                }
                if (_.has(this.everflowApp.config, 'prefix'))
                {
                    if (!_.startsWith(this.everflowApp.config.prefix, '/') || _.endsWith(this.everflowApp.config.prefix, '/'))
                    {
                        throw new errors.RequestPrefixFormatError();
                    }
                }
            }
            var prefix = "";
            if (_.has(this.everflowApp.config, 'prefix'))
            {
                prefix = this.everflowApp.config.prefix;
            }
            url = this.everflowApp.config.baseURL + prefix + this.endPoint;
        }
        var config = {
            url: url,
            method: this.method,
            headers: this.headers,
            responseType: this.responseType,
            timeout: this.maxTime,
            data: JSON.stringify(this.data)
        };
        var ax = Axios.create(config);
        let self= this;
        var iRetryFunction = function (error)
        {
            var errorCode = _.isNil(error.response)? error.request.status : error.response.status;
            config['retries'] = config['retries'] - 1;
            if (errorCode === 500 && config['retries'] > 0)
            {
                return ax.request(config);
            }
            return Promise.reject(error);
        }
        ax.interceptors.response.use(undefined, iRetryFunction);
        ax.interceptors.request.use(undefined, iRetryFunction);
        if (this.disableAllButtons)
        {
            var disableAllButtonsFunction = function(disabled)
            {
                var buttons = document.querySelectorAll("input[type=button], button[type=submit], button[type=button], input[type=submit]");
                for(var i = 0, len = buttons.length; i < len; i++)
                {
                    buttons[i]['disabled'] = disabled;
                }
            }
            ax.interceptors.request.use(function (config) {
                disableAllButtonsFunction(true);
                return config;
            }, function (error) {
                disableAllButtonsFunction(false);
                return Promise.reject(error);
            });
            ax.interceptors.response.use(function (response) {
                disableAllButtonsFunction(false);
                return response;
            }, function (error) {
                disableAllButtonsFunction(false);
                return Promise.reject(error);
            });
        }
        // add retires to config
        config['retries'] = self.retries;
        return ax.request(config);
    }
}
