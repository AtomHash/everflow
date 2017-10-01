import Display from './utils/display';
import User from './user';

export default class Userhelper {
    static signOut(user: any = User) {
        var app = window.app;
        Display.loader.on();
        app.user = new user();
        app.user.delete(function () {
            app.go('login');
        });
    }
}
