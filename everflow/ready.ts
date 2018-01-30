import Vue, { VueConstructor } from 'vue';
import App from './app';
import Utils from './utils/utils';

var mixIns: object = {
    $refs: '',
    mounted: function () {
        let iReady = function (page)
        {
            if (Utils.isFunction(page.ready))
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
