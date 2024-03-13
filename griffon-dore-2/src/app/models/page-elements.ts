import { ViewContainerRefDirective } from '@app/common';
import { RecordObject } from './general';
import { TextBlockComponent } from '@app/components';

/**
 * Represents an element to render on a page
 */
export interface ElementConfigBase {

    /**
     * The type of element to render
     */
    readonly elementType: string; // @todo: add type/enum later

    /**
     * The id of the element
     */
    id: string;

    /**
     * The content to render in the element
     */
    content?: unknown;

    /**
     * The style to apply to the element
     */
    style?: string;
    
    /**
     * The style class to apply to the element
     */
    styleClass?: string;

    /**
     * The options to apply to the element
     */
    options?: RecordObject;

    /**
     * The children of the element
     */
    children?: ElementConfigBase[];

    /**
     * Styleclasses to use for the layout of the element
     */
    layoutClass?: string;

    /**
     * Style to use for the layout of the element
     */
    layoutStyle?: string;

    [key: string]: unknown;
}

/**
 * Represents a block of text meant to be rendered as an illuminated text block.
 */
export interface TextBlockConfig extends ElementConfigBase {
    readonly elementType: 'text-block';
    content: string;
    illuminated?: boolean;
    illuminatedColor?: string;
    illuminatedBorder?: string;

    [key: string]: unknown;
}

export interface ContainerConfig extends ElementConfigBase {
    readonly elementType: 'container';
    elements: ElementConfigBase[];
}

export type ComponentConfig = TextBlockConfig | ContainerConfig;

export class ComponentClassBase {
    // config?: ComponentConfig;
    private _config?: ComponentConfig;
    get config() {
        return this._config;
    }
    set config(input: ComponentConfig | undefined) {
        this._config = input;
        if(input && this.parseConfig) {
            this.parseConfig(input);
        }
    }

    [key: string]: unknown;

    constructor(parser?: ConfigParser) {
        this.parseConfig = parser?.bind(this) ?? DefaultConfigParser.bind(this);
    }

    parseConfig?: (config: ComponentConfig) => void;
}

export type ConfigParser = (this: ComponentClassBase, config: ComponentConfig) => void;

export function DefaultConfigParser(this: ComponentClassBase, config: ComponentConfig): void {
    Object.keys(config).forEach(key => {
        if(Object.hasOwn(this, key)) {
            this[key] = config[key];
        }
    });
}
export interface ElementModel {
    container: ViewContainerRefDirective;
    config?: ComponentConfig;
}