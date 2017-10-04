"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
var mixIns = {
    $refs: '',
    mounted: function () {
        var _init = function (page) {
            if (typeof page.init == 'function') {
                page.init().default();
            }
        };
        if (!window.app.ready) {
            var self = this;
            window.app.readyCallback(function () {
                _init(self);
                self.ready();
            });
        }
        else {
            _init(this);
            this.ready();
            return;
        }
    }
};
exports.default = vue_1.default.extend({ mixins: [mixIns] });
//# sourceMappingURL=ready.js.map