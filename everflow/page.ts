import Vue, { VueConstructor } from 'vue';
import * as _ from 'lodash';
import App from './app';

/**
 * Adds support for permisisons and triggering ready function
 * @mixin
 * @mixes Vue
 */
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
            if (_.isFunction(page.ready))
            {
                page.ready();
            }
        }
        if (!_.isNil(this.permissions))
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
