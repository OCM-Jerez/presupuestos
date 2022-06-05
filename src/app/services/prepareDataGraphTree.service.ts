import { Injectable } from '@angular/core';
import { Location } from "@angular/common";

import { DataStoreService } from './dataStore.service';
import { AvalaibleYearsService } from './avalaibleYears.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class PrepareDataGraphTreeService {
  private _dataGraphTree: any[] = [];
  constructor(
    private _dataStoreService: DataStoreService,
    private _avalaibleYearsService: AvalaibleYearsService,
    private _alertService: AlertService,
    private _location: Location,
  ) { }

  async prepareDataGraphTree(rowData) {
    const years = this._avalaibleYearsService.getYearsSelected();
    if (years.length > 1) {
      this._alertService.showAlert('Hay más de un año seleccionado');
      this._dataStoreService.dataGraphTree = [];
      this._location.back();
    } else {
      this._dataGraphTree = await this._getDataGraphTree(this._dataStoreService.getDataTable.clasificationType, this._dataStoreService.getDataTable.dataPropertyTable.codField, years[0], rowData);
      this._dataStoreService.dataGraphTree = this._dataGraphTree;
    }
  }

  private async _getDataGraphTree(tipoClasificacion: string, attributeSearch: string, year: number, rowData) {
    const fileJson = await import('../../assets/data/' + tipoClasificacion + '.json');
    const data = fileJson.default;

    return data.map(item => {
      const dataLastYear = rowData.filter(x => x[attributeSearch] == item.codigo);
      const sumDefinitivas = dataLastYear.filter((item) => item[`Definitivas${year}`]).reduce((prev, current) => prev + current[`Definitivas${year}`], 0);
      return { ...item, total: sumDefinitivas }
    })
  }

}
