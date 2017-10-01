import * as storage from "localforage";
import Utils from './utils';

export default class Storage {

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

    /*
    static set(key, value): boolean
    {
        var data = null;

        console.log(Utils.json.isObject(value));

        if (Utils.json.isObject(value))
        {
            data = Utils.json.decode(value);
        }
        else if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
            data = value;
        }
        else {
            // not safe data to store
            return false;
        }

        localStorage.setItem(key, data);
        return true;
    }

    static get(key): any
    {

        var item = localStorage.getItem(key);

        if (Utils.isNull(item))
        {
            return "";
        }

        var json = Utils.json.encode(item);
        if (!Utils.isEmpty(json))
        {
            return json;
        }

        return item;
    }

    static remove(key)
    {
        localStorage.removeItem(key)
    }
    */

}