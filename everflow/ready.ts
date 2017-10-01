import * as $ from 'jquery';
import Vue from 'vue';
import App from './app';
import Display from './utils/display';
import Utils from './utils/utils';

var mixIns: object = {
    $refs: '',
    mounted: function () {

        var _init = function (page) {
            if (typeof page.init == 'function') {
                page.init().default();
            }
        }

        if (!window.app.ready) {
            var self = this;
            window.app.readyCallback(function () {
                _init(self);
                self.ready();
            });
        } else {
            _init(this);
            this.ready();
            return;
        }
    }
}
export default Vue.extend({ mixins: [mixIns] }) as typeof Vue;
