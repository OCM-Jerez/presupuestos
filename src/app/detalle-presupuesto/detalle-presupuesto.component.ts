import { HighchartsChartModule } from 'highcharts-angular';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AgGridAngular } from 'ag-grid-angular';

import { AvalaibleYearsService } from '../services/avalaibleYears.service';
import { DataStoreService } from '../services/dataStore.service';
import { TableService } from '../services/table.service';

import { CLASIFICATION_TYPE } from '../commons/util/util';
import { getClasificacion } from '../tables/data-table';

import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import HighchartsTreemap from 'highcharts/modules/treemap';

HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);
HighchartsTreemap(Highcharts);


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

  public ngAfterViewInit(): void {
    this.createChartPie();
  }

  constructor(
    public avalaibleYearsService: AvalaibleYearsService,
    private _router: Router,
    private _dataStoreService: DataStoreService,
    private _tableService: TableService
  ) {
    this._loadData();
  }

  // https://stackblitz.com/edit/angular14-standaone-components-highcharts?file=src%2Fapp%2Fapp.component.ts
  // https://stackblitz.com/edit/angular-9nkrgd?file=src%2Fapp%2Fapp.component.ts
  // https://stackblitz.com/edit/angular13-highcharts-tjumvu?file=src%2Fapp%2Fapp.component.ts
  // Highcharts = Highcharts;
  // chart: any = {
  //   series: [
  //     {
  //       data: [1, 2, 3],
  //     },
  //   ],
  //   chart: {
  //     type: 'line',
  //   },
  //   title: {
  //     text: 'Gráfico de prueba',
  //   },
  // };


  private createChartPie(): void {
    const data: any[] = [{
      name: 'A',
      value: 6,
      colorValue: 1
    }, {
      name: 'B',
      value: 6,
      colorValue: 2
    }, {
      name: 'C',
      value: 4,
      colorValue: 3
    }, {
      name: 'D',
      value: 3,
      colorValue: 4
    }, {
      name: 'E',
      value: 2,
      colorValue: 5
    }, {
      name: 'F',
      value: 2,
      colorValue: 6
    }, {
      name: 'policia',
      value: 16,
      colorValue: 7
    }]

    const chart = Highcharts.chart('treemap', {
      chart: {
        type: 'treemap',
      },
      title: {
        text: '',
      },
      credits: {
        enabled: false,
      },
      tooltip: {
        headerFormat: `<span class="mb-2">Programa: {point.key}</span><br>`,
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

  private async _loadData(): Promise<void> {
    await this._tableService.loadDataForTypeClasification(true, this.typeClasification);
    this.showComponentIngresos = true;
    this.showGraph();
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

  showGraph() {
    // this.Highcharts = Highcharts;
    // linechart: any = {
    //   series: [
    //     {
    //       data: [1, 2, 3],
    //     },
    //   ],
    //   chart: {
    //     type: 'line',
    //   },
    //   title: {
    //     text: 'linechart',
    //   },
    // };
  }


}
