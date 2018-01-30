import Storage from './storage';
import DateTime from './date-time';
import Language from './language';
declare const _default: {
    Utils: {
        online: boolean;
        validate: {
            email: (string: any) => boolean;
            phone: (string: any) => boolean;
            number: (string: any) => boolean;
        };
        browser: {
            getName: () => string;
            getVersion: () => string;
        };
        url: {
            decode(url: string): string;
            encode(url: string): string;
        };
        json: {
            isString(json: any): boolean;
            isObject(data: any): boolean;
            encode(jsonString: string): any;
            decode(json: any): string;
        };
        isNull(val: any): boolean;
        isEmpty(value: any): boolean;
        isFunction(callable: any): boolean;
        removeHtml(value: string): string;
        microTime(): number;
    };
    Storage: typeof Storage;
    DateTime: typeof DateTime;
    Language: typeof Language;
};
export default _default;
