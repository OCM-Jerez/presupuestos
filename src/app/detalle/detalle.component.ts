import { Component, OnInit, inject } from '@angular/core';

import { CheckboxComponent } from '../commons/components/checkbox/checkbox.component';
import { SubtabsComponent } from './components/subtabs/subtabs.component';
import { TablePresupuestoComponent } from './components/table-presupuesto/table-presupuesto.component';
import { TableComponent } from './components/table/table.component';
import { TabComponent } from './components/tabs/tab/tab.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TreemapComponent } from './components/treemap/treemap.component';

import { NgFor, NgIf } from '@angular/common';
import { ITab } from '@interfaces/tab.interface';
import { AvalaibleYearsService } from '@services/avalaibleYears.service';
import { takeUntil, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

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
		TreemapComponent,
		NgFor,
		NgIf
	]
})
export default class DetalleComponent implements OnInit {
	private _avalaibleYearsService = inject(AvalaibleYearsService);
	// private _lengthYears = 0;
	public multiYears = true;
	private subscription: Subscription;

	public tabs: ITab[] = [
		{ clasificationType: 'ingresosEconomicaEconomicos', title: 'Ingresos', selected: true },
		{ clasificationType: 'gastosProgramaProgramas', title: '¿En qué se gasta?', selected: false },
		{ clasificationType: 'gastosOrganicaOrganicos', title: '¿Quién lo gasta?', selected: false },
		{ clasificationType: 'gastosEconomicaEconomicos', title: '¿Para qué se gasta?', selected: false }
	];

	ngOnInit(): void {
		this.subscription = this._avalaibleYearsService.yearsSubject$.subscribe((year) => {
			// this._lengthYears = year.length;
			year.length === 1 ? (this.multiYears = true) : (this.multiYears = false);
		});
	}

	async hasChangeCheckbox() {
		// await this._tableService.loadData(this._typeClasification);
	}
}
