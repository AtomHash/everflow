"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
var storage_1 = require("../utils/storage");
var history_1 = require("../history");
exports.default = interface;
IApp;
{
    currentView: vue_1.default;
    user: any;
    storage: storage_1.default;
    go(name, string);
    void ;
    go(name, string, data, any);
    void ;
    history: history_1.default;
    ready: boolean;
    readyPermission: boolean;
    readyCallbacks: Array();
    readyCallback(callback);
    void ;
    config: any;
}
//# sourceMappingURL=i-app.js.map