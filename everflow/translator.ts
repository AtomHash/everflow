import IApp from './interfaces/i-app';
import Utils from './utils/utils';

export default class Translator
{
    app: IApp;

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

}