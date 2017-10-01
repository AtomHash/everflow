import * as $ from 'jquery';
import Vue from 'vue';
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

    constructor(user: any, config: any)
    {
        this.config = config
        this.currentView = new Vue();
        this.user = new user();
        this.storage = new Storage(config.storage);
        this.loadModels();
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