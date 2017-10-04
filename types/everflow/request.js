"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("jquery");
var response_1 = require("./response");
var display_1 = require("./utils/display");
var Request = (function () {
    function Request(endPoint, callback, authorize) {
        if (authorize === void 0) { authorize = false; }
        this.config = null;
        this.endPoint = "";
        this.callback = null;
        this.authorize = false;
        this.method = "";
        this.data = null;
        this.dataType = "json";
        this.headers = {};
        this.attempts = 0;
        this.maxTime = 10000;
        this.config = window['app'].config;
        this.endPoint = endPoint;
        this.callback = callback;
        this.authorize = authorize;
    }
    Request.prototype.retry = function (attempts) {
        if (attempts === void 0) { attempts = 1; }
        this.attempts = attempts;
        return this;
    };
    Request.prototype.timeout = function (maxTime) {
        if (maxTime === void 0) { maxTime = 10000; }
        this.maxTime = maxTime;
        return this;
    };
    Request.prototype.post = function (data) {
        display_1.default.loader.on();
        this.method = "POST";
        this.data = data;
        this.send();
    };
    Request.prototype.get = function () {
        display_1.default.loader.on();
        this.method = "GET";
        this.send();
    };
    Request.prototype.put = function (data) {
        display_1.default.loader.on();
        this.method = "PUT";
        this.data = data;
        this.send();
    };
    Request.prototype.update = function (data) {
        display_1.default.loader.on();
        this.method = "UPDATE";
        this.data = data;
        this.send();
    };
    Request.prototype.send = function () {
        var headers = {};
        var url = "";
        if (this.authorize) {
            headers = {
                'Authorization': 'Bearer ' + window.app.user.token
            };
        }
        for (var header in headers) {
            this.headers[header] = headers[header];
        }
        if (this.endPoint.toLowerCase()['startsWith']("http")) {
            url = this.endPoint;
        }
        else {
            url = this.config.apiEntry + this.endPoint;
        }
        var _callback_func = function (callback, data) {
            try {
                var params = callback.params;
                new callback.callback(new response_1.default(data), params);
            }
            catch (e) {
                new callback(new response_1.default(data));
            }
            return;
        };
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
                success: function (data, textStatus, xhr) {
                    display_1.default.loader.off();
                    _callback_func(self.callback, data);
                    return;
                },
                error: function (xhr) {
                    var status = parseInt(xhr.status);
                    if (status == 500 || status == 504 || status == 0) {
                        if (self.attempts > 0 && attempt < self.attempts) {
                            request(self, attempt + 1);
                            return;
                        }
                    }
                    display_1.default.loader.off();
                    try {
                        var json = xhr.responseText.toJson();
                        _callback_func(self.callback, json);
                        return;
                    }
                    catch (e) {
                        if (self.config.debug) {
                            console.log(e);
                            console.log('Hint: Most likely the server is not accessible.');
                            console.log('Error URL: ' + url);
                        }
                        _callback_func(self.callback, { status: 500, message: "api error", data: "" });
                        return;
                    }
                }
            });
        });
        request(this, 0);
    };
    return Request;
}());
exports.default = Request;
//# sourceMappingURL=request.js.map