import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TableService } from '../services/table.service';

import { CLASIFICATION_TYPE } from '../commons/util/util';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-indice-new',
  templateUrl: './indice.component.html',
  styleUrls: ['./indice.component.scss']
})
export class IndiceComponent {
  public liqDate = environment.liqDate;
  // https://stackoverflow.com/questions/69549927/how-to-pass-enum-value-in-angular-template-as-an-input
  constructor(
    private _router: Router,
    private _tableService: TableService
  ) { }

  async openTable(tipoClasificacion: CLASIFICATION_TYPE): Promise<void> {
    const isIncome = tipoClasificacion.startsWith('ingresos');
    await this._tableService.loadDataForTypeClasification(isIncome, tipoClasificacion,);

    if (isIncome) {
      this._router.navigateByUrl('/tableIngresos')
    } else {
      this._router.navigateByUrl('/tableGastos')
    }

  }

}