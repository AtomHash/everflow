export declare class DisplayBody {
    addClass(className: string): void;
    removeClass(className: string): void;
}
export declare class DisplayLoader {
    on(): void;
    off(): void;
}
export declare class DisplayTextfield {
    error($element: any): void;
    errorReset($element: any): void;
}
export default class Display {
    static body: DisplayBody;
    static loader: DisplayLoader;
    static textfield: DisplayTextfield;
}
