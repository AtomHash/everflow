/**************************
* Random useful functions *
***************************/

const utils = {
    online: navigator.onLine,
    removeHtml(value: string): string
    {
        return value.replace(/<\/?[^>]+(>|$)/g, '');
    },
    microTime() : number {
        var unixtime_ms = (new Date).getTime();
        var sec = Math.floor(unixtime_ms / 1000);
        return sec;
    },
    tagTester(name) {
        return function(obj) {
            return toString.call(obj) === '[object ' + name + ']';
         };
    }
};

export const isFunction = function(value){
    return typeof value === 'function'
}


export const endsWith = function(string, target, position = undefined){
      const { length } = string
  position = position === undefined ? length : +position
  if (position < 0 || position != position) {
    position = 0
  }
  else if (position > length) {
    position = length
  }
  const end = position
  position -= target.length
  return position >= 0 && string.slice(position, end) == target
}


export const startsWith = function (string, target, position = null) {
  const { length } = string
  position = position == null ? 0 : position
  if (position < 0) {
    position = 0
  }
  else if (position > length) {
    position = length
  }
  target = `${target}`
  return string.slice(position, position + target.length) == target
}
export default utils;
