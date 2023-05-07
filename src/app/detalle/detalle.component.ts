import { Component } from '@angular/core';
import { CheckboxComponent } from '../commons/components/checkbox/checkbox.component';
import { SubtabsComponent } from './components/subtabs/subtabs.component';
import { TablePresupuestoComponent } from './components/table-presupuesto/table-presupuesto.component';
import { TableComponent } from './components/table/table.component';
import { TabComponent } from './components/tabs/tab/tab.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TreemapComponent } from './components/treemap/treemap.component';

@Component({
	selector: 'app-detalle',
	templateUrl: './detalle.component.html',
	styleUrls: ['./detalle.component.scss'],
	standalone: true,
	imports: [
		CheckboxComponent,
		SubtabsComponent,
		TabComponent,
		TableComponent,
		TablePresupuestoComponent,
		TabsComponent,
		TreemapComponent
	]
})
export class DetalleComponent {
	async hasChangeCheckbox() {
		// await this._tableService.loadData(this._typeClasification);
	}
}
