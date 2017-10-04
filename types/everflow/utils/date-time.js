"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var utils_1 = require("./utils");
var DateTime = (function () {
    function DateTime() {
    }
    DateTime.getDateFormat = function () {
        var config = window.app.config;
        var dateFormat = null;
        try {
            dateFormat = window.app.config.datetime.date.format;
        }
        catch (e) {
            dateFormat = "YYYY-MM-DD";
        }
        return dateFormat;
    };
    DateTime.getTimeFormat = function () {
        var config = window.app.config;
        var timeFormat = null;
        try {
            timeFormat = window.app.config.datetime.time.format;
        }
        catch (e) {
            timeFormat = "LTS";
        }
        return timeFormat;
    };
    DateTime.moment = function (dateTime, format, override) {
        if (dateTime === void 0) { dateTime = null; }
        if (format === void 0) { format = null; }
        if (override === void 0) { override = false; }
        if (utils_1.default.isEmpty(format)) {
            format = DateTime.getDateFormat() + " " + DateTime.getTimeFormat();
        }
        if (override) {
            format = null;
        }
        if (utils_1.default.isEmpty(dateTime)) {
            dateTime = new Date();
        }
        if (utils_1.default.isEmpty(format)) {
            format = "MMMM Do YYYY, h:mm:ss a";
        }
        return moment(dateTime, format);
    };
    DateTime.date = function (dateTime) {
        if (dateTime === void 0) { dateTime = null; }
        return DateTime.moment(dateTime).format(DateTime.getDateFormat());
    };
    DateTime.time = function (dateTime) {
        if (dateTime === void 0) { dateTime = null; }
        return DateTime.moment(dateTime).format(DateTime.getTimeFormat());
    };
    return DateTime;
}());
exports.default = DateTime;
//# sourceMappingURL=date-time.js.map