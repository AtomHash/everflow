import axios from 'axios';
import VueI18n from 'vue-i18n';
import App from './app';

export default class Language
{

    static loadedLanguages: Array<string> = ['en'];
    i18n: VueI18n;

    constructor(app: App, messages: any)
    {
        let defaultLocale = app.config.i18n.defaultLocale;
        let fallbackLocale = app.config.i18n.fallbackLocale;
        if (defaultLocale)
        {
            if (defaultLocale === 'user')
            {
                defaultLocale = navigator.language.split('-')[0];
            }
        }
        this.i18n = new VueI18n({
            locale: defaultLocale, // set locale
            fallbackLocale: fallbackLocale,
            messages // set locale messages
        });
    }

    locale = (i18nName: string) =>
    {
        return Language.loadLanguageAsync(this.i18n, i18nName);
    }

    // locale (i18nName: string) : Language
    // {
    //     return Language.loadLanguageAsync(this.i18n, i18nName)
    // }

    private static setLocale (i18n: VueI18n, lang: string)
    {
        i18n.locale = lang
        axios.defaults.headers.common['Accept-Language'] = lang
        if (document.querySelector('html'))
        {
            const htmlLang = document.querySelector('html') as HTMLHtmlElement;
            htmlLang.setAttribute('lang', lang)
        }
        return;
    }

    private static async loadLanguageAsync(i18n: VueI18n, lang = "en"): Promise<any>
    {
          if (i18n.locale === lang)
          {
              // Do nothing, language is used and loaded
              return Promise.resolve();
          }
          if (Language.loadedLanguages.includes(lang))
          {
              // Do nothing, language is loaded
              // Promise.resolve(Vuei18n.setLocale(i18n, lang))
              Language.setLocale(i18n, lang);
              return Promise.resolve();
          }
          // load un-loaded language.

          return await axios.get(`/i18n/${lang}.json`).then(function(response){
            i18n.setLocaleMessage(lang, response.data[lang])
            Language.loadedLanguages.push(lang)
            return Language.setLocale(i18n, lang)
          });
    }
}