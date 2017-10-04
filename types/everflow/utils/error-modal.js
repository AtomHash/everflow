"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("jquery");
var ErrorModal = (function () {
    function ErrorModal(id) {
        if (id === void 0) { id = "errorModal"; }
        this.id = "";
        this.id = id;
        this.title = $("#" + this.id + "Title");
        this.body = $("#" + this.id + "Body");
        this.footer = $("#" + this.id + "Footer");
    }
    ErrorModal.prototype.open = function () {
        $("#" + this.id)['modal']();
    };
    ErrorModal.prototype.close = function () {
    };
    return ErrorModal;
}());
exports.default = ErrorModal;
//# sourceMappingURL=error-modal.js.map