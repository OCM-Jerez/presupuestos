import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AgGridAngular } from 'ag-grid-angular';
import { ColumnState, GridReadyEvent } from 'ag-grid-community';
import { GridOptions, GridApi } from 'ag-grid-community/main';

import localeTextESPes from '../../../assets/data/localeTextESPes.json';
import { CellRendererOCM } from '../../ag-grid/CellRendererOCM';

import { AvalaibleYearsService } from '../../services/avalaibleYears.service';
import { DataStoreService } from '../../services/dataStore.service';
import { PrepareDataGastosService } from '../../services/prepareDataGastos.service';

import { IDataTable } from '../../commons/interfaces/dataTable.interface';

@Component({
  selector: 'app-table-gastos-gruposprogramas-details',
  templateUrl: './table-gastos-gruposprogramas-details.component.html',
  styleUrls: ['./table-gastos-gruposprogramas-details.component.scss']
})

export class TableGastosGruposprogramasDetailsComponent {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  public gridOptions: GridOptions;
  public isExpanded = false;
  private _gridApi: GridApi;
  private _rowData: any[any];
  private _columnDefs: any[any];
  private _dataTableGraph: IDataTable;
  messageYears = this.avalaibleYearsService.message;

  constructor(
    private _router: Router,
    public avalaibleYearsService: AvalaibleYearsService,
    public dataStoreService: DataStoreService,
    private _prepareDataGastosService: PrepareDataGastosService
  ) {
    this._dataTableGraph = dataStoreService.dataTable;
    this._columnDefs = [
      {
        headerName: this._dataTableGraph.dataPropertyTable.headerName,
        children: [
          {
            headerName: 'Programa',
            field: 'DesPro',
            rowGroup: true,
            showRowGroup: 'DesPro',
            filter: true,
            width: 500,
            pinned: 'left',
            columnGroupShow: 'close',
            cellRenderer: params => {
              switch (params.node.level) {
                case 0:  // Cada una de las lineas
                  return `<span style="text-align: left"> ${params.value}</span>`;
                case -1: // Total general
                  return '<span style="text-align: right; color: red; font-size: 18px; font-weight: bold; margin-right: 0px;"> Total general</span>';
                default:
                  return 'SIN FORMATO';
              }
            },
            valueGetter: params => {
              return `${params.data.CodPro + ' - ' + params.data.DesPro}`;
            },
          },
        ]
      },

      ...this.avalaibleYearsService.getYearsSelected().map(year => {
        return {
          headerName: year,
          children: this.createColumnsChildren(year),
        }
      })

    ];

    this.createDataOCM().then(() => {
      this.gridOptions = {
        defaultColDef: {
          width: 130,
          sortable: true,
          resizable: true,
          filter: true,
          aggFunc: 'sum',
          cellRenderer: CellRendererOCM,
          headerComponentParams: {
            template:
              '<div class="ag-cell-label-container" role="presentation">' +
              '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button" ></span>' +
              '  <div ref="eLabel" class="ag-header-cell-label" role="presentation" >' +
              '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
              '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
              '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
              '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
              '    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
              '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
              '  </div>' +
              '</div>',
          },
        },

        // PROPERTIES - object properties, myRowData and myColDefs are created somewhere in your application
        rowData: this._rowData,
        columnDefs: this._columnDefs,
        groupDisplayType: 'custom',
        groupIncludeTotalFooter: true,
        groupIncludeFooter: true,
        groupHeaderHeight: 25,
        headerHeight: 54,
        suppressAggFuncInHeader: true,
        rowSelection: 'single',
        localeText: localeTextESPes,
        pagination: false,
      } as GridOptions;
    })
  }

  onGridReady(params: GridReadyEvent) {
    this._gridApi = params.api;
    const defaultSortModel: ColumnState[] = [
      { colId: 'DesEco', sort: 'asc', sortIndex: 0 },
    ];
    params.columnApi.applyColumnState({ state: defaultSortModel });
  }

  async createDataOCM(): Promise<void> {
    const codigoSearch = this.dataStoreService.selectedCodeRowFirstLevel.split(" ")[0];
    const codField = this._dataTableGraph.dataPropertyTable.codField;
    this._rowData = (await this._prepareDataGastosService.getDataAllYear(this.dataStoreService.dataTable.clasificationType))
      .filter(x => x[codField] == codigoSearch);
    console.log('this._rowData', this._rowData);
  }

  createColumnsChildren(year: number) {
    return [
      {
        headerName: 'Créditos',
        children: [
          {
            headerName: 'Previsiones Iniciales',
            field: `Iniciales${year}`,
            columnGroupShow: 'close'
          },
          {
            headerName: 'Total Modificaciones',
            field: `Modificaciones${year}`,
            width: 140,
            columnGroupShow: 'close'
          },
          {
            headerName: 'Creditos definitivos',
            field: `Definitivas${year}`,
            width: 140,
            columnGroupShow: 'close'
          },
        ]
      },
      {
        headerName: 'Gastos',
        children: [
          {
            headerName: 'Gastos Comprometidos',
            field: `GastosComprometidos${year}`,
            width: 140,
            columnGroupShow: 'close',
          },
          {
            headerName: 'Obligaciones reconocidas netas',
            field: `ObligacionesReconocidasNetas${year}`,
            width: 135,
            columnGroupShow: 'close'
          },
          {
            headerName: 'Pagos',
            field: `Pagos${year}`,
            columnGroupShow: 'close'
          },
          {
            headerName: 'Obligaciones pendientes de pago al final periodo',
            field: `ObligacionesPendientePago${year}`,
            width: 120,
            columnGroupShow: 'close'
          },
        ]
      },
      {
        headerName: 'Remanente Credito',
        field: `RemanenteCredito${year}`,
      },
    ];
  }

  showProgramaDetails() {
    const selectedRows = this.agGrid.api.getSelectedNodes();
    this.dataStoreService.selectedCodeRowFirstLevel = selectedRows[0].key;
    this._router.navigateByUrl("/tableProgramaDetails")
  }

}
