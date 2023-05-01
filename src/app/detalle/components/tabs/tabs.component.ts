import { AfterContentInit, Component, ContentChildren, OnInit, QueryList } from '@angular/core';

import { TabComponent } from './tab/tab.component';

import { SelectedTabService } from '@services/selectedTab.service';

import { CLASIFICATION_TYPE } from '@appTypes/clasification.type';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit, AfterContentInit {
    // El operador de aserción de no nulo ! se utiliza para asegurar
    // que la variable tabs no será nula en tiempo de ejecución.
    @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;

    constructor(private _selectedTabService: SelectedTabService) {}
    async ngOnInit(): Promise<void> {}

    ngAfterContentInit(): void {
        const activeTabs = this.tabs.filter((tab) => tab.active);
        if (activeTabs.length === 0) {
            this.tabs.first.active = true;
        }
    }

    async clickTab(tab: TabComponent): Promise<void> {
        const tabs = this.tabs.toArray();
        const tabActive = tabs.find((tab) => tab.active);

        if (tabActive && tabActive.title !== tab.title) {
            this.tabs.toArray().forEach((tab) => (tab.active = false));
            tab.active = true;
        }

        const tabDataMap = {
            Ingresos: 'ingresosEconomicaEconomicos',
            '¿En qué se gasta?': 'gastosProgramaProgramas',
            '¿Quién lo gasta?': 'gastosOrganicaOrganicos',
            '¿Para qué se gasta?': 'gastosEconomicaEconomicos',
        };

        const clasificationType: CLASIFICATION_TYPE = tabDataMap[tab.title];
        this._selectedTabService.setSelectedTab(clasificationType);
    }
}
