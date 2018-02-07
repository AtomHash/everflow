export default class RequestBaseurlFormatError extends Error
{
    constructor()
    {
        super('Request BaseURL format error. Make sure the baseUrl in the config does not end with a /')
    }
}
