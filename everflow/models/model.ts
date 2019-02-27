import * as _ from 'lodash';
import Storage from '../utils/storage';

/**
 * The primary Model
 * @class
 */
export default class Model
{
    saveName: string = 'defaultModel';

    map(object: object) {
        var model = this;
        Object.keys(object).map(function (key, index) {
            if (key in model)
            {
                model[key] = object[key];
            }
        });
    }

    save(storage: Storage = window.app.storage)
    {
        storage.set(this.saveName, this);
    }

    load(callback: any = null, storage: Storage = window.app.storage)
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

    delete(callback: any = null, storage: Storage = window.app.storage)
    {
        storage.remove(this.saveName, function () {
            if (!_.isNil(callback))
            {
                new callback();
            }
        });
    }
}
