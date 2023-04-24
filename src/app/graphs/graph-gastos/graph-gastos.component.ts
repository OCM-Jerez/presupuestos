import { Location } from '@angular/common';
import { Component, OnDestroy, ViewChild } from '@angular/core';

import { Subscription } from 'rxjs';

import { AgChartOptions } from 'ag-charts-community';
import { AgGridAngular } from 'ag-grid-angular';

import { CellRendererOCM } from '../../ag-grid/CellRendererOCM';

import { DataStoreService } from '../../services/dataStore.service';
import { HasRowClicked } from '../../services/hasRowClicked.service';

import { accumulate } from '../../commons/util/util';

import { IDataGraph } from '../../commons/interfaces/dataGraph.interface';

@Component({
    selector: 'app-graph-gastos',
    templateUrl: './graph-gastos.component.html',
    styleUrls: ['./graph-gastos.component.scss'],
})
export class GraphGastosComponent implements OnDestroy {
    @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
    public data: any;
    public columnDefs;
    public defaultColDef;
    public localeText;
    public groupHeaderHeight = 25;
    public headerHeight = 25;
    public options: AgChartOptions;
    private _datos: any[] = [];
    private _dataGraph: IDataGraph;
    private _subscription: Subscription;
    private _hasRowClicked$ = this._hasRowClicked.currentHasRowClicked;
    private _row: string = '';

    constructor(
        private _location: Location,
        private _dataStoreService: DataStoreService,
        private _hasRowClicked: HasRowClicked
    ) {
        this._subscription = this._dataStoreService.dataSource$.subscribe((data) => {
            this._dataGraph = data;
            this._createData();
            this._createColumns();
            this._showGraph();
        });
    }

    ngOnDestroy(): void {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
    }

    private async _createData() {
        console.log('this._dataGraph', this._dataGraph);
        if (this._dataGraph.clasificationType != 'aplicacion') {
            this._hasRowClicked$.subscribe((value) => {
                this._row = value;
            });
            const codigo = this._row.split(' ')[0];
            console.log('codigo', codigo);
            console.log('this._dataGraph.clasificationType', this._dataGraph.clasificationType);

            switch (this._dataGraph.clasificationType) {
                case 'gastosOrganicaOrganicos':
                    this._datos = this._dataGraph.rowDataGastos.filter((x) => x.CodOrg == codigo);
                    break;
                case 'gastosProgramaAreas':
                case 'gastosProgramaPoliticas':
                case 'gastosProgramaGrupos':
                case 'gastosProgramaProgramas':
                    console.log('this._dataGraph.rowDataGastos', this._dataGraph.rowDataGastos);
                    this._datos = this._dataGraph.rowDataGastos.filter((x) => x.CodPro == codigo);
                    console.log('this._datos', this._datos);
                    break;
                case 'gastosEconomicaCapitulos':
                    this._datos = this._dataGraph.rowDataGastos.filter((x) => x.CodCap == codigo);
                    break;
                case 'gastosEconomicaArticulos':
                case 'gastosEconomicaConceptos':
                case 'gastosEconomicaEconomicos':
                    this._datos = this._dataGraph.rowDataGastos.filter((x) => x.CodEco == codigo);
                    break;
            }
        } else {
            this._datos = this._dataGraph.rowDataGastos;
        }
        const yearsIniciales = accumulate('Iniciales', this._datos);
        const yearsDefinitivas = accumulate('Definitivas', this._datos);
        const yearsObligacionesNetas = accumulate('ObligacionesReconocidasNetas', this._datos);
        const yearsObligacionesPendientes = accumulate('ObligacionesPendientePago', this._datos);

        this.data = [];
        for (let index = 2015; index <= 2023; index++) {
            // Para mostrar solo años seleccionados
            if (yearsDefinitivas[index] > 0) {
                const value = {
                    year: index,
                    Definitivas: yearsDefinitivas[index],
                    ObligacionesReconocidasNetas: yearsObligacionesNetas[index],
                    ObligacionesPendientes: yearsObligacionesPendientes[index],
                };
                if (index === 2023) {
                    value.Definitivas = yearsIniciales[index]; // Se usan las iniciales ya que es el unico dato que existe.
                }
                this.data.push(value);
            }
        }
        return this.data;
    }

    private _createColumns(): void {
        this.columnDefs = [
            {
                headerName: 'Año',
                field: 'year',
                width: 70,
            },
            {
                headerName: 'Previsiones definitivas',
                field: 'Definitivas',
                width: 180,
                aggFunc: 'sum',
                cellRenderer: CellRendererOCM,
            },
            {
                headerName: 'ObligacionesReconocidasNetas',
                field: 'ObligacionesReconocidasNetas',
                width: 200,
                aggFunc: 'sum',
                cellRenderer: CellRendererOCM,
            },
            {
                headerName: 'ObligacionesPendientes',
                field: 'ObligacionesPendientes',
                width: 180,
                aggFunc: 'sum',
                cellRenderer: CellRendererOCM,
            },
        ];

        this.defaultColDef = {
            sortable: true,
            resizable: true,
            filter: false,
        };
    }

    private _showGraph(): void {
        this.options = {
            autoSize: true,
            title: {
                text: this._dataGraph.graphTitle,
                fontSize: 40,
            },

            subtitle: {
                // text: `${this._dataGraph.graphSubTitle}`
                text: this._row,
                fontSize: 30,
            },
            data: [...this.data],
            series: [
                {
                    xKey: 'year',
                    yKey: 'Definitivas',
                },
                {
                    xKey: 'year',
                    yKey: 'ObligacionesReconocidasNetas',
                },
                {
                    xKey: 'year',
                    yKey: 'ObligacionesPendientes',
                },
            ],
            axes: [
                {
                    type: 'category',
                    position: 'bottom',
                    title: {
                        text: 'Años',
                        enabled: true,
                    },
                },
                {
                    type: 'number',
                    position: 'left',
                    title: {
                        text: 'en miles de Euros',
                        enabled: true,
                    },
                    label: {
                        formatter: function (params) {
                            return params.value / 1000 + '';
                        },
                    },
                },
            ],
            legend: {
                enabled: true,
                position: 'bottom',
            },
        };
    }

    volver() {
        this._location.back();
    }
}
