import Echo from '../utils/echo';

export default class ConfigMountError
{
    constructor()
    {
        Echo.error('Invalid Config - App.config.mountId missing.');
    }
}
