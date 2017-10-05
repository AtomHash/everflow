import * as $ from 'jquery';
import Vue, { ComponentOptions } from 'vue';
import VueRouter, { RouterMode } from 'vue-router';
import Utils from './utils/utils'
import IApp from './interfaces/i-app';
import Storage from './utils/storage';
import History from './history';
import UserModel from './models/user-model';
import Language from './utils/language';
import errors from './errors/__init__';
import * as interfaces from './interfaces/__init__';

export default class App implements IApp
{
    currentView: Vue;
    user: any;
    storage: Storage;
    history: History;
    ready: boolean = false;
    readyPermission: boolean = false;
    readyCallbacks: Array<any> = [];
    config: any;
    router: VueRouter;
    language: Language;

    constructor(User: interfaces.IModel, config: any)
    {
        this.config = config
        this.user = new User();
        this.storage = new Storage(config.storage);
        this.language = new Language(this);
        this.loadModels();
        Vue.use(VueRouter);
    }

    loadModels(): void
    {
        //Load app dependant models

        var app = this;

        // CRITICAL

        this.user.load(function (value) {
            if (!Utils.isNull(value))
            {
                app.user.map(value);
            }
            app.ready = true; //sets app state to ready.
        }, this.storage);

        // END - CRITICAL

        // INTERVAL WAIT - APP LOADED USER

        var appReadyInterval = setInterval(function () {
            if (window.app.ready) {
                clearInterval(appReadyInterval);
                var status: boolean = true;
                    $.each(app.readyCallbacks, function (index, callback) {
                        if (!Utils.isFunction(callback)) {
                            var result = callback.function();
                            status = result;
                        }
                        //new callback();
                });
                    if (status) {
                        $.each(app.readyCallbacks, function (index, callback) {
                            if (Utils.isFunction(callback)) {
                                new callback();
                            }
                        });
                    }
            }
        }, 200);

        // END INTERVAL WAIT

    }

    run(routes: any): void 
    {
        window.app = this;
        var routerMode: RouterMode = null;
        if (Utils.isEmpty(this.config.routerMode))
        {
            new errors.ConfigRouterModeError();
        }
        routerMode = this.config.routerMode;
        var mountId: string = null;
        if (Utils.isEmpty(this.config.mountId))
        {
            new errors.ConfigMountError();
        }
        mountId = this.config.mountId;
        if (Utils.isEmpty(routes))
        {
            new errors.RoutesEmptyError();
        }

        this.router = new VueRouter({
            mode: routerMode,
            routes // short for routes: routes
        });

        this.currentView = new Vue({
            router: this.router
        }).$mount('#'+mountId);

        //Create new history wrapper for vuejs router history.
        window.app.history = new History();
        this.history = window.app.history;
    }

    isOnline(): boolean
    {
        return Utils.online;
    }

    go(name: string, data: any = {})
    {
        this.currentView['$router']['push']({ name: name, params: data});
    }

    readyCallback(callback) {
        this.readyCallbacks.push(callback);
    }

}