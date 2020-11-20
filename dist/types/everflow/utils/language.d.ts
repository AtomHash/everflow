import LanguageModel from '../models/language-model';
import App from '../app';
/**
 * Creates an Everflow Language object. Adds the ability to load object language packages to translate from.
 * @class
 */
export default class Language {
    data: any;
    ready: boolean;
    current: string;
    languageModel: LanguageModel;
    /**
     * Initializes Language class with an Everflow App
     * @constructor
     * @param {IApp} app - an everflow app
     */
    constructor(everflowApp: App);
    /**
     * Expanded constrcutor() for clean code, load the Language model on to the App
     * @function init
     * @param {IApp} app - an everflow app
     * @private
     */
    private init;
    /**
     * Saves the LanguageModel data
     * @function save
     * @private
     */
    private save;
    /**
     * Loads a language pack
     * @function loadParse
     * @param {object} languagePack - an object with a root of language pack name
     * @private
     */
    private loadParse;
    /**
     * Loads a language pack
     * @function load
     * @param {object} languagePack - an object with a root of language pack name
     */
    load(languagePack: any): void;
    /**
     * Deletes a language pack
     * @function delete
     * @param {object} languagePack - root language pack name
     */
    delete(languagePackName: string): void;
}
