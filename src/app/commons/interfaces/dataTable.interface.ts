import { CLASIFICATION_TYPE } from "../util/util";

export interface IDataTable {
    clasificationType?: CLASIFICATION_TYPE;
    dataPropertyTable?: IDataProperty;
    rowDataIngresos?: any[]
    rowDataGastos?: any[]
}

export interface IDataProperty {
    attribute: string;
    codField: string;
    desField: string;
    graphTitle: string;
    headerName: string;
    subHeaderName: string;
    useStarWitch: boolean;
    width: number;
}
