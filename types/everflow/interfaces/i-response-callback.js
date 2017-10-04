"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var i_response_1 = require("./i-response");
var i_app_1 = require("./i-app");
exports.default = interface;
IResponseCallback;
{
    response: i_response_1.default;
    app: i_app_1.default;
    status: number;
    fields: any;
    setFields();
    checkForError();
    error();
    error400();
    error401();
    error500();
    entry();
}
//# sourceMappingURL=i-response-callback.js.map