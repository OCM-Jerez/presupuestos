import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TabStateService {
    private tabState = {
        tab1: {
            buttonName: 'Por programa'
        },
        tab2: {
            buttonName: 'Por política'
        },
        tab3: {
            buttonName: 'Por artículo'
        },
        tab4: {
            buttonName: 'Por artículo'
        }
    };

    constructor() { }

    setTabState(tabName: string, buttonName: string) {
        console.log('setTabState', tabName, buttonName);

        // if (!this.tabState[tabName]) {
        //     this.tabState[tabName] = {};
        // }
        this.tabState[tabName].buttonName = buttonName;
    }

    getTabState(tabName: string) {
        console.log('getTabState', tabName, this.tabState[tabName]);

        return this.tabState[tabName] ? this.tabState[tabName].buttonName : null;
    }
}