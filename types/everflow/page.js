"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("jquery");
var vue_1 = require("vue");
var display_1 = require("./utils/display");
var utils_1 = require("./utils/utils");
var mixIns = {
    $refs: '',
    pageName: 'default-page',
    created: function () {
        $('#app').addClass(this.pageName + "-everflow-page");
        window.app.currentView = this;
    },
    mounted: function () {
        display_1.default.loader.off();
        var _init = function (page) {
            if (typeof page.init == 'function') {
                window[page.pageName + '-page-init'] = page.init();
                window[page.pageName + '-page-init'].default();
            }
        };
        if (!utils_1.default.isNull(this.permissions)) {
            var perms = this.permissions;
            var app = window.app;
            var page = this;
            var _fireParms = function (perms) {
                var status = true;
                $.each(perms, function (index, callback) {
                    if ("callback" in callback) {
                        if ("params" in callback) {
                            var permission = new callback['callback'](callback['params']);
                        }
                        else {
                            var permission = new callback['callback']();
                        }
                    }
                    else {
                        var permission = new callback();
                    }
                    if (!permission.status) {
                        status = false;
                        return false;
                    }
                    else {
                        return true;
                    }
                });
                if (status) {
                    _init(page);
                    page.ready();
                    return true;
                }
                else {
                    return false;
                }
            };
            if (!app.ready) {
                app.readyCallback({
                    type: "page",
                    function: function () { return _fireParms(perms); }
                });
            }
            else {
                _fireParms(perms);
            }
        }
        else {
            window.app.readyPermission = true;
            _init(this);
            this.ready();
            return;
        }
    }
};
exports.default = vue_1.default.extend({ mixins: [mixIns] });
//# sourceMappingURL=page.js.map