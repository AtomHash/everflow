import { RouterOptions, RouteConfig } from 'vue-router';

export default interface IAppOptions 
{
    routes: Array<RouteConfig>;
    routerOptions?: RouterOptions;
    vuePlugins?: Array<any>;
    defaultLocaleMessages?: any;
}