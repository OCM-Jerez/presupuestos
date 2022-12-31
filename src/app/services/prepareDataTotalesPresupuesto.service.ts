import { Injectable } from '@angular/core';
import { IDataTotalesPresupuesto } from '../commons/interfaces/dataTotalesPresupuesto. interface';
import { DataStoreService } from './dataStore.service';
// import { TableService } from './table.service';

@Injectable({
  providedIn: 'root'
})
export class PrepareDataTotalesPresupuestoService {
  private _totalPresupuestoIngresos: any;
  private _totalPresupuestoGastos: any;

  constructor(
    // private _tableService: TableService,
    private _dataStoreService: DataStoreService,
  ) { }

  async calcTotales() {
    await this.calcPresupuestoIngresos();
    await this.calcPresupuestoGastos();
    // await no funciona
    // Si no se hacen los dos setTimeout no funciona
    // setTimeout(() => {
    //   this.calcPresupuestoIngresos();
    // }, 0);

    // setTimeout(() => {
    //   this.calcPresupuestoGastos();
    // }, 0);

    this.setTotalesPresupuesto();
  }

  async calcPresupuestoIngresos() {
    // await this._tableService.loadData('ingresosEconomicaArticulos');


    // this._totalPresupuestoIngresos = this._dataStoreService.getDataTable.rowData.reduce((acc, curr) => {
    //   Object.keys(curr).forEach((key, index) => {
    //     if (!acc[key]) {
    //       acc[key] = 0
    //     }
    //     acc[key] += curr[key]
    //   })
    //   return acc
    // }, {})
    // console.log(this._totalPresupuestoIngresos);

    // Propuesto por ChatGPT
    // Este código utiliza un bucle for en lugar de la función reduce para
    // iterar sobre las filas de la tabla de datos. Esto puede mejorar el 
    // rendimiento ya que evita la creación de una función anónima en cada
    // iteración del bucle. Además, se utiliza un bucle for-in en lugar de 
    //la función Object.keys para iterar sobre las claves del objeto que
    // representa la fila de datos actual, lo que también puede mejorar el rendimiento.
    this._totalPresupuestoIngresos = {};
    // const exclude = [
    //   'CodArt',
    //   'CodEco',
    //   'DerechosAnulados2022',
    //   'DerechosCancelados2022',
    //   'DerechosPendienteCobro2022',
    //   'DerechosReconocidos2022',
    //   'DesArt',
    //   'DiferenciaPrevision2022',
    //   'Iniciales2022',
    //   'Modificaciones2022',
    //   'RecaudacionNeta2022'
    // ];

    const include = [
      'Definitivas2022',
      'DerechosReconocidosNetos2022'
    ]

    // Iterar sobre cada fila de la tabla de datos
    console.log(this._dataStoreService.dataTable);
    const rowDataIngresos = await this._dataStoreService.dataTable.rowDataIngresos;

    for (const row of rowDataIngresos) {
      // Iterar sobre cada clave del objeto que representa la fila actual
      for (const key in row) {
        // if (!exclude.includes(key)) {
        if (include.includes(key)) {
          // Si la clave no existe en el objeto que almacena el total de ingresos,
          // se inicializa en cero
          if (!this._totalPresupuestoIngresos[key]) {
            this._totalPresupuestoIngresos[key] = 0;
          }
          // Se suma el valor de la clave al total
          this._totalPresupuestoIngresos[key] += row[key];
        }
      }
    }
  }

  async calcPresupuestoGastos() {
    // await this._tableService.loadData('gastosOrganicaOrganicos');
    this._totalPresupuestoGastos = {};
    const include = [
      'Definitivas2022',
      'Pagos2022'
    ]

    for (const row of this._dataStoreService.dataTable.rowDataGastos) {
      for (const key in row) {
        if (include.includes(key)) {
          if (!this._totalPresupuestoGastos[key]) {
            this._totalPresupuestoGastos[key] = 0;
          }
          this._totalPresupuestoGastos[key] += row[key];
        }
      }
    }
  }

  async setTotalesPresupuesto() {
    try {
      const DataTotalesPresupuesto: IDataTotalesPresupuesto = {
        year: 2022,
        totalPresupuestoIngresos: this._totalPresupuestoIngresos.Definitivas2022.toLocaleString(),
        totalEjecutadoIngresos: this._totalPresupuestoIngresos.DerechosReconocidosNetos2022.toLocaleString(),
        totalPresupuestoGastos: this._totalPresupuestoGastos.Definitivas2022.toLocaleString(),
        totalEjecutadoGastos: this._totalPresupuestoGastos.Pagos2022.toLocaleString(),
      }
      this._dataStoreService.dataTotalesPresupuesto = DataTotalesPresupuesto;
    } catch (error) {
      // console.clear();
      console.error('error------------------- ', error);
      console.log(this._totalPresupuestoIngresos);
      console.log(this._totalPresupuestoGastos);
    }
  }
}
