"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("jquery");
var vue_1 = require("vue");
var vue_router_1 = require("vue-router");
var utils_1 = require("./utils/utils");
var storage_1 = require("./utils/storage");
var history_1 = require("./history");
var __init__1 = require("./errors/__init__");
var App = (function () {
    function App(User, config) {
        this.ready = false;
        this.readyPermission = false;
        this.readyCallbacks = [];
        this.config = config;
        this.user = new User();
        this.storage = new storage_1.default(config.storage);
        this.loadModels();
        vue_1.default.use(vue_router_1.default);
    }
    App.prototype.loadModels = function () {
        var app = this;
        this.user.load(function (value) {
            if (!utils_1.default.isNull(value)) {
                app.user.map(value);
            }
            app.ready = true;
        }, this.storage);
        var appReadyInterval = setInterval(function () {
            if (window.app.ready) {
                clearInterval(appReadyInterval);
                var status = true;
                $.each(app.readyCallbacks, function (index, callback) {
                    if (!utils_1.default.isFunction(callback)) {
                        var result = callback.function();
                        status = result;
                    }
                });
                if (status) {
                    $.each(app.readyCallbacks, function (index, callback) {
                        if (utils_1.default.isFunction(callback)) {
                            new callback();
                        }
                    });
                }
            }
        }, 200);
    };
    App.prototype.run = function (routes) {
        window.app = this;
        var routerMode = null;
        try {
            var routerMode = this.config.routerMode;
        }
        catch (e) {
            throw new __init__1.default.ConfigRouterModeError;
        }
        var mountId = null;
        try {
            var mountId = this.config.mountId;
        }
        catch (e) {
            throw new __init__1.default.ConfigMountError;
        }
        this.router = new vue_router_1.default({
            mode: routerMode,
            routes: routes
        });
        this.currentView = new vue_1.default({
            router: this.router
        }).$mount('#' + mountId);
        window.app.history = new history_1.default();
        this.history = window.app.history;
    };
    App.prototype.isOnline = function () {
        return utils_1.default.online;
    };
    App.prototype.go = function (name, data) {
        if (data === void 0) { data = {}; }
        this.currentView['$router']['push']({ name: name, params: data });
    };
    App.prototype.readyCallback = function (callback) {
        this.readyCallbacks.push(callback);
    };
    return App;
}());
exports.default = App;
//# sourceMappingURL=app.js.map