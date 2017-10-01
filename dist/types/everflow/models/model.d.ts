import Storage from '../utils/storage';
export default class Model {
    saveName: string;
    map(object: object): void;
    save(storage?: Storage): void;
    load(callback: any, storage?: Storage): void;
    delete(callback: any, storage?: Storage): void;
}
