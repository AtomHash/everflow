"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils/utils");
var Model = (function (_super) {
    __extends(Model, _super);
    function Model() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.saveName = 'defaultModel';
        return _this;
    }
    Model.prototype.map = function (object) {
        var model = this;
        Object.keys(object).map(function (key, index) {
            if (key in model) {
                model[key] = object[key];
            }
        });
    };
    Model.prototype.save = function (storage) {
        if (storage === void 0) { storage = window.app.storage; }
        storage.set(this.saveName, this);
    };
    Model.prototype.load = function (callback, storage) {
        if (storage === void 0) { storage = window.app.storage; }
        storage.get(this.saveName, function (error, value) {
            new callback(value);
        });
    };
    Model.prototype.delete = function (callback, storage) {
        if (storage === void 0) { storage = window.app.storage; }
        storage.remove(this.saveName, function () {
            if (!utils_1.default.isNull(callback)) {
                new callback();
            }
        });
    };
    return Model;
}(Object));
exports.default = Model;
//# sourceMappingURL=model.js.map