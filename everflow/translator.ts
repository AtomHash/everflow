import * as _ from 'lodash';

/**
 * Creates an Everflow Translator object. Adds the ability to translate langauges using keys
 * @class
 */
export default class Translator
{
    /**
     * Returns a Language pack by key
     * @function loadData
     * @param {string} key - string name of language pack loaded by Language util class
     * @private
     * @static
     */
    private static loadData(key: string): any
    {
        var language = window.app.language;
        return window.app.language.data[key][language.current];
    }

    /**
     * Returns an array of keys
     * @function listKey
     * @param {string} key - a string with dot keys (packageName.message)
     * @private
     * @static
     */
    private static listKey(key: string): any[]
    {
        // javascript split code point below 65536 (english language)
        return key.split('.');
    }

    /**
     * Translates using parsed dot.key from HTML code
     * @function convertProperty
     * @param {HTMLElement} element - HTMLElement
     * @param {string} property - property to convert
     * @private
     * @static
     */
    private static convertProperty(element, property)
    {
        var value = element[property];
        if (_.isEmpty(value))
        {
            return;
        }
        var expr = /trans\('([\w.]+)'\)/g;
        var matchList = value.match(expr);
        for (var index in matchList)
        {
            var exprKey = /'([\w.]+)'/;
            var match = matchList[index];
            var key = match.match(exprKey)[1];
            element[property] = Translator.trans(key);
        }
    }

    /**
     * Translate using a dot.key to access different language text
     * @function trans
     * @param {string} key - a string with dot keys (packageName.message)
     * @static
     */
    static trans(dotKey: string = null): string
    {
        var keyList = Translator.listKey(dotKey);
        var currentSelection = Translator.loadData(keyList[0]);
        delete keyList[0];
        for (var key in keyList)
        {
            var objectKey = keyList[key];
            if (!_.isFunction(objectKey))
            {
                currentSelection = currentSelection[objectKey];
            }
        }
        return currentSelection;
    }

    /**
     * Translate an entire page, if trans('dot.key') exists, it will load the language text
     * @function convertPage
     * @static
     */
    static convertPage()
    {
        var elements = document.getElementsByTagName('*');
        var checkProperties =
        [
            'placeholder',
            'innerText',
            'defaultValue'
        ];
        for (var i = 0, max = elements.length; i < max; i++)
        {
            for (var checkIndex in checkProperties) {
                var check = checkProperties[checkIndex];
                var element = elements[i];
                if (check in element)
                {
                    Translator.convertProperty(element, check);
                }
            }
        }
    }
}
