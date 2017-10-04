import Storage from '../utils/storage';
export default class Model extends Object {
    saveName: string;
    map(object: object): void;
    save(storage?: Storage): void;
    load(callback: any, storage?: Storage): void;
    delete(callback: any, storage?: Storage): void;
}
