import * as $ from 'jquery';
import Vue from 'vue';
import App from './app';
import Display from './utils/display';
import Utils from './utils/utils';

var mixIns: object = {
    $refs: '',
    mounted: function () {

        var _init = function (page) 
        {
            if (Utils.isFunction(page.init))
            {
                page.init().default();
            }
        }

        var _ready = function (page)
        {
            if (Utils.isFunction(page.ready))
            {
                page.ready();
            }
        }

        if (!window.app.ready) {
            var self = this;
            window.app.readyCallback(function () {
                _init(self);
                _ready(self);
            });
        } else {
            _init(this);
            _ready(this);
            return;
        }
    }

}

export default Vue.extend({ mixins: [mixIns] }) as any;
//types set to typeof Vue, VueConstructor: issue: https://github.com/vuejs/vue/issues/6999
