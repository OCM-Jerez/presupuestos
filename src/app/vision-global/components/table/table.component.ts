import { Component, OnInit, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { Subject, takeUntil } from 'rxjs';

import { environment } from '@environments/environment';

import { AvalaibleYearsService } from '@services/avalaibleYears.service';
import { DataStoreService } from '@services/dataStore.service';
import { PrepareDataTotalesPresupuestoService } from '@services/prepareDataTotalesPresupuesto.service';
import { ReloadTableService } from '@services/reloadTable.service';
import { TableService } from '@services/table.service';

import { ICapituloGasto } from '@interfaces/capituloGasto.interface';
import { ICapituloIngreso } from '@interfaces/capituloIngreso.interface';
import { IDataGasto } from '@interfaces/dataGasto.interface';
import { IDataIngreso } from '@interfaces/dataIngreso.interface';
import { IDataTable } from '@interfaces/dataTable.interface';
import { IDataTotalesPresupuesto } from '@interfaces/dataTotalesPresupuesto.interface';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
	standalone: true,
	imports: [CurrencyPipe]
})
export class TableDataPresupuestoComponent implements OnInit {
	private _avalaibleYearsService = inject(AvalaibleYearsService);
	private _dataStoreService = inject(DataStoreService);
	private _prepareDataTotalesPresupuestoService = inject(PrepareDataTotalesPresupuestoService);
	private _reloadTableService = inject(ReloadTableService);
	private _tableService = inject(TableService);

	private _capitulosGastos: ICapituloGasto[] = [];
	private _CapitulosIngresos: ICapituloIngreso[] = [];
	private _dataGasto: IDataGasto[] = [];
	private _dataIngreso: IDataIngreso[];
	private _dataTable: IDataTable;
	private _unsubscribe$ = new Subject<void>();
	private _yearsSelected: number;

	public ahorroBruto: number;
	public ahorroNeto: number;
	public capacidadFinanciacion: number;
	public capitalGastos: number;
	public capitalIngresos: number;
	public corrientesGastos: number;
	public corrientesIngresos: number;
	public DataTotalesPresupuesto: IDataTotalesPresupuesto = {};
	public financierosGastos: number;
	public financierosIngresos: number;
	public liqDate = '';
	public noFinancieroGastos: number;
	public noFinancieroIngresos: number;
	public totalEjecutadoGastos: number;
	public totalEjecutadoIngresos: number;
	public totalPresupuestoGastos: number;
	public totalPresupuestoIngresos: number;

	async ngOnInit(): Promise<void> {
		this._loadData();
		this._reloadTableService.reloadTable$.pipe(takeUntil(this._unsubscribe$)).subscribe(() => {
			this._loadData();
		});
	}

	private async _loadData(): Promise<void> {
		this._yearsSelected = this._avalaibleYearsService.getYearsSelected()[0];
		if (this._yearsSelected === 2023) {
			this.liqDate = '(ejecución al ' + environment.liqDate2023 + ')';
		} else {
			this.liqDate = '';
		}

		// si recargo la pagina cargo datos iniciales.
		if (this._dataStoreService.dataTable === undefined) {
			this._dataTable = await this._tableService.loadDataInitial();
		}

		await this.calcSumIngresos();
		await this.calcTotalesPresupuestoIngresos();
		await this.calcSumGastos();
		await this.calcTotalesPresupuestoGastos();
		await this._prepareDataTotalesPresupuestoService.calcTotales();
		this.DataTotalesPresupuesto = this._dataStoreService.dataTotalesPresupuesto;
		await this.calcIndicadores();
	}

	async calcSumIngresos() {
		(this._dataTable = await this._tableService.loadData('ingresosEconomicaCapitulos')), this._yearsSelected;
		this._dataIngreso = this._dataStoreService.dataTable.rowDataIngresos;

		// Creo array de Capitulos de ingresos.
		this._CapitulosIngresos = [];
		for (const item of this._dataIngreso) {
			const value = {
				name: `${item.CodCap}-${item.DesCap}`,
				presupuestado: +item.Definitivas1,
				recaudado: +item.DerechosReconocidosNetos1
			};
			this._CapitulosIngresos.push(value);
		}

		// Totalizo por capitulo de ingreso
		this._CapitulosIngresos = this._CapitulosIngresos.reduce((acc, curr) => {
			const index = acc.findIndex((item) => item.name === curr.name);
			index > -1
				? ((acc[index].presupuestado += curr.presupuestado), (acc[index].recaudado += curr.recaudado))
				: acc.push({
						name: curr.name,
						presupuestado: curr.presupuestado,
						recaudado: curr.recaudado
				  });
			return acc;
		}, []);
	}

	async calcTotalesPresupuestoIngresos() {
		this.noFinancieroIngresos = 0;
		this.corrientesIngresos = 0;
		this.capitalIngresos = 0;
		this.financierosIngresos = 0;

		this.noFinancieroIngresos =
			this._CapitulosIngresos[0].presupuestado +
			this._CapitulosIngresos[1].presupuestado +
			this._CapitulosIngresos[2].presupuestado +
			this._CapitulosIngresos[3].presupuestado +
			this._CapitulosIngresos[4].presupuestado +
			this._CapitulosIngresos[5].presupuestado +
			this._CapitulosIngresos[6].presupuestado;

		this.corrientesIngresos =
			this._CapitulosIngresos[0].presupuestado +
			this._CapitulosIngresos[1].presupuestado +
			this._CapitulosIngresos[2].presupuestado +
			this._CapitulosIngresos[3].presupuestado +
			this._CapitulosIngresos[4].presupuestado;

		this.capitalIngresos = this._CapitulosIngresos[5].presupuestado + this._CapitulosIngresos[6].presupuestado;
		this.financierosIngresos = this._CapitulosIngresos[7].presupuestado + this._CapitulosIngresos[8].presupuestado;
	}

	async calcSumGastos() {
		(this._dataTable = await this._tableService.loadData('gastosEconomicaCapitulos')), this._yearsSelected;
		this._dataGasto = this._dataStoreService.dataTable.rowDataGastos;

		// Creo array de capitulos de gasto
		this._capitulosGastos = [];
		for (const item of this._dataGasto) {
			const value = {
				name: `${item.CodCap}-${item.DesCap}`,
				presupuestado: +item.Definitivas1,
				gastado: +item.Pagos1
			};
			this._capitulosGastos.push(value);
		}

		// Totalizo por capitulo gasto
		this._capitulosGastos = this._capitulosGastos.reduce((acc, curr) => {
			const index = acc.findIndex((item) => item.name === curr.name);
			index > -1
				? ((acc[index].presupuestado += curr.presupuestado), (acc[index].gastado += curr.gastado))
				: acc.push({
						name: curr.name,
						presupuestado: curr.presupuestado,
						gastado: curr.gastado
				  });
			return acc;
		}, []);
	}

	async calcTotalesPresupuestoGastos() {
		this.noFinancieroGastos = 0;
		this.corrientesGastos = 0;
		this.capitalGastos = 0;
		this.financierosGastos = 0;

		this.noFinancieroGastos =
			this._capitulosGastos[0].presupuestado +
			this._capitulosGastos[1].presupuestado +
			this._capitulosGastos[2].presupuestado +
			this._capitulosGastos[3].presupuestado +
			this._capitulosGastos[4].presupuestado +
			this._capitulosGastos[5].presupuestado +
			this._capitulosGastos[6].presupuestado;

		this.corrientesGastos =
			this._capitulosGastos[0].presupuestado +
			this._capitulosGastos[1].presupuestado +
			this._capitulosGastos[2].presupuestado +
			this._capitulosGastos[3].presupuestado +
			this._capitulosGastos[4].presupuestado;

		this.capitalGastos = this._capitulosGastos[5].presupuestado + this._capitulosGastos[6].presupuestado;
		this.financierosGastos = this._capitulosGastos[7].presupuestado + this._capitulosGastos[8].presupuestado;
	}

	async calcIndicadores() {
		this.totalPresupuestoIngresos = 0;
		this.totalEjecutadoIngresos = 0;
		this.totalPresupuestoGastos = 0;
		this.totalEjecutadoGastos = 0;
		this.ahorroBruto = 0;
		this.ahorroNeto = 0;
		this.capacidadFinanciacion = 0;

		this.totalPresupuestoIngresos = this.DataTotalesPresupuesto.totalPresupuestoIngresos;
		this.totalEjecutadoIngresos = this.DataTotalesPresupuesto.totalEjecutadoIngresos;
		this.totalPresupuestoGastos = this.DataTotalesPresupuesto.totalPresupuestoGastos;
		this.totalEjecutadoGastos = this.DataTotalesPresupuesto.totalEjecutadoGastos;

		this.ahorroBruto = this.corrientesIngresos - this.corrientesGastos;
		// Tengo que sumar capitulo 9 de gastos
		this.ahorroNeto = this.corrientesIngresos - this.corrientesGastos - this._capitulosGastos[7].presupuestado;
		this.capacidadFinanciacion = this.financierosIngresos - this.financierosGastos;
	}
}
