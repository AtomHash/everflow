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
var ConfigRouterModeError = (function (_super) {
    __extends(ConfigRouterModeError, _super);
    function ConfigRouterModeError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "ConfigRouterModeError";
        _this.message = "Config: App.config.routerMode missing. Must be 'hash', 'history' or 'abstract'";
        return _this;
    }
    return ConfigRouterModeError;
}(Error));
exports.default = ConfigRouterModeError;
//# sourceMappingURL=config-router-mode-error.js.map