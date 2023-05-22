import { Location, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';

// import { AgChartsAngularModule } from 'ag-charts-angular';
// import { AgChartOptions } from 'ag-charts-community';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';

import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
HighchartsMore(Highcharts);

import { CellRendererOCM } from '@ag-grid/CellRendererOCM';

import { DataStoreService } from '@services/dataStore.service';

import { IDataTable } from '@interfaces/dataTable.interface';

import { accumulate } from '@utils/util';
@Component({
  selector: 'app-graph-ingresos',
  templateUrl: './graph-ingresos.component.html',
  styleUrls: ['./graph-ingresos.component.scss'],
  standalone: true,
  imports: [NgIf, AgGridModule]
})
export class GraphIngresosComponent implements OnInit {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  private _dataTable: IDataTable;
  private _datos: any[] = [];
  public columnDefs;
  public data: any;
  public defaultColDef;
  public groupHeaderHeight = 25;
  public headerHeight = 25;
  public localeText;
  // public agChartOptions: AgChartOptions;

  constructor(private _location: Location, private _dataStoreService: DataStoreService) {}

  ngOnInit(): void {
    this._dataTable = this._dataStoreService.dataTable;
    this._createData();
    this._createColumns();
    // this._showGraph();
  }

  ngAfterViewInit() {
    this.renderChartLines();
    this.renderChartMarker();
    this.renderChart();
  }

  renderChartLines() {
    Highcharts.chart({
      title: {
        text: this._dataTable.dataPropertyTable.graphTitle
        // fontSize: 40
      },
      subtitle: {
        text: `${this._dataTable.dataPropertyTable.subHeaderName} ${this._dataStoreService.selectedCodeRowFirstLevel}`
        // fontSize: 20
      },
      legend: {
        itemStyle: {
          fontSize: '22px'
        }
      },
      chart: {
        type: 'line',
        renderTo: 'chart-containerLines'
      },
      // title: {
      //   text: ''
      // },
      // subtitle: {
      //   text: ''
      // },
      xAxis: {
        title: {
          text: 'Años',
          style: {
            fontSize: '16px'
          }
        },
        // categories: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023']
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
        // scatter: {
        //   marker: {
        //     radius: 8
        //   }
        // },
        line: {
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: false
        }
      },
      series: [
        {
          type: 'line',
          marker: {
            symbol: 'circle',
            fillColor: 'green',
            radius: 8
          },
          name: 'Definitivas',
          data: this.data.map((item) => item.Definitivas)
          // data: [16.0, 18.2, 23.1, 27.9, 32.2, 36.4, 39.8, 38.4, this.data[0].Definitivas]
        },
        {
          type: 'line',
          marker: {
            symbol: 'square',
            fillColor: 'red',
            radius: 8
          },
          name: 'Recaudación neta',
          data: this.data.map((item) => item.RecaudacionNeta)
          // data: [-2.9, -3.6, -0.6, 4.8, 10.2, 14.5, 17.6, 16.5, 12.0]
        }
      ]
    });
  }

  renderChartMarker() {
    Highcharts.chart({
      legend: {
        itemStyle: {
          fontSize: '22px'
        }
      },
      chart: {
        type: 'scatter',
        renderTo: 'chart-containerMarker'
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
        // categories: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023']
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
        // scatter: {
        //   marker: {
        //     radius: 8
        //   }
        // },
        line: {
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: false
        }
      },
      series: [
        {
          type: 'scatter',
          marker: {
            symbol: 'circle',
            fillColor: 'green',
            radius: 8
          },
          name: 'Definitivas',
          data: this.data.map((item) => item.Definitivas)
          // data: [16.0, 18.2, 23.1, 27.9, 32.2, 36.4, 39.8, 38.4, this.data[0].Definitivas]
        },
        {
          type: 'scatter',
          marker: {
            symbol: 'square',
            fillColor: 'red',
            radius: 8
          },
          name: 'Recaudación neta',
          data: this.data.map((item) => item.RecaudacionNeta)
          // data: [-2.9, -3.6, -0.6, 4.8, 10.2, 14.5, 17.6, 16.5, 12.0]
        }
      ]
    });
  }

  renderChart() {
    const name1 = 'Definitivas';
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
          // name: 'Definitivas',
          name: name1,
          data: this.data.map((item) => [item.year, item.Definitivas, item.Definitivas / 1000])
        },
        {
          type: 'bubble',
          name: 'Recaudación neta',
          data: this.data.map((item) => [item.year, item.RecaudacionNeta, item.RecaudacionNeta / 1000])
        }
      ]
    });
  }

  private async _createData() {
    const codigo = this._dataStoreService.selectedCodeRowFirstLevel.split(' ')[0];

    switch (this._dataTable.clasificationType) {
      case 'ingresosEconomicaCapitulos':
        this._datos = this._dataTable.rowDataIngresos.filter((x) => x.CodCap == codigo);
        break;
      case 'ingresosEconomicaArticulos':
      case 'ingresosEconomicaConceptos':
      case 'ingresosEconomicaEconomicos':
        this._datos = this._dataTable.rowDataIngresos.filter((x) => x.CodEco == codigo);
        break;
    }

    const yearsDefinitivas = accumulate('Definitivas', this._datos);
    const yearsIniciales = accumulate('Iniciales', this._datos);
    const yearsNetas = accumulate('RecaudacionNeta', this._datos);

    // Convierto los valores para que sirvan de data al grafico
    this.data = [];
    for (let index = 2015; index <= 2023; index++) {
      // Para mostrar solo años seleccionados
      if (yearsDefinitivas[index] > 0) {
        const value = {
          year: index,
          Definitivas: yearsDefinitivas[index],
          RecaudacionNeta: yearsNetas[index]
        };
        if (index === 2022 || index === 2023) {
          value.Definitivas = yearsIniciales[index];
          value.RecaudacionNeta = yearsNetas[index - 1];
        }
        this.data.push(value);
      }
    }
    console.log(this.data);

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
        headerName: 'RecaudacionNeta',
        field: 'RecaudacionNeta',
        width: 200,
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

  // private _showGraph(): void {
  //   this.agChartOptions = {
  //     autoSize: true,
  //     title: {
  //       text: this._dataTable.dataPropertyTable.graphTitle,
  //       fontSize: 40
  //     },
  //     subtitle: {
  //       text: `${this._dataTable.dataPropertyTable.subHeaderName} ${this._dataStoreService.selectedCodeRowFirstLevel}`,
  //       fontSize: 20
  //     },
  //     data: [...this.data],
  //     series: [
  //       {
  //         xKey: 'year',
  //         yKey: 'Definitivas'
  //       },
  //       {
  //         xKey: 'year',
  //         yKey: 'RecaudacionNeta'
  //       }
  //     ],
  //     axes: [
  //       {
  //         type: 'category',
  //         position: 'bottom',
  //         title: {
  //           text: 'Años',
  //           enabled: true
  //         }
  //       },
  //       {
  //         type: 'number',
  //         position: 'left',
  //         title: {
  //           text: 'en miles de Euros',
  //           enabled: true
  //         },
  //         label: {
  //           formatter: function (params) {
  //             return params.value / 1000 + '';
  //           }
  //         }
  //       }
  //     ],
  //     legend: {
  //       enabled: true,
  //       position: 'bottom'
  //     }
  //   };
  // }

  volver() {
    this._location.back();
  }
}
