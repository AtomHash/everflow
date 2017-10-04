"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var History = (function () {
    function History() {
        this.router = window.app.currentView['$router'];
    }
    History.prototype.forward = function () {
        this.router.go(1);
    };
    History.prototype.forwardX = function (x) {
        this.router.go(Math.abs(x));
    };
    History.prototype.back = function () {
        this.router.go(-1);
    };
    History.prototype.backX = function (x) {
        if (x > 0) {
            x = x * -1;
        }
        this.router.go(x);
    };
    return History;
}());
exports.default = History;
//# sourceMappingURL=history.js.map