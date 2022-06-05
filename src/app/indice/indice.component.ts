import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DataStoreService } from '../services/dataStore.service';
import { PrepareDataIngresosService } from '../services/prepareDataIngresos.service';
import { PrepareDataGastosService } from '../services/prepareDataGastos.service';

import { IDataGraph } from '../commons/interfaces/dataGraph.interface';
import { IDataTable } from '../commons/interfaces/dataTable.interface';

import { getClasificacion } from '../tables/data-table';
import { getClasificacionGraph } from '../graphs/data-graph';

@Component({
  selector: 'app-indice-new',
  templateUrl: './indice.component.html',
  styleUrls: ['./indice.component.scss']
})
export class IndiceComponent {
  constructor(
    private _router: Router,
    private _dataStoreService: DataStoreService,
    private _prepareDataIngresosService: PrepareDataIngresosService,
    private _prepareDataGastosService: PrepareDataGastosService
  ) { }

  async openTable(tipoClasificacion: string): Promise<void> {
    const isIncome = tipoClasificacion.startsWith('ingresos');
    const dataPropertyTable = getClasificacion(tipoClasificacion);
    const dataPropertyGraph = getClasificacionGraph(tipoClasificacion);
    let rowData: any[];
    if (isIncome) {
      rowData = await this._prepareDataIngresosService.getDataAllYear(tipoClasificacion, dataPropertyTable.sufijo);
    } else {
      rowData = await this._prepareDataGastosService.getDataAllYear(tipoClasificacion, dataPropertyTable.sufijo);
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

    if (isIncome) {
      this._router.navigateByUrl('/tableIngresos')
    } else {
      this._router.navigateByUrl('/tableGastos')
    }

  }

}