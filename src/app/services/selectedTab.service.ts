import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SelectedTabService {
    private SelectedTab = new Subject<string>();

    setSelectedTab(selectedTab: string) {
        this.SelectedTab.next(selectedTab);
    }

    getSelectedTab() {
        return this.SelectedTab.asObservable();
    }
}
