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
var permission_1 = require("../permission");
var UnAuthenticatedPermission = (function (_super) {
    __extends(UnAuthenticatedPermission, _super);
    function UnAuthenticatedPermission(route) {
        if (route === void 0) { route = "dashboard"; }
        var _this = _super.call(this, false) || this;
        _this.route = "";
        _this.route = route;
        _this.action();
        return _this;
    }
    UnAuthenticatedPermission.prototype.condition = function () {
        return this.app.user.token.isEmpty();
    };
    UnAuthenticatedPermission.prototype.failure = function () {
        this.app.go(this.route);
    };
    return UnAuthenticatedPermission;
}(permission_1.default));
exports.default = UnAuthenticatedPermission;
//# sourceMappingURL=unauthenticated-permission.js.map