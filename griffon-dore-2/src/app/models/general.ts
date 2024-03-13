import { MegaMenuItem, MenuItem } from 'primeng/api';
import { NgStyleValues } from './styles';
import { TemplateRef, Type } from '@angular/core';

/**
 * Shorthand for a record of string keys and values of type T.
 */
export type TypedContainer<T> = Record<string, T>;

/**
 * A string indexed object.
 */
export type RecordObject = TypedContainer<unknown>;

/**
 * Function that generates a union type of string literals.
 */
export function stringLiterals<T extends string>(...args: T[]): T[] {
    return args;
}

/**
 * Union type built from a list of string literals.
 */
export type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer ElementType>
    ? ElementType
    : never;

/**
 * Modifies type T with properties from type M.
 */
export type ModdableType<T, M> = Omit<T, Extract<keyof T, keyof M>> & M;

export type WSParams = TypedContainer<unknown>;

export interface MenuItemEventMods {
    item?: MenuItem | MegaMenuItem | WSMenuItem;
    data?: WSParams;
}
    
export type WSMenuItemEvent = ModdableType<Event, MenuItemEventMods>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GeneralFunction<T> = (...args: any[]) => T;

export interface WSMenuItem extends MenuItem {
    customIcon?: NgStyleValues;
    command?: (event: WSMenuItemEvent) => void;
    wsStyle?: NgStyleValues | null;
    styleClass?: string;
    isExpanded?: boolean;
    maxHeight?: string;
}

export type TypedRecord<T> = Record<string, T>;
export type StandardObject = TypedRecord<unknown>;

export interface SelectButtonItem {
    label: string;
    value: string;
}

export type ComponentType = string | Type<unknown> | TemplateRef<unknown>;


export type CssStyleObject = Partial<CSSStyleDeclaration>;

export interface LocalObject {
    readonly LOCAL_ID: string;
}

export type ElementSelector = string | TemplateRef<unknown> | HTMLElement;