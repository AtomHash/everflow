import Echo from '../utils/echo';

export default class RoutesEmptyError
{
    constructor()
    {
        Echo.error('Invalid Routes - routes passed to App.run([..]) cannot be blank.');
    }
}