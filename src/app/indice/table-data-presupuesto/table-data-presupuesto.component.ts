import { Component } from '@angular/core';

import { environment } from '../../../environments/environment';
import { IDataTable } from '../../commons/interfaces/dataTable.interface';
import { DataStoreService } from '../../services/dataStore.service';
import { TableService } from '../../services/table.service';

@Component({
    selector: 'app-table-data-presupuesto',
    templateUrl: './table-data-presupuesto.component.html',
    styleUrls: ['./table-data-presupuesto.component.scss'],
})
export class TableDataPresupuestoComponent {
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

    private _dataTable: IDataTable;
    private _dataIngreso: any;
    private _dataGasto: any;
    private _capitulosGastos = [];
    private _politicasGastos = [];

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
        // await this.calcIndicadores();
        // this.showGraph();
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
}
