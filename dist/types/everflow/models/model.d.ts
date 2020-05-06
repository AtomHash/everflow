import Storage from '../utils/storage';
/**
 * The primary Model - Future up to vuex states...
 * @class
 */
export default class Model {
    saveName: string;
    __storage: Storage;
    constructor(storage: Storage);
    map(object: object): void;
    save(onSuccess?: CallableFunction | null, onFail?: CallableFunction | null, storage?: Storage): void;
    load(callback: any, storage?: Storage): void;
    delete(callback?: any, storage?: Storage): void;
}
