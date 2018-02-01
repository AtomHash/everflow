import LanguageModel from '../models/language-model';
import IApp from '../interfaces/i-app';
export default class Language {
    data: any;
    ready: boolean;
    current: string;
    languageModel: LanguageModel;
    constructor(app: IApp);
    private init(app);
    private save();
    private loadParse(languagePack);
    load(languagePack: any): void;
    delete(languagePackName: string): void;
}
