import LanguageModel from '../models/language-model';
import IApp from '../interfaces/i-app';
export default class Language {
    data: any;
    ready: boolean;
    current: string;
    languageModel: LanguageModel;
    constructor(app: IApp);
    private init;
    private save;
    private loadParse;
    load(languagePack: any): void;
    delete(languagePackName: string): void;
}
