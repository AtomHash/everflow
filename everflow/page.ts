﻿import Vue, { VueConstructor } from 'vue';
import App from './app';
import Utils from './utils/utils';

var mixIns: object = {
    $refs: '',
    
    pageName: 'default-page',
    created: function () 
    {
        document.getElementById(window.app.config.mountId).className += ` ${this.pageName}-everflow-page`;
        window.app.currentView = this;
    },
    mounted: function ()
    {
        let iReady = function (page)
        {
            if (Utils.isFunction(page.ready))
            {
                page.ready();
            }
        }
        if (!Utils.isNull(this.permissions))
        {
            let perms = this.permissions;
            let app = window.app;
            let page = this;
            let iFireParms = function (perms)
            {
                var status: boolean = true;
                for (var callback of perms)
                {
                    if ('callback' in callback)
                    {
                        if ('params' in callback)
                        {
                            var permission: any = new callback['callback'](callback['params']);
                        } else {
                            var permission: any = new callback['callback']();
                        }
                    } else {
                        var permission: any = new callback();
                    }
                    if (!permission.status)
                    {
                        status = false;
                        return false;
                    } else {
                        return true;
                    }
                }
                if (status)
                {
                    iReady(page)
                    return true;
                } else {
                    return false;
                }
            }
            if (!app.ready)
            {
                // ASYNC - This waits until the app is ready(user has loaded - async)
                app.readyCallback({
                    type: 'page',
                    function: function () { return iFireParms(perms); }
                });
                // END ASYNC
            }
            else
            {
                iFireParms(perms);
            }
        }
        else
        {
            window.app.readyPermission = true;
            iReady(this);
            return;
        }
    }
}
export default Vue.extend({ mixins: [mixIns] }) as VueConstructor;
