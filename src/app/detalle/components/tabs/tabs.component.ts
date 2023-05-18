import { NgClass, NgFor } from '@angular/common';
import { AfterContentInit, Component, ContentChildren, OnDestroy, QueryList } from '@angular/core';

import { TabComponent } from './tab/tab.component';

import { Subject, takeUntil } from 'rxjs';

import { DataStoreTabService } from '@services/dataStoreTab.service';

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

  clickTab(tab: TabComponent): void {
    this.setActiveTab(tab);

    this._dataStoreTabService.setTab({
      clasificationType: tab.clasification
    });
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
