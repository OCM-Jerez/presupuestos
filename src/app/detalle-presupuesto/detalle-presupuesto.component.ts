import { IDataTotalesPresupuesto } from './../commons/interfaces/dataTotalesPresupuesto. interface';
import { Component, OnInit, ViewChild } from '@angular/core';

import { AgGridAngular } from 'ag-grid-angular';

import { DataStoreService } from '../services/dataStore.service';
import { TableService } from '../services/table.service';

import { CLASIFICATION_TYPE } from '../commons/util/util';
import { IDataTable } from '../commons/interfaces/dataTable.interface';

import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsTreemap from 'highcharts/modules/treemap';
import heatmap from 'highcharts/modules/heatmap';
import { environment } from '../../environments/environment';
import { PrepareDataTreemapService } from '../services/prepareDataTreemap.service';

HighchartsMore(Highcharts);
HighchartsTreemap(Highcharts);
heatmap(Highcharts)
@Component({
  selector: 'app-detalle-presupuesto',
  templateUrl: './detalle-presupuesto.component.html',
  styleUrls: ['./detalle-presupuesto.component.scss']
})
export class DetallePresupuestoComponent implements OnInit {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  public liqDate = environment.liqDate;
  showGridIngresos = false;
  showGridPrograma = false;
  showGridOrganico = false;
  showGridEconomica = false;
  showTabIngresos = false;
  showTabPrograma = false;
  showTabOrganico = false;
  showTabEconomica = false;
  totalPresupuestado: number;
  totalRecaudado: number;
  totalGastado: number;
  DataTotalesPresupuesto: IDataTotalesPresupuesto;
  private typeClasification: CLASIFICATION_TYPE;
  private _dataTable: IDataTable;
  private _radioButtonSelected = 'radio-1';
  private _tabSelected: string = "tab1";
  private _treemap = 'treemap1';


  constructor(
    private _dataStoreService: DataStoreService,
    private _tableService: TableService,
    private _prepareDataTreemapService: PrepareDataTreemapService
  ) { }

  ngOnInit(): void {
    this._tabSelected = localStorage.getItem('activeTab') != null ? localStorage.getItem('activeTab') : 'tab1';
    // console.log(this._tabSelected);

    // console.clear();
    // console.log(this._tabSelected, this._radioButtonSelected);
    this.setValues(this._tabSelected);
    this._loadData();
    this.DataTotalesPresupuesto = this._dataStoreService.getDataTotalesPresupuesto;
  }

  checkedTab(e: any) {
    this._tabSelected = e.target.id;
    this.setValues(e.target.id)
    localStorage.setItem('activeTab', this._tabSelected);
    this._loadData();
  }

  checkedRadio(e: any) {
    this._radioButtonSelected = e.target.id
    this._loadData();
  }

  private async _loadData(): Promise<void> {
    await this._tableService.loadDataForTypeClasification(this.typeClasification);
    this._dataTable = this._dataStoreService.getDataTable
    let data = this._dataTable.rowData;
    // console.log('======================');
    // console.log(this._dataTable.clasificationType);
    // console.log(data);

    // Datos para grafico
    switch (this._tabSelected) {
      case 'tab1':
        switch (this._radioButtonSelected) {
          case 'radio-1': //Presupuestado
            await this._prepareDataTreemapService.calcSeries(data, 'CodEco', 'DesEco', 'Definitivas2022');
            break;
          case 'radio-2': //Recaudado
            await this._prepareDataTreemapService.calcSeries(data, 'CodEco', 'DesEco', 'DerechosReconocidosNetos2022');
            break;
          case 'radio-3': //Diferencia
            await this._prepareDataTreemapService.calcSeries(data, 'CodEco', 'DesEco', 'Definitivas2022', 'DerechosReconocidosNetos2022');
            break;
        }
        this._treemap = 'treemap1';
        // this.showGridPrograma = false;
        // this.showGridEconomica = false;
        // this.showGridOrganico = false;
        this.showGridIngresos = true;
        this.showTabIngresos = true;
        // this.showTabPrograma = false;
        // this.showTabOrganico = false;
        // this.showTabEconomica = false;
        break;
      case 'tab2':
        await this._prepareDataTreemapService.calcSeries(data, 'CodPro', 'DesPro', 'Definitivas2022');
        this._treemap = 'treemap2';
        // this.showGridIngresos = false;
        this.showGridPrograma = true;
        // this.showGridOrganico = false;
        // this.showGridEconomica = false;
        // this.showTabIngresos = false;
        this.showTabPrograma = true;
        // this.showTabOrganico = false;
        // this.showTabEconomica = false;
        break;
      case 'tab3':
        await this._prepareDataTreemapService.calcSeries(data, 'CodOrg', 'DesOrg', 'Definitivas2022');
        this._treemap = 'treemap3';
        // this.showGridIngresos = false;
        // this.showGridPrograma = false;
        this.showGridOrganico = true;
        // this.showGridEconomica = false;
        // this.showTabIngresos = false;
        // this.showTabPrograma = false;
        this.showTabOrganico = true;
        // this.showTabEconomica = false;
        break;
      case 'tab4':
        await this._prepareDataTreemapService.calcSeries(data, 'CodCap', 'DesCap', 'Definitivas2022');
        this._treemap = 'treemap4';
        // this.showGridIngresos = false;
        // this.showGridPrograma = false;
        // this.showGridOrganico = false;
        this.showGridEconomica = true;
        // this.showTabIngresos = false;
        // this.showTabPrograma = false;
        // this.showTabOrganico = false;
        this.showTabEconomica = true;
        break;
    }
    this.graphTreemap(data);

  }

  graphTreemap(data) {
    data = this._dataStoreService.getDataTreemap;
    // console.log(data);
    const chart = Highcharts.chart(this._treemap, {
      accessibility: {
        enabled: false
      },
      chart: {
        type: 'treemap',
      },
      title: {
        text: '',
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false
      },
      tooltip: {
        tooltip: {
          enabled: false,
        },
        headerFormat: `<span class="mb-2">{point.key}</span><br>`,
        // pointFormat: '<span>Euros: {point.value}</span></br><span>Color: {point.colorValue}</span>',
        pointFormat: '<span>Euros: {point.value}</span>',
        useHTML: true,
      },
      series: [
        {
          name: null,
          innerSize: '50%',
          data: data,
        },
      ],
    } as any);
  }

  setValues(tab) {
    switch (tab) {
      case 'tab1':
        // this._tabSelected = 'tab1'
        // this.typeClasification = 'ingresosEconomicaArticulos';
        this.typeClasification = 'ingresosEconomicaEconomicos';

        break;
      case 'tab2':
        // this._tabSelected = 'tab2'
        this.typeClasification = 'gastosProgramaPoliticas';

        break;
      case 'tab3':
        // this._tabSelected = 'tab3'
        this.typeClasification = 'gastosOrganicaOrganicos';

        break;
      case 'tab4':
        // this._tabSelected = 'tab4'
        // this.typeClasification = 'gastosEconomicaEconomicos';
        this.typeClasification = 'gastosEconomicaCapitulos';

        break;
    }
  }

}
