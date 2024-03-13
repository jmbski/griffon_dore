import { 
    StandardObject, 
    TypedContainer, 
    DataSourceMessage
} from '@app/models';


export function IsStandardObject(obj: unknown): obj is StandardObject {
    return obj !== null && typeof obj === 'object' && !Array.isArray(obj) && Object.keys(obj).every(key => typeof key === 'string');
}

export function IsStandardObjectArray(obj: unknown): obj is StandardObject[] {
    return Array.isArray(obj) && obj.every(IsStandardObject);
}

export function IsTypedContainer<T>(obj: unknown, typeGuard: (obj: unknown) => obj is T): obj is TypedContainer<T> {
    return IsStandardObject(obj) && Object.values(obj).every(typeGuard);
}

export function IsTypedContainerArray<T>(obj: unknown, typeGuard: (obj: unknown) => obj is T): obj is TypedContainer<T>[] {
    return Array.isArray(obj) && obj.every(item => IsTypedContainer(item, typeGuard));
}

export type FunctionKeys<T> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];

export function isFunctionKey<T>(obj: T, key: keyof T): key is FunctionKeys<T> {
    return typeof obj[ key ] === 'function';
}

export function IsNumericString(str: string): boolean {
    return !isNaN(Number(str));
}

export function StringToDate(dateString: string): Date | undefined {
    if (isNaN(Date.parse(dateString))) {
        return undefined;
    } else {
        return new Date(dateString);
    }
}

export function IsBooleanString(str: string): boolean {
    return str.toLowerCase() === 'true' || str.toLowerCase() === 'false';
}