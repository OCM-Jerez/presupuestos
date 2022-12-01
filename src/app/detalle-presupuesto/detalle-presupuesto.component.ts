import { Component, OnInit, ViewChild } from '@angular/core';
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
  showComponentIngresos = false;
  private typeClasification: CLASIFICATION_TYPE = 'ingresosEconomicaArticulos'
  // private typeClasification: CLASIFICATION_TYPE = 'gastosOrganicaOrganicos'
  // private typeClasification: CLASIFICATION_TYPE = 'gastosProgramaPoliticas'
  // private typeClasification: CLASIFICATION_TYPE = 'gastosEconomicaEconomicos'

  private _dataTable: IDataTable;
  public totalPresupuestado: number;
  public totalRecaudado: number;
  public ngAfterViewInit(): void {
    this._loadData();
  }

  constructor(
    public avalaibleYearsService: AvalaibleYearsService,
    private _router: Router,
    private _dataStoreService: DataStoreService,
    private _tableService: TableService
  ) { }

  ngOnInit(): void {
    // console.log(' ngOnInit() DetallePresupuestoComponent');
    // this._loadData();
  }

  private async _loadData(): Promise<void> {

    // trato de conocer el tab activo
    // para almacenarlo y volver al mismo tab cuando reloadCurrentRoute()



    // tengo que pasar parametro correcto para isIncome = true o false
    // 
    await this._tableService.loadDataForTypeClasification(true, this.typeClasification);
    this.showComponentIngresos = true;
    this._dataTable = this._dataStoreService.getDataTable
    var data = this._dataTable.rowData;
    console.log(data);

    // Creo array de Articulos.
    let articulos = []
    data.map(item => {
      const value = {
        "name": item.CodArt + '-' + item.DesArt,
        "value": item.Definitivas2022,
        "recaudado": item.DerechosReconocidosNetos2022,
        "colorValue": (item.Definitivas2022 / 100)
      }
      articulos.push(value)
    });
    // console.log(articulos);

    // Totalizo por articulo
    data = articulos.reduce((acc, curr) => {
      const index = acc.findIndex(item => item.name === curr.name)
      index > -1 ? (acc[index].value += curr.value, acc[index].recaudado += curr.recaudado) : acc.push({
        name: curr.name,
        value: curr.value,
        recaudado: curr.recaudado,
        colorValue: (curr.value / 1000)
      })
      return acc
    }, [])

    // Total general para datos tabla
    const totales = data.reduce((acc, curr) => {
      Object.keys(curr).forEach((key, index) => {
        if (!acc[key]) {
          acc[key] = 0
        }
        acc[key] += curr[key]
      })
      return acc
    }, {})
    this.totalPresupuestado = totales.value.toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    this.totalRecaudado = totales.recaudado.toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    // Gráfico treemap
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
    let currentUrl = this._router.url;
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate([currentUrl]);
    });
  }

}
