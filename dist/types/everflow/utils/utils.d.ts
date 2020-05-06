declare const _default: {
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
    removeHtml(value: string): string;
    microTime(): number;
};
/**
* Cluster of random useful functions. Clean up in the future.
*/
export default _default;
