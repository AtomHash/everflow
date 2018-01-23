import * as $ from 'jquery';
import Vue, { VueConstructor } from 'vue';
import App from './app';
import Display from './utils/display';
import Utils from './utils/utils';

var mixIns: object = {
    $refs: '',
    
    pageName: 'default-page',
    created: function () 
    {
        $('#app').addClass(this.pageName+"-everflow-page");
        window.app.currentView = this;
    },
    mounted: function ()
    {
        Display.loader.off();

        var _ready = function (page)
        {
            if (Utils.isFunction(page.ready))
            {
                page.ready();
            }
        }

        if (!Utils.isNull(this.permissions))
        {
            var perms = this.permissions;
            var app = window.app;
            var page = this;

            var _fireParms = function (perms)
            {
                var status: boolean = true;
                $.each(perms, function (index, callback) {
                    if ("callback" in callback){
                        if ("params" in callback){
                            var permission: any = new callback['callback'](callback['params']);
                        } else {
                            var permission: any = new callback['callback']();
                        }
                    } else {
                        var permission: any = new callback();
                    }
                    if (!permission.status)
                    {
                        status = false;
                        return false;
                    } else {
                        return true;
                    }
                });
                if (status)
                {
                    _ready(page)
                    return true;
                } else {
                    return false;
                }
            }

            if (!app.ready)
            {

                // ASYNC - This waits until the app is ready(user has loaded - async)

                app.readyCallback({
                    type: "page",
                    function: function () { return _fireParms(perms); }
                });

                // END ASYNC
            }
            else
            {
                _fireParms(perms);
            }

        }
        else
        {
            window.app.readyPermission = true;
            _ready(this);
            return;
        }
        
    }
}
export default Vue.extend({ mixins: [mixIns] }) as VueConstructor;
