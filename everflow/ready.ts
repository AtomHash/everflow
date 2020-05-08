import { isFunction } from './utils/utils';
import Vue, { VueConstructor } from 'vue';
import App from './app';
import decorators from './decorators'

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
}

/**
 * Adds support triggering ready function without permissions
 * @mixin
 * @mixes Vue
 */
var mixIns: object = {
    $refs: '',
    mounted: function () {
        if (isFunction(this.ready))
        {
            this.ready();
        }
        return;
    }
}
export default Ready.extend({ mixins: [mixIns] }) as VueConstructor;
