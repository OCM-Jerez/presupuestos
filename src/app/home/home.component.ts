import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataStoreService } from '../services/dataStore.service';
import { TableService } from '../services/table.service';

import { IDataTable } from '../commons/interfaces/dataTable.interface';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private _dataTable: IDataTable;
  private _arrRandom: number[] = [];
  public textEjemplo1: string;
  public textEjemplo2: string;
  public textEjemplo3: string;
  public valueEjemplo1: number;
  public valueEjemplo2: number;
  public valueEjemplo3: number;

  constructor(
    private _router: Router,
    private _dataStoreService: DataStoreService,
    private _tableService: TableService
  ) { }

  ngOnInit(): void {
    this._loadData()
  }

  private async _loadData(): Promise<void> {
    await this._tableService.loadDataForTypeClasification(true, 'ingresosEconomicaArticulos');
    this._dataTable = this._dataStoreService.getDataTable
    var data = this._dataTable.rowData;

    this.random(1, data.length);
    const index1 = this._arrRandom[0];
    const index2 = this._arrRandom[1];
    const index3 = this._arrRandom[2];

    this.textEjemplo1 = data[index1].DesArt
    this.valueEjemplo1 = data[index1].Definitivas2022.toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    this.textEjemplo2 = data[index2].DesArt
    this.valueEjemplo2 = data[index2].Definitivas2022.toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    this.textEjemplo3 = data[index3].DesArt
    this.valueEjemplo3 = data[index3].Definitivas2022.toString()
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


