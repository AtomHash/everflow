export default class Storage {
    constructor(config: object);
    set(key: string, value: any): void;
    get(key: string, callback: any): void;
    remove(key: string, callback?: any): void;
}
