import { MegaMenuItem, MenuItem } from 'primeng/api';
import { NgStyleValues } from './styles';


export interface TypedContainer<T> {
    [key: string]: T;
}

export type StandardObject = TypedContainer<unknown>;

export function stringLiterals<T extends string>(...args: T[]): T[] {
    return args;
}

export type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer ElementType>
    ? ElementType
    : never;

export type ModdableType<T, M> = Omit<T, Extract<keyof T, keyof M>> & M;

export type WSParams = TypedContainer<unknown>;

export interface MenuItemEventMods {
    item?: MenuItem | MegaMenuItem | WSMenuItem;
    data?: WSParams;
}
    
export type WSMenuItemEvent = ModdableType<Event, MenuItemEventMods>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WSFunction<T> = (...args: any[]) => T;

export interface WSMenuItem extends MenuItem {
    customIcon?: NgStyleValues;
    command?: (event: WSMenuItemEvent) => void;
    wsStyle?: NgStyleValues | null;
    styleClass?: string;
    isCollapsed: boolean;
}