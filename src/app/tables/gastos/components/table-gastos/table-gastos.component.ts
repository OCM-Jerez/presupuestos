import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { AgGridAngular } from 'ag-grid-angular';

import { ColumnApi, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community/main';

import { CellRendererOCM, CellRendererOCMtext } from '../../../../ag-grid/CellRendererOCM';
import localeTextESPes from '../../../../../assets/data/localeTextESPes.json';

import { AvalaibleYearsService } from '../../../../services/avalaibleYears.service';
import { DataStoreService } from '../../../../services/dataStore.service';


import { IDataTable } from '../../../../commons/interfaces/dataTable.interface';
import { IDataGraph } from '../../../../commons/interfaces/dataGraph.interface';
import { FlagService } from '../../../../services/flag.service';

@Component({
  selector: 'app-table-gastos',
  templateUrl: './table-gastos.component.html',
  styleUrls: ['./table-gastos.component.scss']
})

export class TableGastosComponent implements OnInit {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  private _columnDefs: any[];
  private _dataTable: IDataTable;
  private _gridApi: GridApi;
  private _columnApi: ColumnApi;
  gridOptions: GridOptions;
  selectedCodeRowFirstLevel = '';
  private _dataGraph: IDataGraph = {} as IDataGraph;
  private subHeaderName: string = "";
  @Input()
  set event(event: Event) {
    if (event) {
      const target = event.target as HTMLButtonElement;
      switch (target.textContent.trim()) {
        case 'Gráfico detalladado':
          this.showGraph();
          break;
        case 'Detalle del programa seleccionado':
          this._router.navigate(['tableProgramaDetails']);
          break;
        case 'Programas que componen orgánico seleccionado':
          this._router.navigate(['tableOrganicoDetails']);
          break;
        case 'Programas que gastan del elemento seleccionado':
          this._router.navigate(['/tableGrupoProgramaDetails'])
          break;
      }
    }
  }

  constructor(
    public avalaibleYearsService: AvalaibleYearsService,
    private _router: Router,
    private _dataStoreService: DataStoreService,
    private _avalaibleYearsService: AvalaibleYearsService,
    private _flagService: FlagService
  ) { }

  ngOnInit(): void {
    this._loadTable();
  }

  ngOnChanges(): void {
    this._loadTable();
    this._flagService.changeFlag(false);
  }

  private async _loadTable() {
    this._dataTable = this._dataStoreService.dataTable;
    this.subHeaderName = this._dataTable.dataPropertyTable.subHeaderName;
    this.setColumnDefs();
    this.setGridOptions();
  }

  setColumnDefs() {
    this._columnDefs = [
      {
        headerName: this._dataTable.dataPropertyTable.headerName,
        children: [
          {
            headerName: this.subHeaderName,
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

      ...this._avalaibleYearsService.getYearsSelected().map(year => {
        return {
          headerName: year,
          children: this._createColumnsChildren(year),
        }
      })

    ];
  }

  setGridOptions() {
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
      rowData: this._dataTable.rowDataGastos,
      columnDefs: this._columnDefs,
      groupDisplayType: 'custom',
      groupIncludeTotalFooter: true,
      groupIncludeFooter: true,
      groupHeaderHeight: 25,
      headerHeight: 54,
      suppressAggFuncInHeader: true,
      rowSelection: 'single',
      localeText: localeTextESPes,
      pagination: true,
      paginationPageSize: 20,
      onRowClicked: () => {
        const selectedRows = this.agGrid.api.getSelectedNodes();
        this._dataStoreService.selectedCodeRowFirstLevel = selectedRows[0].key;
        this._flagService.changeFlag(true);
        // const hasRowSelected = true;
        // this.rowSelected.emit(hasRowSelected);
        // console.log('onRowClicked', selectedRows[0].key);
      }
    } as GridOptions;
  }

  onGridReady = (params: GridReadyEvent) => {
    this._gridApi = params.api;
    this._columnApi = params.columnApi;
    // const defaultSortModel: ColumnState[] = [
    //   { colId: 'CodOrg', sort: 'asc', sortIndex: 0 },
    // ];
    // params.columnApi.applyColumnState({ state: defaultSortModel });
  }

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
            columnGroupShow: 'close',
            sort: 'desc'
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

  showGraph() {
    const selectedRows = this.agGrid.api.getSelectedNodes();
    this._dataStoreService.selectedCodeRow = selectedRows[0].key;
    this._dataGraph.rowDataGastos = this._dataTable.rowDataGastos
    this._router.navigateByUrl("/graphGastos").then(() => {
      this._dataStoreService.setData(
        {
          ...this._dataStoreService.dataGraph, graphSubTitle: selectedRows[0].key
        }
      );
    })
    this._dataStoreService.selectedCodeRowFirstLevel = '';
  }

}
