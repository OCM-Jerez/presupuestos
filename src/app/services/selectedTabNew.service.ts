import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SelectedTabNewService {
    private SelectedTabNew = new BehaviorSubject<number>(1);
    source$ = this.SelectedTabNew.asObservable();

    setSelectedTabNew(selectedTabNew: number) {
        this.SelectedTabNew.next(selectedTabNew);
    }
}
