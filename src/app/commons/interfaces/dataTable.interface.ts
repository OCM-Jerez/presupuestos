import { CLASIFICATION_TYPE } from "../util/util";

export interface IDataTable {
    dataPropertyTable: IDataProperty;
    clasificationType: CLASIFICATION_TYPE;
    rowData: any[]
}

export interface IDataProperty {
    sufijo: string;
    headerName: string;
    subHeaderName: string;
    codField: string;
    desField: string;
    width: number;
    graphTitle: string;
    attribute: string;
    useStarWitch: boolean;
}
