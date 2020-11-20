import VueI18n from 'vue-i18n';
import App from './app';
export default class Language {
    static loadedLanguages: Array<string>;
    i18n: VueI18n;
    constructor(app: App, messages: any);
    locale: (i18nName: string) => Promise<any>;
    private static setLocale;
    private static loadLanguageAsync;
}
