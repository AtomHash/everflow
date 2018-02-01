import * as _ from 'lodash';
import LanguageModel from '../models/language-model';
import IApp from '../interfaces/i-app';

/**
 * Creates an Everflow Language object. Adds the ability to load object language packages to translate from.
 * @class
 */
export default class Language
{
    data: any = null;
    ready: boolean = false;
    current: string = 'en';
    languageModel: LanguageModel

    /**
     * Initializes Language class with an Everflow App
     * @constructor
     * @param {IApp} app - an everflow app
     */
    constructor(app: IApp)
    {
        this.current = app.config.language;
        this.init(app);
    }

    /**
     * Expanded constrcutor() for clean code, load the Language model on to the App
     * @function init
     * @param {IApp} app - an everflow app
     * @private
     */
    private init(app: IApp)
    {
        var language = this;
        this.languageModel = new LanguageModel();
        this.languageModel.load(function (self, value) {
            language.languageModel = self;
        }, app.storage);
    }

    /**
     * Saves the LanguageModel data
     * @function save
     * @private
     */
    private save(): void
    {
        this.languageModel.data = this.data;
        this.languageModel.save();
    }

    /**
     * Loads a language pack
     * @function loadParse
     * @param {object} languagePack - an object with a root of language pack name
     * @private
     */
    private loadParse(languagePack: any): void
    {
        for(var i in languagePack)
        {
            this.data[i] = languagePack[i];
        }
    }

    /**
     * Loads a language pack
     * @function load
     * @param {object} languagePack - an object with a root of language pack name
     */
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

    /**
     * Deletes a language pack
     * @function delete
     * @param {object} languagePack - root language pack name
     */
    delete(languagePackName: string)
    {
        delete this.data[languagePackName];
        this.save();
    }
}
