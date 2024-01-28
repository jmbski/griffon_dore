import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, afterNextRender } from '@angular/core';
import { ANGULAR_COMMON, AppDeviceInfo } from '@app/common';
import { WSMenuItem } from '@app/models';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BehaviorSubject, Observable } from 'rxjs';
import { NgStyleValues } from 'src/app/models/styles';
import { SvgComponent } from '../svg/svg.component';


export interface MenuBarConfig {
    model: WSMenuItem[];

    menuBarClass?: string;
    menuBarStyle?: NgStyleValues;

    menuItemClass?: string;
    menuItemStyle?: NgStyleValues;

    [key: string]: unknown;

}

@Component({
    selector: 'gdo-menu-bar',
    standalone: true,
    imports: [
        CollapseModule,
        SvgComponent,
        ...ANGULAR_COMMON
    ],
    templateUrl: './menu-bar.component.html',
    styleUrl: './menu-bar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuBarComponent {

    // #region public properties
    public model$: BehaviorSubject<WSMenuItem[]> = new BehaviorSubject<WSMenuItem[]>([]);
    
    public activeMenuElement: HTMLElement | null = null;

    public modelElementMap: Map<HTMLElement, WSMenuItem> = new Map<HTMLElement, WSMenuItem>();

    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters
    
    // #endregion getters/setters
    
    
    // #region standard inputs
    
    // #endregion standard inputs
    
    // #region get/set inputs
    private _model: WSMenuItem[] = [];
    @Input()
    get model() {
        return this._model;
    }
    set model(input: WSMenuItem[]) {
        this._model = input;
        this.model$.next(input);
    }
    
    // #endregion get/set inputs
    
    
    // #region outputs, emitters, and event listeners
    
    // #endregion outputs, emitters, and event listeners
    
    
    // #region viewchildren and contentchildren
    
    // #endregion viewchildren and contentchildren
    
    
    // #region constructor and lifecycle hooks
    constructor(
        public cd: ChangeDetectorRef,
        public el: ElementRef,
    ) {
        afterNextRender(() => {
            const element: HTMLElement = this.el.nativeElement;

            const models = this.model;
            const cd = this.cd;
            const gdoMenuItems: HTMLElement[] = Array.from(element.querySelectorAll('.gdo-menubar-item'));

            gdoMenuItems.forEach((gdoMenuItem: HTMLElement, index: number) => {
                this.modelElementMap.set(gdoMenuItem, models[index]);
            });

            /* const { isDesktop, isMobile, isTablet } = AppDeviceInfo;
            console.log(AppDeviceInfo); */
            //if(isDesktop) {
            gdoMenuItems.forEach((gdoMenuItem: HTMLElement, index: number) => {
                const model = models[index];
                    
                gdoMenuItem.addEventListener('mouseenter', () => {
                    model.isCollapsed = false;
                    cd.detectChanges();
                });
    
                gdoMenuItem.addEventListener('mouseleave', () => {
                    model.isCollapsed = true;
                    cd.detectChanges();
                });
            });
            //}

            document.body.addEventListener('touchstart', (event: TouchEvent) => {
                const menuRootElement = (<HTMLElement>event.target).closest('.gdo-menubar-item');
                if(!menuRootElement) {

                    if(this.activeMenuElement) {
                        const activeModel = this.modelElementMap.get(this.activeMenuElement);
                        if(activeModel) {
                            activeModel.isCollapsed = true;
                            cd.detectChanges();
                        }
                    }
                    return;
                }
                if(menuRootElement instanceof HTMLElement) {
                    const model = this.modelElementMap.get(menuRootElement);
                    if(model) {
                        if(menuRootElement !== this.activeMenuElement) {
                            if(this.activeMenuElement) {
                                const activeModel = this.modelElementMap.get(this.activeMenuElement);
                                if(activeModel) {
                                    activeModel.isCollapsed = true;
                                    cd.detectChanges();
                                }
                            }
                            this.activeMenuElement = menuRootElement;
                            //model.isCollapsed = false;
                        }
                    }
                }
            });
            
        });
    }
    
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}
