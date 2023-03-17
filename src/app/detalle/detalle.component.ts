import { Component } from '@angular/core';

import { TableService } from '../services/table.service';

import { CLASIFICATION_TYPE } from '../commons/util/util';

@Component({
    selector: 'app-detalle-presupuesto',
    templateUrl: './detalle.component.html',
    styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent {
    private _typeClasification: CLASIFICATION_TYPE;

    constructor(private _tableService: TableService) {}

    async hasChangeCheckbox() {
        let data = await this._tableService.loadData(this._typeClasification);
    }
}
