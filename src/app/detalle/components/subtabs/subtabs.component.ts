import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';

import { ISubtabClasification } from '@interfaces/subtabClasification.interface';
import { DataStoreSubtabService } from '@services/dataStoreSubtab.service';
import { DataStoreTabService } from '@services/dataStoreTab.service';
import { HasRowClicked } from '@services/hasRowClicked.service';
import { ReloadTableService } from '@services/reloadTable.service';

import { getClasificacion } from '@app/data-table';
import { CLASIFICATION_TYPE } from '@appTypes/clasification.type';
import { ISubtabAdicional } from '@interfaces/subtabAdicional.interface';
@Component({
  selector: 'app-subtabs',
  templateUrl: './subtabs.component.html',
  styleUrls: ['./subtabs.component.scss'],
  standalone: true,
  imports: [NgFor, NgClass, NgIf, AsyncPipe]
})
export class SubtabsComponent implements OnInit, OnDestroy {
  public hasRowClicked$ = this._hasRowClicked.currentHasRowClicked;
  public isDisabled = true;
  public subtabs: ISubtabClasification[] = [];
  public subtabsAdditional: ISubtabAdicional[] = [];
  private _selectedSubtab: ISubtabClasification;
  private _tabSelected: string;
  private _unsubscribe$ = new Subject<void>();

  constructor(
    private _router: Router,
    private _dataStoreSubtabService: DataStoreSubtabService,
    private _dataStoreTabService: DataStoreTabService,
    private _hasRowClicked: HasRowClicked,
    private _reloadTableService: ReloadTableService
  ) {}

  async ngOnInit(): Promise<void> {
    const clasification = getClasificacion('ingresosEconomicaEconomicos');
    this.subtabs = clasification.subtabs;
    this.subtabsAdditional = clasification.subtabsAdditional;
    this.subscribeToServices();
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  async clickSubtab(event: ISubtabClasification): Promise<void> {
    console.log(event);
    const subtabName = event.name;
    this.subtabs.forEach((b) => (b.selected = false));

    if (this._selectedSubtab) {
      this._selectedSubtab.selected = false;
    }

    event.selected = true;

    switch (this._tabSelected) {
      case 'ingresosEconomicaEconomicos':
        this._dataStoreSubtabService.setData1(event);
        break;
      case 'gastosProgramaProgramas':
        this._dataStoreSubtabService.setData2(event);
        break;
      case 'gastosOrganicaOrganicos':
        this._dataStoreSubtabService.setData3(event);
        break;
      case 'gastosEconomicaEconomicos':
        this._dataStoreSubtabService.setData4(event);
        break;
    }

    this._reloadTableService.triggerReloadTable();
  }

  clickSubtabAditional(event: ISubtabAdicional) {
    const path = event.param ? event.path + '/' + event.param : event.path;
    this._router.navigateByUrl(path);
  }

  subscribeToServices(): void {
    this._dataStoreTabService
      .getTab()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((storeTab) => {
        this._tabSelected = storeTab.clasificationType;
        const clasification = getClasificacion(this._tabSelected as CLASIFICATION_TYPE);
        this.subtabs = clasification.subtabs;
        console.log(this.subtabs);
        this.subtabsAdditional = clasification.subtabsAdditional;
      });
  }
}
