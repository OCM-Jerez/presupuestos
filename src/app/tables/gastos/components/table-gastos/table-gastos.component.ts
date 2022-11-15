import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AgGridAngular } from 'ag-grid-angular';
import { ColumnApi, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community/main';

import { CellRendererOCM, CellRendererOCMtext } from '../../../../ag-grid/CellRendererOCM';
import localeTextESPes from '../../../../../assets/data/localeTextESPes.json';

import { AvalaibleYearsService } from '../../../../services/avalaibleYears.service';
import { DataStoreService } from '../../../../services/dataStore.service';

import { IDataTable } from '../../../../commons/interfaces/dataTable.interface';
// import { PrepareDataGastosDetailsService } from '../../../../services/prepareDataGastosDetails.service';

@Component({
  selector: 'app-table-gastos',
  templateUrl: './table-gastos.component.html',
  styleUrls: ['./table-gastos.component.scss']
})
export class TableGastosComponent implements OnInit {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;

  private _columnDefs: any[];
  private _dataTable: IDataTable;
  // private _rowData: any[any];
  gridOptions: GridOptions;
  selectedCodeRowFirstLevel = '';

  private _gridApi: GridApi;
  private _columnApi: ColumnApi;

  constructor(
    private _router: Router,
    private _dataStoreService: DataStoreService,
    private _avalaibleYearsService: AvalaibleYearsService,
    // private _prepareDataGastosDetailsService: PrepareDataGastosDetailsService,
  ) {
    this._dataTable = _dataStoreService.getDataTable;
    const fieldOrder = `Cod${this._dataTable.dataPropertyTable.sufijo}`;
    this._dataTable.rowData.sort((a, b) => a[fieldOrder] - b[fieldOrder]);
  }

  // private _dataTable = this._dataStoreService.getDataTable;

  ngOnInit(): void {
    this._loadTable();
  }

  private _loadTable() {
    this._columnDefs = [
      {
        headerName: this._dataTable.dataPropertyTable.headerName,

        children: [
          {
            headerName: this._dataTable.dataPropertyTable.subHeaderName,
            field: this._dataTable.dataPropertyTable.codField,
            width: this._dataTable.dataPropertyTable.width,
            rowGroup: true,
            showRowGroup: this._dataTable.dataPropertyTable.codField,
            cellRenderer: CellRendererOCMtext,
            valueGetter: params => {
              if (params.data) {
                return params.data[this._dataTable.dataPropertyTable.codField] + ' - ' + params.data[this._dataTable.dataPropertyTable.desField];
              } else {
                return null;
              }
            }
          },
        ]
      },

      ...this._avalaibleYearsService.getYearsSelected().map(year => {
        return {
          headerName: year,
          children: this._createColumnsChildren(year),
        }
      })

    ];

    // this.createDataOCM().then(() => {
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
      // rowData: this._rowData,
      rowData: this._dataTable.rowData,
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
      // onRowClicked: () => {
      //   const selectedRows = this.agGrid.api.getSelectedNodes();
      //   if (selectedRows.length > 0) {
      //     this.selectedCodeRowFirstLevel = selectedRows[0].key;
      //   }
      // }
    } as GridOptions;
    // })
  }

  onGridReady = (params: GridReadyEvent) => {
    this._gridApi = params.api;
    this._columnApi = params.columnApi;
    // const defaultSortModel: ColumnState[] = [
    //   { colId: 'CodOrg', sort: 'asc', sortIndex: 0 },
    // ];
    // params.columnApi.applyColumnState({ state: defaultSortModel });
  }



  // async createDataOCM(): Promise<void> {
  // console.log(+this.dataStoreService.selectedCodeRowFirstLevel.split(" ")[0]);
  // this._rowData = (await this._prepareDataGastosDetailsService.getDataAllYear(this._dataStoreService.getDataTable.clasificationType))
  // this._rowData = (await this._prepareDataGastosDetailsService.getDataAllYear('gastosProgramaProgramas'))
  // .filter(x => x.CodOrg == this._dataStoreService.selectedCodeRowFirstLevel.split(" ")[0]);
  // .filter(x => x.CodOrg === 24);
  // console.log(this._rowData);
  // }

  private _createColumnsChildren(year: number) {
    return [
      {
        headerName: 'Créditos',
        children: [
          {
            headerName: 'Previsiones Iniciales',
            field: `Iniciales${year}`,
            columnGroupShow: 'open'
          },
          {
            headerName: 'Total Modificaciones',
            field: `Modificaciones${year}`,
            width: 140,
            columnGroupShow: 'open'
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
            columnGroupShow: 'open',
          },
          {
            headerName: 'Obligaciones reconocidas netas',
            field: `ObligacionesReconocidasNetas${year}`,
            width: 135,
            columnGroupShow: 'open'
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

  async home() {
    setTimeout(() => this._router.navigateByUrl("/home"), 50);
  }

}
