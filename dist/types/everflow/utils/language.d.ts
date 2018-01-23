import IApp from '../interfaces/i-app';
export default class Language {
    data: any;
    ready: boolean;
    current: string;
    constructor(app: IApp);
    private init(app);
    private save();
    private loadParse(languagePack);
    load(languagePack: any): void;
    delete(languagePackName: string): void;
}
