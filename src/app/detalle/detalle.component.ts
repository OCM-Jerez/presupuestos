import { Component } from '@angular/core';
import { CLASIFICATION_TYPE } from '../commons/util/util';
import { TableService } from '../services/table.service';

@Component({
    selector: 'app-detalle-presupuesto',
    templateUrl: './detalle.component.html',
    styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent {
    idTab = 1;
    private _typeClasification: CLASIFICATION_TYPE;

    constructor(private _tableService: TableService) {}

    async hasChangeCheckbox() {
        await this._tableService.loadData(this._typeClasification);
    }

    async selectedTab(idTab: number) {
        this.idTab = idTab;
    }
}
