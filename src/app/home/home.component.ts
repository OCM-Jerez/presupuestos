import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataStoreService } from '../services/dataStore.service';
import { TableService } from '../services/table.service';
import { PrepareDataTotalesPresupuestoService } from '../services/prepareDataTotalesPresupuesto.service';

import { IDataTable } from '../commons/interfaces/dataTable.interface';
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
  textoTabla: string;

  constructor(
    private _router: Router,
    private _dataStoreService: DataStoreService,
    private _tableService: TableService,
    private _prepareDataTotalesPresupuestoService: PrepareDataTotalesPresupuestoService

  ) { }

  ngOnInit(): void {
    this._loadData()
  }

  private async _loadData(): Promise<void> {
    //  Calculo totales de ingresos y gastos y los guardo en _dataStoreService  */
    this._prepareDataTotalesPresupuestoService.calcTotales();

    /* #region datos aleatorios para mostrar en tabla  */
    const ingresoGasto = (Math.random() >= 0.5) ? true : false;

    if (ingresoGasto) {
      await this._tableService.loadDataForTypeClasification(true, 'ingresosEconomicaArticulos');
      this._dataTable = this._dataStoreService.getDataTable
      var dataIngresos = this._dataTable.rowData;

      this.random(1, dataIngresos.length);
      const index1 = this._arrRandom[0];
      const index2 = this._arrRandom[1];
      const index3 = this._arrRandom[2];

      this.textoTabla = '¿Cuanto recauda el Ayuntamiento por...?'
      this.textEjemplo1 = dataIngresos[index1].DesArt
      this.valueEjemplo1 = dataIngresos[index1].Definitivas2022.toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
      this.textEjemplo2 = dataIngresos[index2].DesArt
      this.valueEjemplo2 = dataIngresos[index2].Definitivas2022.toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
      this.textEjemplo3 = dataIngresos[index3].DesArt
      this.valueEjemplo3 = dataIngresos[index3].Definitivas2022.toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    } else {
      await this._tableService.loadDataForTypeClasification(false, 'gastosOrganicaOrganicos');
      this._dataTable = this._dataStoreService.getDataTable
      var dataGastos = this._dataTable.rowData;

      this.random(1, dataGastos.length);
      const index1 = this._arrRandom[0];
      const index2 = this._arrRandom[1];
      const index3 = this._arrRandom[2];

      this.textoTabla = '¿Cuanto ha gastado la delegación de...?'
      this.textEjemplo1 = dataGastos[index1].DesOrg
      this.valueEjemplo1 = dataGastos[index1].Pagos2022.toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
      this.textEjemplo2 = dataGastos[index2].DesOrg
      this.valueEjemplo2 = dataGastos[index2].Pagos2022.toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
      this.textEjemplo3 = dataGastos[index3].DesOrg
      this.valueEjemplo3 = dataGastos[index3].Pagos2022.toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }
    /* #endregion */
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


