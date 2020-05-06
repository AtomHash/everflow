import Model from './model';
/**
 * Model for an Everflow user
 * @class
 */
export default class UserModel extends Model {
    saveName: string;
    token: string;
    firstname: string;
    lastname: string;
    email: string;
}
