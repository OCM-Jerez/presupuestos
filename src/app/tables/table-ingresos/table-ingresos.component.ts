/* #region  import */
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AgGridAngular } from 'ag-grid-angular';
import { ColumnState, GridOptions, GridReadyEvent } from 'ag-grid-community/main';
import { ColumnApi, GridApi } from "ag-grid-community/main";

import localeTextESPes from '../../../assets/data/localeTextESPes.json';
import { CellRendererOCM, CellRendererOCMtext } from '../../ag-grid/CellRendererOCM';
import { CellRendererOCM1, CellRendererOCMtext1 } from '../../ag-grid/CellRendererOCM1'
// import { headerHeightGetter } from '../../ag-grid/headerHeightGetter';

import { AlertService } from '../../services/alert.service';
import { AvalaibleYearsService } from '../../services/avalaibleYears.service';
import { DataStoreService } from '../../services/dataStore.service';
import { PrepareDataGraphTreeService } from '../../services/prepareDataGraphTree.service';
import { PrepareDataTreemapService } from '../../services/prepareDataTreemap.service';
import { TableService } from '../../services/table.service';

import { IDataTable } from '../../commons/interfaces/dataTable.interface';

import { CLASIFICATION_TYPE } from '../../commons/util/util';
import { getClasificacion } from '../data-table';

/* #endregion */
@Component({
  selector: 'app-table-ingresos',
  templateUrl: './table-ingresos.component.html',
  styleUrls: ['./table-ingresos.component.scss']
})

export class TableIngresosComponent implements OnInit {
  /* #region  definir variables */
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  @Output() clickDetail = new EventEmitter();
  @Output() clickDetalle: EventEmitter<void> = new EventEmitter();
  @Input() fieldsHide: string[] = [];
  @Input() buttonsHide: string[] = [];
  @Input() hasTitle: boolean = true;
  @Input() hasGrafico: boolean = true;
  @Input() cellRenderer: boolean;
  public gridOptions: GridOptions;
  public textButton: string;
  public hasGraficoButton = true;
  public hasGraphTree = true;
  public hasMenuButton = true;
  private _gridApi: GridApi;
  private _columnApi: ColumnApi;
  private _columnDefs: any[];
  private _dataTable: IDataTable;
  private _cellRenderer: string = '';
  showTable = true;
  messageYears = this.avalaibleYearsService.message;
  /* #endregion */

  constructor(
    public avalaibleYearsService: AvalaibleYearsService,
    private _router: Router,
    private _dataStoreService: DataStoreService,
    private _prepareDataGraphTreeService: PrepareDataGraphTreeService,
    private _prepareDataTreemapService: PrepareDataTreemapService,
    private _alertService: AlertService,
    private _tableService: TableService
  ) {
    this._loadPropertyTable();
  }

  ngOnInit(): void {
    this._cellRenderer = this.cellRenderer ? 'CellRendererOCM' : 'CellRendererOCMtext1';
  }

  private async _loadPropertyTable() {
    this._dataTable = this._dataStoreService.getDataTable

    this._columnDefs = [
      {
        headerName: this._dataTable.dataPropertyTable.headerName,
        children: [
          {
            headerName: this._dataTable.dataPropertyTable.subHeaderName,
            field: this._dataTable.dataPropertyTable.codField,
            // width: this._dataTable.dataPropertyTable.width,
            width: 220,
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

      ...this.avalaibleYearsService.getYearsSelected().map(year => {
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
      headerHeight: 40,
      suppressAggFuncInHeader: true,
      rowSelection: 'single',
      localeText: localeTextESPes,
      pagination: true,
      paginationPageSize: 20,

      // EVENTS - add event callback handlers
      // onGridReady: function (event) { consoltextButtone.log('the grid is now ready'); },
      onRowClicked: () => {
        this.textButton = "Mostrar gráfico";
        // this.showGraph();
      }
    } as GridOptions;

    this.textButton = `Selecciona ${this._dataTable.dataPropertyTable.subHeaderName}`;

  }

  // Store the api for later use.
  // No lo uso en este componente pero si quisiese hacer alguna llamada a las API
  // este codigo es necesario.

  onGridReady = (params: GridReadyEvent) => {
    this._gridApi = params.api;
    this._columnApi = params.columnApi;

    let defaultSortModel: ColumnState[] = [
      // { colId: this._dataTable.dataPropertyTable.codField, sort: 'asc', sortIndex: 0 },
    ];
    params.columnApi.applyColumnState({ state: defaultSortModel });

    this._hideColumns();
    this._hideButtons();
  }

  // TODO: Las colummnas disparan su altura
  // headerHeightSetter() {
  // let padding = 20;
  // let height = headerHeightGetter(1) + padding;
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
            columnGroupShow: 'open',
          },
          {
            headerName: 'Total modificaciones',
            field: `Modificaciones${year}`,
            columnGroupShow: 'open'
          },
          {
            headerName: 'Previsiones definitivas',
            field: `Definitivas${year}`,
            columnGroupShow: 'close',
            sort: 'desc'
          },
        ]
      },

      {
        headerName: 'Derechos',
        children: [
          {
            headerName: 'Reconocidos netos',
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
            headerName: 'Recaudados',
            field: `DerechosReconocidosNetos${year}`,
            columnGroupShow: 'open'
          },
          {
            headerName: 'Recaudación neta',
            field: `RecaudacionNeta${year}`,
            columnGroupShow: 'close'
          },
          {
            headerName: 'Pendientes de cobro al final del periodo',
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

  private _hideColumns() {
    if (this.fieldsHide.length > 0) {
      const year = this.avalaibleYearsService.yearsSelected[0];
      const columnsHide = this.fieldsHide.map((item) => { return { colId: `${item}${year}`, hide: true } });
      this._columnApi!.applyColumnState({
        state: columnsHide
      });
    }
  }

  private _hideButtons() {
    if (this.buttonsHide.length > 0) {
      if (this.buttonsHide.includes('menu')) {
        this.hasMenuButton = false
      };
      if (this.buttonsHide.includes('grafico')) {
        this.hasGraficoButton = false
      };
      if (this.buttonsHide.includes('graphTree')) {
        this.hasGraphTree = false
      };
    }
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
    this._prepareDataGraphTreeService.prepareDataGraphTree(this._dataTable.rowData);
    setTimeout(() => {
      this._router.navigateByUrl("/graphTree")
    }, 50);
  }

  async detalle(typeClasification: CLASIFICATION_TYPE) {
    this.clickDetalle.emit();
    this._dataStoreService.IsDetails = true;
    const selectedRows = this.agGrid.api.getSelectedNodes();
    const dataPropertyTable = getClasificacion(typeClasification);
    // console.log('dataPropertyTable', dataPropertyTable);

    if (selectedRows.length > 0) {
      this._dataStoreService.selectedCodeRowFirstLevel = selectedRows[0].key;
      const useStarWitch: boolean = dataPropertyTable.useStarWitch;
      const attribute: string = dataPropertyTable.attribute;
      this._dataTable = await this._tableService.loadDataForTypeClasification(
        // true,
        typeClasification,
        { valueFilter: this._dataStoreService.selectedCodeRowFirstLevel.split(" ")[0], attribute, useStarWitch });
    } else {
      this._dataTable = await this._tableService.loadDataForTypeClasification(
        // true,
        typeClasification);
      // this._alertService.showAlert(`Selecciona artículo`);
    }

    // console.log('He pulsado un botón detalles, actualizo data', this._dataTable);
    this._dataStoreService.selectedCodeRowFirstLevel = '';

    // console.log('Actualizo datos treemap en función del boton pulsado');
    await this._prepareDataTreemapService.calcSeries(
      this._dataTable.rowData,
      getClasificacion(this._dataTable.clasificationType).codField,
      getClasificacion(this._dataTable.clasificationType).desField,
      'Definitivas2022'
    );
    // console.log('this._dataStoreService.getDataTreemap', this._dataStoreService.getDataTreemap);

    this.showTable = false;
    setTimeout(() => {
      this._hideButtons()
      this._loadPropertyTable();
      this.showTable = true;
    }, 500);
  }

  async home() {
    setTimeout(() => this._router.navigateByUrl("/home"), 50);
  }

}




