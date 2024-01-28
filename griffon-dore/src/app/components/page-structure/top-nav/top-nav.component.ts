import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, TemplateRef } from '@angular/core';
import { ANGULAR_COMMON } from '@app/common';
import { NavLogoComponent } from '../nav-logo/nav-logo.component';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { MenuBarComponent } from '@app/components';
import { WSMenuItem } from '@app/models';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
    selector: 'gdo-top-nav',
    standalone: true,
    imports: [
        MenuBarComponent,
        MenubarModule,
        NavLogoComponent,
        ...ANGULAR_COMMON,
    ],
    templateUrl: './top-nav.component.html',
    styleUrl: './top-nav.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopNavComponent {
    // #region public properties
    public model$: BehaviorSubject<WSMenuItem[]> = new BehaviorSubject<WSMenuItem[]>([]);
    
    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters
    
    // #endregion getters/setters
    
    
    // #region standard inputs
    @Input() template: TemplateRef<unknown> | null = null;

    private _model: WSMenuItem[] = [];
    @Input() 
    set model(value: WSMenuItem[]) {
        this._model = value.slice();
        this.model$.next(value);
    }
    get model(): WSMenuItem[] {
        return this._model;
    }
    
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
        this.model = [
            {
                label: 'Test',
                isCollapsed: true,
                items: [
                    {
                        label: 'Test.A',
                        isCollapsed: true,
                        items: [
                            {
                                label: 'Test.A.A',
                                isCollapsed: true,
                                items: [
                                    {
                                        label: 'Test.A.A.A',
                                        isCollapsed: true,
                                    },
                                    {
                                        label: 'Test.A.A.B',
                                        isCollapsed: true,
                                    },
                                    {
                                        label: 'Test.A.A.C',
                                        isCollapsed: true,
                                    },
                                ]
                            },
                            {
                                label: 'Test.A.B',
                                isCollapsed: true,
                            },
                            {
                                label: 'Test.A.C',
                                isCollapsed: true,
                            },
                        ]
    
                    },
                    {
                        label: 'Test.B',
                        isCollapsed: true,
    
                    },
                    {
                        label: 'Test.C',
                        isCollapsed: true,
    
                    },
                ]
            },
            {
                label: 'TestB',
                isCollapsed: true,
                items: [
                    {
                        label: 'TestB.A',
                        isCollapsed: true,
    
                    },
                    {
                        label: 'TestB.B',
                        isCollapsed: true,
    
                    },
                    {
                        label: 'TestB.C',
                        isCollapsed: true,
    
                    },
                ]
            },
            {
                label: 'TestC',
                isCollapsed: true,
                items: [
                    {
                        label: 'TestC.A',
                        isCollapsed: true,
    
                    },
                    {
                        label: 'TestC.B',
                        isCollapsed: true,
    
                    },
                    {
                        label: 'TestC.C',
                        isCollapsed: true,
    
                    },
                ]
            },
        ];
    }
    
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}
