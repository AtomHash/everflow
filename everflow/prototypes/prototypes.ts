var prototypes = function()
{
//Extending String
String.prototype.contains = function (needle): boolean
{
    var lowerCase = this.toLowerCase();
    needle = needle.toLowerCase();
    return lowerCase.indexOf(needle) != -1;
};

String.prototype.shorten = function (n, useWordBoundary): string
{
    var isTooLong = this.length > n,
    s_ = isTooLong ? this.substr(0, n - 1) : this;
    s_ = (useWordBoundary && isTooLong) ? s_.substr(0, s_.lastIndexOf(' ')) : s_;
    return isTooLong ? s_ + '&hellip;' : s_;
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
    return (!this || 0 === this.length);
};

String.prototype.endsWith = function (suffix): boolean
{
    return this.substr(-suffix.length).toLowerCase() === suffix.toLowerCase();
};

//Extending Array
Array.prototype.stringify = function (): string
{
    try
    {
        return JSON.stringify(this);
    }
    catch (e)
    {
        return "";
    }
};

//Extending Object
Object.defineProperty(Object.prototype, 'stringify', {
    value: function () {
        return JSON.stringify(this);
    },
    enumerable: false // = Default
});

Object.defineProperty(Object.prototype, 'getName', {
    value: function () {
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec((this).constructor.toString());
        console.log((this).constructor.toString());
        return (results && results.length > 1) ? results[1] : "";
    },
    enumerable: false // = Default
});
}
export default prototypes;