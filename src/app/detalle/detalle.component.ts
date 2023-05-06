import { Component } from '@angular/core';
import { TableComponent } from './components/table/table.component';
import { SubtabsComponent } from './components/subtabs/subtabs.component';
import { TabComponent } from './components/tabs/tab/tab.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TreemapComponent } from './components/treemap/treemap.component';
import { TablePresupuestoComponent } from './components/table-presupuesto/table-presupuesto.component';
import { CheckboxComponent } from '../commons/components/checkbox/checkbox.component';

@Component({
    selector: 'app-detalle-presupuesto',
    templateUrl: './detalle.component.html',
    styleUrls: ['./detalle.component.scss'],
    standalone: true,
    imports: [
        CheckboxComponent,
        TablePresupuestoComponent,
        TreemapComponent,
        TabsComponent,
        TabComponent,
        SubtabsComponent,
        TableComponent,
    ],
})
export class DetalleComponent {
    constructor() {}

    async hasChangeCheckbox() {
        // await this._tableService.loadData(this._typeClasification);
    }
}
