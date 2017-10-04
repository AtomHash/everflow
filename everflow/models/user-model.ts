import Model from './model';
import Display from '../utils/display';

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
        Display.loader.on();
        app.user.delete(function ()
        {
            app.user = new UserModel();
            app.go(location);
        });
    }
    //TODO: plan for a signIn function(username, password)?
    //TODO: have signInLink function(), so link is overridable?
    //TODO: password reset function(username)?

}