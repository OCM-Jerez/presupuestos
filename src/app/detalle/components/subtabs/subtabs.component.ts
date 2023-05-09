import { AsyncPipe, JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subject, takeUntil, tap } from 'rxjs';

import { CLASIFICATION_TYPE } from '@appTypes/clasification.type';

import { getClasificacion } from '@app/data-table';

import { HasRowClicked } from '@services/hasRowClicked.service';
import { SelectedSubTab1Service } from '@services/selectedSubTab1.service';
import { SelectedSubTab2Service } from '@services/selectedSubTab2.service';
import { SelectedSubTab4Service } from '@services/selectedSubTab4.service';
import { SelectedTabService } from '@services/selectedTab.service';
import { ReloadTableService } from '../../../services/reloadTable.service';

import { IButtonAdicional } from '@interfaces/buttonAdicional.interface';
import { IButtonClasification } from '@interfaces/buttonClasification.interface';

@Component({
  selector: 'app-subtabs',
  templateUrl: './subtabs.component.html',
  styleUrls: ['./subtabs.component.scss'],
  standalone: true,
  imports: [NgFor, NgClass, NgIf, AsyncPipe, JsonPipe]
})
export class SubtabsComponent implements OnInit, OnDestroy {
  private _subTabSelectd1: string;
  private _subTabSelectd2: string;
  private _subTabSelectd4: string;
  private _tabSelected: string;
  private _unsubscribe$ = new Subject<void>();
  public buttons: IButtonClasification[] = [];
  public buttonsAdditional: IButtonAdicional[] = [];
  public hasRowClicked$ = this._hasRowClicked.currentHasRowClicked;
  public isDisabled = true;

  constructor(
    private _router: Router,
    private _hasRowClicked: HasRowClicked,
    private _reloadTableService: ReloadTableService,
    private _selectedSubTab1Service: SelectedSubTab1Service,
    private _selectedSubTab2Service: SelectedSubTab2Service,
    private _selectedSubTab4Service: SelectedSubTab4Service,
    private _selectedTabService: SelectedTabService
  ) {}

  async ngOnInit(): Promise<void> {
    const clasification = getClasificacion('ingresosEconomicaEconomicos');
    this.buttons = clasification.buttons;
    this.buttonsAdditional = clasification.buttonsAdditional;
    this.subscribeToServices();
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  async click(event: IButtonClasification): Promise<void> {
    const subtabName = event.name;
    const button: IButtonClasification = this.buttons.find((button: IButtonClasification) => button.key === event.key);
    this.buttons.forEach((b) => (b.selected = false));
    button.selected = true;

    switch (this._tabSelected) {
      case 'ingresosEconomicaEconomicos':
        this._selectedSubTab1Service.setSelectedSubTab1(subtabName);
        break;
      case 'gastosProgramaProgramas':
        this._selectedSubTab2Service.setSelectedSubTab2(subtabName);
        break;
      case 'gastosOrganicaOrganicos':
        break;
      case 'gastosEconomicaEconomicos':
        this._selectedSubTab4Service.setSelectedSubTab4(subtabName);
        break;
    }

    this._reloadTableService.triggerReloadTable();
  }

  clickButtonAditional(event: IButtonAdicional) {
    const path = event.param ? event.path + '/' + event.param : event.path;
    this._router.navigateByUrl(path);
  }

  subscribeToServices(): void {
    this._selectedSubTab1Service.source$.subscribe((data) => {
      this._subTabSelectd1 = data;
    });

    this._selectedSubTab2Service.source$.subscribe((data) => {
      this._subTabSelectd2 = data;
    });

    this._selectedSubTab4Service.source$.subscribe((data) => {
      this._subTabSelectd4 = data;
    });

    this._selectedTabService.source$
      .pipe(
        tap((data) => {
          this._tabSelected = data;
          const clasification = getClasificacion(this._tabSelected as CLASIFICATION_TYPE);
          this.buttons = clasification.buttons;
          this.buttonsAdditional = clasification.buttonsAdditional;
        })
      )
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe();
  }
}
