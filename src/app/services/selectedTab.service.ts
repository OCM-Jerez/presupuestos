import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SelectedTabService {
    private SelectedTab = new BehaviorSubject<string>('tab1');

    setSelectedTab(selectedTab: string) {
        this.SelectedTab.next(selectedTab);
    }

    getSelectedTab() {
        return this.SelectedTab.asObservable();
    }
}
