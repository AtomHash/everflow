import Storage from './storage';
import DateTime from './date-time';
import Language from './language';
declare const _default: {
    Utils: {
        online: boolean;
        removeHtml(value: string): string;
        microTime(): number;
        tagTester(name: any): (obj: any) => boolean;
    };
    Storage: typeof Storage;
    DateTime: typeof DateTime;
    Language: typeof Language;
};
export default _default;
