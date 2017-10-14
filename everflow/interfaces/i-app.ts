import Vue from 'vue';
import Storage from '../utils/storage';
import History from '../history';
import UserModel from '../models/user-model';
import Language from '../utils/language';

export default interface IApp
{
    currentView: Vue;
    user: any;
    storage: Storage;
    go(name: string): void;
    go(name: string, data: any): void;
    history: History;
    language: Language;
    ready: boolean;
    readyPermission: boolean;
    readyCallbacks: Array<any>;
    readyCallback(callback): void;
    config: any;
}