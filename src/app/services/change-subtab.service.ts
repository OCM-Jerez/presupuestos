import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface IChangeSubTab {
    codField: string;
    desField: string;
}
@Injectable({
    providedIn: 'root',
})
export class ChangeSubTabService {
    private _changeSubTab = new BehaviorSubject<any>({ codField: 'CodEco', desField: 'DesEco' } as IChangeSubTab);
    source$ = this._changeSubTab.asObservable();

    changeSubTab(codField: string, desField: string) {
        this._changeSubTab.next({ codField, desField });
    }
}
