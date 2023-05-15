import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { PrepareDataTreemapService } from '@services/prepareDataTreemap.service';
import { SelectedSubtab1Service } from '@services/selectedSubtab1.service';
import { SelectedSubtab2Service } from '@services/selectedSubtab2.service';
import { SelectedSubtab4Service } from '@services/selectedSubtab4.service';
import { SelectedTabService } from '@services/selectedTab.service';
import { TableService } from '@services/table.service';

import { IDataTreemap } from '@interfaces/dataTreemap.interface';

import { CLASIFICATION_TYPE } from '@appTypes/clasification.type';

import * as Highcharts from 'highcharts';
import HighchartsTreemap from 'highcharts/modules/treemap';
HighchartsTreemap(Highcharts);
@Component({
  selector: 'app-treemap',
  templateUrl: './treemap.component.html',
  styleUrls: ['./treemap.component.scss'],
  standalone: true
})
export class TreemapComponent implements OnInit, OnDestroy {
  private _dataTreeMap: IDataTreemap;
  private _tabSelected: CLASIFICATION_TYPE = 'ingresosEconomicaEconomicos';
  private _subTabSelectd1: string;
  private _subTabSelectd2: string;
  private _subTabSelectd4: string;
  private _fields = { codigo: '', descripcion: '' };
  private _unsubscribe$ = new Subject<void>();
  private clasification: CLASIFICATION_TYPE;

  constructor(
    private _prepareDataTreemapService: PrepareDataTreemapService,
    private _selectedSubtab1Service: SelectedSubtab1Service,
    private _selectedSubtab2Service: SelectedSubtab2Service,
    private _selectedSubtab4Service: SelectedSubtab4Service,
    private _selectedTabService: SelectedTabService,
    private _tableService: TableService
  ) {}

  ngOnInit() {
    this.subscribeToServices();
    this.setFields();
  }

  subscribeToServices(): void {
    this._selectedSubtab1Service.source$.subscribe((data) => {
      this._subTabSelectd1 = data;
      this.setFields();
    });

    this._selectedSubtab2Service.source$.subscribe((data) => {
      this._subTabSelectd2 = data;
      this.setFields();
    });

    this._selectedSubtab4Service.source$.subscribe((data) => {
      this._subTabSelectd4 = data;
      this.setFields();
    });

    this._selectedTabService.source$
      .pipe(
        tap((data) => {
          this._tabSelected = data as CLASIFICATION_TYPE;
          this.setFields();
        })
      )
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe();
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  async setFields() {
    switch (this._tabSelected) {
      case 'ingresosEconomicaEconomicos':
        switch (this._subTabSelectd1) {
          case 'Por capítulo ingresos':
            this.clasification = 'ingresosEconomicaCapitulos';
            this._fields = { codigo: 'CodCap', descripcion: 'DesCap' };
            break;
          case 'Por artículo':
            this.clasification = 'ingresosEconomicaArticulos';
            this._fields = { codigo: 'CodArt', descripcion: 'DesArt' };
            break;
          case 'Por concepto':
            this.clasification = 'ingresosEconomicaConceptos';
            this._fields = { codigo: 'CodCon', descripcion: 'DesCon' };
            break;
          case 'Por económico':
            this.clasification = 'ingresosEconomicaEconomicos';
            this._fields = { codigo: 'CodEco', descripcion: 'DesEco' };
            break;
          default:
            break;
        }
        break;
      case 'gastosProgramaProgramas':
        switch (this._subTabSelectd2) {
          case 'Por áreas':
            this.clasification = 'gastosProgramaAreas';
            this._fields = { codigo: 'CodAre', descripcion: 'DesAre' };
            break;
          case 'Por política':
            this.clasification = 'gastosProgramaPoliticas';
            this._fields = { codigo: 'CodPol', descripcion: 'DesPol' };
            break;
          case 'Por grupo programas':
            this.clasification = 'gastosProgramaGrupos';
            this._fields = { codigo: 'CodGru', descripcion: 'DesGru' };
            break;
          case 'Por programa':
            this.clasification = 'gastosProgramaProgramas';
            this._fields = { codigo: 'CodPro', descripcion: 'DesPro' };
            break;
          default:
            break;
        }
        break;
      case 'gastosOrganicaOrganicos':
        this.clasification = 'gastosOrganicaOrganicos';
        this._fields = { codigo: 'CodOrg', descripcion: 'DesOrg' };
        break;
      case 'gastosEconomicaEconomicos':
        switch (this._subTabSelectd4) {
          case 'Por capítulo gasto':
            this.clasification = 'gastosEconomicaCapitulos';
            this._fields = { codigo: 'CodCap', descripcion: 'DesCap' };
            break;
          case 'Por artículo':
            this.clasification = 'gastosEconomicaArticulos';
            this._fields = { codigo: 'CodArt', descripcion: 'DesArt' };
            break;
          case 'Por concepto':
            this.clasification = 'gastosEconomicaConceptos';
            this._fields = { codigo: 'CodCon', descripcion: 'DesCon' };
            break;
          case 'Por económico':
            this.clasification = 'gastosEconomicaEconomicos';
            this._fields = { codigo: 'CodEco', descripcion: 'DesEco' };
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }

    this.calcSeries(this.clasification, this._fields.codigo, this._fields.descripcion);
  }

  async calcSeries(clasification, codField: string, desField: string) {
    const data = await this._tableService.loadData(clasification);
    const dataGraph = this._tabSelected === 'ingresosEconomicaEconomicos' ? data.rowDataIngresos : data.rowDataGastos;
    this._dataTreeMap = this._prepareDataTreemapService.calcSeries(dataGraph, codField, desField, 'Definitivas2023');
    this.showTreemap();
  }

  showTreemap() {
    const data: IDataTreemap = this._dataTreeMap;
    Highcharts.chart('treemap', {
      accessibility: {
        enabled: false
      },
      chart: {
        type: 'treemap'
      },
      title: {
        text: ''
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      tooltip: {
        enabled: true,
        headerFormat: `<span class="mb-2">{point.key}</span>`,
        pointFormat: `<span class="mb-2">{point.key}</span>`,
        useHTML: true
      },
      series: [
        {
          name: null,
          innerSize: '50%',
          data: data
        }
      ]
    } as any);
  }
}
