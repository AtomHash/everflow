import { isFunction } from './utils/utils';
import Vue, { VueConstructor } from 'vue';
import App from './app';
import decorators from './decorators'

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
        if (isFunction(page.ready))
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
    ready()
    {

    }
}

/**
 * Adds support for permisisons and triggering ready function
 * @mixin
 * @mixes Vue
 */
var mixIns: object = {
    $refs: '',
    created() 
    {
        document.getElementById(this.$app.config.mountId).className += ` ${this.pageName}-everflow-page`;
    },
    mounted()
    {
        this.$app.readyPermission = true;
        PageHelper.pageReady(this);
        // document.title = this.pageName;
    }
}
export default Page.extend({ mixins: [mixIns] }) as VueConstructor;
