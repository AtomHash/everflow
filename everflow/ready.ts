import Vue, { VueConstructor } from 'vue';
import * as _ from 'lodash';
import App from './app';
import decorators from './decorators/--init--'

/**
 * Creates the Ready class to extend Vue. Adds ready() triggering
 * @class
 */
@decorators.Component({})
class Ready extends Vue
{
    ready()
    {

    }

    /**
     * Just fire ready()
     * @function everflowReadyLoadChange
     */
    @decorators.Watch('$route', {deep: true})
    everflowReadyLoadChange()
    {
        if (_.isFunction(this.ready))
        {
            this.ready();
        }
    }
}

/**
 * Adds support triggering ready function without permissions
 * @mixin
 * @mixes Vue
 */
var mixIns: object = {
    $refs: '',
    mounted: function () {
        let app = window.app;
        let ready = this;
        if (!app.ready)
        {
            app.readyCallback({
                    type: 'ready',
                    function: function() { ready.everflowReadyLoadChange() }
            });
            return;
        } else {
            this.everflowReadyLoadChange()
            return;
        }
    }
}
export default Ready.extend({ mixins: [mixIns] }) as VueConstructor;
