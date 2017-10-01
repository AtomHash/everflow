import * as $ from 'jquery';
import Utils from './utils/utils';
import Response from './response';
import Display from './utils/display';

export default class Request 
{
    config: any = null;
    endPoint:string = "";
    callback: any = null;
    authorize: boolean = false;
    method: string = "";
    data: any = null;
    dataType: string = "json";
    headers: object = {};
    attempts: number = 0;
    maxTime: number = 10000;

    constructor(endPoint: string, callback: any, authorize: boolean = false) {
        this.config = window['app'].config;
        this.endPoint = endPoint;
        this.callback = callback;
        this.authorize = authorize;
    }

    retry(attempts: number = 1): Request {
        this.attempts = attempts;
        return this;
    }

    timeout(maxTime: number = 10000): Request {
        this.maxTime = maxTime;
        return this;
    }

    post(data: any): void {
        Display.loader.on();
        this.method = "POST";
        this.data = data;
        this.send();
    }

    get(): void {
        Display.loader.on();
        this.method = "GET";
        this.send();
    }

    put(data: any): void {
        Display.loader.on();
        this.method = "PUT";
        this.data = data;
        this.send();
    }

    update(data: any): void {
        Display.loader.on();
        this.method = "UPDATE";
        this.data = data;
        this.send();
    }

    /*

    static get(endpoint: string, callback: any, authorize: boolean = false): void
    {
        Display.loader.on();
        this.send(endpoint, 'get', "", authorize, callback);
    }

    static put(endpoint: string, data: any, callback: any): void
    {
        Display.loader.on();
        this.send(endpoint, 'put', data, true, callback);
    }

    static update(endpoint: string, data: any, callback: any): void
    {
        Display.loader.on();
        this.send(endpoint, 'update', data, true, callback);
    }
    */

    private send() : void
    {
        var headers = {};
        var url: string = "";

        if (this.authorize)
        {
            headers = {
                'Authorization': 'Bearer ' + window.app.user.token
            };
        }
        //addded to support more custom headers
        //TODO: add a custom headers (array) to the http methods
        //Object.assign ES6, however browser support is limited.
        //headers = Object.assign(this.headers, headers);
        for (var header in headers) { this.headers[header] = headers[header]; }

        //added to support external ajax links
        if (this.endPoint.toLowerCase()['startsWith']("http")) {
            url = this.endPoint;
        } else {
            url = this.config.apiEntry + this.endPoint;
        }

        var _callback_func = function (callback: any, data: any) {
            try {
                var params = callback.params;
                new callback.callback(new Response(data), params);
            } catch (e) {
                new callback(new Response(data));
            }
            return;
        }

        var request = (function (self, attempt) {
            $.ajax({
                url: url,
                type: self.method,
                dataType: self.dataType,
                crossDomain: true,
                headers: self.headers,
                async: true,
                timeout: self.maxTime,
                data: self.data,
                success: function (data: object, textStatus, xhr) {
                    Display.loader.off()
                    _callback_func(self.callback, data);
                    return;
                },
                error: function (xhr: any) {

                    let status = parseInt(xhr.status);
                    if (status == 500 || status == 504 || status == 0) {
                        if (self.attempts > 0 && attempt < self.attempts) {
                            request(self, attempt + 1);
                            return;
                        }
                    }

                    Display.loader.off();
                    // Callable
                    try {
                        var json = xhr.responseText.toJson();
                        _callback_func(self.callback, json);
                        return;
                    }
                    catch (e) {
                        if (self.config.debug) {
                            console.log(e);
                            console.log('Hint: Most likely the server is not accessible.');
                            console.log('Error URL: ' + url)
                        }
                        _callback_func(self.callback, { status: 500, message: "api error", data: "" });
                        return;
                    }
                }

            });

        });
        request(this, 0);

    }
    
}
