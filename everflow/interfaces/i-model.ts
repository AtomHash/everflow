import Model from '../models/model';
import App from '../app';

export default interface IModel
{
    new (): Model;
    new (everflowApp: App): Model;
}