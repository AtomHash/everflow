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
var model_1 = require("./model");
var display_1 = require("../utils/display");
var UserModel = (function (_super) {
    __extends(UserModel, _super);
    function UserModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.saveName = 'user';
        _this.token = '';
        _this.firstname = '';
        _this.lastname = '';
        _this.email = '';
        return _this;
    }
    UserModel.prototype.signOut = function (location) {
        if (location === void 0) { location = 'login'; }
        var app = window.app;
        display_1.default.loader.on();
        app.user.delete(function () {
            app.user = new UserModel();
            app.go(location);
        });
    };
    return UserModel;
}(model_1.default));
exports.default = UserModel;
//# sourceMappingURL=user-model.js.map