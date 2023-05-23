import { Component, OnInit, inject } from '@angular/core';

import { DataStoreService } from '@services/dataStore.service';
import { TableService } from '@services/table.service';

import { environment } from '@environments/environment';

import { IDataTable } from '@interfaces/dataTable.interface';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
	standalone: true
})
export class TableDataPresupuestoComponent implements OnInit {
	public ahorroBruto: string;
	public ahorroNeto: string;
	public capitalGastos: number;
	public capitalIngresos: number;
	public corrientesGastos: any;
	public corrientesIngresos: any;
	public financierosGastos: any;
	public financierosIngresos: any;
	public liqDate = environment.liqDate2023;
	public noFinancieroGastos: number;
	public noFinancieroIngresos: number;
	public totalEjecutadoGastos: number;
	public totalEjecutadoIngresos: number;
	public totalPresupuestoGastos: number;
	public totalPresupuestoIngresos: number;
	public capacidadFinanciacion: any;

	private _capitulosGastos = [];
	private _dataGasto: any;
	private _dataIngreso: any;
	private _dataTable: IDataTable;

	private _dataStoreService = inject(DataStoreService);
	private _tableService = inject(TableService);

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
	}

	async calcSumIngresos() {
		this._dataIngreso = this._dataStoreService.dataTable.rowDataIngresos;

		// Creo array de Capitulos de ingresos.
		let capitulos = [];
		for (const item of this._dataIngreso) {
			const value = {
				name: `${item.CodCap}-${item.DesCap}`,
				value: item.Definitivas2023,
				recaudado: item.DerechosReconocidosNetos2023
			};
			capitulos.push(value);
		}

		// Totalizo por capitulo de ingreso
		this._dataIngreso = capitulos.reduce((acc, curr) => {
			const index = acc.findIndex((item) => item.name === curr.name);
			index > -1
				? ((acc[index].value += curr.value), (acc[index].recaudado += curr.recaudado))
				: acc.push({
						name: curr.name,
						value: curr.value,
						recaudado: curr.recaudado
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

		this.capitalIngresos = (this._dataIngreso[5].value + this._dataIngreso[6].value).toLocaleString();

		this.financierosIngresos = this._dataIngreso[7].value + this._dataIngreso[8].value;
	}

	async calcTotalesPresupuestoIngresos() {
		const totalPresupuestoIngresos = this._dataIngreso.reduce((acc, curr) => {
			Object.keys(curr).forEach((key, index) => {
				if (!acc[key]) {
					acc[key] = 0;
				}
				acc[key] += curr[key];
			});
			return acc;
		}, {});

		this.totalPresupuestoIngresos = totalPresupuestoIngresos.value.toLocaleString();
		this.totalEjecutadoIngresos = totalPresupuestoIngresos.recaudado.toLocaleString();
	}

	async calcSumGastos() {
		this._dataGasto = this._dataStoreService.dataTable.rowDataGastos;

		// Creo array de capitulos de gasto
		for (const item of this._dataGasto) {
			const value = {
				name: `${item.CodCap}-${item.DesCap}`,
				value: item.Definitivas2023,
				recaudado: item.Pagos2023
			};
			this._capitulosGastos.push(value);
		}

		// Totalizo por capitulo
		this._capitulosGastos = this._capitulosGastos.reduce((acc, curr) => {
			const index = acc.findIndex((item) => item.name === curr.name);
			index > -1
				? ((acc[index].value += curr.value), (acc[index].recaudado += curr.recaudado))
				: acc.push({
						name: curr.name,
						value: curr.value,
						recaudado: curr.recaudado
				  });
			return acc;
		}, []);
	}

	async calcTotalesPresupuestoGastos() {
		const totalPresupuestoGastos = this._capitulosGastos.reduce((acc, curr) => {
			Object.keys(curr).forEach((key, index) => {
				if (!acc[key]) {
					acc[key] = 0;
				}
				acc[key] += curr[key];
			});
			return acc;
		}, {});

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

		this.capitalGastos = (this._capitulosGastos[5].value + this._capitulosGastos[6].value).toLocaleString();

		this.financierosGastos = this._capitulosGastos[7].value + this._capitulosGastos[8].value;

		this.totalPresupuestoGastos = totalPresupuestoGastos.value.toLocaleString();
		this.totalEjecutadoGastos = totalPresupuestoGastos.recaudado.toLocaleString();
	}

	async calcIndicadores() {
		this.ahorroBruto = (this.corrientesIngresos - this.corrientesGastos).toLocaleString();

		// Tengo que sumar capitulo 9 de gastos
		this.ahorroNeto = (
			this.corrientesIngresos -
			this.corrientesGastos -
			this._capitulosGastos[7].value
		).toLocaleString();
		this.corrientesIngresos = this.corrientesIngresos.toLocaleString();
		this.corrientesGastos = this.corrientesGastos.toLocaleString();
		this.capacidadFinanciacion = (this.financierosIngresos - this.financierosGastos).toLocaleString();
		this.financierosIngresos = this.financierosIngresos.toLocaleString();
		this.financierosGastos = this.financierosGastos.toLocaleString();
	}
}
