import IApp from './interfaces/i-app';
import Utils from './utils/utils';
import IModel from './interfaces/i-model';
import LanguageModel from './models/language-model';
import Request from './request';

export default class Translator
{
    app: IApp;
    language: string = null;
    data: any = null;

    constructor(languagePackage: any = null)
    {
        var self = this;
        this.app = window.app;
        this.language = window.app.config.language;
        /*
        if (Utils.isEmpty(languagePackage))
        {
            var languageData = new LanguageModel();
            languageData.load(function (value) {
            if (Utils.isNull(value))
            {
                self.loadFromServer();
            }
            }, this.app.storage);
        }
        */
        this.data = {'en': {
            'welcome': 'hello', 
            'step1': {'step2': 'here'}
            }
        }
    }

    private loadFromServer(): void
    {

    }

    private loadData(): any
    {
        return this.data[this.language];
    }

    private listKey(key: string): any[]
    {
        //javascript split code point below 65536 (english language)
        return key.split('.');
    }

    trans(dotKey: string = null): string
    {
        var currentSelection = this.loadData();
        var keyList = this.listKey(dotKey);
        for (var key in keyList)
        {
            var objectKey = keyList[key];
            if (!Utils.isFunction(objectKey))
            {
                currentSelection = currentSelection[objectKey];
            }
        }
        return currentSelection;
    }

}