﻿import IApp from '../interfaces/i-app';

declare global
{
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
