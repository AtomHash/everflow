export default class ConfigMountError extends Error
{
    constructor()
    {
        super('Cannot find mountId in config file')
    }
}
