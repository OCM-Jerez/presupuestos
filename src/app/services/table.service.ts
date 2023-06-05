import { Injectable, inject } from '@angular/core';

import { DataStoreService } from './dataStore.service';
import { PrepareDataGastosService } from './prepareDataGastos.service';
import { PrepareDataIngresosService } from './prepareDataIngresos.service';

import { CLASIFICATION_TYPE } from '@appTypes/clasification.type';

import { getClasificacion } from '@app/data-table';

import { IDataProperty, IDataTable } from '@interfaces/dataTable.interface';

@Injectable({
	providedIn: 'root'
})
export class TableService {
	private _prepareDataIngresosService = inject(PrepareDataIngresosService);
	private _prepareDataGastosService = inject(PrepareDataGastosService);
	private _dataStoreService = inject(DataStoreService);

	async loadDataInitial(): Promise<IDataTable> {
		// esta data la almacenaremos para usarla hasta que se haga un cambio en los años seleccionados.
		// Para guardar los datos de ingresos y gastos, necesitamos crear otro objeto.
		// Ahora solo guardamos el ultimo objeto que se ha cargado.
		const rowDataIngresos = await this._prepareDataIngresosService.getDataAllYear();
		const rowDataGastos = await this._prepareDataGastosService.getDataAllYear();
		const dataPropertyTable = getClasificacion('ingresosEconomicaEconomicos') as IDataProperty;
		const sendDataTable: IDataTable = {
			dataPropertyTable,
			clasificationType: 'ingresosEconomicaEconomicos',
			rowDataIngresos,
			rowDataGastos
		};

		this._dataStoreService.dataTable = sendDataTable;
		return sendDataTable;
	}

	async loadData(tipoClasificacion?: CLASIFICATION_TYPE): Promise<IDataTable> {
		const _startTime = performance.now();
		const dataPropertyTable = getClasificacion(tipoClasificacion) as IDataProperty;

		if (this._dataStoreService.dataTable === undefined) {
			await this.loadDataInitial();
		}

		const { rowDataIngresos, rowDataGastos } = this._dataStoreService.dataTable;

		const rowData = tipoClasificacion.startsWith('ingresos')
			? await this._prepareDataIngresosService.getDataAllYear()
			: await this._prepareDataGastosService.getDataAllYear();

		const sendDataTable: IDataTable = tipoClasificacion.startsWith('ingresos')
			? { dataPropertyTable, clasificationType: tipoClasificacion, rowDataIngresos: rowData, rowDataGastos }
			: { dataPropertyTable, clasificationType: tipoClasificacion, rowDataIngresos, rowDataGastos: rowData };

		this._dataStoreService.dataTable = sendDataTable;
		const endTime = performance.now();
		console.log(`Tiempo empleado para generar data: ${Math.round(endTime - _startTime)} ms`);

		return sendDataTable;
	}
}
