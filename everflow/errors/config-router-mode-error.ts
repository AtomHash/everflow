export default class ConfigRouterModeError extends Error
{
    constructor()
    {
        super('App.config.routerMode missing. Must be "hash", "history" or "abstract"')
    }
}

