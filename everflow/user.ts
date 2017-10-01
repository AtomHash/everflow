import Model from './models/model';

export default class User extends Model
{
    saveName: string = 'User';
    token: string       = '';
    firstname: string   = '';
    lastname: string    = '';
    email: string = '';
}