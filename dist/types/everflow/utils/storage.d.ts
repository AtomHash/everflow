export default class Storage {
    constructor(config: object);
    set(key: string, value: any, onSuccess: CallableFunction | null, onFail: CallableFunction | null): void;
    get(key: string, callback: any): void;
    remove(key: string, callback?: any): void;
}
