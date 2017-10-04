"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils/utils");
var Response = (function () {
    function Response(data) {
        this.status = null;
        this.message = "";
        this.data = {};
        if (utils_1.default.json.isObject(data)) {
            this.status = parseInt(data.status);
            this.message = data.message;
            this.data = data.data;
        }
    }
    return Response;
}());
exports.default = Response;
//# sourceMappingURL=response.js.map