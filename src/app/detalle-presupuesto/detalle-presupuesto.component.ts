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
  showGridIngresos = true;
  showGridPrograma = false;
  showGridOrganico = false;
  showGridEconomica = false;
  showTabIngresos = true;
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

  // public ngAfterViewInit(): void {
  //   this._loadData();
  // }

  constructor(
    private _dataStoreService: DataStoreService,
    private _tableService: TableService
  ) { }

  ngOnInit(): void {
    this._tabSelected = localStorage.getItem('activeTab') != null ? localStorage.getItem('activeTab') : 'tab1';
    console.log(this._tabSelected, this._radioButtonSelected)
    this.setValues(this._tabSelected);
    this._loadData();
    // setTimeout(() => {
    //   this._loadData();
    // }, 5000);

    this.DataTotalesPresupuesto = this._dataStoreService.getDataTotalesPresupuesto;
  }

  checkedTab(e: any) {
    this.setValues(e.target.id)
    localStorage.setItem('activeTab', this._tabSelected);
    this._loadData();
  }

  // test() {
  //   this.showComponentIngresos = true;
  //   console.log("inside test")
  // }

  checkedRadio(e: any) {
    this._radioButtonSelected = e.target.id
    this._loadData();
  }

  private async _loadData(): Promise<void> {
    // tengo que pasar parametro correcto para isIncome = true o false
    const isIncome = this.typeClasification.startsWith('ingresos');
    console.log(this.typeClasification);

    await this._tableService.loadDataForTypeClasification(isIncome, this.typeClasification);
    this._dataTable = this._dataStoreService.getDataTable
    var data = this._dataTable.rowData;
    console.log(data);

    /* #region Total general para datos tabla  */
    const totales = data.reduce((acc, curr) => {
      Object.keys(curr).forEach((key, index) => {
        if (!acc[key]) {
          acc[key] = 0
        }
        acc[key] += curr[key]
      })
      return acc
    }, {})

    // this.totalPresupuestado = totales.Definitivas2022.toString()
    //   .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    // if (this.typeClasification === 'ingresosEconomicaArticulos') {
    //   this.totalRecaudado = totales.DerechosReconocidosNetos2022.toString()
    //     .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    // }
    // if (this.typeClasification != 'ingresosEconomicaArticulos') {
    //   this.totalGastado = totales.Pagos2022.toString()
    //     .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    // }
    /* #endregion */

    // Datos para grafico
    switch (this._tabSelected) {
      case 'tab1':
        switch (this._radioButtonSelected) {
          case 'radio-1':
            data = await this.preparaDataGraph(data, 'CodArt', 'DesArt', 'Definitivas2022');
            break;
          case 'radio-2':
            data = await this.preparaDataGraph(data, 'CodArt', 'DesArt', 'DerechosReconocidosNetos2022');
            break;
          case 'radio-3':
            data = await this.preparaDataGraph(data, 'CodArt', 'DesArt', 'Definitivas2022', 'DerechosReconocidosNetos2022');
            break;
        }
        break;
      case 'tab2':
        data = await this.preparaDataGraph(data, 'CodPro', 'DesPro', 'Definitivas2022');
        break;
      case 'tab3':
        data = await this.preparaDataGraph(data, 'CodOrg', 'DesOrg', 'Definitivas2022');
        break;
      case 'tab4':
        data = await this.preparaDataGraph(data, 'CodEco', 'DesEco', 'Definitivas2022');
        break;
    }

    // Gráfico treemap   
    const chart = Highcharts.chart(this._treemap, {
      colorAxis: {
        minColor: '#FFFFFF',
        // maxColor: Highcharts.getOptions().colors[0]
        maxColor: '#F41313'
      },
      chart: {
        type: 'treemap',
        // layoutAlgorithm: 'squarified',
      },
      title: {
        text: '',
      },
      credits: {
        enabled: false,
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
          data,
        },
      ],
    } as any);

  }

  clickDetail() {
    // this.showComponentIngresos = false;
    // setTimeout(() => {
    //   this.showComponentIngresos = true;
    // }, 100);
  }

  setValues(tab) {
    switch (tab) {
      case 'tab1':
        this._tabSelected = 'tab1'
        this._treemap = 'treemap1';
        this.typeClasification = 'ingresosEconomicaArticulos';
        this.showGridIngresos = true;
        this.showGridPrograma = false;
        this.showGridOrganico = false;
        this.showGridEconomica = false;
        this.showTabIngresos = true;
        this.showTabPrograma = false;
        this.showTabOrganico = false;
        this.showTabEconomica = false;
        break;
      case 'tab2':
        this._tabSelected = 'tab2'
        this._treemap = 'treemap2';
        this.typeClasification = 'gastosProgramaPoliticas';
        this.showGridIngresos = false;
        this.showGridPrograma = true;
        this.showGridOrganico = false;
        this.showGridEconomica = false;
        this.showTabIngresos = false;
        this.showTabPrograma = true;
        this.showTabOrganico = false;
        this.showTabEconomica = false;
        break;
      case 'tab3':
        this._tabSelected = 'tab3'
        this._treemap = 'treemap3';
        this.typeClasification = 'gastosOrganicaOrganicos';
        this.showGridIngresos = false;
        this.showGridPrograma = false;
        this.showGridOrganico = true;
        this.showGridEconomica = false;
        this.showTabIngresos = false;
        this.showTabPrograma = false;
        this.showTabOrganico = true;
        this.showTabEconomica = false;
        break;
      case 'tab4':
        this._tabSelected = 'tab4'
        this._treemap = 'treemap4';
        this.typeClasification = 'gastosEconomicaEconomicos';
        this.showGridIngresos = false;
        this.showGridPrograma = false;
        this.showGridOrganico = false;
        this.showGridEconomica = true;
        this.showTabIngresos = false;
        this.showTabPrograma = false;
        this.showTabOrganico = false;
        this.showTabEconomica = true;
        break;
    }

  }

  async preparaDataGraph(data: any, codigo, descripcion, campoSumatorio, aRestar?) {
    // console.log('Data inicial', data);
    let array = [];
    array = data.reduce((acc, curr) => {
      const item = aRestar === undefined ?
        {
          "name": curr[codigo] + '-' + curr[descripcion],
          "value": curr[campoSumatorio],
          "colorValue": (curr[campoSumatorio] / 100)
        } :
        {
          "name": curr[codigo] + '-' + curr[descripcion],
          "value": curr[campoSumatorio] - curr[aRestar],
          "colorValue": (curr[campoSumatorio] - curr[aRestar] / 100)
        }
      acc.push(item);
      return acc;
    }, []);
    // console.log('Array obtenido con opcion 1', array);

    // Totalizo
    data = array.reduce((acc, { name, value }) => {
      const item = acc.find(item => item.name === name)
      item ? item.value += value : acc.push({
        name,
        value,
        colorValue: (value / 1000)
      });
      return acc;
    }, []);
    // console.log('data obtenido con mi codigo', data);
    return data

  }

}
