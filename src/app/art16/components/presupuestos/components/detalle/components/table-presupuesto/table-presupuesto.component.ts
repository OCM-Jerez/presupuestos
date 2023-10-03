import { Component, OnInit, inject } from '@angular/core';
import { CurrencyPipe, NgIf } from '@angular/common';

import { AvalaibleYearsService } from '@services/avalaibleYears.service';
import { DataStoreService } from '@services/dataStore.service';
import { PrepareDataTotalesPresupuestoService } from '@services/prepareDataTotalesPresupuesto.service';

import { environment } from '@environments/environment';

import { IDataTotalesPresupuesto } from '@interfaces/dataTotalesPresupuesto.interface';

@Component({
	selector: 'app-table-presupuesto',
	templateUrl: './table-presupuesto.component.html',
	styleUrls: ['./table-presupuesto.component.scss'],
	standalone: true,
	imports: [NgIf, CurrencyPipe]
})
export class TablePresupuestoComponent implements OnInit {
	private _avalaibleYearsService = inject(AvalaibleYearsService);
	private _dataStoreService = inject(DataStoreService);
	private _prepareDataTotalesPresupuestoService = inject(PrepareDataTotalesPresupuestoService);

	public showTablePresupuesto = true;
	public liqDate = environment.liqDate2023;
	currentYear = environment.currentYear;
	public DataTotalesPresupuesto: IDataTotalesPresupuesto = {};

	async ngOnInit(): Promise<void> {
		// Si se recarga la pagina hay que volver a calcular los totales.
		await this._prepareDataTotalesPresupuestoService.calcTotales();
		this.DataTotalesPresupuesto = this._dataStoreService.dataTotalesPresupuesto;

		const years = this._avalaibleYearsService.getYearsSelected();
		if (years.length === 1 && years[0] === environment.currentYear) {
			this.showTablePresupuesto = true;
		} else {
			this.showTablePresupuesto = false;
		}
	}
}
