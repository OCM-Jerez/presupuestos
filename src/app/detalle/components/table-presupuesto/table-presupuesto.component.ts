import { Component, OnInit } from '@angular/core';

import { AvalaibleYearsService } from '@services/avalaibleYears.service';
import { DataStoreService } from '@services/dataStore.service';
import { PrepareDataTotalesPresupuestoService } from '@services/prepareDataTotalesPresupuesto.service';

import { environment } from '@environments/environment';

import { IDataTotalesPresupuesto } from '@interfaces/dataTotalesPresupuesto.interface';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-table-presupuesto',
  templateUrl: './table-presupuesto.component.html',
  styleUrls: ['./table-presupuesto.component.scss'],
  standalone: true,
  imports: [NgIf]
})
export class TablePresupuestoComponent implements OnInit {
  public showTablePresupuesto = true;
  public liqDate = environment.liqDate2023;
  public DataTotalesPresupuesto: IDataTotalesPresupuesto = {
    year: '2023',
    totalPresupuestoIngresos: '0',
    totalPresupuestoGastos: '0',
    totalEjecutadoIngresos: '0',
    totalEjecutadoGastos: '0'
  };
  constructor(
    private _dataStoreService: DataStoreService,
    private _avalaibleYearsService: AvalaibleYearsService,
    private _prepareDataTotalesPresupuestoService: PrepareDataTotalesPresupuestoService
  ) {}

  async ngOnInit(): Promise<void> {
    // Si se recarga la pagina hay que volver a calcular los totales.
    await this._prepareDataTotalesPresupuestoService.calcTotales();
    this.DataTotalesPresupuesto = this._dataStoreService.dataTotalesPresupuesto;

    let years = this._avalaibleYearsService.getYearsSelected();
    if (years.length === 1 && years[0] === 2023) {
      this.showTablePresupuesto = true;
    } else {
      this.showTablePresupuesto = false;
    }
  }
}
