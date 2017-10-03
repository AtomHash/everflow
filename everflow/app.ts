import * as $ from 'jquery';
import Vue, { ComponentOptions } from 'vue';
import VueRouter, { RouterMode } from 'vue-router';
import Utils from './utils/utils'
import Storage from './utils/storage';
import History from './history';
import IApp from './interfaces/i-app';

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
    mountId: string = "app";
    routerMode: RouterMode = "history"

    constructor(user: any, config: any)
    {
        this.config = config
        this.user = new user();
        this.storage = new Storage(config.storage);
        this.loadModels();
        this.setMount();
        this.setRouterMode();
        Vue.use(VueRouter);
    }

    setRouterMode(): void {
        if (Utils.isEmpty(this.config.routerMode) == false)
        {
            this.routerMode = this.config.routerMode;
        }
    }

    setMount(): void {
        if (Utils.isEmpty(this.config.mountId) == false)
        {
            this.mountId = this.config.mountId;
        }
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

        this.router = new VueRouter({
            mode: this.routerMode, //remove for #examplepath type routing. 
            routes // short for routes: routes
        });

        this.currentView = new Vue({
            router: this.router
        }).$mount('#'+this.mountId);

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