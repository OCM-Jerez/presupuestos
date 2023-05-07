import { CLASIFICATION_TYPE } from '@appTypes/clasification.type';

export interface IDataTable {
  clasificationType?: CLASIFICATION_TYPE;
  dataPropertyTable?: IDataProperty;
  rowDataIngresos?: any[];
  rowDataGastos?: any[];
}

export interface IDataProperty {
  isIngresos: boolean;
  attribute: string;
  codField: string;
  desField: string;
  graphTitle: string;
  headerName: string;
  subHeaderName: string;
  useStarWitch: boolean;
  width: number;
}
