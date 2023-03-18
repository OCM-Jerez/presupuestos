import { Component, OnInit } from '@angular/core';

import { DataStoreService } from '../services/dataStore.service';
import { TableService } from '../services/table.service';

import { IDataTable } from '../commons/interfaces/dataTable.interface';

import { environment } from '../../environments/environment';

import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSankey from 'highcharts/modules/sankey';

HighchartsMore(Highcharts);
HighchartsSankey(Highcharts);

@Component({
    selector: 'app-indice-new',
    templateUrl: './indice.component.html',
    styleUrls: ['./indice.component.scss'],
})
export class IndiceComponent implements OnInit {
    public liqDate = environment.liqDate2023;
    public totalPresupuestoIngresos: number;
    public totalPresupuestoGastos: number;
    public totalEjecutadoIngresos: number;
    public totalEjecutadoGastos: number;
    public noFinancieroIngresos: number;
    public noFinancieroGastos: number;
    public corrientesIngresos: any;
    public corrientesGastos: any;
    public capitalIngresos: number;
    public capitalGastos: number;
    public financierosIngresos: any;
    public financierosGastos: any;
    public ahorroBruto: string;
    public ahorroNeto: string;
    public capacidadFinanciacion: any;
    // private _dataGrap: [{ name: string, va: number }] = [{ name: "", value: 0 }]
    private _dataTable: IDataTable;
    private _dataIngreso: any;
    private _dataGasto: any;
    private _capitulosGastos = [];
    private _politicasGastos = [];
    // private _typeClasification: CLASIFICATION_TYPE = 'ingresosEconomicaCapitulos'
    // https://stackoverflow.com/questions/69549927/how-to-pass-enum-value-in-angular-template-as-an-input

    constructor(
        private _dataStoreService: DataStoreService,
        private _tableService: TableService
    ) {}

    ngOnInit(): void {
        this._loadData();
    }

    private async _loadData(): Promise<void> {
        // si recargo la pagina cargo datos iniciales.
        if (this._dataStoreService.dataTable === undefined) {
            this._dataTable = await this._tableService.loadDataInitial();
        }

        await this.calcSumIngresos();
        await this.calcTotalesPresupuestoIngresos();
        await this.calcSumGastos();
        // await this.calcSumPoliticasGastos();
        await this.calcTotalesPresupuestoGastos();
        await this.calcIndicadores();
        this.showGraph();
    }

    async calcSumIngresos() {
        this._dataIngreso = this._dataStoreService.dataTable.rowDataIngresos;

        // Creo array de Capitulos de ingresos.
        let capitulos = [];
        for (const item of this._dataIngreso) {
            const value = {
                name: `${item.CodCap}-${item.DesCap}`,
                value: item.Definitivas2023,
                recaudado: item.DerechosReconocidosNetos2023,
            };
            capitulos.push(value);
        }

        // Totalizo por capitulo de ingreso
        this._dataIngreso = capitulos.reduce((acc, curr) => {
            const index = acc.findIndex((item) => item.name === curr.name);
            index > -1
                ? ((acc[index].value += curr.value),
                  (acc[index].recaudado += curr.recaudado))
                : acc.push({
                      name: curr.name,
                      value: curr.value,
                      recaudado: curr.recaudado,
                  });
            return acc;
        }, []);

        this.noFinancieroIngresos = (
            this._dataIngreso[0].value +
            this._dataIngreso[1].value +
            this._dataIngreso[2].value +
            this._dataIngreso[3].value +
            this._dataIngreso[4].value +
            this._dataIngreso[5].value +
            this._dataIngreso[6].value
        ).toLocaleString();

        this.corrientesIngresos =
            this._dataIngreso[0].value +
            this._dataIngreso[1].value +
            this._dataIngreso[2].value +
            this._dataIngreso[3].value +
            this._dataIngreso[4].value;

        this.capitalIngresos = (
            this._dataIngreso[5].value + this._dataIngreso[6].value
        ).toLocaleString();

        this.financierosIngresos =
            this._dataIngreso[7].value + this._dataIngreso[8].value;
    }

    async calcTotalesPresupuestoIngresos() {
        const totalPresupuestoIngresos = this._dataIngreso.reduce(
            (acc, curr) => {
                Object.keys(curr).forEach((key, index) => {
                    if (!acc[key]) {
                        acc[key] = 0;
                    }
                    acc[key] += curr[key];
                });
                return acc;
            },
            {}
        );

        this.totalPresupuestoIngresos =
            totalPresupuestoIngresos.value.toLocaleString();
        this.totalEjecutadoIngresos =
            totalPresupuestoIngresos.recaudado.toLocaleString();
    }

    async calcSumGastos() {
        this._dataGasto = this._dataStoreService.dataTable.rowDataGastos;

        // Creo array de capitulos de gasto
        for (const item of this._dataGasto) {
            const value = {
                name: `${item.CodCap}-${item.DesCap}`,
                value: item.Definitivas2023,
                recaudado: item.Pagos2023,
            };
            this._capitulosGastos.push(value);
        }

        // Totalizo por capitulo
        this._capitulosGastos = this._capitulosGastos.reduce((acc, curr) => {
            const index = acc.findIndex((item) => item.name === curr.name);
            index > -1
                ? ((acc[index].value += curr.value),
                  (acc[index].recaudado += curr.recaudado))
                : acc.push({
                      name: curr.name,
                      value: curr.value,
                      recaudado: curr.recaudado,
                  });
            return acc;
        }, []);
    }

    async calcSumPoliticasGastos() {
        for (const item of this._dataGasto) {
            const value = {
                name: `${item.CodPro}-${item.DesPro}`,
                value: item.Definitivas2023,
                recaudado: item.Pagos2023,
            };
            this._politicasGastos.push(value);
        }

        // Totalizo por politicas de gasto
        this._politicasGastos = this._politicasGastos.reduce((acc, curr) => {
            const index = acc.findIndex((item) => item.name === curr.name);
            index > -1
                ? ((acc[index].value += curr.value),
                  (acc[index].recaudado += curr.recaudado))
                : acc.push({
                      name: curr.name,
                      value: curr.value,
                      recaudado: curr.recaudado,
                  });
            return acc;
        }, []);
    }

    async calcTotalesPresupuestoGastos() {
        const totalPresupuestoGastos = this._capitulosGastos.reduce(
            (acc, curr) => {
                Object.keys(curr).forEach((key, index) => {
                    if (!acc[key]) {
                        acc[key] = 0;
                    }
                    acc[key] += curr[key];
                });
                return acc;
            },
            {}
        );

        this.noFinancieroGastos = (
            this._capitulosGastos[0].value +
            this._capitulosGastos[1].value +
            this._capitulosGastos[2].value +
            this._capitulosGastos[3].value +
            this._capitulosGastos[4].value +
            this._capitulosGastos[5].value +
            this._capitulosGastos[6].value
        ).toLocaleString();

        this.corrientesGastos =
            this._capitulosGastos[0].value +
            this._capitulosGastos[1].value +
            this._capitulosGastos[2].value +
            this._capitulosGastos[3].value +
            this._capitulosGastos[4].value;

        this.capitalGastos = (
            this._capitulosGastos[5].value + this._capitulosGastos[6].value
        ).toLocaleString();

        this.financierosGastos =
            this._capitulosGastos[7].value + this._capitulosGastos[8].value;

        this.totalPresupuestoGastos =
            totalPresupuestoGastos.value.toLocaleString();
        this.totalEjecutadoGastos =
            totalPresupuestoGastos.recaudado.toLocaleString();
    }

    async calcIndicadores() {
        this.ahorroBruto = (
            this.corrientesIngresos - this.corrientesGastos
        ).toLocaleString();

        // Tengo que sumar capitulo 9 de gastos
        this.ahorroNeto = (
            this.corrientesIngresos -
            this.corrientesGastos -
            this._capitulosGastos[7].value
        ).toLocaleString();
        this.corrientesIngresos = this.corrientesIngresos.toLocaleString();
        this.corrientesGastos = this.corrientesGastos.toLocaleString();
        this.capacidadFinanciacion = (
            this.financierosIngresos - this.financierosGastos
        ).toLocaleString();
        this.financierosIngresos = this.financierosIngresos.toLocaleString();
        this.financierosGastos = this.financierosGastos.toLocaleString();
    }

    showGraph() {
        // Gráfico ingresos
        Highcharts.chart('sankey', {
            accessibility: {
                enabled: false,
            },
            title: {
                text: "<span style= 'font-size: 32px'>Ingresos</span>",
            },
            subtitle: {
                text: '',
            },
            tooltip: {
                headerFormat: null,
                pointFormat:
                    '{point.fromNode.name} \u2192 {point.toNode.name}: {point.weight} ',
                nodeFormat: '{point.name}: {point.sum} ',
            },
            series: [
                {
                    borderColor: '#1a1a1a',
                    borderWidth: 1,
                    colors: [
                        '#1E90FF',
                        '#1eff8d',
                        '#ce9eff',
                        '#1eff8d',
                        '#1eff8d',
                        '#1eff8d',
                        '#1eff8d',
                        '#ce9eff',
                        '#ce9eff',
                        '#ce9eff',
                        '#ce9eff',
                    ],
                    keys: ['from', 'to', 'weight'],
                    data: [
                        [
                            this._dataIngreso[0].name,
                            'Presupuesto',
                            this._dataIngreso[0].value,
                        ],
                        [
                            this._dataIngreso[1].name,
                            'Presupuesto',
                            this._dataIngreso[1].value,
                        ],
                        [
                            this._dataIngreso[2].name,
                            'Presupuesto',
                            this._dataIngreso[2].value,
                        ],
                        [
                            this._dataIngreso[3].name,
                            'Presupuesto',
                            this._dataIngreso[3].value,
                        ],
                        [
                            this._dataIngreso[4].name,
                            'Presupuesto',
                            this._dataIngreso[4].value,
                        ],
                        [
                            this._dataIngreso[5].name,
                            'Presupuesto',
                            this._dataIngreso[5].value,
                        ],
                        [
                            this._dataIngreso[6].name,
                            'Presupuesto',
                            this._dataIngreso[6].value,
                        ],
                        [
                            this._dataIngreso[7].name,
                            'Presupuesto',
                            this._dataIngreso[7].value,
                        ],
                        [
                            this._dataIngreso[8].name,
                            'Presupuesto',
                            this._dataIngreso[8].value,
                        ],
                    ],
                    type: 'sankey',
                    name: 'Ingresos',
                    dataLabels: {
                        style: {
                            color: '#1a1a1a',
                            textOutline: false,
                        },
                    },
                },
            ],
        } as any);

        // Gráfico gastos
        Highcharts.chart('sankey1', {
            accessibility: {
                enabled: false,
            },
            title: {
                text: "<span style= 'font-size: 32px'>Gastos</span>",
            },
            subtitle: {
                text:
                    // "Source: <a href='https://finance.yahoo.com/quote/AAPL/balance-sheet/'> Yahoo Finance</a>"
                    '',
            },
            tooltip: {
                headerFormat: null,
                pointFormat:
                    '{point.fromNode.name} \u2192 {point.toNode.name}: {point.weight}',
                nodeFormat: '{point.name}: {point.sum}',
            },
            series: [
                {
                    borderColor: '#1a1a1a',
                    borderWidth: 1,
                    colors: [
                        '#1E90FF',
                        '#1eff8d',
                        '#ce9eff',
                        '#1eff8d',
                        '#1eff8d',
                        '#1eff8d',
                        '#1eff8d',
                        '#ce9eff',
                        '#ce9eff',
                        '#ce9eff',
                        '#ce9eff',
                    ],
                    keys: ['from', 'to', 'weight'],
                    data: [
                        [
                            'Presupuesto',
                            this._capitulosGastos[0].name,
                            this._capitulosGastos[0].value,
                        ],
                        [
                            'Presupuesto',
                            this._capitulosGastos[1].name,
                            this._capitulosGastos[1].value,
                        ],
                        [
                            'Presupuesto',
                            this._capitulosGastos[2].name,
                            this._capitulosGastos[2].value,
                        ],
                        [
                            'Presupuesto',
                            this._capitulosGastos[3].name,
                            this._capitulosGastos[3].value,
                        ],
                        [
                            'Presupuesto',
                            this._capitulosGastos[4].name,
                            this._capitulosGastos[4].value,
                        ],
                        [
                            'Presupuesto',
                            this._capitulosGastos[5].name,
                            this._capitulosGastos[5].value,
                        ],
                        [
                            'Presupuesto',
                            this._capitulosGastos[6].name,
                            this._capitulosGastos[6].value,
                        ],
                        [
                            'Presupuesto',
                            this._capitulosGastos[7].name,
                            this._capitulosGastos[7].value,
                        ],
                        [
                            'Presupuesto',
                            this._capitulosGastos[8].name,
                            this._capitulosGastos[8].value,
                        ],

                        // ["Presupuesto", this._politicasGastos[0].name, this._politicasGastos[0].value],
                        // ["Presupuesto", this._politicasGastos[1].name, this._politicasGastos[1].value],
                        // ["Presupuesto", this._politicasGastos[2].name, this._politicasGastos[2].value],
                        // ["Presupuesto", this._politicasGastos[3].name, this._politicasGastos[3].value],
                        // ["Presupuesto", this._politicasGastos[4].name, this._politicasGastos[4].value],
                        // ["Presupuesto", this._politicasGastos[5].name, this._politicasGastos[5].value],
                        // ["Presupuesto", this._politicasGastos[6].name, this._politicasGastos[6].value],
                        // ["Presupuesto", this._politicasGastos[7].name, this._politicasGastos[7].value],
                        // ["Presupuesto", this._politicasGastos[8].name, this._politicasGastos[8].value],
                        // ["Presupuesto", this._politicasGastos[9].name, this._politicasGastos[9].value],
                        // ["Presupuesto", this._politicasGastos[10].name, this._politicasGastos[10].value],
                        // ["Presupuesto", this._politicasGastos[11].name, this._politicasGastos[11].value],
                        // ["Presupuesto", this._politicasGastos[12].name, this._politicasGastos[12].value],
                        // ["Presupuesto", this._politicasGastos[13].name, this._politicasGastos[13].value],
                        // ["Presupuesto", this._politicasGastos[14].name, this._politicasGastos[14].value],
                        // ["Presupuesto", this._politicasGastos[15].name, this._politicasGastos[15].value],
                        // ["Presupuesto", this._politicasGastos[16].name, this._politicasGastos[16].value],
                        // ["Presupuesto", this._politicasGastos[17].name, this._politicasGastos[17].value],
                        // ["Presupuesto", this._politicasGastos[18].name, this._politicasGastos[18].value],
                        // ["Presupuesto", this._politicasGastos[19].name, this._politicasGastos[19].value]
                    ],
                    type: 'sankey',
                    name: '',
                    dataLabels: {
                        style: {
                            color: '#1a1a1a',
                            textOutline: false,
                        },
                    },
                },
            ],
        } as any);
    }
}
