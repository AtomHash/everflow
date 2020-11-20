export default class ConfigSecurityKeyError extends Error
{
    constructor()
    {
        super('App.config.security is missing. Please add {"security": {"key": "<aes-key-string-format>"}} to your evconfig.json')
    }
}
