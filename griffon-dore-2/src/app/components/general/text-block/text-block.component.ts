import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { ANGULAR_COMMON, ElementComponentsMap, IsTextBlock } from '@app/common';
import { ComponentClassBase, ComponentConfig, ConfigParser, ElementConfigBase, TextBlockConfig } from '@app/models';


function processTextConfig(this: ComponentClassBase, input: ComponentConfig) {

    if(IsTextBlock(input)) {
        if(input.illuminated && input.content?.length > 0) {
            this.illuminatedChar = input.content.charAt(0);
            this.body = input.content.substring(1);
        }
        else {
            this.body = input.content;
        }
    }
}

@Component({
    selector: 'gdo-text-block',
    standalone: true,
    imports: [
        ...ANGULAR_COMMON
    ],
    templateUrl: './text-block.component.html',
    styleUrl: './text-block.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextBlockComponent extends ComponentClassBase {

    // #region public properties

    public body?: string = '';

    public illuminatedChar?: string;
    
    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters
    
    get illuminated(): boolean {
        return this.config?.elementType === 'text-block' ?
            this.config.illuminated || false :
            false;
    }

    get illuminatedColor(): string {
        return this.config?.elementType === 'text-block' ?
            this.config.illuminatedColor || 'illuminated' :
            'illuminated';
    }

    get illuminatedBorder(): string {
        return this.config?.elementType === 'text-block' ?
            this.config.illuminatedBorder || 'illuminated-border' :
            'illuminated-border';
    }

    // #endregion getters/setters
    
    
    // #region standard inputs
    
    
    // #endregion standard inputs
    
    
    // #region get/set inputs

    // #endregion get/set inputs
    
    
    // #region outputs, emitters, and event listeners
    
    // #endregion outputs, emitters, and event listeners
    
    
    // #region viewchildren and contentchildren
    
    // #endregion viewchildren and contentchildren
    
    
    // #region constructor and lifecycle hooks
    constructor(
        public cd: ChangeDetectorRef,
    ) {
        super(processTextConfig);
    }
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}

ElementComponentsMap.set('text-block', TextBlockComponent);