import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AgGridAngular } from 'ag-grid-angular';
import { ColumnState, GridOptions, GridReadyEvent } from 'ag-grid-community/main';
import { ColumnApi, GridApi } from "ag-grid-community/main";

import localeTextESPes from '../../../assets/data/localeTextESPes.json';
import { CellRendererOCM, CellRendererOCMtext } from '../../ag-grid/CellRendererOCM';
// import { headerHeightGetter } from '../../ag-grid/headerHeightGetter';

import { AvalaibleYearsService } from '../../services/avalaibleYears.service';
import { DataStoreService } from '../../services/dataStore.service';
import { PrepareDataGraphTreeService } from '../../services/prepareDataGraphTree.service';
import { AlertService } from '../../services/alert.service';

import { IDataTable } from '../../commons/interfaces/dataTable.interface';

@Component({
  selector: 'app-compara-ing',
  templateUrl: './table-ingresos.component.html',
})
export class TableIngresosComponent {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  public gridOptions: GridOptions;
  textButton: string;
  public hasGraphTree = true;
  private _gridApi: GridApi;
  private _columnApi: ColumnApi;
  private _columnDefs: any[];
  private _dataTable: IDataTable;

  constructor(
    public avalaibleYearsService: AvalaibleYearsService,
    private _router: Router,
    private _dataStoreService: DataStoreService,
    private _prepareDataGraphTreeService: PrepareDataGraphTreeService,
    private _alertService: AlertService
  ) {

    this._dataTable = _dataStoreService.getDataTable;
    this.textButton = `Selecciona ${this._dataTable.dataPropertyTable.subHeaderName} para mostrar gráfico`;

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

      ...avalaibleYearsService.getYearsSelected().map(year => {
        return {
          headerName: year,
          children: this.createColumnsChildren(year),
        }
      })

    ]

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
      rowData: this._dataTable.rowData,
      columnDefs: this._columnDefs,
      groupDisplayType: 'custom',
      groupIncludeTotalFooter: true,
      groupIncludeFooter: true,
      groupHeaderHeight: 25,
      headerHeight: 36,
      suppressAggFuncInHeader: true,
      rowSelection: 'single',
      localeText: localeTextESPes,
      pagination: false,

      // EVENTS - add event callback handlers
      // onGridReady: function (event) { consoltextButtone.log('the grid is now ready'); },
      onRowClicked: () => {
        this.textButton = "Mostrar gráfico";
        // this.showGraph();
      }
      // onRowClicked: function (event) {
      //   // https://michelestieven.medium.com/angular-derived-values-from-forms-with-rxjs-48760807ed1e
      //   console.log('a row was clicked');
      //   this.textButton = "Mostrar gráfico";

      //   //document.querySelector('#showGraph')!.innerHTML = `${this.textButton}`;
      //   console.log(this.textButton);
      //   //this.showGraph()
      // },
      // onColumnResized: function (event) { console.log('a column was resized'); },

      // CALLBACKS
      // isScrollLag: function () { return false; }
      // getRowHeight: (params) => 25

    } as GridOptions;
  }

  // Store the api for later use.
  // No lo uso en este componente pero si quisiese hacer alguna llamada a las API
  // este codigo es necesario.
  onGridReady = (params: GridReadyEvent) => {
    this._gridApi = params.api;
    this._columnApi = params.columnApi;
    var defaultSortModel: ColumnState[] = [
      { colId: this._dataTable.dataPropertyTable.codField, sort: 'asc', sortIndex: 0 },
    ];
    params.columnApi.applyColumnState({ state: defaultSortModel });
  }

  // TODO: Las colummnas disparan su altura
  // headerHeightSetter() {
  // var padding = 20;
  // var height = headerHeightGetter(1) + padding;
  // this.GridApi.setHeaderHeight(height);
  // this.GridApi.resetRowHeights();
  // }

  createColumnsChildren(year: number) {
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
            columnGroupShow: 'open'
          },
          {
            headerName: 'Previsiones definitivas',
            field: `Definitivas${year}`,
            columnGroupShow: 'close'
          },
        ]
      },

      {
        headerName: 'Derechos',
        children: [
          {
            headerName: 'Reconocidos',
            field: `DerechosReconocidos${year}`,
            columnGroupShow: 'open'
          },
          {
            headerName: 'Anulados',
            field: `DerechosAnulados${year}`,
            columnGroupShow: 'open'
          },
          {
            headerName: 'Cancelados',
            field: `DerechosCancelados${year}`,
            columnGroupShow: 'open'
          },
          {
            headerName: 'Reconocidos Netos',
            field: `DerechosReconocidosNetos${year}`,
            columnGroupShow: 'open'
          },
          {
            headerName: 'Recaudación neta',
            field: `RecaudacionNeta${year}`,
            columnGroupShow: 'close'
          },
          {
            headerName: 'Pendientes de cobro al 31 diciembre',
            field: `DerechosPendienteCobro${year}`,
            columnGroupShow: 'open'
          },
        ]
      },
      {
        headerName: 'Exceso/defecto previsión',
        field: `DiferenciaPrevision${year}`,
      },
    ];
  }

  showGraph() {
    const selectedRows = this.agGrid.api.getSelectedNodes();
    if (selectedRows.length > 0) {
      this._dataStoreService.selectedCodeRow = selectedRows[0].key;
      this._router.navigateByUrl("/graphIngresos").then(() => {
        this._dataStoreService.setData(
          {
            ...this._dataStoreService.dataGraph, graphSubTitle: selectedRows[0].key
          }
        );
      })
    } else {
      this._alertService.showAlert(`Selecciona ${this._dataTable.dataPropertyTable.subHeaderName}`);
    }
  }

  showGraphTree() {
    // console.log(this._dataTable.rowData);
    this._prepareDataGraphTreeService.prepareDataGraphTree(this._dataTable.rowData);
    setTimeout(() => {
      this._router.navigateByUrl("/graphTree")
    }, 50);
  }

}




