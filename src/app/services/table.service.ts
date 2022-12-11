import { Injectable } from '@angular/core';
import { PrepareDataIngresosService } from './prepareDataIngresos.service';
import { PrepareDataGastosService } from './prepareDataGastos.service';
import { DataStoreService } from './dataStore.service';
import { getClasificacion } from '../tables/data-table';
import { getClasificacionGraph } from '../graphs/data-graph';
import { IDataProperty, IDataTable } from '../commons/interfaces/dataTable.interface';
import { IDataGraph } from '../commons/interfaces/dataGraph.interface';
import { CLASIFICATION_TYPE } from '../commons/util/util';

@Injectable({
    providedIn: 'root'
})
export class TableService {
    constructor(
        private _prepareDataIngresosService: PrepareDataIngresosService,
        private _prepareDataGastosService: PrepareDataGastosService,
        private _dataStoreService: DataStoreService,
    ) { }

    async loadDataForTypeClasification(
        tipoClasificacion?: CLASIFICATION_TYPE,
        filter?: { valueFilter: string, attribute: string, useStarWitch?: boolean }
    ): Promise<IDataTable> {
        const dataPropertyTable = getClasificacion(tipoClasificacion) as IDataProperty;
        const dataPropertyGraph = getClasificacionGraph(tipoClasificacion);
        let rowData: any[];

        if (tipoClasificacion.startsWith('ingresos')) {
            rowData = await this._prepareDataIngresosService.getDataAllYear(tipoClasificacion);
        } else {
            rowData = await this._prepareDataGastosService.getDataAllYear(tipoClasificacion, dataPropertyTable.sufijo);
        }

        if (filter) {
            rowData = filter.useStarWitch ? rowData.filter(item => item[filter.attribute].toString().startsWith(filter.valueFilter))
                : rowData.filter(item => item[filter.attribute] == filter.valueFilter);
        }

        const sendDataTable: IDataTable = {
            dataPropertyTable,
            clasificationType: tipoClasificacion,
            rowData
        }

        const sendDataGraph: IDataGraph = {
            clasificationType: tipoClasificacion,
            rowData,
            graphTitle: dataPropertyGraph.graphTitle,
            graphSubTitle: ''
        }

        // Uso el setter
        this._dataStoreService.setDataTable = sendDataTable;
        this._dataStoreService.dataGraph = sendDataGraph;
        return sendDataTable;

    }

}