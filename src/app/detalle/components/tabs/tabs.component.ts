import { NgClass, NgFor } from '@angular/common';
import { AfterContentInit, Component, ContentChildren, OnDestroy, QueryList } from '@angular/core';

import { TabComponent } from './tab/tab.component';

import { Subject, takeUntil } from 'rxjs';

import { ITab } from '@interfaces/tab.interface';
import { DataStoreTabService } from '../../../services/dataStoreTab.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: true,
  imports: [NgFor, NgClass]
})
export class TabsComponent implements AfterContentInit, OnDestroy {
  // El operador de aserción de no nulo ! se utiliza para asegurar
  // que la variable tabs no será nula en tiempo de ejecución.
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;
  private _tabSelected: ITab;
  private _unsubscribe$ = new Subject<void>();
  private tabDataMap = {
    Ingresos: 'ingresosEconomicaEconomicos',
    '¿En qué se gasta?': 'gastosProgramaProgramas',
    '¿Quién lo gasta?': 'gastosOrganicaOrganicos',
    '¿Para qué se gasta?': 'gastosEconomicaEconomicos'
  };

  constructor(private _dataStoreTabService: DataStoreTabService) {
    this._dataStoreTabService
      .getTab()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((storeTab) => {
        this._tabSelected = storeTab;
      });
  }

  ngAfterContentInit(): void {
    this.setActiveTab();
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  async clickTab(tab: TabComponent): Promise<void> {
    this.setActiveTab(tab);

    this._dataStoreTabService.setTab({
      clasificationType: this.tabDataMap[tab.title],
      // name: '',
      // key: '',
      selected: false
    });
  }

  private setActiveTab(tab?: TabComponent): void {
    const tabsArray = this.tabs.toArray();
    tabsArray.forEach((t) => {
      if (tab ? t.title === tab.title : this.tabDataMap[t.title] === this._tabSelected.clasificationType) {
        t.active = true;
      } else {
        t.active = false;
      }
    });
  }
}
