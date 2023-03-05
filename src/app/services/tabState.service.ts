import { Injectable } from '@angular/core';
import { TYPE_TAB } from '../commons/types/tabs.type';

@Injectable({
    providedIn: 'root',
})
export class TabStateService {
    private tabState: IConfigTag[] = [
        {
            tabName: 'tab1',
            subTabSelected: 'Por capitulo',
            optionRadioSelected: 'presupuestado',
            selected: true,
        },
        {
            tabName: 'tab2',
            subTabSelected: 'Por política',
            selected: false,
        },
        {
            tabName: 'tab3',
            selected: false,
        },
        {
            tabName: 'tab4',
            subTabSelected: 'Por artículo',
            selected: false,
        },
    ];

    selectedTabPrincipal(tabName: TYPE_TAB) {
        this.tabState.forEach((tab) => (tab.selected = false));
        this.tabState.find((tab) => tab.tabName === tabName).selected = true;
    }

    setTabState(subTabSelected: string, optionRadioSelected?: string) {
        const tab = this.tabState.find((tab) => tab.selected);
        tab.subTabSelected = subTabSelected;
        if (tab.optionRadioSelected) {
            tab.optionRadioSelected = optionRadioSelected;
        }
    }
    getTabState(): IConfigTag {
        return this.tabState.find((tab) => tab.selected);
    }
}

interface IConfigTag {
    tabName: string;
    subTabSelected?: string;
    optionRadioSelected?: string;
    selected?: boolean;
}
