import {
    ChangeDetectorRef, Component, Input, ViewChild 
} from '@angular/core';
import {
    LocalObject, 
    RecordObject 
} from '@app/models';
import { Table, TableModule } from 'primeng/table';
import { ColumnDefinition, TableConfig } from '../gdo-table/table-types';
import { CommonModule } from '@angular/common';
import { nanoid } from 'nanoid';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectChangeEvent, MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [
        ButtonModule,
        CommonModule,
        DropdownModule,
        FormsModule,
        InputTextModule,
        MultiSelectModule,
        TableModule,
    ],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss'
})
export class TableComponent implements LocalObject {
    public readonly LOCAL_ID: string = 'table-component' + nanoid();
    // #region public properties

    public selectedRows: RecordObject[] = [];
    
    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters
    get paginatorOptions() {
        return this.tableConfig?.paginatorOptions;
    }

    get useFrozenColumns() {
        return this.tableConfig?.useFrozenColumns;
    }

    get enableResizeColumns() {
        return this.tableConfig?.enableResizeColumns;
    }

    get enableReorderColumns() {
        return this.tableConfig?.enableReorderColumns;
    }

    get dataKey() {
        return this.tableConfig?.dataKey;
    }

    get useSort() {
        return this.tableConfig?.useSort;
    }

    get columnResizeMode() {
        return this.tableConfig?.columnResizeMode;
    }

    get scrollable() {
        return this.tableConfig?.scrollable;
    }

    get selectionMode() {
        return this.tableConfig?.selectionMode;
    }

    get tableStyle() {
        return this.tableConfig?.tableStyle;
    }

    get filterFields() {
        return this.tableConfig?.filterFields;
    }
    
    // #endregion getters/setters
    
    
    // #region standard inputs

    // #endregion standard inputs
    
    
    // #region get/set inputs
    private _columnDefs: ColumnDefinition[] = [];
    @Input()
    get columnDefs() {
        return this._columnDefs;
    }
    set columnDefs(input: ColumnDefinition[]) {
        this._columnDefs = input;
        
    }

    private _rowData?: RecordObject[];
    @Input()
    get rowData() {
        return this._rowData;
    }
    set rowData(input: RecordObject[] | undefined) {
        this._rowData = input;
        this.tableRef?.cd.detectChanges();
    }

    private _tableConfig?: TableConfig;
    @Input()
    get tableConfig() {
        return this._tableConfig;
    }
    set tableConfig(input: TableConfig | undefined) {
        this._tableConfig = input;
        this.columnDefs = input?.columnDefs ?? [];
        this.rowData = input?.rowData ?? [];
        this.cd.detectChanges();
    }
    // #endregion get/set inputs
    
    
    // #region outputs, emitters, and event listeners
    
    // #endregion outputs, emitters, and event listeners
    
    
    // #region viewchildren and contentchildren
    @ViewChild('tableRef') tableRef?: Table;
    
    // #endregion viewchildren and contentchildren
    
    
    // #region constructor and lifecycle hooks
    constructor(
        public cd: ChangeDetectorRef,
    ) {
        
    }

    ngOnInit() {
        const { containerElement } = this.tableConfig ?? {};
        
        if(containerElement) {
            const container: HTMLElement | undefined = typeof containerElement === 'string' ? 
                <HTMLElement>document.querySelector(containerElement) : 
                containerElement;

            if(container) {
                const padding: number = parseInt(getComputedStyle(container).padding);
                const maxWidth: number = container.offsetWidth - padding;
                let maxHeight: number = container.offsetHeight - padding * 2;

                if(this.tableRef) {
                    const tableElement = this.tableRef.el.nativeElement;
                    const dataTableWrapperElement: HTMLElement = tableElement.querySelector('.p-datatable-wrapper') as HTMLElement;

                    if(dataTableWrapperElement) {

                        const paginatorElements: HTMLElement[] = Array.from(tableElement.querySelectorAll('.p-paginator'));
                        paginatorElements.forEach(paginatorElement => {
                            maxHeight -= paginatorElement.offsetHeight;
                        });

                        dataTableWrapperElement.style.maxWidth = `${maxWidth}px`;
                        dataTableWrapperElement.style.maxHeight = `${maxHeight}px`;
                    }
                }
            }
        }
    }
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods
    

    public clear(table: Table) {
        table.clear();
    }

    public filterInput(event: Event) {
        /* if(event.target && this.tableRef) {
            this.tableRef.filterGlobal(event.target, 'contains');
        } */
        if(event instanceof InputEvent) {
            this.tableRef?.filterGlobal((<HTMLInputElement>event.target).value, 'contains');
        }
        
    }

    public filterCategories(event: MultiSelectChangeEvent) {
        if(event.value && this.tableRef) {
            this.tableRef.filter(event.value, 'categories', 'contains');
        }
    }
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}
