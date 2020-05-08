import { AxiosInstance, AxiosPromise, AxiosResponse, Method, ResponseType } from 'axios';
import App from './app';
/**
 * Creates an Everflow Request object. Intergrates Axios into the Everflow framework.
 * @class
 */
export default class Request {
    everflowApp: App;
    everflowAPIURL: string;
    bearerToken: string;
    endPoint: string;
    authorize: boolean;
    method: Method;
    data: any;
    responseType: ResponseType;
    headers: object;
    retries: number;
    maxTime: number;
    disableAllButtons: boolean;
    /**
     * Initializes the Request
     * @constructor
     * @param {string} url - request url
     * @param {boolean} authorize - if true add JWT to request
     */
    constructor(baseURL: string, url?: string, authorize?: boolean);
    /**
     * Perform multiple requests and end at the same time.
     * @function multiple
     * @param {Array<AxiosPromise>} requests - multiple Requests to handle
     * @static
     */
    static multiple(requests: Array<AxiosPromise>): Promise<AxiosResponse<any>[]>;
    /**
     * Axios spread function to handle mutiple response callbacks
     * @function spread
     * @param {callable} callback - callback with a paramter for each response in Request.multiple([])
     * @static
     */
    static spread(callback: any): (array: {}[]) => {};
    /**
     * Get Axios default engine
     * @function getAxiosEngine
     * @static
     */
    static getAxiosEngine(): AxiosInstance;
    /**
     * If true with adds a Bearer token to your request. token('<bearer-token>')
     * @function auth
     * @param {boolean} auth - URL for request
     */
    auth(auth: boolean): Request;
    /**
     * Add a Bearer Token to your requests
     * @function token
     * @param {string} bearerToken - A JWT/Bearer Token for authorization. this.auth(true) plus token = authorized request!
     */
    token(bearerToken: string): Request;
    /**
     * End point URL for this request.
     * @function url
     * @param {string} url - URL for request
     */
    url(url: string): Request;
    /**
     * Add header to Request
     * @function addHeader
     * @param {string} name - name of header
     * @param {string} value - value of header
     */
    addHeader(name: any, value: any): Request;
    /**
     * Retry the Request on failure(HTTP 500)
     * @function retry
     * @param {string} retries - default 3
     */
    retry(retries?: number): Request;
    /**
    * Disable all buttons on page while in-progress
    * @function disableAll
    */
    disableAll(): this;
    /**
     * Timeout in miliseconds before the Request is terminated
     * @function timeout
     * @param {string} miliseconds - default 8000 = 8s
     */
    timeout(miliseconds?: number): Request;
    /**
     * Set Request to HTTP method of GET and execute
     * @function get
     */
    get(): AxiosPromise;
    /**
     * Set Request to HTTP method of DELETE and execute
     * @function delete
     */
    delete(data?: any): AxiosPromise;
    /**
     * Set Request to HTTP method of PUT and execute
     * @function put
     * @param {object} data - data to be sent to server
     */
    put(data: any): AxiosPromise;
    /**
     * Set Request to HTTP method of POST and execute
     * @function post
     * @param {object} data - data to be sent to server
     */
    post(data: any): AxiosPromise;
    /**
     * Set Request to HTTP method of PATCH and execute
     * @function patch
     * @param {object} data - data to be sent to server
     */
    patch(data: any): AxiosPromise;
    /**
     * Build an Axios object with the specified options
     * @function build
     * @private
     */
    private build;
}
