import * as _ from 'lodash';

var prototypes = function()
{
//Extending String
String.prototype.contains = function (needle): boolean
{
    return this.toLowerCase()
        .indexOf(needle.toLowerCase()) != -1;
};

String.prototype.shorten = function (n, useWordBoundary): string
{
    var isTooLong = this.length > n,
        sub = isTooLong ? this.substr(0, n - 1) : this;
    sub = (useWordBoundary && isTooLong) ? sub.substr(0, sub.lastIndexOf(' ')) : sub;
    return isTooLong ? sub + '&hellip;' : sub;
};

String.prototype.toJson = function (): object
{
    try
    {
        return JSON.parse(this);
    }
    catch (e)
    {
        return {};
    }
};

String.prototype.isEmpty = function (): boolean
{
    return _.isEmpty(this)
};

String.prototype.endsWith = function (suffix): boolean
{
    return this.substr(-suffix.length)
        .toLowerCase() === suffix.toLowerCase();
};

//Extending Array
Object.defineProperty(Array.prototype, 'stringify', {
    enumerable: false,
    value: function() {
        try
        {
            return JSON.stringify(this);
        }
        catch (e)
        {
            return "";
        }
  }
});

//Extending Object
Object.defineProperty(Object.prototype, 'stringify', {
    enumerable: false,
    value: function () {
        return JSON.stringify(this);
    },
});

Object.defineProperty(Object.prototype, 'getName', {
    value: function () {
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec((this).constructor.toString());
        return (results && results.length > 1) ? results[1] : "";
    },
    enumerable: false // = Default
});
}
export default prototypes;