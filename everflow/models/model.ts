import * as _ from 'lodash';
import Storage from '../utils/storage';

/**
 * The primary Model - Future up to vuex states...
 * @class
 */
export default class Model
{
    saveName: string = 'defaultModel';
    __storage: Storage = null;

    constructor(storage: Storage){
        this.__storage = storage;
    }

    map(object: object)
    {
        var model = this;
        Object.keys(object).map(function (key, index) {
            if (key in model)
            {
                model[key] = object[key];
            }
        });
    }

    save(onSuccess: CallableFunction|null = null, onFail: CallableFunction|null = null, storage: Storage = this.__storage)
    {
        storage.set(this.saveName, this, onSuccess, onFail);
    }

    load(callback: any, storage: Storage = this.__storage)
    {
        var self = this;
        storage.get(this.saveName, function (error, value) {
            // map loaded values right into object
            if (!_.isNil(value))
            {
                self.map(value);
            }
            // if callback, call it
            if (!_.isNil(callback))
            {
                new callback(self, value);
            }
        });
    }

    delete(callback: any = null, storage: Storage = this.__storage)
    {
        storage.remove(this.saveName, function () {
            if (!_.isNil(callback))
            {
                new callback();
            }
        });
    }
}
