import { IDataTotalesPresupuesto } from '../commons/interfaces/dataTotalesPresupuesto. interface';
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
import { IDataTable } from '../commons/interfaces/dataTable.interface';
import { SelectedButtonService } from '../services/selectedButton.service';
import { Subscription } from 'rxjs';
import { SelectedTabService } from '../services/selectedTab.service';

HighchartsMore(Highcharts);
HighchartsTreemap(Highcharts);
heatmap(Highcharts)

@Component({
  selector: 'app-detalle-presupuesto',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})

export class DetalleComponent implements OnInit {
  private _dataTable: IDataTable;
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
  private _typeClasification: CLASIFICATION_TYPE;
  private _radioButtonSelected = 'radio-1';
  private _tabSelected: string = "tab1";
  private _treemap = 'treemap1';
  private _tabOrRadio = false;
  private selectedButtonSub: Subscription;
  private _selectedButton: any;

  constructor(
    private _dataStoreService: DataStoreService,
    private _tableService: TableService,
    private _prepareDataTreemapService: PrepareDataTreemapService,
    private _prepareDataTotalesPresupuestoService: PrepareDataTotalesPresupuestoService,
    private _avalaibleYearsService: AvalaibleYearsService,
    private _selectedButtonService: SelectedButtonService,
    private _selectedTabService: SelectedTabService,
  ) { }

  ngOnInit(): void {
    this._tabSelected = localStorage.getItem('activeTab') != null ? localStorage.getItem('activeTab') : 'tab1';
    this._treemap = `treemap${this._tabSelected.charAt(this._tabSelected.length - 1)}`;
    this._selectedTabService.setSelectedTab = this._tabSelected.toString;
    console.warn('ngOnInit  detalle');

    this.selectedButtonSub = this._selectedButtonService.getSelectedButton().subscribe(selectedButton => {
      this._selectedButton = selectedButton;
    });
    this.setValues(this._tabSelected);
    this._loadData();

    let years = this._avalaibleYearsService.getYearsSelected();
    if (years.length === 1 && years[0] === 2022) {
      this.showGraphInTab = true;
      this.showTablePresupuestos = true;
    } else {
      this.showGraphInTab = false;
      this.showTablePresupuestos = false;
    }

  }

  checkedTab(e: any) {
    this._tabSelected = e.target.id;
    this._treemap = `treemap${e.target.id.charAt(e.target.id.length - 1)}`;
    localStorage.setItem('activeTab', this._tabSelected);
    this._tabOrRadio = true;
    this.setValues(e.target.id)
    this._loadData();
  }

  checkedRadio(e: any) {
    this._radioButtonSelected = e.target.id
    this._tabOrRadio = true;
    this._loadData();
  }

  private async _loadData(): Promise<void> {
    if (this._tabOrRadio) {                   // Si vengo de un tab o radio no hay que volver a generar la data.
      this._tabOrRadio = false;
    } else {                                  // Si se recarga la pagina hay que volver a generar la data. 
      // this._dataTable = await this._tableService.loadDataInitial();
      console.log('this._typeClasification', this._typeClasification);
      this._dataTable = await this._tableService.loadData(this._typeClasification);
    }

    await this.setTotalesPresupuesto();
    let data = await this._tableService.loadData(this._typeClasification);
    if (this._tabSelected === 'tab1') {
      await this.treeGraph(data.rowDataIngresos)
    } else {
      await this.treeGraph(data.rowDataGastos)
    }

    await this.graphTreemap();

  }

  async setTotalesPresupuesto() {            // Si se recarga la pagina hay que volver a calcular los totales. 
    await this._prepareDataTotalesPresupuestoService.calcTotales();
    this.DataTotalesPresupuesto = this._dataStoreService.dataTotalesPresupuesto;
  }

  async treeGraph(data) {    // Datos para grafico
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
    if (this.showGraphInTab) {
      const data = this._dataStoreService.dataTreemap;
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
  }

  setValues(tab) {
    console.log('tab', tab);
    console.log('this._selectedButton', this._selectedButton);


    this._selectedTabService.setSelectedTab = tab;



    switch (tab) {
      case 'tab1':
        this._typeClasification = 'ingresosEconomicaEconomicos'
        break;
      case 'tab2':
        switch (this._selectedButton.name) {
          case 'Por áreas':
            console.log('Por áreas');
            this._typeClasification = 'gastosProgramaAreas'
            break;
          case 'Por política':
            console.log('Por política');
            this._typeClasification = 'gastosProgramaPoliticas'
            break;
          case 'Por grupo programas':
            console.log('Por política');
            this._typeClasification = 'gastosProgramaGrupos'
            break;
          case 'Por programa':
            console.log('Por programa');
            this._typeClasification = 'gastosProgramaProgramas'
            break;
          default:
            this._typeClasification = 'gastosProgramaPoliticas'
            break;
        }
        break;
      case 'tab3':
        this._typeClasification = 'gastosOrganicaOrganicos'
        break;
      case 'tab4':
        switch (this._selectedButton.name) {
          case 'Por capítulo gasto':
            console.log('Por capítulo gasto');
            this._typeClasification = 'gastosEconomicaCapitulos'
            break;
          case 'Por artículo':
            console.log('Por artículo');
            this._typeClasification = 'gastosEconomicaArticulos'
            break;
          case 'Por concepto':
            console.log('Por concepto');
            this._typeClasification = 'gastosEconomicaConceptos'
            break;
          case 'Por económico':
            console.log('Por económico');
            this._typeClasification = 'gastosEconomicaEconomicos'
            break;
          default:
            this._typeClasification = 'gastosEconomicaConceptos'
            break;
        }
        break;
    }
    // const values = {
    //   tab1: 'ingresosEconomicaEconomicos',
    //   tab2: 'gastosProgramaPoliticas',
    //   tab3: 'gastosOrganicaOrganicos',
    //   tab4: 'gastosOrganicaOrganicos'
    // };
    // this._typeClasification = values[tab];
  }

  async hasChangeCheckbox() {
    let years = this._avalaibleYearsService.getYearsSelected();
    if (years.length === 1 && years[0] === 2022) {
      this.showGraphInTab = true;
      this.showTablePresupuestos = true;
      setTimeout(() => {
        this.graphTreemap()
      }, 10);
    } else {
      this.showGraphInTab = false;
      this.showTablePresupuestos = false;
    }

    let data = await this._tableService.loadData(this._typeClasification);
    await this.treeGraph(data.rowDataGastos)

    switch (this._tabSelected) {
      case 'tab1':
        this.showIngresos = false;
        setTimeout(() => {
          this.showIngresos = true;
        }, 10);
        break;
      case 'tab2':
        this.showPrograma = false;
        setTimeout(() => {
          this.showPrograma = true;
        }, 10);
        break;
      case 'tab3':
        this.showOrganico = false;
        setTimeout(() => {
          this.showOrganico = true;
        }, 10);
        break;
      case 'tab4':
        this.showEconomica = false;
        setTimeout(() => {
          this.showEconomica = true;
        }, 10);
        break;
    }
  }
}


