import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewChildren } from '@angular/core';
import { ANGULAR_COMMON, ElementComponentsMap, IsTextBlock, PRIME_COMMON, ViewContainerRefDirective } from '@app/common';
import { ComponentClassBase, ComponentConfig, ContainerConfig, ElementConfigBase, ElementModel } from '@app/models';
import { BehaviorSubject } from 'rxjs';
import { TextBlockComponent } from '../../general/_index';
import { ElementRenderService } from '@app/services';

@Component({
    selector: 'gdo-element-renderer',
    standalone: true,
    imports: [
        TextBlockComponent,
        ViewContainerRefDirective,
        ...ANGULAR_COMMON,
        ...PRIME_COMMON
    ],
    templateUrl: './element-renderer.component.html',
    styleUrl: './element-renderer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElementRendererComponent extends ComponentClassBase {

    // #region public properties

    public model$: BehaviorSubject<ElementConfigBase[]> = new BehaviorSubject<ElementConfigBase[]>([]);

    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters
    
    // #endregion getters/setters
    
    
    // #region standard inputs

    private _elements: ComponentConfig[] = [];
    @Input()
    get elements() {
        return this._elements;
    }
    set elements(input: ComponentConfig[]) {
        this._elements = input;
        this.model$.next(input);
    }
    
    private _elementConfig?: ContainerConfig;
    @Input()
    get elementConfig() {
        return this._elementConfig;
    }
    set elementConfig(input: ContainerConfig | undefined) {
        this._elementConfig = input;
        this.config = input;
    }
    
    // #endregion standard inputs
    
    
    // #region get/set inputs
    
    // #endregion get/set inputs
    
    
    // #region outputs, emitters, and event listeners
    
    // #endregion outputs, emitters, and event listeners
    
    
    // #region viewchildren and contentchildren

    @ViewChildren(ViewContainerRefDirective) public viewContainerRefs?: ViewContainerRefDirective[];
    
    // #endregion viewchildren and contentchildren
    
    
    // #region constructor and lifecycle hooks
    constructor(
        public cd: ChangeDetectorRef,
    ) {
        super();
    }

    ngAfterViewInit() {
        const elements = Array.from(this.viewContainerRefs || []);

        const elementModels: ElementModel[] = elements.map((container: ViewContainerRefDirective) => {
            const config = this.elements.find((element: ComponentConfig) => element.id === container.id);
            return { container, config };
        })
            .filter((elementModel: ElementModel) => elementModel.config !== undefined);

        ElementRenderService.RenderElements(elementModels);

        this.cd.detectChanges();
    }
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods
    public isTextBlock = IsTextBlock;
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}

