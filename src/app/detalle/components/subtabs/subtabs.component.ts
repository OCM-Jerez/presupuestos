import { AsyncPipe, JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';

import { CLASIFICATION_TYPE } from '@appTypes/clasification.type';

import { getClasificacion } from '@app/data-table';

import { ISubtabClasification } from '@interfaces/subtabClasification.interface';
import { DataStoreSubtabService } from '@services/dataStoreSubtab.service';
import { HasRowClicked } from '@services/hasRowClicked.service';
import { ReloadTableService } from '@services/reloadTable.service';
import { SelectedSubtab1Service } from '@services/selectedSubtab1.service';
import { SelectedSubtab2Service } from '@services/selectedSubtab2.service';
import { SelectedSubtab4Service } from '@services/selectedSubtab4.service';
// import { SelectedTabService } from '@services/selectedTab.service';

import { ISubtabAdicional } from '@interfaces/subtabAdicional.interface';
import { DataStoreTabService } from '@services/dataStoreTab.service';
@Component({
  selector: 'app-subtabs',
  templateUrl: './subtabs.component.html',
  styleUrls: ['./subtabs.component.scss'],
  standalone: true,
  imports: [NgFor, NgClass, NgIf, AsyncPipe, JsonPipe]
})
export class SubtabsComponent implements OnInit, OnDestroy {
  private _subtabSelectd1: string;
  private _subtabSelectd2: string;
  private _subtabSelectd4: string;
  private _tabSelected: string;
  private selectedSubtab: ISubtabClasification;
  private _unsubscribe$ = new Subject<void>();
  public subtabs: ISubtabClasification[] = [];
  public subtabsAdditional: ISubtabAdicional[] = [];
  public hasRowClicked$ = this._hasRowClicked.currentHasRowClicked;
  public isDisabled = true;

  constructor(
    private _router: Router,
    private _hasRowClicked: HasRowClicked,
    private _reloadTableService: ReloadTableService,
    private _selectedSubtab1Service: SelectedSubtab1Service,
    private _selectedSubtab2Service: SelectedSubtab2Service,
    private _selectedSubtab4Service: SelectedSubtab4Service,
    // private _selectedTabService: SelectedTabService,
    private _dataStoreSubtabService: DataStoreSubtabService,
    private _dataStoreTabService: DataStoreTabService
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
    // const subtab: ISubtabClasification = this.subtabs.find((subtab: ISubtabClasification) => subtab.key === event.key);
    // this.subtabs.forEach((b) => (b.selected = false));
    // event.selected = true;
    // En lugar de recorrer todos los subtabs para deseleccionarlos, puedes mantener una referencia al subtab seleccionado
    // y simplemente deseleccionarlo cuando se selecciona uno nuevo.

    if (this.selectedSubtab) {
      this.selectedSubtab.selected = false;
    }

    event.selected = true;
    this.selectedSubtab = event;

    switch (this._tabSelected) {
      case 'ingresosEconomicaEconomicos':
        this._selectedSubtab1Service.setSelectedSubtab1(subtabName);
        break;
      case 'gastosProgramaProgramas':
        this._selectedSubtab2Service.setSelectedSubtab2(subtabName);
        break;
      case 'gastosOrganicaOrganicos':
        break;
      case 'gastosEconomicaEconomicos':
        this._selectedSubtab4Service.setSelectedSubtab4(subtabName);
        break;
    }

    this._dataStoreSubtabService.setData(event);
    this._reloadTableService.triggerReloadTable();
  }

  clickSubtabAditional(event: ISubtabAdicional) {
    const path = event.param ? event.path + '/' + event.param : event.path;
    this._router.navigateByUrl(path);
  }

  subscribeToServices(): void {
    this._selectedSubtab1Service.source$.subscribe((data) => {
      this._subtabSelectd1 = data;
    });

    this._selectedSubtab2Service.source$.subscribe((data) => {
      this._subtabSelectd2 = data;
    });

    this._selectedSubtab4Service.source$.subscribe((data) => {
      this._subtabSelectd4 = data;
    });

    // this._selectedTabService.source$
    //   .pipe(
    //     tap((data) => {
    //       this._tabSelected = data;
    //       const clasification = getClasificacion(this._tabSelected as CLASIFICATION_TYPE);
    //       this.subtabs = clasification.subtabs;
    //       console.log(this.subtabs);
    //       this.subtabsAdditional = clasification.subtabsAdditional;
    //     })
    //   )
    //   .pipe(takeUntil(this._unsubscribe$))
    //   .subscribe();

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
