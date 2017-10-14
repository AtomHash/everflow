import Echo from '../utils/echo';

export default class ConfigRouterModeError
{
    constructor()
    {
        Echo.error('Invalid Config - App.config.routerMode missing. Must be "hash", "history" or "abstract"');
    }
}
