import * as storage from 'localforage';
import Utils from './utils';

export default class Storage
{
    constructor(config: object)
    {
        storage.config(config);
    }

    set(key: string, value): void 
    {
        storage.setItem(key, value);
    }

    get(key: string, callback): void
    {
        storage.getItem(key, callback);
    }

    remove(key: string, callback = null): void
    {
        if (!Utils.isNull(callback))
        {
            storage.removeItem(key, callback);
            return;
        }
        storage.removeItem(key);
    }
}