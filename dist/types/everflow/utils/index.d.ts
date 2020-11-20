import Storage from './storage';
import DateTime from './date-time';
declare const _default: {
    Utils: {
        online: boolean;
        removeHtml(value: string): string;
        microTime(): number;
        tagTester(name: any): (obj: any) => boolean;
    };
    Storage: typeof Storage;
    DateTime: typeof DateTime;
};
export default _default;
