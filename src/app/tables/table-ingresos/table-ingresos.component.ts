import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AgGridAngular } from 'ag-grid-angular';
import { ColumnState, FilterManager, GridOptions, GridReadyEvent } from 'ag-grid-community/main';
import { ColumnApi, GridApi } from "ag-grid-community/main";

import localeTextESPes from '../../../assets/data/localeTextESPes.json';
import { CellRendererOCM, CellRendererOCMtext } from '../../ag-grid/CellRendererOCM';
// import { headerHeightGetter } from '../../ag-grid/headerHeightGetter';

import { AvalaibleYearsService } from '../../services/avalaibleYears.service';
import { DataStoreService } from '../../services/dataStore.service';
import { PrepareDataGraphTreeService } from '../../services/prepareDataGraphTree.service';
import { AlertService } from '../../services/alert.service';

import { IDataTable } from '../../commons/interfaces/dataTable.interface';
import { PrepareDataIngresosService } from '../../services/prepareDataIngresos.service';

import { getClasificacion } from '../../tables/data-table';

@Component({
  selector: 'app-compara-ing',
  templateUrl: './table-ingresos.component.html',
})
export class TableIngresosComponent {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  public gridOptions: GridOptions;
  public hasGraphTree = true;
  private _gridApi: GridApi;
  private _columnApi: ColumnApi;
  private _columnDefs: any[];
  private _dataTable: IDataTable;
  textButton: string;

  constructor(
    public avalaibleYearsService: AvalaibleYearsService,
    private _router: Router,
    private _dataStoreService: DataStoreService,
    private _prepareDataGraphTreeService: PrepareDataGraphTreeService,
    private _alertService: AlertService,
    private _prepareDataIngresosService: PrepareDataIngresosService
  ) {

    // let concepto = +this._dataStoreService.selectedCodeRowFirstLevel.split(" ")[0];
    // this._dataStoreService.IsDetails
    //   ? this.prepareData()
    //   : this._dataTable = _dataStoreService.getDataTable

    if (this._dataStoreService.IsDetails) {
      // this.prepareData()
      // this._dataTable.dataPropertyTable = _dataStoreService.getDataTable.dataPropertyTable
      console.log('IsDetail', this._dataStoreService.IsDetails);
      // async () => await this.setDataTable()
      // const promise = await this.setDataTable();
      // this.esperar();
      // this.setDataTable().then(() => {
      //   this._dataTable = this._dataStoreService.getDataTable
      //   this._dataTable.dataPropertyTable.headerName = 'Clasificado por Económico';
      //   this._dataTable.dataPropertyTable.subHeaderName = 'Económico';
      //   this._dataTable.dataPropertyTable.sufijo = 'Eco';
      //   this._dataTable.dataPropertyTable.codField = 'CodEco';
      //   this._dataTable.dataPropertyTable.desField = 'DesEco';
      //   this._dataTable.dataPropertyTable.width = 400;
      //   this._dataTable = _dataStoreService.getDataTable
      // })
      this.setDataTable()
      this._dataTable = this._dataStoreService.getDataTable
      this._dataTable.dataPropertyTable.headerName = 'Clasificado por Económico';
      this._dataTable.dataPropertyTable.subHeaderName = 'Económico';
      this._dataTable.dataPropertyTable.sufijo = 'Eco';
      this._dataTable.dataPropertyTable.codField = 'CodEco';
      this._dataTable.dataPropertyTable.desField = 'DesEco';
      this._dataTable.dataPropertyTable.width = 400;
      this._dataTable = _dataStoreService.getDataTable
      console.log('Despues dataPropertyTable', this._dataTable);
    } else {
      this._dataTable = _dataStoreService.getDataTable
      console.log('IsDetail', this._dataStoreService.IsDetails);
      console.log('Datos con IsDetail = false', this._dataTable.rowData)
    }

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
    console.log('Antes gridOptions', this._dataTable.rowData);

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
      headerHeight: 40,
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
            headerName: 'Previsiones iniciales',
            field: `Iniciales${year}`,
            columnGroupShow: 'open'
          },
          {
            headerName: 'Total modificaciones',
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
            headerName: 'Reconocidos netos',
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
        headerName: 'Exceso o defecto previsión',
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

  async prepareData() {
    let rowData: any[];
    rowData = await this._prepareDataIngresosService.getDataAllYear('ingresosEconomicaCapitulos', 'eco');
    this._dataTable.rowData = rowData;
  }

  showEconomicoDetails() {
    this._dataStoreService.IsDetails = true;
    const selectedRows = this.agGrid.api.getSelectedNodes();
    if (selectedRows.length > 0) {
      this._dataStoreService.selectedCodeRowFirstLevel = selectedRows[0].key;
      // this._router.navigateByUrl("/tableIngresos")
      this.reloadCurrentRoute()
    } else {
      this._alertService.showAlert(`Selecciona económico`);
    }
  }

  reloadCurrentRoute() {
    // console.log('reloadCurrentRoute()');
    // console.log('Antes', this._dataTable);
    let currentUrl = this._router.url;
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate([currentUrl]);
    });
  }

  async setDataTable(): Promise<void> {
    const dataPropertyTable = getClasificacion('ingresosEconomicaCapitulos');
    let rowData: any[];
    rowData = (await this._prepareDataIngresosService.getDataAllYear('ingresosEconomicaEconomicos', 'Eco'));
    console.log('Despues getDataAllYear()', rowData);

    rowData.map(item => {
      item.CodCap = Math.floor((item.CodEco / 10000));
      return item;
    });
    console.log('Despues map()', rowData);

    // rowData
    // .filter(item => item.CodCap === this._dataStoreService.selectedCodeRowFirstLevel.split(" ")[0]);
    // console.log('Despues filter()', rowData);

    let r = rowData.filter(item => item.CodCap === +this._dataStoreService.selectedCodeRowFirstLevel.split(" ")[0]);
    console.log('r Despues filter()', r);
    rowData = r

    const sendDataTable: IDataTable = {
      dataPropertyTable,
      clasificationType: 'ingresosEconomicaCapitulos',
      rowData
    }
    // console.log(sendDataTable);
    // await this.esperar();
    this._dataStoreService.setDataTable = sendDataTable;
    this._dataTable = this._dataStoreService.getDataTable
    console.log('Despues setDataTable()', this._dataTable);
  }

  // async filtrar(datos) {
  //   console.log(datos.filter(item => {
  //     item.CodCap === +this._dataStoreService.selectedCodeRowFirstLevel.split(" ")[0];
  //     // return { ...item }
  //   }));
  // }

  // async esperar() {
  //   setTimeout(() => {
  //     console.log('Esperando');
  //   }, 5000)
  // }

}




