import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { IDataTable } from '@interfaces/dataTable.interface';
import { IDataTotalesPresupuesto } from '@interfaces/dataTotalesPresupuesto.interface';

@Injectable({
	providedIn: 'root'
})
export class DataStoreService {
	private _dataSource = new Subject<IDataTable | IDataTotalesPresupuesto | string>();
	dataSource$ = this._dataSource.asObservable();

	private _data: IDataTable;
	private _selectedCodeRowFirstLevel: string;
	private _dataTotalesPresupuesto: IDataTotalesPresupuesto;

	set dataTable(data: IDataTable) {
		this._data = data;
	}

	get dataTable(): IDataTable {
		return this._data;
	}

	set selectedCodeRowFirstLevel(codeRow: string) {
		this._selectedCodeRowFirstLevel = codeRow;
	}

	get selectedCodeRowFirstLevel(): string {
		return this._selectedCodeRowFirstLevel;
	}

	set dataTotalesPresupuesto(data: IDataTotalesPresupuesto) {
		this._dataTotalesPresupuesto = data;
	}

	get dataTotalesPresupuesto(): IDataTotalesPresupuesto {
		return this._dataTotalesPresupuesto;
	}
}
