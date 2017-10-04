"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var storage = require("localforage");
var utils_1 = require("./utils");
var Storage = (function () {
    function Storage(config) {
        storage.config(config);
    }
    Storage.prototype.set = function (key, value) {
        storage.setItem(key, value);
    };
    Storage.prototype.get = function (key, callback) {
        storage.getItem(key, callback);
    };
    Storage.prototype.remove = function (key, callback) {
        if (callback === void 0) { callback = null; }
        if (!utils_1.default.isNull(callback)) {
            storage.removeItem(key, callback);
            return;
        }
        storage.removeItem(key);
    };
    return Storage;
}());
exports.default = Storage;
//# sourceMappingURL=storage.js.map