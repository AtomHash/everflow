export default class RequestPrefixFormatError extends Error
{
    constructor()
    {
        super('Request prefix error. Make sure prefix starts with a / and does NOT end with a /')
    }
}
