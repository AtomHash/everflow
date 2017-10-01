export default class ErrorModal {
    id: string;
    title: any;
    body: any;
    footer: any;
    constructor(id?: string);
    open(): void;
    close(): void;
}
