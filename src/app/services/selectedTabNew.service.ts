import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SelectedTabNewService {
    private _selectedTabNew = new BehaviorSubject<number>(1);
    source$ = this._selectedTabNew.asObservable();

    setSelectedTabNew(tab: number) {
        this._selectedTabNew.next(tab);
    }
}
