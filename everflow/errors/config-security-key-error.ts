export default class ConfigSecurityKeyError extends Error
{
    constructor()
    {
        super('App.config.security.key is missing. Please add "key": "<aes-key-string-format>" under security in the evconfig.json.')
    }
}
