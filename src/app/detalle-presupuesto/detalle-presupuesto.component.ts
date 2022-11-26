import { HighchartsChartModule } from 'highcharts-angular';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AgGridAngular } from 'ag-grid-angular';

import { AvalaibleYearsService } from '../services/avalaibleYears.service';
import { DataStoreService } from '../services/dataStore.service';
import { TableService } from '../services/table.service';

import { accumulate, CLASIFICATION_TYPE } from '../commons/util/util';
import { getClasificacion } from '../tables/data-table';

import { IDataTable } from '../commons/interfaces/dataTable.interface';

import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
// import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import HighchartsTreemap from 'highcharts/modules/treemap';
import heatmap from 'highcharts/modules/heatmap';

HighchartsMore(Highcharts);
// HighchartsSolidGauge(Highcharts);
HighchartsTreemap(Highcharts);
heatmap(Highcharts)


@Component({
  selector: 'app-detalle-presupuesto',
  templateUrl: './detalle-presupuesto.component.html',
  styleUrls: ['./detalle-presupuesto.component.scss']
})
export class DetallePresupuestoComponent {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  // Highcharts = Highcharts;
  showComponentIngresos = false;
  private typeClasification: CLASIFICATION_TYPE = 'ingresosEconomicaArticulos'
  private _dataTable: IDataTable;

  public ngAfterViewInit(): void {
    this._loadData();
    // this.createChartPie();
  }

  constructor(
    public avalaibleYearsService: AvalaibleYearsService,
    private _router: Router,
    private _dataStoreService: DataStoreService,
    private _tableService: TableService
  ) {

  }

  // https://stackblitz.com/edit/angular14-standaone-components-highcharts?file=src%2Fapp%2Fapp.component.ts
  // https://stackblitz.com/edit/angular-9nkrgd?file=src%2Fapp%2Fapp.component.ts
  // https://stackblitz.com/edit/angular13-highcharts-tjumvu?file=src%2Fapp%2Fapp.component.ts
  // https://stackblitz.com/edit/angular13-highcharts-tjumvu?file=src%2Fapp%2Fapp.component.ts,src%2Fapp%2Fapp.component.html

  private createChartPie(): void {
    // const data: any[] = [{
    //   name: 'A',
    //   value: 6,
    //   colorValue: 1
    // }, {
    //   name: 'B',
    //   value: 6,
    //   colorValue: 2
    // }, {
    //   name: 'C',
    //   value: 4,
    //   colorValue: 3
    // }, {
    //   name: 'D',
    //   value: 3,
    //   colorValue: 4
    // }, {
    //   name: 'E',
    //   value: 2,
    //   colorValue: 5
    // }, {
    //   name: 'F',
    //   value: 2,
    //   colorValue: 6
    // }, {
    //   name: 'policia',
    //   value: 16,
    //   colorValue: 7
    // }]

    // this._dataTable = this._dataStoreService.getDataTable
    // console.log(this._dataTable);

    // const data = this._dataTable.rowData.filter(x => x.CodEco === 1000)
    // console.log(data);


    // const chart = Highcharts.chart('treemap', {
    //   chart: {
    //     type: 'treemap',
    //   },
    //   title: {
    //     text: '',
    //   },
    //   credits: {
    //     enabled: false,
    //   },
    //   tooltip: {
    //     headerFormat: `<span class="mb-2">Programa: {point.key}</span><br>`,
    //     pointFormat: '<span>Euros: {point.value}</span>',
    //     useHTML: true,
    //   },
    //   series: [
    //     {
    //       name: null,
    //       innerSize: '50%',
    //       data,
    //     },
    //   ],
    // } as any);

  }

  private async _loadData(): Promise<void> {
    await this._tableService.loadDataForTypeClasification(true, this.typeClasification);
    this.showComponentIngresos = true;
    this._dataTable = this._dataStoreService.getDataTable
    var data = this._dataTable.rowData;
    // console.log(data);

    // Creo item para cada uno de los articulos.
    let articulos = []

    // Creo array de Articulos.
    data.map(item => {
      const value = {
        "name": item.CodArt + '-' + item.DesArt,
        "value": item.Definitivas2022,
        "colorValue": (item.Definitivas2022 / 100)
      }
      articulos.push(value)
    });

    // articulos = [...new Set(articulos)];
    console.log([articulos])

    data = articulos.reduce((acc, curr) => {
      const index = acc.findIndex(item => item.name === curr.name)
      index > -1 ? acc[index].value += curr.value : acc.push({
        name: curr.name,
        value: curr.value,
        colorValue: (curr.value / 1000)
      })
      return acc
    }, [])
    // console.log(data);



    // var color = 10
    // data.map(item => {
    //   color = color + 1;
    //   item.name = item.CodArt;
    //   item.value = item.Definitivas;
    //   item.colorValue = (item.Definitivas / 100)
    // });
    console.log(data);



    // // Acumular los datos por articulo
    // Creo item para cada uno de los articulos.
    // let articulos = []
    // let dataFinal = [];

    // // Creo array de Articulos.
    // data.map(item => {
    //   const value = {
    //     "CodArt": item.CodArt,
    //     "Definitivas": item.Definitivas2022
    //   }
    //   articulos.push(value)
    // });

    // // articulos = [...new Set(articulos)];
    // console.log([articulos])

    // data = articulos.reduce((acc, curr) => {
    //   const index = acc.findIndex(item => item.CodArt === curr.CodArt)
    //   index > -1 ? acc[index].Definitivas += curr.Definitivas : acc.push({
    //     CodArt: curr.CodArt,
    //     Definitivas: curr.Definitivas
    //   })
    //   return acc
    // }, [])

    // var color = 10
    // data.map(item => {
    //   color = color + 1;
    //   // item.name = item.DesArt;
    //   // item.value = item.Definitivas2022;
    //   item.colorValue = (item.Definitivas / 100)
    // });

    // console.log([data])








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
        headerFormat: `<span class="mb-2">Artículo: {point.name}</span><br>`,
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
