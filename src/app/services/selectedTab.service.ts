import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TableService } from './table.service';

@Injectable({
    providedIn: 'root',
})
export class SelectedTabService {
    private _selectedTabNew = new BehaviorSubject<number>(1);
    source$ = this._selectedTabNew.asObservable();

    private _selectedTab = new BehaviorSubject<string>('ingresosEconomicaEconomicos');
    source1$ = this._selectedTab.asObservable();

    constructor(private _tableService: TableService) {}

    setSelectedTabNew(tab: number) {
        this._selectedTabNew.next(tab);
    }

    setSelectedTab(tab: any) {
        this._tableService.loadData(tab);
        this._selectedTab.next(tab);
    }

    getSelectedTab() {
        return this._selectedTab.getValue();
    }
}
