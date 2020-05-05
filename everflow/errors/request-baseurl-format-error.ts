export default class RequestBaseurlFormatError extends Error
{
    constructor()
    {
        super('Request apiURL in evconfig.json format error. Make sure the apiURL in the config does not end with a /')
    }
}
