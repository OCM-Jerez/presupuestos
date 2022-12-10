import { Injectable } from '@angular/core';
import { IDataTable } from '../commons/interfaces/dataTable.interface';
import { IDataTotalesPresupuesto } from '../commons/interfaces/dataTotalesPresupuesto. interface';
import { DataStoreService } from './dataStore.service';
import { TableService } from './table.service';

@Injectable({
  providedIn: 'root'
})
export class PrepareDataTotalesPresupuestoService {
  private _dataTableIngresos: IDataTable;
  private _dataTableGastos: IDataTable;

  private _totalPresupuestoIngresos: any;
  private _totalPresupuestoGastos: any;

  constructor(
    private _tableService: TableService,
    private _dataStoreService: DataStoreService,
  ) { }

  async calcTotales() {
    // Si no se hace el setTimeout no funciona
    setTimeout(() => {
      this.calcPresupuestoIngresos();
    }, 0);

    setTimeout(() => {
      this.calcPresupuestoGastos();
    }, 0);

    this.setTotalesPresupuesto();
  }

  async calcPresupuestoIngresos() {
    await this._tableService.loadDataForTypeClasification('ingresosEconomicaArticulos');
    // this._dataTableIngresos = this._dataStoreService.getDataTable;
    // const dataIngresos = this._dataTableIngresos.rowData;
    this._totalPresupuestoIngresos = this._dataStoreService.getDataTable.rowData.reduce((acc, curr) => {
      Object.keys(curr).forEach((key, index) => {
        if (!acc[key]) {
          acc[key] = 0
        }
        acc[key] += curr[key]
      })
      return acc
    }, {})
    // console.clear();
    // console.log(this._totalPresupuestoIngresos);
  }

  async calcPresupuestoGastos() {
    await this._tableService.loadDataForTypeClasification('gastosOrganicaOrganicos');
    // this._dataTableGastos = this._dataStoreService.getDataTable
    // const dataGastos = this._dataTableGastos.rowData;
    this._totalPresupuestoGastos = this._dataStoreService.getDataTable.rowData.reduce((acc, curr) => {
      Object.keys(curr).forEach((key, index) => {
        if (!acc[key]) {
          acc[key] = 0
        }
        acc[key] += curr[key]
      })
      return acc
    }, {})
    // console.log(this._totalPresupuestoGastos);
  }

  async setTotalesPresupuesto() {
    try {
      const DataTotalesPresupuesto: IDataTotalesPresupuesto = {
        year: 2022,
        totalPresupuestoIngresos: this._totalPresupuestoIngresos.Definitivas2022.toString()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'),
        totalEjecutadoIngresos: this._totalPresupuestoIngresos.DerechosReconocidosNetos2022.toString()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'),
        totalPresupuestoGastos: this._totalPresupuestoGastos.Definitivas2022.toString()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'),
        totalEjecutadoGastos: this._totalPresupuestoGastos.Pagos2022.toString()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'),
      }
      // console.log(DataTotalesPresupuesto);
      this._dataStoreService.setDataTotalesPresupuesto = DataTotalesPresupuesto;
    } catch (error) {
      // console.clear();
      console.error('error------------------- ', error);
      console.log(this._totalPresupuestoIngresos);
      console.log(this._totalPresupuestoGastos);
    }
  }
}
