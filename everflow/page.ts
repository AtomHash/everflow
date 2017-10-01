import * as $ from 'jquery';
import Vue from 'vue';
import App from './app';
import Display from './utils/display';
import Utils from './utils/utils';

class Page extends Vue {
    $refs: any;
    pageName: string;
    permissions: any;
    ready()
    {
        //override
    }
    created()
    {
        $('#app').addClass(this.pageName+"-everflow-page");
        window.app.currentView = this;
    }
    mounted()
    {
        Display.loader.off();

        let _init = function (page) {
            if (typeof page.init == 'function') {
                window[page.pageName + '-page-init'] = page.init();
                window[page.pageName + '-page-init'].default();
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
                    _init(page);
                    page.ready();
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
            _init(this);
            this.ready();
            return;
        }
        
    }
}
export default Page;
