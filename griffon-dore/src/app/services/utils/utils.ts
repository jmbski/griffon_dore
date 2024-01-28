import { Injectable } from '@angular/core';
import { StandardObject, WSMenuItem } from '@app/models';

@Injectable({
    providedIn: 'root',
})
export class Utils {

    public static HandleError(error?: Error | unknown, funcName?: string, additional?: string) {
        let errorMessage: string = 'CAUGHT ERROR:\n';
        errorMessage += funcName ? `At function ${funcName}\n` : '';
        errorMessage += additional ? `Additional Information: ${additional}\n` : '';
        errorMessage += error ? `Logged error object: ${error}\n` : '';

        console.error(errorMessage);
    }

    /**
     * Retrieves the command function from a menu item, or a default function that logs the event to the console.
     * 
     * @todo improve typing for the event and function
     * 
     * @param {WSMenuItem} input - The value of the menu item to get the command from
     * @returns the command function of the menu item, or a default function that logs the event to the console
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static getCommand(input: WSMenuItem): (event: any) => void {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let command: (event: any) => void = (event: any) => {
            console.log(event);
        };
        if (input?.command) {
            command = input.command;
        }
        return command;
    }

    /**
     * Converts a string dimensional value to a number representing pixels.
     * 
     * @param input - Value to convert
     * @returns 
     */
    public static stringToPx(input: string): number {
        let num: number = parseFloat(input);
        if (!isNaN(num)) {
            num *= input.endsWith('em') ? 16 : 1;
        }
        return num;
    }
    
    /**
     * Checks if the input is a string indexed object.
     * 
     * @param input- The value to check if it is a string indexed object
     * @returns true if the input is a string indexed object, false otherwise
     */
    public static IsStringIndexedObject(input: unknown): input is StandardObject {
        return typeof input === 'object' && input != null && !Array.isArray(input) && Object.keys(input).every(key => typeof key === 'string');
    }

    /**
     * Checks if the input is numeric.
     * 
     * @param input - The value to check if it is numeric
     * @returns true if the input is numeric, false otherwise 
     */
    public static isNumeric(input: unknown): boolean {
        if(typeof input === 'number') {
            return true;
        }
        if(typeof input === 'string') {
            return !isNaN(parseFloat(input));
        }
        return false;
    }

    /**
     * Retrieves an element from the DOM, either by the element itself or by a query selector string. If the element is not found, 
     * it returns undefined. If the parentElement is not provided, it defaults to the document body.
     * 
     * @param element {HTMLElement | string} - The element to retrieve, or a query selector string to find the element
     * @param parentElement {HTMLElement | string | null} - The parent element to search for the element in, or a query selector 
     *      string to find the parent element
     * @returns - The provided element if it is an HTMLElement, an element from the DOM if it is a query selector string, or
     *      undefined if the element is not found
     */
    public static retrieveElement(element?: HTMLElement | string, parentElement?: HTMLElement | string | null): HTMLElement | undefined {
        /** @todo: update this to be able to retrieve specifically HTMLElements or SVGElements */

        let result: HTMLElement | undefined = undefined;

        if(parentElement && typeof parentElement === 'string') {
            const _parentElement = document.querySelector(parentElement) as HTMLElement;
            if(_parentElement instanceof HTMLElement) {
                parentElement = _parentElement;
            }
        }

        if(!parentElement || !(parentElement instanceof HTMLElement)) {
            parentElement = document.body;
        }

        if (typeof element === 'string') {
            const foundElement = parentElement.querySelector(element);

            if(foundElement instanceof HTMLElement) {
                result = foundElement;
            }
        }
        else if (element instanceof HTMLElement) {
            result = element;
        }

        return result;
    }
    

}