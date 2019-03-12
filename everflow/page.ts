import Vue, { VueConstructor } from 'vue';
import * as _ from 'lodash';
import App from './app';
import decorators from './decorators/--init--'

/**
 * Static functions for testing page permissions and firing the ready page function
 * @class
 */
class PageHelper
{
    /**
     * Check if exists then Fire Page.ready()
     * @function pageReady
     * @param {Page} page - Page class
     * @static
     */
    static pageReady(page)
    {
        if (_.isFunction(page.ready))
        {
            page.ready();
        }
    }

    /**
     * Check Page permissions and trigger the permissions conditions if not satisfied
     * @function fireParms
     * @param {Page} page - Page class
     * @param {Array<any>} permissions - Array of everflow permissions 
     * @static
     */
    static fireParms(page, permissions)
    {
        var status: boolean = true;
        for (var callback of permissions)
        {
            if ('callback' in callback)
            {
                if ('params' in callback)
                {
                    var permission: any = new callback['callback'](page, callback['params']);
                } else {
                    var permission: any = new callback['callback'](page);
                }
            } else {
                var permission: any = new callback(page);
            }
            if (!permission.status)
            {
                status = false;
            }
        }
        if (status)
        {
            return true;
        } else {
            return false;
        }
    }
}

/**
 * Creates the Page class to extend Vue. Adds routeName, pageName, permissions and everflowPageLoadChange() 
 * @class
 */
@decorators.Component({})
class Page extends Vue
{
    pageName: string = 'default-page';
    routeName: string = '';
    appName: string = '';
    permissions: Array<any> = [];
    ready()
    {

    }

    /**
     * Check permissions then fire ready()
     * @function everflowPageLoadChange
     */
    @decorators.Watch('$route', {deep: true})
    everflowPageLoadChange()
    {
        this.routeName = this.$route.path.substring(this.$route.path.lastIndexOf('/') + 1);
        if (_.has(window, 'app.config.name'))
        {
            this.appName = window['app']['config']['name'];
        }
        document.title = this.appName + " - " + this.pageName;
        if(PageHelper.fireParms(this, this.permissions))
        {
            PageHelper.pageReady(this);
        }
    }
}

/**
 * Adds support for permisisons and triggering ready function
 * @mixin
 * @mixes Vue
 */
var mixIns: object = {
    $refs: '',
    pageName: 'default-page',
    routeName: '',
    appName: '',
    created: function () 
    {
        document.getElementById(window.app.config.mountId).className += ` ${this.pageName}-everflow-page`;
        window.app.currentView = this;
    },
    mounted: function ()
    {
        if (!_.isNil(this.permissions) && !_.isEmpty(this.permissions))
        {
            let perms = this.permissions;
            let app = window.app;
            let page = this;
            if (!app.ready)
            {
                // ASYNC - This waits until the app is ready(user has loaded - async)
                app.readyCallback({
                    type: 'page',
                    function: function() { page.everflowPageLoadChange(); }
                });
                // END ASYNC
            } else {
                page.everflowPageLoadChange()
            }
        }
        else
        {
            window.app.readyPermission = true;
            PageHelper.pageReady(this);
            return;
        }
    }
}
export default Page.extend({ mixins: [mixIns] }) as VueConstructor;
