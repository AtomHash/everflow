import App from './app';
/**
 * Creates an Everflow Translator object. Adds the ability to translate langauges using keys
 * @class
 */
export default class Translator {
    /**
     * Returns a Language pack by key
     * @function loadData
     * @param {string} key - string name of language pack loaded by Language util class
     * @private
     * @static
     */
    private static loadData;
    /**
     * Returns an array of keys
     * @function listKey
     * @param {string} key - a string with dot keys (packageName.message)
     * @private
     * @static
     */
    private static listKey;
    /**
     * Translates using parsed dot.key from HTML code
     * @function convertProperty
     * @param {HTMLElement} element - HTMLElement
     * @param {string} property - property to convert
     * @private
     * @static
     */
    private static convertProperty;
    /**
     * Translate using a dot.key to access different language text
     * @function trans
     * @param {string} key - a string with dot keys (packageName.message)
     * @static
     */
    static trans(everflowApp: App, dotKey?: string): string;
    /**
     * Translate an entire page, if trans('dot.key') exists, it will load the language text
     * @function convertPage
     * @static
     */
    static convertPage(): void;
}
