import { Injectable } from '@angular/core';
import { IDataTable } from '../commons/interfaces/dataTable.interface';
import { IDataTotalesPresupuesto } from '../commons/interfaces/dataTotalesPresupuesto. interface';
import { DataStoreService } from './dataStore.service';
import { TableService } from './table.service';

@Injectable({
  providedIn: 'root'
})
export class PrepareDataTotalesPresupuestoService {
  private _dataTable: IDataTable;
  constructor(
    private _tableService: TableService,
    private _dataStoreService: DataStoreService,
  ) { }

  async calcTotales() {
    await this._tableService.loadDataForTypeClasification(true, 'ingresosEconomicaArticulos');
    this._dataTable = this._dataStoreService.getDataTable
    var dataIngresos = this._dataTable.rowData;

    const totalPresupuestoIngresos = dataIngresos.reduce((acc, curr) => {
      Object.keys(curr).forEach((key, index) => {
        if (!acc[key]) {
          acc[key] = 0
        }
        acc[key] += curr[key]
      })
      return acc
    }, {})
    console.log(totalPresupuestoIngresos);


    await this._tableService.loadDataForTypeClasification(false, 'gastosOrganicaOrganicos');
    this._dataTable = this._dataStoreService.getDataTable
    var dataGastos = this._dataTable.rowData;
    const totalPresupuestoGastos = dataGastos.reduce((acc, curr) => {
      Object.keys(curr).forEach((key, index) => {
        if (!acc[key]) {
          acc[key] = 0
        }
        acc[key] += curr[key]
      })
      return acc
    }, {})

    const DataTotalesPresupuesto: IDataTotalesPresupuesto = {
      year: 2022,
      totalPresupuestoIngresos: totalPresupuestoIngresos.Definitivas2022.toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'),
      totalEjecutadoIngresos: totalPresupuestoIngresos.DerechosReconocidosNetos2022.toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'),
      totalPresupuestoGastos: totalPresupuestoGastos.Definitivas2022.toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'),
      totalEjecutadoGastos: totalPresupuestoGastos.Pagos2022.toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'),
    }
    this._dataStoreService.setDataTotalesPresupuesto = DataTotalesPresupuesto;
  }
}
