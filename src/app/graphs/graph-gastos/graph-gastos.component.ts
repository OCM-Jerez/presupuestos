import { Location, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';

import { AgChartsAngularModule } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';

import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
HighchartsMore(Highcharts);

import { CellRendererOCM } from '@ag-grid/CellRendererOCM';

import { DataStoreService } from '@services/dataStore.service';

import { IDataTable } from '../../commons/interfaces/dataTable.interface';

import { accumulate } from '@utils/util';
@Component({
  selector: 'app-graph-gastos',
  templateUrl: './graph-gastos.component.html',
  styleUrls: ['./graph-gastos.component.scss'],
  standalone: true,
  imports: [NgIf, AgChartsAngularModule, AgGridModule]
})
export class GraphGastosComponent implements OnInit {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  private _dataTable: IDataTable;
  private _datos: any[] = [];
  public columnDefs;
  public data: any;
  public defaultColDef;
  public groupHeaderHeight = 25;
  public headerHeight = 25;
  public localeText;
  public agChartOptions: AgChartOptions;

  constructor(private _location: Location, private _dataStoreService: DataStoreService) {}

  ngOnInit(): void {
    this._dataTable = this._dataStoreService.dataTable;
    this._createData();
    this._createColumns();
    this._showGraph();
  }

  ngAfterViewInit() {
    this.renderChart();
  }

  renderChart() {
    Highcharts.chart('chart-container', {
      legend: {
        itemStyle: {
          fontSize: '22px'
        }
      },
      chart: {
        type: 'bubble'
      },
      title: {
        text: ''
      },
      subtitle: {
        // text: 'Source: ' +
        //   '<a href="https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature" ' +
        //   'target="_blank">Wikipedia.com</a>'
      },
      xAxis: {
        title: {
          text: 'Años',
          style: {
            fontSize: '16px'
          }
        },
        categories: this.data.map((item) => item.year)
      },
      yAxis: {
        title: {
          text: 'en miles de Euros',
          style: {
            fontSize: '16px'
          }
        }
      },
      plotOptions: {
        bubble: {
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: false
        }
      },
      series: [
        {
          type: 'bubble',
          name: 'Definitivas',
          data: this.data.map((item) => [item.year, item.Definitivas, item.Definitivas / 100])
        },
        {
          type: 'bubble',
          name: 'Obligaciones Reconocidas Netas',
          data: this.data.map((item) => [
            item.year,
            item.ObligacionesReconocidasNetas,
            item.ObligacionesReconocidasNetas / 100
          ])
        },
        {
          type: 'bubble',
          name: 'Obligaciones Pendiente Pago',
          data: this.data.map((item) => [item.year, item.ObligacionesPendientes, item.ObligacionesPendientes / 100])
        }
      ]
    });
  }

  private async _createData() {
    const codigo = this._dataStoreService.selectedCodeRowFirstLevel.split(' ')[0];

    switch (this._dataTable.clasificationType) {
      case 'gastosOrganicaOrganicos':
        this._datos = this._dataTable.rowDataGastos.filter((x) => x.CodOrg == codigo);
        break;
      case 'gastosProgramaAreas':
      case 'gastosProgramaPoliticas':
      case 'gastosProgramaGrupos':
      case 'gastosProgramaProgramas':
        this._datos = this._dataTable.rowDataGastos.filter((x) => x.CodPro == codigo);
        break;
      case 'gastosEconomicaCapitulos':
        this._datos = this._dataTable.rowDataGastos.filter((x) => x.CodCap == codigo);
        break;
      case 'gastosEconomicaArticulos':
      case 'gastosEconomicaConceptos':
      case 'gastosEconomicaEconomicos':
        this._datos = this._dataTable.rowDataGastos.filter((x) => x.CodEco == codigo);
        break;
    }

    const yearsDefinitivas = accumulate('Definitivas', this._datos);
    const yearsObligacionesNetas = accumulate('ObligacionesReconocidasNetas', this._datos);
    const yearsObligacionesPendientes = accumulate('ObligacionesPendientePago', this._datos);

    this.data = [];
    for (let index = 2015; index <= 2023; index++) {
      // Para mostrar solo años seleccionados
      if (yearsDefinitivas[index] > 0) {
        const value = {
          year: index,
          Definitivas: yearsDefinitivas[index],
          ObligacionesReconocidasNetas: yearsObligacionesNetas[index],
          ObligacionesPendientes: yearsObligacionesPendientes[index]
        };
        if (index === 2023) {
          // value.Definitivas = yearsIniciales[index]; // Se usan las iniciales ya que es el unico dato que existe.
        }
        this.data.push(value);
      }
    }
    return this.data;
  }

  private _createColumns(): void {
    this.columnDefs = [
      {
        headerName: 'Año',
        field: 'year',
        width: 70
      },
      {
        headerName: 'Previsiones definitivas',
        field: 'Definitivas',
        width: 180,
        aggFunc: 'sum',
        cellRenderer: CellRendererOCM
      },
      {
        headerName: 'ObligacionesReconocidasNetas',
        field: 'ObligacionesReconocidasNetas',
        width: 200,
        aggFunc: 'sum',
        cellRenderer: CellRendererOCM
      },
      {
        headerName: 'ObligacionesPendientes',
        field: 'ObligacionesPendientes',
        width: 180,
        aggFunc: 'sum',
        cellRenderer: CellRendererOCM
      }
    ];

    this.defaultColDef = {
      sortable: true,
      resizable: true,
      filter: false
    };
  }

  private _showGraph(): void {
    this.agChartOptions = {
      autoSize: true,
      title: {
        text: this._dataTable.dataPropertyTable.graphTitle,
        fontSize: 40
      },
      subtitle: {
        text: `${this._dataTable.dataPropertyTable.subHeaderName} ${this._dataStoreService.selectedCodeRowFirstLevel}`,
        fontSize: 30
      },
      data: [...this.data],
      series: [
        {
          xKey: 'year',
          yKey: 'Definitivas'
        },
        {
          xKey: 'year',
          yKey: 'ObligacionesReconocidasNetas'
        },
        {
          xKey: 'year',
          yKey: 'ObligacionesPendientes'
        }
      ],
      axes: [
        {
          type: 'category',
          position: 'bottom',
          title: {
            text: 'Años',
            enabled: true
          }
        },
        {
          type: 'number',
          position: 'left',
          title: {
            text: 'en miles de Euros',
            enabled: true
          },
          label: {
            formatter: function (params) {
              return params.value / 1000 + '';
            }
          }
        }
      ],
      legend: {
        enabled: true,
        position: 'bottom'
      }
    };
  }

  volver() {
    this._location.back();
  }
}
