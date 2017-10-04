"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prototypes = function () {
    String.prototype.contains = function (needle) {
        var lowerCase = this.toLowerCase();
        needle = needle.toLowerCase();
        return lowerCase.indexOf(needle) != -1;
    };
    String.prototype.shorten = function (n, useWordBoundary) {
        var isTooLong = this.length > n, s_ = isTooLong ? this.substr(0, n - 1) : this;
        s_ = (useWordBoundary && isTooLong) ? s_.substr(0, s_.lastIndexOf(' ')) : s_;
        return isTooLong ? s_ + '&hellip;' : s_;
    };
    String.prototype.toJson = function () {
        try {
            return JSON.parse(this);
        }
        catch (e) {
            return {};
        }
    };
    String.prototype.isEmpty = function () {
        return (!this || 0 === this.length);
    };
    String.prototype.endsWith = function (suffix) {
        return this.substr(-suffix.length).toLowerCase() === suffix.toLowerCase();
    };
    Array.prototype.stringify = function () {
        try {
            return JSON.stringify(this);
        }
        catch (e) {
            return "";
        }
    };
    Object.defineProperty(Object.prototype, 'stringify', {
        value: function () {
            return JSON.stringify(this);
        },
        enumerable: false
    });
    Object.defineProperty(Object.prototype, 'getName', {
        value: function () {
            var funcNameRegex = /function (.{1,})\(/;
            var results = (funcNameRegex).exec((this).constructor.toString());
            console.log((this).constructor.toString());
            return (results && results.length > 1) ? results[1] : "";
        },
        enumerable: false
    });
};
exports.default = prototypes;
//# sourceMappingURL=prototypes.js.map