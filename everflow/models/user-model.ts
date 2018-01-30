import Model from './model';

/**
 * Model for an Everflow user
 * @class
 */
export default class UserModel extends Model
{
    saveName: string    = 'user';
    token: string       = '';
    firstname: string   = '';
    lastname: string    = '';
    email: string       = '';

    signOut(location: string = 'login')
    {
        var app = window.app;
        app.user.delete(function ()
        {
            app.user = new UserModel();
            app.go(location);
        });
    }
}
