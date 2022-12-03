import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';

import { AgGridAngular } from 'ag-grid-angular';

import { AvalaibleYearsService } from '../services/avalaibleYears.service';
import { DataStoreService } from '../services/dataStore.service';
import { TableService } from '../services/table.service';

import { CLASIFICATION_TYPE } from '../commons/util/util';
import { getClasificacion } from '../tables/data-table';

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
  @ViewChildren("itemElement") private itemElements: QueryList<ElementRef>;
  showComponentIngresos = false;
  showGastosPrograma = false;
  showGastosOrganico = false;
  showGastosEconomica = false;
  private typeClasification: CLASIFICATION_TYPE;
  private _dataTable: IDataTable;
  public totalPresupuestado: number;
  public totalRecaudado: number;
  private _oldActiveTab: string;
  radioButtonSelected = 'radio-1';

  public ngAfterViewInit(): void {
    this._loadData();
  }

  constructor(
    public avalaibleYearsService: AvalaibleYearsService,
    private _router: Router,
    private _renderer2: Renderer2,
    private _dataStoreService: DataStoreService,
    private _tableService: TableService
  ) { }

  ngOnInit(): void {
    // console.log(' ngOnInit() DetallePresupuestoComponent');
    this.typeClasification = 'ingresosEconomicaArticulos';
  }

  checkedTab(e: any) {
    console.log(e.target)
    // Almaceno tab actual para volver al mismo tab cuando reloadCurrentRoute()
    this._oldActiveTab = e.target.id.substring(3, 4);
    console.log('this._oldActiveTab  ', this._oldActiveTab);

    // localStorage.setItem('activeTab', e.target.id.substring(3, 4));
    var activeTab = Number(localStorage.getItem('activeTab'));
    console.log('localStorage ', activeTab);
    // console.log(this.itemElements);
    this.itemElements.forEach(item => console.log(item.nativeElement.children[0].checked));
    // this.itemElements.forEach(item => console.log(item.nativeElement.children[0].checked));

    this.itemElements.first.nativeElement.children[activeTab - 1].checked = true;


    switch (e.target.id) {
      case "tab1":

        this.typeClasification = 'ingresosEconomicaArticulos';
        this.showComponentIngresos = true;
        this.showGastosPrograma = false;
        this.showGastosOrganico = false;
        this.showGastosEconomica = false;
        break;
      case "tab2":

        // console.log(this.itemElements.first.nativeElement.children[1].checked);
        // this.itemElements.first.nativeElement.children[1].checked
        this.typeClasification = 'gastosProgramaPoliticas';
        this.showGastosPrograma = true
        this.showComponentIngresos = false;
        this.showGastosOrganico = false;
        this.showGastosEconomica = false;
        break;
      case "tab3":
        this.typeClasification = 'gastosOrganicaOrganicos';
        this.showGastosOrganico = true
        this.showComponentIngresos = false;
        this.showGastosPrograma = false;
        this.showGastosEconomica = false;
        break;
      case "tab4":
        this.typeClasification = 'gastosEconomicaEconomicos';
        this.showGastosEconomica = true
        this.showComponentIngresos = false;
        this.showGastosPrograma = false;
        this.showGastosOrganico = false;
        break;

      default:
        break;
    }

    this._loadData();

  }

  checkedRadio(e: any) {
    this.radioButtonSelected = e.target.id
    this._loadData();
  }

  private async _loadData(): Promise<void> {
    // tengo que pasar parametro correcto para isIncome = true o false
    const isIncome = this.typeClasification.startsWith('ingresos');

    await this._tableService.loadDataForTypeClasification(isIncome, this.typeClasification);
    this.showComponentIngresos = true;
    this._dataTable = this._dataStoreService.getDataTable
    var data = this._dataTable.rowData;
    // console.log("--------------------")
    // console.log(data);

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
    // console.log(totales);

    // https://stackoverflow.com/questions/54907549/keep-only-selected-keys-in-every-object-from-array
    // var keys_to_keep = ['Definitivas2022', 'DerechosReconocidosNetos2022']
    // const redux = array => array.map(o => keys_to_keep.reduce((acc, curr) => {
    //   acc[curr] = o[curr];
    //   return acc;
    // }, {}));

    // console.log(redux(data));

    this.totalPresupuestado = totales.Definitivas2022.toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    this.totalRecaudado = totales.DerechosReconocidosNetos2022.toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    /* #endregion */

    // Datos para grafico
    switch (this.radioButtonSelected) {
      case 'radio-1':
        let presupuestadoArticulo = [];
        data.map(item => {
          const value = {
            "name": item.CodArt + '-' + item.DesArt,
            "value": item.Definitivas2022,
            // "recaudado": item.DerechosReconocidosNetos2022,
            "colorValue": (item.Definitivas2022 / 100)
          }
          presupuestadoArticulo.push(value)
        });

        // Totalizo por articulo
        data = presupuestadoArticulo.reduce((acc, curr) => {
          const index = acc.findIndex(item => item.name === curr.name)
          index > -1 ? (acc[index].value += curr.value) : acc.push({
            name: curr.name,
            value: curr.value,
            // recaudado: curr.recaudado,
            colorValue: (curr.value / 1000)
          })
          return acc
        }, [])
        break;
      case 'radio-2':
        let recaudadoArticulo = [];
        data.map(item => {
          const value = {
            "name": item.CodArt + '-' + item.DesArt,
            "value": item.DerechosReconocidosNetos2022,
          }
          recaudadoArticulo.push(value)
        });
        console.log(recaudadoArticulo);

        // Totalizo por recaudado por articulo
        data = recaudadoArticulo.reduce((acc, curr) => {
          const index = acc.findIndex(item => item.name === curr.name)
          index > -1 ? (acc[index].value += curr.value) : acc.push({
            name: curr.name,
            value: curr.value,
            colorValue: (curr.value / 1000)
          })
          return acc
        }, [])
        break;

      default:
        break;
    }

    // Gráfico treemap   
    // console.log(data);
    const chart = Highcharts.chart('treemap', {
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
        pointFormat: '<span>Euros: {point.value}</span></br><span>Color: {point.colorValue}</span>',

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
    this.showComponentIngresos = false;
    setTimeout(() => {
      this.showComponentIngresos = true;
    }, 100);
  }

  async detalle(typeClasification: CLASIFICATION_TYPE) {
    this._dataStoreService.IsDetails = true;
    const selectedRows = this.agGrid.api.getSelectedNodes();
    const dataPropertyTable = getClasificacion(typeClasification);

    if (selectedRows.length > 0) {
      this._dataStoreService.selectedCodeRowFirstLevel = selectedRows[0].key;
      const useStarWitch: boolean = dataPropertyTable.useStarWitch;
      const attribute: string = dataPropertyTable.attribute;
      await this._tableService.loadDataForTypeClasification(
        true,
        typeClasification,
        { valueFilter: this._dataStoreService.selectedCodeRowFirstLevel.split(" ")[0], attribute, useStarWitch });
    } else {
      await this._tableService.loadDataForTypeClasification(
        true,
        typeClasification);
    }

    this.reloadCurrentRoute()
  }

  reloadCurrentRoute() {
    localStorage.setItem('activeTab', this._oldActiveTab);

    let currentUrl = this._router.url;
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate([currentUrl]);
    });
  }

}
