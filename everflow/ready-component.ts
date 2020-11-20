import { isFunction } from './utils/utils';
import Vue, { VueConstructor } from 'vue';
import decorators from './decorators'

/**
 * Creates the Ready class to extend Vue. Adds ready() triggering
 * @class
 */
@decorators.Component({})
class ReadyComponent extends Vue
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
export default ReadyComponent.extend({ mixins: [mixIns] }) as VueConstructor;
