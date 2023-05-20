import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';

import { DataStoreSubtabService } from '@services/dataStoreSubtab.service';
import { DataStoreTabService } from '@services/dataStoreTab.service';
import { PrepareDataTreemapService } from '@services/prepareDataTreemap.service';
import { TableService } from '@services/table.service';

import { CLASIFICATION_TYPE } from '@appTypes/clasification.type';
import { IDataTreemap } from '@interfaces/dataTreemap.interface';
// import { ISubtabClasification } from '@interfaces/subtabClasification.interface';
import { ITab } from '@interfaces/tab.interface';

import { ReloadTableService } from '@services/reloadTable.service';
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
  private _fields = { codigo: '', descripcion: '' };
  private _clasification: CLASIFICATION_TYPE;
  private _isIngreso = false;
  private _tabSelected: ITab;
  private _unsubscribe$ = new Subject<void>();
  private _data: any;
  // private _subtabSelected: ISubtabClasification;

  constructor(
    private _dataStoreSubtabService: DataStoreSubtabService,
    private _dataStoreTabService: DataStoreTabService,
    private _prepareDataTreemapService: PrepareDataTreemapService,
    private _tableService: TableService,
    private _reloadTableService: ReloadTableService
  ) {
    this._dataStoreTabService
      .getTab()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((storeTab) => {
        this._tabSelected = storeTab;
        this.setFields();
      });

    // this._subtabSelected = this._dataStoreSubtabService.getData1();
    // console.log('this._subtabSelected', this._subtabSelected);
  }

  ngOnInit() {
    // console.log('treemap');
    this._reloadTableService.reloadTable$.pipe(takeUntil(this._unsubscribe$)).subscribe(() => {
      this.setFields();
    });
    // this.setFields();
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  async setFields() {
    switch (this._tabSelected.clasificationType) {
      case 'ingresosEconomicaEconomicos':
        this._data = this._dataStoreSubtabService.getData1();
        break;
      case 'gastosProgramaProgramas':
        this._data = this._dataStoreSubtabService.getData2();
        break;
      case 'gastosOrganicaOrganicos':
        this._data = this._dataStoreSubtabService.getData3();
        break;
      case 'gastosEconomicaEconomicos':
        this._data = this._dataStoreSubtabService.getData4();
        break;
    }
    // console.log('data', this._data);
    this._clasification = this._data.key as CLASIFICATION_TYPE;
    this._fields.codigo = this._data.codField;
    this._fields.descripcion = this._data.desField;
    // console.log('this._clasification', this._clasification);

    if (this._clasification.startsWith('ingresos')) {
      this._isIngreso = true;
    } else {
      this._isIngreso = false;
    }
    this.calcSeries();
  }

  async calcSeries() {
    const data = await this._tableService.loadData(this._clasification);
    // console.log('data', data);

    const dataTreemap = this._isIngreso ? data.rowDataIngresos : data.rowDataGastos;
    // console.log('this._isIngreso', this._isIngreso);

    // console.log('dataTreemap', dataTreemap);
    this._dataTreeMap = this._prepareDataTreemapService.calcSeries(
      dataTreemap,
      this._fields.codigo,
      this._fields.descripcion,
      'Definitivas2023'
    );
    this.showTreemap();
  }

  showTreemap() {
    // console.log('dataTreeMap', this._dataTreeMap);

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
