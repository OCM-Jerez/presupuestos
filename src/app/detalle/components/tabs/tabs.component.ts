import { NgClass, NgFor } from '@angular/common';
import { AfterContentInit, Component, ContentChildren, OnDestroy, QueryList } from '@angular/core';

import { TabComponent } from './tab/tab.component';

import { Subject, takeUntil } from 'rxjs';

import { DataStoreSubtabService } from '@services/dataStoreSubtab.service';
import { DataStoreTabService } from '@services/dataStoreTab.service';
import { ReloadTableService } from '@services/reloadTable.service';

import { CLASIFICATION_TYPE } from '@appTypes/clasification.type';
import { ITab } from '@interfaces/tab.interface';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: true,
  imports: [NgFor, NgClass]
})
export class TabsComponent implements AfterContentInit, OnDestroy {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  private _tabSelected: ITab;
  private _unsubscribe$ = new Subject<void>();

  constructor(
    private _dataStoreTabService: DataStoreTabService,
    private _dataStoreSubtabService: DataStoreSubtabService,
    private _reloadTableService: ReloadTableService
  ) {
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

  clickTab(tab: TabComponent): void {
    this.setActiveTab(tab);

    this._dataStoreTabService.setTab({
      clasificationType: tab.clasification
    });

    let data = {
      clasificationType: 'gastosProgramaProgramas' as CLASIFICATION_TYPE,
      codField: 'CodPro',
      desField: 'DesPro',
      key: 'gastosProgramaProgramas',
      name: 'Por programa',
      selected: true
    };

    switch (tab.clasification) {
      case 'gastosProgramaProgramas':
        data = {
          clasificationType: 'gastosProgramaProgramas' as CLASIFICATION_TYPE,
          codField: 'CodPro',
          desField: 'DesPro',
          key: 'gastosProgramaProgramas',
          name: 'Por programa',
          selected: true
        };
        break;
      case 'gastosOrganicaOrganicos':
        data = {
          clasificationType: 'gastosOrganicaOrganicos' as CLASIFICATION_TYPE,
          codField: 'CodOrg',
          desField: 'DesOrg',
          key: 'gastosOrganicaOrganicos',
          name: 'Por programa',
          selected: true
        };
        break;
      case 'gastosEconomicaEconomicos':
        data = {
          clasificationType: 'gastosEconomicaEconomicos' as CLASIFICATION_TYPE,
          name: 'Por económico',
          key: 'gastosEconomicaEconomicos',
          codField: 'CodEco',
          desField: 'DesEco',
          selected: true
        };
        break;

      default:
        break;
    }

    this._dataStoreSubtabService.setData(data);

    this._reloadTableService.triggerReloadTable();
  }

  private setActiveTab(tab?: TabComponent): void {
    this.tabs.toArray().forEach((t) => {
      if (tab ? t.title === tab.title : t.clasification === this._tabSelected.clasificationType) {
        t.active = true;
      } else {
        t.active = false;
      }
    });
  }
}
