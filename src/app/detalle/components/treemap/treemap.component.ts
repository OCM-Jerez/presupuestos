import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { ChangeSubTabService } from '@services/change-subtab.service';
import { DataStoreService } from '@services/dataStore.service';
import { PrepareDataTreemapService } from '@services/prepareDataTreemap.service';
import { SelectedSubTab1Service } from '@services/selectedSubTab1.service';
import { SelectedSubTab2Service } from '@services/selectedSubTab2.service';
import { SelectedSubTab4Service } from '@services/selectedSubTab4.service';
import { SelectedTabService } from '@services/selectedTab.service';

import { IDataTable } from '@interfaces/dataTable.interface';
import { IDataTreemap } from '@interfaces/dataTreemap.interface';
import { TableService } from '@services/table.service';

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
  private _dataTable: IDataTable;
  private _dataTreeMap: IDataTreemap;
  private _tabSelected: string;
  private _subTabSelectd1: string;
  private _subTabSelectd2: string;
  private _subTabSelectd4: string;
  private _codField: string;
  private _desField: string;
  private _fields = { codigo: '', descripcion: '' };
  private _unsubscribe$ = new Subject<void>();
  private clasification: CLASIFICATION_TYPE;

  constructor(
    private _changeSubTabService: ChangeSubTabService,
    private _dataStoreService: DataStoreService,
    private _prepareDataTreemapService: PrepareDataTreemapService,
    private _selectedSubTab1Service: SelectedSubTab1Service,
    private _selectedSubTab2Service: SelectedSubTab2Service,
    private _selectedSubTab4Service: SelectedSubTab4Service,
    private _selectedTabService: SelectedTabService,
    private _tableService: TableService
  ) {}

  ngOnInit() {
    this.subscribeToServices();
    this.setFields();
  }

  subscribeToServices(): void {
    this._selectedSubTab1Service.source$.subscribe((data) => {
      this._subTabSelectd1 = data;
      // console.log('this._subTabSelectd1', this._subTabSelectd1);
      this.setFields();
    });

    this._selectedSubTab2Service.source$.subscribe((data) => {
      this._subTabSelectd2 = data;
      // console.log('this._subTabSelectd2', this._subTabSelectd2);
      this.setFields();
    });

    this._selectedSubTab4Service.source$.subscribe((data) => {
      this._subTabSelectd4 = data;
      this.setFields();
    });

    this._selectedTabService.source$
      .pipe(
        tap((data) => {
          this._tabSelected = data;
          this.setFields();
        })
      )
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe();

    this._changeSubTabService.source$
      .pipe(
        tap((data) => {
          this._codField = data.codField;
          this._desField = data.desField;
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
    // console.log(this._tabSelected);
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
        // this._fields = { codigo: 'CodPro', descripcion: 'DesPro' };
        switch (this._subTabSelectd2) {
          case 'Por áreas':
            this.clasification = 'gastosProgramaAreas';
            this._fields = { codigo: 'CodPro', descripcion: 'DesPro' };
            break;
          case 'Por política':
            this.clasification = 'gastosProgramaPoliticas';
            this._fields = { codigo: 'CodPro', descripcion: 'DesPro' };
            break;
          case 'Por grupo programas':
            this.clasification = 'gastosProgramaGrupos';
            this._fields = { codigo: 'CodPro', descripcion: 'DesPro' };
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
            this._fields = { codigo: 'CodEco', descripcion: 'DesEco' };
            break;
          case 'Por concepto':
            this.clasification = 'gastosEconomicaConceptos';
            this._fields = { codigo: 'CodEco', descripcion: 'DesEco' };
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
    // console.log(this._tabSelected);
    // console.log(this._subTabSelectd4);
    // console.log(clasification);

    // if (this._tabSelected === undefined) {
    //   this._tabSelected = 'ingresosEconomicaEconomicos';
    // }
    const data = await this._tableService.loadData(clasification);
    // console.log('data', data.rowDataIngresos);

    const dataGraph = this._tabSelected === 'ingresosEconomicaEconomicos' ? data.rowDataIngresos : data.rowDataGastos;
    // console.log('dataGraph', dataGraph);
    // console.log('codField', codField);
    // console.log('desField', desField);

    this._dataTreeMap = this._prepareDataTreemapService.calcSeries(dataGraph, codField, desField, 'Definitivas2023');
    // console.log('this._dataTreeMap', this._dataTreeMap);

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
