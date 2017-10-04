"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("jquery");
var DisplayBody = (function () {
    function DisplayBody() {
    }
    DisplayBody.prototype.addClass = function (className) {
        $('body').addClass(className);
    };
    DisplayBody.prototype.removeClass = function (className) {
        $('body').removeClass(className);
    };
    return DisplayBody;
}());
exports.DisplayBody = DisplayBody;
var DisplayLoader = (function () {
    function DisplayLoader() {
    }
    DisplayLoader.prototype.on = function () {
        $('body').removeClass('loaded');
        $('.loader').show();
    };
    DisplayLoader.prototype.off = function () {
        setTimeout(function () {
            $('body').addClass('loaded');
        }, 1000);
        setTimeout(function () {
            $('.loader').fadeOut('400');
        }, 400);
    };
    return DisplayLoader;
}());
exports.DisplayLoader = DisplayLoader;
var DisplayTextfield = (function () {
    function DisplayTextfield() {
    }
    DisplayTextfield.prototype.error = function ($element) {
        $element.addClass('invalid').removeClass('valid');
    };
    DisplayTextfield.prototype.errorReset = function ($element) {
        $element.removeClass('invalid').removeClass('valid');
    };
    return DisplayTextfield;
}());
exports.DisplayTextfield = DisplayTextfield;
var Display = (function () {
    function Display() {
    }
    return Display;
}());
Display.body = new DisplayBody;
Display.loader = new DisplayLoader;
Display.textfield = new DisplayTextfield;
exports.default = Display;
//# sourceMappingURL=display.js.map