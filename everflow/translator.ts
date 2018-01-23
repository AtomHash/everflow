import Utils from './utils/utils';

export default class Translator
{
    private static loadData(key: string): any
    {
        var language = window.app.language;
        return window.app.language.data[key][language.current];
    }

    private static listKey(key: string): any[]
    {
        //javascript split code point below 65536 (english language)
        return key.split('.');
    }

    static trans(dotKey: string = null): string
    {
        var keyList = Translator.listKey(dotKey);
        var currentSelection = Translator.loadData(keyList[0]);
        delete keyList[0];
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
    
    static convertPage()
    {
        var elements = document.getElementsByTagName("*");
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
    
    private static convertProperty(element, property)
    {
        var value = element[property];
        if (Utils.isEmpty(value))
        {
            return;
        }
        var expr = /trans\('([\w.]+)'\)/g;
        var matchList = value.match(expr);
        for (var index in matchList) {
            var exprKey = /'([\w.]+)'/;
            var match = matchList[index];
            var key = match.match(exprKey)[1];
            element[property] = Translator.trans(key);
        }

    }
}
