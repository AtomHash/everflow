import Vue from 'vue';
import VueRouter, { RouterOptions, RouteConfig, RouterMode } from 'vue-router';
import Storage from '../utils/storage';
import UserModel from '../models/user-model';
import Language from '../utils/language';

export default interface IApp
{
    storage: Storage;
    go(name: string): void;
    go(name: string, data: any): void;
    language: Language;
    ready: boolean;
    readyPermission: boolean;
    readyCallbacks: Array<any>;
    readyCallback(callback): void;
    config: any;
    bearerToken: string;
    $router: VueRouter;
}