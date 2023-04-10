import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface IChangeSubTab {
    codField: string;
    desField: string;
}
@Injectable({
    providedIn: 'root',
})
export class ChangeSubTabService {
    private _changeSubTab = new Subject<IChangeSubTab>();
    source$ = this._changeSubTab.asObservable();

    changeSubTab(codField: string, desField: string) {
        this._changeSubTab.next({ codField, desField });
    }
}
