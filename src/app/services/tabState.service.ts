import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TabStateService {
    private tabState: IConfigTag[] = [
        {
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