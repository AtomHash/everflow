"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Permission = (function () {
    function Permission(action) {
        if (action === void 0) { action = true; }
        this.app = window.app;
        this.status = this.condition();
        if (action) {
            this.action();
        }
    }
    Permission.prototype.action = function () {
        if (this.status) {
            this.success();
        }
        else {
            this.failure();
        }
    };
    Permission.prototype.condition = function () {
        return false;
    };
    Permission.prototype.success = function () {
    };
    Permission.prototype.failure = function () {
    };
    return Permission;
}());
exports.default = Permission;
//# sourceMappingURL=permission.js.map