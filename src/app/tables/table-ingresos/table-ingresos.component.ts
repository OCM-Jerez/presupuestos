import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AgGridAngular } from 'ag-grid-angular';

import { ColumnApi, ColumnState, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community/main';

import localeTextESPes from '../../../assets/data/localeTextESPes.json';
import { CellRendererOCM, CellRendererOCMtext } from '../../ag-grid/CellRendererOCM';
// import { CellRendererOCM1, CellRendererOCMtext1 } from '../../ag-grid/CellRendererOCM1'
// import { headerHeightGetter } from '../../ag-grid/headerHeightGetter';

import { AvalaibleYearsService } from '../../services/avalaibleYears.service';
import { DataStoreService } from '../../services/dataStore.service';
import { HasDataChangeService } from '../../services/hasDataChange.service';
import { PrepareDataTreemapService } from '../../services/prepareDataTreemap.service';
import { TableService } from '../../services/table.service';

import { IDataTable } from '../../commons/interfaces/dataTable.interface';

import { CLASIFICATION_TYPE } from '../../commons/util/util';
import { ChangeSubTabService } from '../../services/change-subtab.service';
import { getClasificacion } from '../data-table';

@Component({
    selector: 'app-table-ingresos',
    templateUrl: './table-ingresos.component.html',
    styleUrls: ['./table-ingresos.component.scss'],
})
export class TableIngresosComponent implements OnInit {
    @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
    @Output() clickDetail = new EventEmitter();
    @Output() clickDetalle: EventEmitter<void> = new EventEmitter();
    @Input() fieldsHide: string[] = [];
    @Input() cellRenderer: boolean;

    private _gridApi: GridApi;
    private _columnApi: ColumnApi;
    private _columnDefs: any[];
    private _cellRenderer: string = '';
    private _dataTable: IDataTable;

    public showTable = false;
    // messageYears = this.avalaibleYearsService.message;
    public gridOptions: GridOptions;
    public textButton: string;
    public seletedCapitulos: boolean = false;
    public seletedArticulo: boolean = false;
    public seletedConcepto: boolean = false;
    public seletedEconomico: boolean = true;
    public isDisabled = true;

    constructor(
        private _avalaibleYearsService: AvalaibleYearsService,
        private _dataStoreService: DataStoreService,
        private _hasDataChangeService: HasDataChangeService,
        private _prepareDataTreemapService: PrepareDataTreemapService,
        private _router: Router,
        private _tableService: TableService,
        private _changeSubTabService: ChangeSubTabService
    ) {}

    async ngOnInit(): Promise<void> {
        this._dataTable = await this._tableService.loadData('ingresosEconomicaEconomicos');
        this._loadPropertyTable();
        this._cellRenderer = this.cellRenderer ? 'CellRendererOCM' : 'CellRendererOCMtext1';
        this.showTable = true;
        this._changeSubTabService.changeSubTab('CodEco', 'DesEco');
    }

    private _loadPropertyTable() {
        this.isDisabled = true;
        // this._dataTable = this._dataStoreService.dataTable;

        this._columnDefs = [
            {
                headerName: this._dataTable.dataPropertyTable.headerName,
                children: [
                    {
                        headerName: this._dataTable.dataPropertyTable.subHeaderName,
                        field: this._dataTable.dataPropertyTable.codField,
                        // width: this._dataTable.dataPropertyTable.width,
                        width: 750,
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
                return {
                    headerName: year,
                    children: this.createColumnsChildren(year),
                };
            }),
        ];

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

            // PROPERTIES - object properties, myRowData and myColDefs are created somewhere in your application
            rowData: this._dataTable.rowDataIngresos,
            columnDefs: this._columnDefs,
            groupDisplayType: 'custom',
            groupIncludeTotalFooter: true,
            groupIncludeFooter: true,
            groupHeaderHeight: 25,
            headerHeight: 40,
            suppressAggFuncInHeader: true,
            rowSelection: 'single',
            localeText: localeTextESPes,
            pagination: true,
            paginationPageSize: 20,

            // EVENTS - add event callback handlers
            // onGridReady: function (event) { consoltextButtone.log('the grid is now ready'); },
            onRowClicked: () => {
                this.textButton = 'Mostrar gráfico';
                this.isDisabled = false;
                // this.showGraph();
            },
        } as GridOptions;

        this.textButton = `Selecciona ${this._dataTable.dataPropertyTable.subHeaderName} para mostrar gráfico`;
    }

    // Store the api for later use.
    // No lo uso en este componente pero si quisiese hacer alguna llamada a las API
    // este codigo es necesario.

    onGridReady = (params: GridReadyEvent) => {
        this._gridApi = params.api;
        this._columnApi = params.columnApi;

        let defaultSortModel: ColumnState[] = [
            {
                colId: this._dataTable.dataPropertyTable.codField,
                sort: 'asc',
                sortIndex: 0,
            },
        ];
        params.columnApi.applyColumnState({ state: defaultSortModel });

        this._hideColumns();
    };

    // TODO: Las colummnas disparan su altura
    // headerHeightSetter() {
    // let padding = 20;
    // let height = headerHeightGetter(1) + padding;
    // this.GridApi.setHeaderHeight(height);
    // this.GridApi.resetRowHeights();
    // }

    createColumnsChildren(year: number) {
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

    private _hideColumns() {
        if (this.fieldsHide.length > 0) {
            const year = this._avalaibleYearsService.yearsSelected[0];
            const columnsHide = this.fieldsHide.map((item) => {
                return { colId: `${item}${year}`, hide: true };
            });
            this._columnApi!.applyColumnState({
                state: columnsHide,
            });
        }
    }

    showGraph() {
        const selectedRows = this.agGrid.api.getSelectedNodes();
        this._dataStoreService.selectedCodeRow = selectedRows[0].key;
        this._router.navigateByUrl('/graphIngresos').then(() => {
            this._dataStoreService.setData({
                ...this._dataStoreService.dataGraph,
                graphSubTitle: selectedRows[0].key,
            });
        });
    }

    async detalle(typeClasification: CLASIFICATION_TYPE) {
        this.seletedCapitulos = false;
        this.seletedArticulo = false;
        this.seletedConcepto = false;
        this.seletedEconomico = false;

        switch (typeClasification) {
            case 'ingresosEconomicaCapitulos':
                this.seletedCapitulos = true;
                break;
            case 'ingresosEconomicaArticulos':
                this.seletedArticulo = true;
                break;
            case 'ingresosEconomicaConceptos':
                this.seletedConcepto = true;
                break;
            case 'ingresosEconomicaEconomicos':
                this.seletedEconomico = true;
                break;
        }

        // this.clickDetalle.emit();
        this._dataStoreService.IsDetails = true;
        const selectedRows = this.agGrid.api.getSelectedNodes();
        const dataPropertyTable = getClasificacion(typeClasification);
        // console.log('dataPropertyTable', dataPropertyTable);

        if (selectedRows.length > 0) {
            this._dataStoreService.selectedCodeRowFirstLevel = selectedRows[0].key;
            const useStarWitch: boolean = dataPropertyTable.useStarWitch;
            const attribute: string = dataPropertyTable.attribute;
            this._dataTable = await this._tableService.loadData(
                // true,
                typeClasification,
                {
                    valueFilter: this._dataStoreService.selectedCodeRowFirstLevel.split(' ')[0],
                    attribute,
                    useStarWitch,
                }
            );
        } else {
            this._dataTable = await this._tableService.loadData(
                // true,
                typeClasification
            );
            // this._alertService.showAlert(`Selecciona artículo`);
        }

        this._dataStoreService.selectedCodeRowFirstLevel = '';

        // console.log('Actualizo datos treemap en función del boton pulsado');
        // await this._prepareDataTreemapService.calcSeries(
        //     this._dataTable.rowDataIngresos,
        //     getClasificacion(this._dataTable.clasificationType).codField,
        //     getClasificacion(this._dataTable.clasificationType).desField,
        //     'Definitivas2023'
        // );

        // this._hasDataChangeService.change(false);
        // setTimeout(() => {
        //     this._hasDataChangeService.change(true);
        // }, 5);

        this.showTable = false;
        setTimeout(() => {
            this._loadPropertyTable();
            this.showTable = true;
            this._changeSubTabService.changeSubTab(dataPropertyTable.codField, dataPropertyTable.desField);
        }, 500);
    }
}
