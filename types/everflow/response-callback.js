"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("jquery");
var utils_1 = require("./utils/utils");
var ResponseCallback = (function () {
    function ResponseCallback(response, params) {
        if (params === void 0) { params = null; }
        this.app = window.app;
        this.response = response;
        this.status = response.status;
        this.params = params;
        this.setFields();
        this.checkForError();
    }
    ResponseCallback.prototype.setFields = function () {
        var $elements = {};
        $.each(this.app.currentView.$refs, function (index, value) {
            if (index.endsWith('modal')) {
                $elements[index] = $(value).modal();
            }
            else {
                $elements[index] = $(value);
            }
        });
        this.fields = $elements;
    };
    ResponseCallback.prototype.checkForError = function () {
        if (this.status !== 200) {
            this.error();
        }
        else {
            this.entry();
        }
    };
    ResponseCallback.prototype.error = function () {
        if (this.status === 400) {
            this.error400();
        }
        else if (this.status === 401) {
            this.error401();
        }
        else if (this.status === 500) {
            this.error500();
        }
    };
    ResponseCallback.prototype.error400 = function () {
        console.log('400 error');
    };
    ResponseCallback.prototype.error401 = function () {
        console.log('401 error');
    };
    ResponseCallback.prototype.error500 = function () {
        if (this.app.config.debug) {
            console.log('500 error: Check database, check request method, check server ect...');
        }
        else {
            if (!utils_1.default.isNull(this.fields.errorModal)) {
                this.fields.errorModalMessage.text(this.app.config.error500.message);
                this.fields.errorModal.modal('open');
            }
        }
    };
    ResponseCallback.prototype.entry = function () {
        console.log('callback parent');
    };
    return ResponseCallback;
}());
exports.default = ResponseCallback;
//# sourceMappingURL=response-callback.js.map