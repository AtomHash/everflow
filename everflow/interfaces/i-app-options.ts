import VueRouter, { RouterOptions, RouteConfig, RouterMode } from 'vue-router';

export default interface IAppOptions 
{
    routes: Array<RouteConfig>;
    routerOptions?: RouterOptions;
    vuePlugins?: Array<any>;
    defaultI18nMessages?: any;
}