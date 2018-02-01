import Vue, { VueConstructor } from 'vue';
import * as _ from 'lodash';
import App from './app';

/**
 * Adds support triggering ready function without permissions
 * @mixin
 * @mixes Vue
 */
var mixIns: object = {
    $refs: '',
    mounted: function () {
        let iReady = function (page)
        {
            if (_.isFunction(page.ready))
            {
                page.ready();
            }
        }
        if (!window.app.ready)
        {
            let self = this;
            window.app.readyCallback(function () {
                iReady(self);
            });
        } else {
            iReady(this);
            return;
        }
    }
}
export default Vue.extend({ mixins: [mixIns] }) as VueConstructor;
