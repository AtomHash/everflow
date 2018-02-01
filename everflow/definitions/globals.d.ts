import IApp from '../interfaces/i-app';
import LoDashStatic from 'lodash';

declare global
{
    interface Window
    {
        app: IApp;
        _: LoDashStatic
    }
    
    interface String
    {
        contains(needle): boolean;
        shorten(n, useWordBoundary): string;
        toJson(): object;
        isEmpty(): boolean;
        endsWith(suffix): boolean;
    }

    interface Object
    {
        stringify(): string;
        getName(): string;
    }
}
