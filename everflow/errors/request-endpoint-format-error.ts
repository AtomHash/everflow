export default class RequestEndPointFormatError extends Error
{
    constructor()
    {
        super('Request endpoint error. Make sure a / is on all routes.')
    }
}
