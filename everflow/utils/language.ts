import LanguageModel from '../models/language-model';
import Utils from '../utils/utils';
import IApp from '../interfaces/i-app';

export default class Language
{
    data: any = null;
    ready: boolean = false;
    current: string = 'en';

    constructor(app: IApp)
    {
        this.current = app.config.language;
        this.init(app);
    }

    private init(app: IApp)
    {
        var self = this;
        var languageModel = new LanguageModel();
        languageModel.load(function (value) {
            if (Utils.isEmpty(value))
            {
                console.log('sdfds');
                self.data = {};
                self.ready = true;
                return;
            } else {
                console.log('bgfb');
                self.data = value.data;
                self.ready = true;
            }
        }, app.storage);
    }

    private save(): void
    {
        var languageModel = new LanguageModel();
        languageModel.data = this.data;
        languageModel.save();
    }

    private loadParse(languagePack: any): void
    {
        for(var i in languagePack)
        {
            this.data[i] = languagePack[i];
        }
    }

    load(languagePack: any): void
    {
        var self = this;
        var languageReady = setInterval(function () {
            if (self.ready) {
                clearInterval(languageReady);
                self.loadParse(languagePack);
                self.save();
            }
        }, 200);
    }

    delete(languagePackName: string)
    {
        delete this.data[languagePackName];
        this.save();
    }

}