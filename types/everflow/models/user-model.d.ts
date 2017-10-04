import Model from './model';
export default class UserModel extends Model {
    saveName: string;
    token: string;
    firstname: string;
    lastname: string;
    email: string;
    signOut(location?: string): void;
}
