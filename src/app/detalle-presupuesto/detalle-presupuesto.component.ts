import { IDataTotalesPresupuesto } from './../commons/interfaces/dataTotalesPresupuesto. interface';
import { Component, OnInit, ViewChild } from '@angular/core';

import { AgGridAngular } from 'ag-grid-angular';

import { DataStoreService } from '../services/dataStore.service';
import { TableService } from '../services/table.service';

import { CLASIFICATION_TYPE } from '../commons/util/util';

import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsTreemap from 'highcharts/modules/treemap';
import heatmap from 'highcharts/modules/heatmap';
import { environment } from '../../environments/environment';
import { PrepareDataTreemapService } from '../services/prepareDataTreemap.service';
import { PrepareDataTotalesPresupuestoService } from '../services/prepareDataTotalesPresupuesto.service';

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
  liqDate = environment.liqDate;
  showIngresos = false;
  showPrograma = false;
  showOrganico = false;
  showEconomica = false;
  DataTotalesPresupuesto: IDataTotalesPresupuesto =
    {
      year: 2022,
      totalPresupuestoIngresos: 0,
      totalPresupuestoGastos: 0,
      totalEjecutadoIngresos: 0,
      totalEjecutadoGastos: 0
    };
  private typeClasification: CLASIFICATION_TYPE;
  private _radioButtonSelected = 'radio-1';
  private _tabSelected: string = "tab1";
  private _treemap = 'treemap1';

  constructor(
    private _dataStoreService: DataStoreService,
    private _tableService: TableService,
    private _prepareDataTreemapService: PrepareDataTreemapService,
    private _prepareDataTotalesPresupuestoService: PrepareDataTotalesPresupuestoService
  ) { }

  ngOnInit(): void {
    this._tabSelected = localStorage.getItem('activeTab') != null ? localStorage.getItem('activeTab') : 'tab1';
    this._treemap = `treemap${this._tabSelected.charAt(this._tabSelected.length - 1)}`;
    this.setValues(this._tabSelected);
    this._loadData();
  }

  checkedTab(e: any) {
    this._tabSelected = e.target.id;
    this._treemap = `treemap${e.target.id.charAt(e.target.id.length - 1)}`;
    this.setValues(e.target.id)
    localStorage.setItem('activeTab', this._tabSelected);
    this._loadData();
  }

  checkedRadio(e: any) {
    this._radioButtonSelected = e.target.id
    this._loadData();
  }

  private async _loadData(): Promise<void> {
    await this.setTotalesPresupuesto();
    let data = await this._tableService.loadDataForTypeClasification(this.typeClasification);
    console.log(data);

    await this.dataGraph(data.rowData)
    await this.graphTreemap(data.rowData);
  }

  async setTotalesPresupuesto() {
    await this._prepareDataTotalesPresupuestoService.calcTotales();
    this.DataTotalesPresupuesto = this._dataStoreService.getDataTotalesPresupuesto;
  }

  async dataGraph(data) {
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
        this.showIngresos = true;
        break;
      case 'tab2':
        await this._prepareDataTreemapService.calcSeries(data, 'CodPro', 'DesPro', 'Definitivas2022');
        this.showPrograma = true;
        break;
      case 'tab3':
        await this._prepareDataTreemapService.calcSeries(data, 'CodOrg', 'DesOrg', 'Definitivas2022');
        this.showOrganico = true;
        break;
      case 'tab4':
        await this._prepareDataTreemapService.calcSeries(data, 'CodCap', 'DesCap', 'Definitivas2022');
        this.showEconomica = true;
        break;
    }
  }

  async graphTreemap(data) {
    data = this._dataStoreService.getDataTreemap;
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
        // this.typeClasification = 'ingresosEconomicaArticulos';
        this.typeClasification = 'ingresosEconomicaEconomicos';
        break;
      case 'tab2':
        this.typeClasification = 'gastosProgramaPoliticas';
        break;
      case 'tab3':
        this.typeClasification = 'gastosOrganicaOrganicos';
        break;
      case 'tab4':
        // this.typeClasification = 'gastosEconomicaEconomicos';
        this.typeClasification = 'gastosEconomicaCapitulos';
        break;
    }
  }

}
