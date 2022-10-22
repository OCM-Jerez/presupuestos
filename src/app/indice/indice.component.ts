import { Component } from '@angular/core';
import { Router } from '@angular/router';


import { DataStoreService } from '../services/dataStore.service';
import { TableService } from '../services/table-ingresos.service';

import { CLASIFICATION_TYPE } from '../commons/util/util';
import { environment } from '../../environments/environment';

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
    private _tableService: TableService
  ) { }

  async openTable(tipoClasificacion: CLASIFICATION_TYPE): Promise<void> {
    const isIncome = tipoClasificacion.startsWith('ingresos');
    await this._tableService.loadDataForTypeClasification(isIncome, tipoClasificacion,);

    if (isIncome) {
      this._dataStoreService.IsDetails = false;
      this._router.navigateByUrl('/tableIngresos')
    } else {
      this._router.navigateByUrl('/tableGastos')
    }

  }

}