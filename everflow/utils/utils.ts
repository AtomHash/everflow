export default {
	online: navigator.onLine,
	validate: {
		email: function(string){
			var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return emailRegex.test(string);
		},
		phone: function(string){
			var phoneRegex = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
			return phoneRegex.test(string);
		},
		number: function(string){
			var numberRegex = /^[+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*)$(?:[eE][+-]?\d+)?/;
			return numberRegex.test(string);
		}
	},
	browser: {
		getName: function(){
			var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
			if(/trident/i.test(M[1])){
				tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
				return 'IE '+(tem[1]||'');
			}   
			if(M[1]==='Chrome'){
				tem=ua.match(/\bOPR\/(\d+)/)
				if(tem!=null)   {return 'Opera '+tem[1];}
			}   
			M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
			if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
			return M[0];
		},
		getVersion: function(){
			var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];                                                                                                                         
			if(/trident/i.test(M[1])){
				tem=/\brv[ :]+(\d+)/g.exec(ua) || [];
				return 'IE '+(tem[1]||'');
			}
			if(M[1]==='Chrome'){
				tem=ua.match(/\bOPR\/(\d+)/)
				if(tem!=null)   {return 'Opera '+tem[1];}
			}   
			M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
			if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
			return M[1];
		}
    },
    url: {
        decode(url: string): string {
            try {
                return decodeURIComponent(url);
            } catch (e) {
                return "";
            }
        },
        encode(url: string): string {
            try {
                return encodeURIComponent(url);
            }
            catch (e) {
                return "";
            }
        }
    },
    json: {
        isString(json: any): boolean {
            try
            {
                JSON.parse(json);
                return true;
            }
            catch (e)
            {
                return false;
            }
        },
        isObject(data: any)
        {
            if (typeof data === "object") {
                return true;
            }
            return false;
        },
        encode(jsonString: string): any {
            try
            {
                return JSON.parse(jsonString);
            }
            catch (e)
            {
                return "";
            }
        },
        decode(json: any): string {
            try
            {
                return JSON.stringify(json);
            }
            catch (e)
            {
                return "";
            }
        }
    },
    isNull(val: any): boolean
    {
        if (typeof val === 'undefined')
        {
            return true;
        } else {
            if (val === null)
            {
                return true;
            }
            return false;
        }
    },
    isEmpty(value: any): boolean
    {
        return (!value || 0 === value.length);
    },
    isFunction(callable: any): boolean {
        return !!(callable && callable.constructor && callable.call && callable.apply)
    },
    removeHtml(value: string): string
    {
        return value.replace(/<\/?[^>]+(>|$)/g, "");
    },
    microTime() : number {
        var unixtime_ms = (new Date).getTime();
        var sec = Math.floor(unixtime_ms / 1000);
        return sec;
    }
};
