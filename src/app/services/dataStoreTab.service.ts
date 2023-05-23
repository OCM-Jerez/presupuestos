import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ITab } from '@interfaces/tab.interface';

@Injectable({
	providedIn: 'root'
})
export class DataStoreTabService {
	private tabSubject: BehaviorSubject<ITab>;

	constructor() {
		// Initialize with a default tab
		this.tabSubject = new BehaviorSubject<ITab>({
			clasificationType: 'ingresosEconomicaEconomicos'
		});
	}

	getTab(): Observable<ITab> {
		return this.tabSubject.asObservable();
	}

	setTab(tab: ITab): void {
		this.tabSubject.next(tab);
	}
}
