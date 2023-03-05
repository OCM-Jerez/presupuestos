import { Injectable } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SelectedTabService {
    private SelectedTab = new Subject<string>();
    source$ = this.SelectedTab.asObservable().pipe(debounceTime(500));

    setSelectedTab(selectedTab: string) {
        this.SelectedTab.next(selectedTab);
    }
}
