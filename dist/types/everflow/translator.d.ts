import IApp from './interfaces/i-app';
export default class Translator {
    app: IApp;
    language: string;
    data: any;
    constructor(languagePackage?: any);
    private loadFromServer();
    private loadData();
    private listKey(key);
    trans(dotKey?: string): string;
}
