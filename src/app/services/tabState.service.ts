import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TabStateService {
    // private tabState = {
    //     tab1: {
    //         buttonName: 'Por programa'
    //     },
    //     tab2: {
    //         buttonName: 'Por política'
    //     },
    //     tab3: {
    //         buttonName: 'Por artículo'
    //     },
    //     tab4: {
    //         buttonName: 'Por artículo'
    //     }
    // };

    private tabState: IConfigTag[] = [{
        tabSelected: 'tab1',
        subTabSelected: 'por capitulo',
        optionRadioSelected: 'presupuestado'
    },
    {
        tabSelected: 'tab2',
        subTabSelected: 'Por política',
    },
    {
        tabSelected: 'tab3',
    },
    {
        tabSelected: 'tab4',
        subTabSelected: 'Por artículo',
    }

    ]

    constructor() { }

    setTabState(tabName: string, subTabSelected: string, optionRadioSelected?: string) {
        //console.log('setTabState', tabName, buttonName);

        // if (!this.tabState[tabName]) {
        //     this.tabState[tabName] = {};
        // }
        //this.tabState[0].subTabSelected = subTabSelected;
        const tab = this.tabState.find((tab) => tab.tabSelected === tabName);
        tab.subTabSelected = subTabSelected;
        if (tab.optionRadioSelected) {
            tab.optionRadioSelected = optionRadioSelected;
        }
    }

    getTabState(tabName: string): IConfigTag {
        return this.tabState.find((tab) => tab.tabSelected === tabName)
    }
}

interface IConfigTag {
    tabSelected: string,
    subTabSelected?: string
    optionRadioSelected?: string
}