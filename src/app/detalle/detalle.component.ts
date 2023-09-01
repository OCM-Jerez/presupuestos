import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { Subscription } from 'rxjs';

import { CheckboxComponent } from '../commons/components/checkbox/checkbox.component';
import { SubtabsComponent } from './components/subtabs/subtabs.component';
import { TablePresupuestoComponent } from './components/table-presupuesto/table-presupuesto.component';
import { TableComponent } from './components/table/table.component';
import { TabComponent } from '@app/commons/components/tabs/tab/tab.component';
import { TabsComponent } from '@app/commons/components/tabs/tabs.component';
import { TreemapComponent } from './components/treemap/treemap.component';

import { AvalaibleYearsService } from '@services/avalaibleYears.service';

import { ITab } from '@interfaces/tab.interface';

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
export default class DetalleComponent implements OnInit, OnDestroy {
	public multiYears = true;
	public tabs: ITab[] = [
		{ clasificationType: 'ingresosEconomicaEconomicos', title: 'Ingresos', selected: true, isFicha: false },
		{ clasificationType: 'gastosProgramaProgramas', title: '¿Para qué se gasta?', selected: false, isFicha: false },
		{ clasificationType: 'gastosOrganicaOrganicos', title: '¿Quién lo gasta?', selected: false, isFicha: false },
		{ clasificationType: 'gastosEconomicaEconomicos', title: '¿En qué se gasta?', selected: false, isFicha: false }
	];
	private _avalaibleYearsService = inject(AvalaibleYearsService);
	private _subscription: Subscription;

	ngOnInit(): void {
		this._subscription = this._avalaibleYearsService.yearsSubject$.subscribe((year) => {
			year.length === 1 ? (this.multiYears = true) : (this.multiYears = false);
		});
	}

	ngOnDestroy() {
		this._subscription.unsubscribe();
	}
}
