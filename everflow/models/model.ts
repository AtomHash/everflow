import Utils from '../utils/utils';
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

    load(callback, storage: Storage = window.app.storage)
    {
        storage.get(this.saveName, function (error, value) {
            new callback(value);
        });
    }

    delete(callback, storage: Storage = window.app.storage)
    {
        storage.remove(this.saveName, function () {
            if (!Utils.isNull(callback)) {
                new callback();
            }
        });
    }
}
