/**************************
* Random useful functions *
***************************/
declare const utils: {
    online: boolean;
    removeHtml(value: string): string;
    microTime(): number;
    tagTester(name: any): (obj: any) => boolean;
};
export declare const isFunction: (value: any) => boolean;
export declare const endsWith: (string: any, target: any, position?: any) => boolean;
export declare const startsWith: (string: any, target: any, position?: any) => boolean;
export default utils;
