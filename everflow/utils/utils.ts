/**************************
* Random useful functions *
***************************/
export default {
	online: navigator.onLine,
    removeHtml(value: string): string
    {
        return value.replace(/<\/?[^>]+(>|$)/g, '');
    },
    microTime() : number {
        var unixtime_ms = (new Date).getTime();
        var sec = Math.floor(unixtime_ms / 1000);
        return sec;
    }
};
