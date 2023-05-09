import { Location, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';

import { AgChartsAngularModule } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { GridOptions } from 'ag-grid-community';

import { CellRendererOCM } from '@ag-grid/CellRendererOCM';

import { DataStoreService } from '@services/dataStore.service';

import { IDataTable } from '@interfaces/dataTable.interface';

import { accumulate } from '@utils/util';
@Component({
  selector: 'app-graph-ingresos',
  templateUrl: './graph-ingresos.component.html',
  styleUrls: ['./graph-ingresos.component.scss'],
  standalone: true,
  imports: [NgIf, AgChartsAngularModule, AgGridModule]
})
export class GraphIngresosComponent implements OnInit {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  public options: AgChartOptions;
  public rowData: any;
  public data: any;
  private gridApi;
  public gridColumnApi;
  public columnDefs;
  public defaultColDef;
  public gridOptions: GridOptions;
  public localeText;
  public rowDataTable: any;
  public groupHeaderHeight = 25;
  public headerHeight = 25;
  private datos: any[] = [];
  private _dataTable: IDataTable;

  constructor(private _location: Location, private _dataStoreService: DataStoreService) {}

  ngOnInit(): void {
    this._dataTable = this._dataStoreService.dataTable;
    this._createData();
    this._createColumns();
    this._showGraph();
  }

  async onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  private async _createData() {
    const codigo = this._dataStoreService.selectedCodeRowFirstLevel.split(' ')[0];

    switch (this._dataTable.clasificationType) {
      case 'ingresosEconomicaCapitulos':
        this.datos = this._dataTable.rowDataIngresos.filter((x) => x.CodCap == codigo);
        break;
      case 'ingresosEconomicaArticulos':
      case 'ingresosEconomicaConceptos':
      case 'ingresosEconomicaEconomicos':
        this.datos = this._dataTable.rowDataIngresos.filter((x) => x.CodEco == codigo);
        break;
    }

    const yearsDefinitivas = accumulate('Definitivas', this.datos);
    const yearsIniciales = accumulate('Iniciales', this.datos);
    const yearsNetas = accumulate('RecaudacionNeta', this.datos);

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

  private _showGraph(): void {
    this.options = {
      autoSize: true,
      title: {
        text: this._dataTable.dataPropertyTable.graphTitle,
        fontSize: 40
      },
      subtitle: {
        text: `${this._dataTable.dataPropertyTable.subHeaderName} ${this._dataStoreService.selectedCodeRowFirstLevel}`,

        fontSize: 20
      },
      data: [...this.data],
      series: [
        {
          xKey: 'year',
          yKey: 'Definitivas'
        },
        {
          xKey: 'year',
          yKey: 'RecaudacionNeta'
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
