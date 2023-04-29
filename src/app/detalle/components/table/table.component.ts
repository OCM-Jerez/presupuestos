import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

import { AgGridAngular } from 'ag-grid-angular';
import { ColumnApi, ColumnState, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community/main';

import { CellRendererOCM, CellRendererOCMtext } from '@ag-grid/CellRendererOCM';
import localeTextESPes from '@assets/data/localeTextESPes.json';

import { AvalaibleYearsService } from '@services/avalaibleYears.service';
import { DataStoreService } from '@services/dataStore.service';
import { HasRowClicked } from '@services/hasRowClicked.service';

import { IDataTable } from '@interfaces/dataTable.interface';
import { SelectedTabService } from '@services/selectedTab.service';
import { TableService } from '@services/table.service';
import { Subject } from 'rxjs';
import { CLASIFICATION_TYPE } from '../../../commons/types/clasification.type';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges {
    @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
    gridOptions: GridOptions;
    private _gridApi: GridApi;
    private _columnApi: ColumnApi;
    private _columnDefs: any[];
    private _dataTable: IDataTable;
    private _subHeaderName: string = '';
    private _isIngreso: boolean = true;
    private _tabSelected: any;
    private _unsubscribe$ = new Subject<void>();

    constructor(
        private _tableService: TableService,
        private _avalaibleYearsService: AvalaibleYearsService,
        private _dataStoreService: DataStoreService,
        private _hasRowClicked: HasRowClicked,
        private _selectedTabService: SelectedTabService
    ) {}

    async ngOnChanges(changes: SimpleChanges): Promise<void> {
        const ingresosClasificaciones: CLASIFICATION_TYPE[] = [
            'ingresosEconomicaEconomicos',
            'ingresosEconomicaConceptos',
            'ingresosEconomicaArticulos',
            'ingresosEconomicaCapitulos',
        ];

        this._dataTable = await this._tableService.loadData(this._tabSelected);
        console.log('this._dataTable', this._dataTable);

        console.log('this._dataTable.clasificationType', this._dataTable);
        if (ingresosClasificaciones.includes(this._dataTable.clasificationType)) {
            this._isIngreso = true;
        } else {
            this._isIngreso = false;
        }

        if (changes && changes['dataTable']) {
            this._loadTable();
            if (!changes['dataTable'].firstChange) {
                if (this._isIngreso) {
                    this._gridApi.setRowData(this._dataTable.rowDataIngresos);
                } else {
                    this._gridApi.setRowData(this._dataTable.rowDataGastos);
                }
            }
        }
    }

    async ngOnInit(): Promise<void> {
        this._dataTable = await this._dataStoreService.dataTable;
        console.log('this._dataTable', this._dataTable);
        await this._loadTable();

        this._hasRowClicked.change(null);
    }

    ngOnDestroy() {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }

    private async _loadTable() {
        // console.log('this._dataTable', this._dataTable.dataPropertyTable);

        this._subHeaderName = this._dataTable.dataPropertyTable.subHeaderName;
        this.setColumnDefs();

        if (this._isIngreso) {
            this.setGridOptionsIngresos();
        } else {
            this.setGridOptions();
        }
    }

    setColumnDefs() {
        this._columnDefs = [
            {
                headerName: this._dataTable.dataPropertyTable.headerName,
                children: [
                    {
                        headerName: this._subHeaderName,
                        field: this._dataTable.dataPropertyTable.codField,
                        // width: this._dataTable.dataPropertyTable.width,
                        width: 550,
                        rowGroup: true,
                        showRowGroup: this._dataTable.dataPropertyTable.codField,
                        cellRenderer: CellRendererOCMtext,
                        valueGetter: (params) => {
                            if (params.data) {
                                return (
                                    params.data[this._dataTable.dataPropertyTable.codField] +
                                    ' - ' +
                                    params.data[this._dataTable.dataPropertyTable.desField]
                                );
                            } else {
                                return null;
                            }
                        },
                    },
                ],
            },

            ...this._avalaibleYearsService.getYearsSelected().map((year) => {
                let children = this._createColumnsChildren(year);
                if (this._isIngreso) {
                    let children = this._createColumnsChildrenIngresos(year);
                }

                return {
                    headerName: year,
                    children: children,
                };
            }),
        ];
    }

    setGridOptions() {
        this.gridOptions = {
            defaultColDef: {
                width: 130,
                sortable: true,
                resizable: true,
                filter: true,
                aggFunc: 'sum',
                cellRenderer: CellRendererOCM,
                headerComponentParams: {
                    template:
                        '<div class="ag-cell-label-container" role="presentation">' +
                        '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button" ></span>' +
                        '  <div ref="eLabel" class="ag-header-cell-label" role="presentation" >' +
                        '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
                        '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
                        '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
                        '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
                        '    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
                        '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
                        '  </div>' +
                        '</div>',
                },
            },
            rowData: this._dataTable.rowDataGastos,
            columnDefs: this._columnDefs,
            groupDisplayType: 'custom',
            groupIncludeTotalFooter: true,
            groupIncludeFooter: true,
            groupHeaderHeight: 25,
            headerHeight: 54,
            suppressAggFuncInHeader: true,
            rowSelection: 'single',
            localeText: localeTextESPes,
            pagination: true,
            paginationPageSize: 20,
            onRowClicked: () => {
                const selectedRows = this.agGrid.api.getSelectedNodes();
                this._dataStoreService.selectedCodeRowFirstLevel = selectedRows[0].key;
                this._hasRowClicked.change(selectedRows[0].key);
            },
        } as GridOptions;
    }

    setGridOptionsIngresos() {
        this.gridOptions = {
            defaultColDef: {
                width: 130,
                sortable: true,
                resizable: true,
                filter: true,
                aggFunc: 'sum',
                cellRenderer: CellRendererOCM,
                headerComponentParams: {
                    template:
                        '<div class="ag-cell-label-container" role="presentation">' +
                        '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button" ></span>' +
                        '  <div ref="eLabel" class="ag-header-cell-label" role="presentation" >' +
                        '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
                        '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
                        '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
                        '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
                        '    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
                        '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
                        '  </div>' +
                        '</div>',
                },
            },
            rowData: this._dataTable.rowDataIngresos,
            columnDefs: this._columnDefs,
            groupDisplayType: 'custom',
            groupIncludeTotalFooter: true,
            groupIncludeFooter: true,
            groupHeaderHeight: 25,
            headerHeight: 54,
            suppressAggFuncInHeader: true,
            rowSelection: 'single',
            localeText: localeTextESPes,
            pagination: true,
            paginationPageSize: 20,
            onRowClicked: () => {
                const selectedRows = this.agGrid.api.getSelectedNodes();
                this._dataStoreService.selectedCodeRowFirstLevel = selectedRows[0].key;
                this._hasRowClicked.change(selectedRows[0].key);
            },
        } as GridOptions;
    }

    private _createColumnsChildren(year: number) {
        return [
            {
                headerName: 'Créditos',
                children: [
                    {
                        headerName: 'Previsiones Iniciales',
                        field: `Iniciales${year}`,
                        columnGroupShow: 'open',
                    },
                    {
                        headerName: 'Total Modificaciones',
                        field: `Modificaciones${year}`,
                        width: 140,
                        columnGroupShow: 'open',
                    },
                    {
                        headerName: 'Creditos definitivos',
                        field: `Definitivas${year}`,
                        width: 140,
                        columnGroupShow: 'close',
                        sort: 'desc',
                    },
                ],
            },
            {
                headerName: 'Gastos',
                children: [
                    {
                        headerName: 'Gastos Comprometidos',
                        field: `GastosComprometidos${year}`,
                        width: 140,
                        columnGroupShow: 'open',
                    },
                    {
                        headerName: 'Obligaciones reconocidas netas',
                        field: `ObligacionesReconocidasNetas${year}`,
                        width: 135,
                        columnGroupShow: 'open',
                    },
                    {
                        headerName: 'Pagos',
                        field: `Pagos${year}`,
                        columnGroupShow: 'close',
                    },
                    {
                        headerName: 'Obligaciones pendientes de pago al final periodo',
                        field: `ObligacionesPendientePago${year}`,
                        width: 120,
                        columnGroupShow: 'close',
                    },
                ],
            },
            {
                headerName: 'Remanente Credito',
                field: `RemanenteCredito${year}`,
            },
        ];
    }
    private _createColumnsChildrenIngresos(year: number) {
        return [
            {
                headerName: 'Créditos',
                children: [
                    {
                        headerName: 'Previsiones iniciales',
                        field: `Iniciales${year}`,
                        columnGroupShow: 'open',
                    },
                    {
                        headerName: 'Total modificaciones',
                        field: `Modificaciones${year}`,
                        columnGroupShow: 'open',
                    },
                    {
                        headerName: 'Previsiones definitivas',
                        field: `Definitivas${year}`,
                        columnGroupShow: 'close',
                        sort: 'desc',
                    },
                ],
            },

            {
                headerName: 'Derechos',
                children: [
                    {
                        headerName: 'Reconocidos netos',
                        field: `DerechosReconocidos${year}`,
                        columnGroupShow: 'open',
                    },
                    {
                        headerName: 'Anulados',
                        field: `DerechosAnulados${year}`,
                        columnGroupShow: 'open',
                    },
                    {
                        headerName: 'Cancelados',
                        field: `DerechosCancelados${year}`,
                        columnGroupShow: 'open',
                    },
                    {
                        headerName: 'Recaudados',
                        field: `DerechosReconocidosNetos${year}`,
                        columnGroupShow: 'open',
                    },
                    {
                        headerName: 'Recaudación neta',
                        field: `RecaudacionNeta${year}`,
                        columnGroupShow: 'close',
                    },
                    {
                        headerName: 'Pendientes de cobro al final del periodo',
                        field: `DerechosPendienteCobro${year}`,
                        columnGroupShow: 'open',
                    },
                ],
            },
            {
                headerName: 'Exceso o defecto previsión',
                field: `DiferenciaPrevision${year}`,
            },
        ];
    }

    onGridReady = (params: GridReadyEvent) => {
        this._gridApi = params.api;
        this._columnApi = params.columnApi;

        const defaultSortModel: ColumnState[] = [
            {
                colId: this._dataTable.dataPropertyTable.codField,
                sort: 'asc',
                sortIndex: 0,
            },
        ];
        params.columnApi.applyColumnState({ state: defaultSortModel });
    };
}
