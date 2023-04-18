import { Component } from '@angular/core';
import { SelectedTabService } from '../services/selectedTab.service';

@Component({
    selector: 'app-detalle-presupuesto',
    templateUrl: './detalle.component.html',
    styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent {
    constructor(private _selectedTabNewService: SelectedTabService) {}

    async hasChangeCheckbox() {
        // await this._tableService.loadData(this._typeClasification);
    }

    async selectedTab(idTab: number) {
        this._selectedTabNewService.setSelectedTabNew(idTab);
    }
}
