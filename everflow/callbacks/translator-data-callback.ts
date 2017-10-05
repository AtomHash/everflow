import ResponseCallback from '../response-callback';
import Echo from '../utils/echo';
import LanguageModel from '../models/language-model';

export default class TranslatorDataCallback extends ResponseCallback
{

    error()
    {
        Echo.warn('Translator - Language packages failed to download');
    }

    entry()
    {
        var languageModel = new LanguageModel()
        languageModel.data = this.response.data;
        languageModel.save();
        return this.response.data
    }
}
