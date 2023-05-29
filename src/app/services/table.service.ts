import { Injectable } from '@angular/core';

import { DataStoreService } from './dataStore.service';
import { PrepareDataGastosService } from './prepareDataGastos.service';
import { PrepareDataIngresosService } from './prepareDataIngresos.service';

import { CLASIFICATION_TYPE } from '@appTypes/clasification.type';

import { getClasificacion } from '@app/data-table';

// import { getClasificacionGraph } from '../graphs/data-graph';

// import { IDataGraph } from '@interfaces/dataGraph.interface';
import { IDataProperty, IDataTable } from '@interfaces/dataTable.interface';

@Injectable({
	providedIn: 'root'
})
export class TableService {
	constructor(
		private _prepareDataIngresosService: PrepareDataIngresosService,
		private _prepareDataGastosService: PrepareDataGastosService,
		private _dataStoreService: DataStoreService
	) {}

	async loadDataInitial(): Promise<IDataTable> {
		// Cambio ingresosEconomicaArticulos a ingresosEconomicaEconomicos para tener todos los Items.
		// Se necesita para tener todos los datos de ingresos y gastos.
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

		// Uso el setter
		this._dataStoreService.dataTable = sendDataTable;
		return sendDataTable;
	}

	async loadData(
		tipoClasificacion?: CLASIFICATION_TYPE
		// filter?: { valueFilter: string; attribute: string; useStarWitch?: boolean }
	): Promise<IDataTable> {
		const dataPropertyTable = getClasificacion(tipoClasificacion) as IDataProperty;
		// let rowData: any[];

		if (this._dataStoreService.dataTable === undefined) {
			await this.loadDataInitial();
		}

		const { rowDataIngresos, rowDataGastos } = this._dataStoreService.dataTable;
		const rowData = tipoClasificacion.startsWith('ingresos')
			? await this._prepareDataIngresosService.getDataAllYear()
			: await this._prepareDataGastosService.getDataAllYear();

		// if (filter) {
		//   rowData = filter.useStarWitch
		//     ? rowData.filter((item) => item[filter.attribute].toString().startsWith(filter.valueFilter))
		//     : rowData.filter((item) => item[filter.attribute] == filter.valueFilter);
		// }

		const sendDataTable: IDataTable = tipoClasificacion.startsWith('ingresos')
			? { dataPropertyTable, clasificationType: tipoClasificacion, rowDataIngresos: rowData, rowDataGastos }
			: { dataPropertyTable, clasificationType: tipoClasificacion, rowDataIngresos, rowDataGastos: rowData };
		this._dataStoreService.dataTable = sendDataTable;
		return sendDataTable;
	}
}
