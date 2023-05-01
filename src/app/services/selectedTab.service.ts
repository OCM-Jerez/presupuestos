import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// import { TableService } from './table.service';

@Injectable({
    providedIn: 'root',
})
export class SelectedTabService {
    private _selectedTab = new BehaviorSubject<string>('ingresosEconomicaEconomicos');
    source$ = this._selectedTab.asObservable();

    // constructor(private _tableService: TableService) {}

    setSelectedTab(tab: any) {
        // this._tableService.loadData(tab);
        this._selectedTab.next(tab);
    }

    getSelectedTab() {
        return this._selectedTab.getValue();
    }
}
