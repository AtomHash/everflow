import LanguageModel from '../models/language-model';
import App from '../app';
export default class Language {
    data: any;
    ready: boolean;
    current: string;
    languageModel: LanguageModel;
    constructor(everflowApp: App);
    private init;
    private save;
    private loadParse;
    load(languagePack: any): void;
    delete(languagePackName: string): void;
}
