import { Component } from '@angular/core';
import { SelectedTabNewService } from '../services/selectedTabNew.service';

@Component({
    selector: 'app-detalle-presupuesto',
    templateUrl: './detalle.component.html',
    styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent {
    constructor(private _selectedTabNewService: SelectedTabNewService) {}

    async hasChangeCheckbox() {
        // await this._tableService.loadData(this._typeClasification);
    }

    async selectedTab(idTab: number) {
        this._selectedTabNewService.setSelectedTabNew(idTab);
    }
}
