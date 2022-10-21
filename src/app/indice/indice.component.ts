import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

import { DataStoreService } from '../services/dataStore.service';
import { PrepareDataIngresosService } from '../services/prepareDataIngresos.service';
import { PrepareDataGastosService } from '../services/prepareDataGastos.service';

import { IDataGraph } from '../commons/interfaces/dataGraph.interface';
import { IDataTable } from '../commons/interfaces/dataTable.interface';

import { getClasificacion } from '../tables/data-table';
import { getClasificacionGraph } from '../graphs/data-graph';
import { TableIngresosService } from '../services/table-ingresos.service';
import { CLASIFICATION_TYPE } from '../commons/util/util';

@Component({
  selector: 'app-indice-new',
  templateUrl: './indice.component.html',
  styleUrls: ['./indice.component.scss']
})
export class IndiceComponent {
  public liqDate = environment.liqDate;
  constructor(
    private _router: Router,
    private _dataStoreService: DataStoreService,
    private _prepareDataIngresosService: PrepareDataIngresosService,
    private _prepareDataGastosService: PrepareDataGastosService,
    private _tableIngresosService: TableIngresosService
  ) { }

  async openTable(tipoClasificacion: CLASIFICATION_TYPE): Promise<void> {
    const isIncome = tipoClasificacion.startsWith('ingresos');
    // const dataPropertyTable = getClasificacion(tipoClasificacion);
    // const dataPropertyGraph = getClasificacionGraph(tipoClasificacion);
    // let rowData: any[];
    // if (isIncome) {
    //   rowData = await this._prepareDataIngresosService.getDataAllYear(tipoClasificacion);
    // } else {
    //   rowData = await this._prepareDataGastosService.getDataAllYear(tipoClasificacion, dataPropertyTable.sufijo);
    // }

    // const sendDataTable: IDataTable = {
    //   dataPropertyTable,
    //   clasificationType: tipoClasificacion,
    //   rowData
    // }

    // const sendDataGraph: IDataGraph = {
    //   clasificationType: tipoClasificacion,
    //   rowData,
    //   graphTitle: dataPropertyGraph.graphTitle,
    //   graphSubTitle: ''
    // }
    // // Uso el setter
    // this._dataStoreService.setDataTable = sendDataTable;
    // this._dataStoreService.dataGraph = sendDataGraph;

    await this._tableIngresosService.loadDataForTypeClasification(isIncome, tipoClasificacion,);

    if (isIncome) {
      this._dataStoreService.IsDetails = false;
      this._router.navigateByUrl('/tableIngresos')
    } else {
      this._router.navigateByUrl('/tableGastos')
    }

  }

}