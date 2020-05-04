import * as _ from 'lodash';
import Vue, { VueConstructor } from 'vue';
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
        document.title = this.pageName;
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
    created() 
    {
        document.getElementById(this.$everflowApp.config.mountId).className += ` ${this.pageName}-everflow-page`;
    },
    mounted()
    {
        this.$everflowApp.readyPermission = true;
        PageHelper.pageReady(this);
    }
}
export default Page.extend({ mixins: [mixIns] }) as VueConstructor;
