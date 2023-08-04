import { CLASIFICATION_TYPE } from '@appTypes/clasification.type';
import { IDataIngreso } from './dataIngreso.interface';
import { IDataGasto } from './dataGasto.interface';

export interface IDataTable {
	clasificationType?: CLASIFICATION_TYPE;
	dataPropertyTable?: IDataProperty;
	rowDataIngresos?: IDataIngreso[];
	rowDataGastos?: IDataGasto[];
}

export interface IDataProperty {
	codField: string;
	desField: string;
	graphTitle: string;
	headerName: string;
	isIngresos: boolean;
	subHeaderName: string;
	width: number;
}
