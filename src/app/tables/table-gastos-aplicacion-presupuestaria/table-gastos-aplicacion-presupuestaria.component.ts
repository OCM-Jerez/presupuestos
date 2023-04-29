import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions, GridReadyEvent } from 'ag-grid-community/main';

import { CellRendererOCM } from '@ag-grid/CellRendererOCM';
import localeTextESPes from '@assets/data/localeTextESPes.json';

import { AlertService } from '@services/alert.service';
import { AvalaibleYearsService } from '@services/avalaibleYears.service';
import { DataStoreService } from '@services/dataStore.service';

import { IDataGraph } from '@interfaces/dataGraph.interface';
import { PrepareDataGastosService } from '@services/prepareDataGastos.service';

@Component({
    selector: 'app-table-gastos-aplicacion-presupuestaria',
    templateUrl: './table-gastos-aplicacion-presupuestaria.component.html',
    styleUrls: ['./table-gastos-aplicacion-presupuestaria.component.scss'],
})
export class TableGastosAplicacionPresupuestariaComponent {
    @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
    public gridOptions: GridOptions;
    public rowData: any;
    private _columnDefs: any[];
    data: any[] = [];

    constructor(
        public avalaibleYearsService: AvalaibleYearsService,
        private _router: Router,
        private _dataStoreService: DataStoreService,
        // private _prepareDataProgramaDetailsService: PrepareDataProgramaDetailsService,
        private _prepareDataGastosService: PrepareDataGastosService,
        private _location: Location,
        private _alertService: AlertService
    ) {
        this._columnDefs = [
            {
                headerName: 'Clasificado por aplicación presupuestaria',
                children: [
                    {
                        headerName: 'Aplicación presupuestaria',
                        field: 'DesOrg',
                        filter: false,
                        width: 700,
                        pinned: 'left',
                        columnGroupShow: 'close',
                        cellRenderer: '',
                        valueGetter: (params) => {
                            if (params.data) {
                                return (
                                    params.data.CodOrg +
                                    '-' +
                                    params.data.CodPro +
                                    '-' +
                                    params.data.CodEco +
                                    '  ' +
                                    params.data.DesOrg +
                                    ' - ' +
                                    params.data.DesPro +
                                    ' - ' +
                                    params.data.DesEco
                                );
                            } else {
                                return null;
                            }
                        },
                    },
                ],
            },

            ...this.avalaibleYearsService.getYearsSelected().map((year) => {
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

            columnDefs: this._columnDefs,
            groupDisplayType: 'custom',
            groupIncludeTotalFooter: true,
            groupIncludeFooter: true,
            groupHeaderHeight: 25,
            headerHeight: 36,
            suppressAggFuncInHeader: true,
            rowSelection: 'single',
            localeText: localeTextESPes,
            pagination: false,
        } as GridOptions;
    }

    async onGridReady(params: GridReadyEvent) {
        // this.rowData = await this._prepareDataProgramaDetailsService.getDataAllYear();
        this.rowData = await this._prepareDataGastosService.getDataAllYear();
        let selectedRow = this._dataStoreService.selectedCodeRow;
        this.rowData = this.rowData
            .filter((x) => x.CodOrg == selectedRow.split('-')[0])
            .filter((x) => x.CodPro == selectedRow.split('-')[1])
            .filter((x) => x.CodEco == selectedRow.split('-')[2]);

        let value = {};
        Object.entries(this.rowData).forEach((currentValue) => {
            value = { ...value, ...this.rowData[currentValue[0]] };
        });
        this.data.push(value);
        this.rowData = this.data;
    }

    createColumnsChildren(year: number) {
        return [
            {
                headerName: 'Créditos',
                children: [
                    {
                        headerName: 'Previsiones Iniciales',
                        field: `Iniciales${year}`,
                        columnGroupShow: 'close',
                    },
                    {
                        headerName: 'Total Modificaciones',
                        field: `Modificaciones${year}`,
                        width: 140,
                        columnGroupShow: 'close',
                    },
                    {
                        headerName: 'Creditos definitivos',
                        field: `Definitivas${year}`,
                        width: 140,
                        columnGroupShow: 'close',
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
                        columnGroupShow: 'close',
                    },
                    {
                        headerName: 'Obligaciones reconocidas netas',
                        field: `ObligacionesReconocidasNetas${year}`,
                        width: 135,
                        columnGroupShow: 'close',
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

    showGraph() {
        this.agGrid.api.getRowNode('0').setSelected(true);
        const selectedRows = this.agGrid.api.getSelectedNodes();
        if (selectedRows.length > 0) {
            const sendData: IDataGraph = {
                clasificationType: 'aplicacion',
                rowDataGastos: this.data,
                rowDataIngresos: [],
                graphTitle: 'Gasto por aplicación presupuestaria',
                graphSubTitle:
                    selectedRows[0].data.CodOrg +
                    '-' +
                    selectedRows[0].data.CodPro +
                    '-' +
                    selectedRows[0].data.CodEco +
                    '  ' +
                    selectedRows[0].data.DesOrg +
                    '-' +
                    selectedRows[0].data.DesPro +
                    '-' +
                    selectedRows[0].data.DesEco,
            };
            // Uso el setter
            // this._dataStoreService.setDataGraph = sendData;
            this._dataStoreService.dataGraph = sendData;
            this._router.navigateByUrl('/graphGastos').then(() => {
                this._dataStoreService.setData(sendData);
            });
        } else {
            this._alertService.showAlert('Selecciona una aplicación presupuestaria');
        }
    }

    volver() {
        this._location.back();
    }
}
