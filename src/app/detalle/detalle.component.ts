import { Component } from '@angular/core';

@Component({
    selector: 'app-detalle-presupuesto',
    templateUrl: './detalle.component.html',
    styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent {
    constructor() {}

    async hasChangeCheckbox() {
        // await this._tableService.loadData(this._typeClasification);
    }
}
