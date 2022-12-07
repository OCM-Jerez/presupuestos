import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataStoreService } from '../services/dataStore.service';
import { TableService } from '../services/table.service';

import { IDataTable } from '../commons/interfaces/dataTable.interface';
import { IDataTotalesPresupuesto } from '../commons/interfaces/dataTotalesPresupuesto. interface';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private _dataTable: IDataTable;
  private _arrRandom: number[] = [];
  textEjemplo1: string;
  textEjemplo2: string;
  textEjemplo3: string;
  valueEjemplo1: number;
  valueEjemplo2: number;
  valueEjemplo3: number;
  totalPresupuestoIngresos: number;
  totalPresupuestoGastos: number;
  totalEjecutadoIngresos: number;
  totalEjecutadoGastos: number;

  constructor(
    private _router: Router,
    private _dataStoreService: DataStoreService,
    private _tableService: TableService
  ) { }

  ngOnInit(): void {
    this._loadData()
  }

  private async _loadData(): Promise<void> {

    /* #region  Calculo totales de ingresos y gastos y los guardo en _dataStoreService  */
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
    /* #endregion */

    this.random(1, dataIngresos.length);
    const index1 = this._arrRandom[0];
    const index2 = this._arrRandom[1];
    const index3 = this._arrRandom[2];

    this.textEjemplo1 = dataIngresos[index1].DesArt
    this.valueEjemplo1 = dataIngresos[index1].Definitivas2022.toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    this.textEjemplo2 = dataIngresos[index2].DesArt
    this.valueEjemplo2 = dataIngresos[index2].Definitivas2022.toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    this.textEjemplo3 = dataIngresos[index3].DesArt
    this.valueEjemplo3 = dataIngresos[index3].Definitivas2022.toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }

  visionGlobal() {
    this._router.navigateByUrl('/home')
  }

  detallePresupuesto() {
    this._router.navigateByUrl('/detallePresupuesto')
  }

  licitaciones() {
    window.open('https://con.ocmjerez.org/', '_blank');
  }

  random(min: number, max: number) {
    while (this._arrRandom.length < 3) {
      const r = Math.floor((Math.random() * (max - min + 1)) + min);
      if (this._arrRandom.indexOf(r) === -1) this._arrRandom.push(r);
    }
  }

}


