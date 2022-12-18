/* #region  import */
import { IDataTotalesPresupuesto } from './../commons/interfaces/dataTotalesPresupuesto. interface';
import { Component, OnInit, ViewChild } from '@angular/core';

import { DataStoreService } from '../services/dataStore.service';
import { PrepareDataTreemapService } from '../services/prepareDataTreemap.service';
import { PrepareDataTotalesPresupuestoService } from '../services/prepareDataTotalesPresupuesto.service';
import { TableService } from '../services/table.service';

import { CLASIFICATION_TYPE } from '../commons/util/util';
import { environment } from '../../environments/environment';

import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsTreemap from 'highcharts/modules/treemap';
import heatmap from 'highcharts/modules/heatmap';
import { AvalaibleYearsService } from '../services/avalaibleYears.service';

HighchartsMore(Highcharts);
HighchartsTreemap(Highcharts);
heatmap(Highcharts)
/* #endregion */

@Component({
  selector: 'app-detalle-presupuesto',
  templateUrl: './detalle-presupuesto.component.html',
  styleUrls: ['./detalle-presupuesto.component.scss']
})

export class DetallePresupuestoComponent implements OnInit {

  /* #region  Definir variables */
  liqDate = environment.liqDate;
  showGraphInTab = true;
  showTablePresupuestos = true;
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
  // recibeLoEmitido: string = "";
  private _typeClasification: CLASIFICATION_TYPE;
  private _radioButtonSelected = 'radio-1';
  private _tabSelected: string = "tab1";
  private _treemap = 'treemap1';
  /* #endregion */

  constructor(
    private _dataStoreService: DataStoreService,
    private _tableService: TableService,
    private _prepareDataTreemapService: PrepareDataTreemapService,
    private _prepareDataTotalesPresupuestoService: PrepareDataTotalesPresupuestoService,
    private _avalaibleYearsService: AvalaibleYearsService,
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
    // console.warn('------  Cargo esta data la recupero para usarla en este componente.
    // console.warn('------  La misma data se almacena en el store para ser usada en otros componentes.
    // console.warn('------  Con data.rowData se calculan los datos del treemap en la function dataGraph(data.rowData).
    // console.warn('------  La data se almacena en store.
    // console.warn('------  graphTreemap(data) recuperara la data del store y la usará para mostrar el grafico.
    // console.warn('------  El AG Grid mostrara los datos adecuado recuperandolos del store.

    let years = this._avalaibleYearsService.getYearsSelected();
    if (years.length === 1 || years[0] === 2022) {
      console.log('Cargar data para 2022');
      await this.setTotalesPresupuesto();
      let data = await this._tableService.loadDataForTypeClasification(this._typeClasification);
      await this.dataGraph(data.rowData)
      // await this.graphTreemap(data.rowData); // No es necesario pasarle la data, ya que la recupera del store.
      await this.graphTreemap();
    }
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

  async graphTreemap() {
    const data = this._dataStoreService.getDataTreemap;
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
    const values = {
      tab1: 'ingresosEconomicaEconomicos',
      tab2: 'gastosProgramaPoliticas',
      tab3: 'gastosOrganicaOrganicos',
      tab4: 'gastosEconomicaCapitulos'
    };
    this._typeClasification = values[tab];
  }

  clickDetalle() {
    // setTimeout(() => {
    //   this.showTable = true;
    // }, 0);

    setTimeout(() => {
      this.graphTreemap()
    }, 0);
  }

  hasChangeCheckbox() {
    let years = this._avalaibleYearsService.getYearsSelected();
    console.log(years);
    if (years.length === 1 || years[0] === 2022) {
      console.log('hasChangeCheckbox');
      this.showGraphInTab = true;
      this.showTablePresupuestos = true;
      setTimeout(() => {
        this.graphTreemap()
      }, 1000);
    } else {
      this.showGraphInTab = false;
      this.showTablePresupuestos = false;
    }

    switch (this._tabSelected) {
      case 'tab1':
        this.showIngresos = false;
        this.ngOnInit();
        this.setValues(this._tabSelected);
        this._loadData();
        setTimeout(() => {
          this.showPrograma = false;
          this.showOrganico = false;
          this.showEconomica = false;
        }, 1000);
        break;
      case 'tab2':
        this.showPrograma = false;
        this.ngOnInit();
        this.setValues(this._tabSelected);
        this._loadData();
        setTimeout(() => {
          this.showIngresos = false;
          this.showPrograma = true;
          this.showOrganico = false;
          this.showEconomica = false;
        }, 1000);
        break;
      case 'tab3':
        this.showOrganico = false;
        this.ngOnInit();
        this.setValues(this._tabSelected);
        this._loadData();
        setTimeout(() => {
          this.showIngresos = false;
          this.showPrograma = false;
          this.showOrganico = true;
          this.showEconomica = false;
        }, 0);
        break;
      case 'tab4':
        this.showEconomica = false;
        this.ngOnInit();
        this.setValues(this._tabSelected);
        this._loadData();
        setTimeout(() => {
          this.showIngresos = false;
          this.showPrograma = false;
          this.showOrganico = false;
          this.showEconomica = true;
        }, 1000);
        break;
    }

  }
}


