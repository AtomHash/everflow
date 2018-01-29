export default class RoutesEmptyError extends Error
{
    constructor()
    {
        super('Routes passed to App.run([]) cannot be blank')
    }
}
