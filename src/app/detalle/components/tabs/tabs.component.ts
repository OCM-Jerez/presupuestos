import { NgClass, NgFor } from '@angular/common';
import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';

import { TabComponent } from './tab/tab.component';

import { SelectedTabService } from '@services/selectedTab.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: true,
  imports: [NgFor, NgClass]
})
export class TabsComponent implements AfterContentInit {
  // El operador de aserción de no nulo ! se utiliza para asegurar
  // que la variable tabs no será nula en tiempo de ejecución.
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;

  // public tabSignal = signal<CLASIFICATION_TYPE>('ingresosEconomicaEconomicos');

  constructor(private _selectedTabService: SelectedTabService) {}

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
      '¿Para qué se gasta?': 'gastosEconomicaEconomicos'
    };

    // this.tabSignal.set(tabDataMap[tab.title]);
    this._selectedTabService.setSelectedTab(tabDataMap[tab.title]);
    // const clasificationType: CLASIFICATION_TYPE = tabDataMap[tab.title];
    // this._selectedTabService.setSelectedTab(clasificationType);
  }
}
