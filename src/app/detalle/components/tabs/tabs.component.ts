import { AfterContentInit, Component, ContentChildren, OnDestroy, QueryList, inject } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';

import { Subject, takeUntil } from 'rxjs';

import { TabComponent } from './tab/tab.component';

import { DataStoreSubtabService } from '@services/dataStoreSubtab.service';
import { DataStoreTabService } from '@services/dataStoreTab.service';

import { ISubtabClasification } from '@interfaces/subtabClasification.interface';
import { ITab } from '@interfaces/tab.interface';

@Component({
	selector: 'app-tabs',
	templateUrl: './tabs.component.html',
	styleUrls: ['./tabs.component.scss'],
	standalone: true,
	imports: [NgFor, NgClass]
})
export class TabsComponent implements AfterContentInit, OnDestroy {
	private _dataStoreSubtabService = inject(DataStoreSubtabService);
	private _dataStoreTabService = inject(DataStoreTabService);

	@ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
	private _tabSelected: ITab;
	private _subtabSelected: ISubtabClasification;
	private _unsubscribe$ = new Subject<void>();

	constructor() {
		this._dataStoreTabService
			.getTab()
			.pipe(takeUntil(this._unsubscribe$))
			.subscribe((storeTab) => {
				this._tabSelected = storeTab;
			});
	}

	ngAfterContentInit(): void {
		this.setActiveTab();
	}

	ngOnDestroy() {
		this._unsubscribe$.next();
		this._unsubscribe$.complete();
	}

	clickTab(tab: TabComponent): void {
		this.setActiveTab(tab);
		this._dataStoreTabService.setTab({
			clasificationType: tab.clasification
		});

		// Tengo que recuperar el subtab seleccionado en el tab actual
		switch (tab.clasification) {
			case 'ingresosEconomicaEconomicos':
				this._subtabSelected = this._dataStoreSubtabService.getData1();
				break;
			case 'gastosProgramaProgramas':
				this._subtabSelected = this._dataStoreSubtabService.getData2();
				break;
			case 'gastosOrganicaOrganicos':
				this._subtabSelected = this._dataStoreSubtabService.getData3();
				break;
			case 'gastosEconomicaEconomicos':
				this._subtabSelected = this._dataStoreSubtabService.getData4();
				break;
		}
	}

	private setActiveTab(tab?: TabComponent): void {
		this.tabs.toArray().forEach((t) => {
			if (tab ? t.title === tab.title : t.clasification === this._tabSelected.clasificationType) {
				t.active = true;
			} else {
				t.active = false;
			}
		});
	}
}
