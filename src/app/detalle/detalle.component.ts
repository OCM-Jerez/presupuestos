import { Component } from '@angular/core';
import { CLASIFICATION_TYPE } from '../commons/util/util';
import { ChangeSubTabService } from '../services/change-subtab.service';
import { SelectedSubTab1Service } from '../services/selectedSubTab1.service';
import { SelectedTabNewService } from '../services/selectedTabNew.service';
import { TableService } from '../services/table.service';

@Component({
    selector: 'app-detalle-presupuesto',
    templateUrl: './detalle.component.html',
    styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent {
    idTab = 1;
    private _typeClasification: CLASIFICATION_TYPE;

    constructor(
        private _tableService: TableService,
        private _SelectedSubTab1Service: SelectedSubTab1Service,
        private _selectedTabNewService: SelectedTabNewService,
        private _changeSubTabService: ChangeSubTabService
    ) {}

    async hasChangeCheckbox() {
        await this._tableService.loadData(this._typeClasification);
    }

    async selectedTab(idTab: number) {
        // console.log('idTab', idTab);
        // this._changeSubTabService.changeSubTab('CodEco', 'DesEco');
        this._selectedTabNewService.setSelectedTabNew(idTab);

        // this._changeSubTabService.changeSubTab('CodEco', 'DesEco');
        this.idTab = idTab;
    }
}
