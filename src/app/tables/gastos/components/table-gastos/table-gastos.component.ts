
/* #region  import */
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AgGridAngular } from 'ag-grid-angular';
import { ColumnApi, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community/main';

import { CellRendererOCM, CellRendererOCMtext } from '../../../../ag-grid/CellRendererOCM';
import localeTextESPes from '../../../../../assets/data/localeTextESPes.json';

import { AvalaibleYearsService } from '../../../../services/avalaibleYears.service';
import { DataStoreService } from '../../../../services/dataStore.service';
import { TableService } from '../../../../services/table.service';
import { PrepareDataProgramaDetailsService } from '../../../../services/prepareDataProgramaDetails.service';

import { IDataTable } from '../../../../commons/interfaces/dataTable.interface';
import { IDataGraph } from '../../../../commons/interfaces/dataGraph.interface';
import { BoundElementProperty } from '@angular/compiler';
/* #endregion */

@Component({
  selector: 'app-table-gastos',
  templateUrl: './table-gastos.component.html',
  styleUrls: ['./table-gastos.component.scss']
})

export class TableGastosComponent implements OnInit {
  /* #region  definir variables */
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  @Input()
  set event(event: Event) {
    if (event) {
      // console.log('event', event);
      const target = event.target as HTMLButtonElement;
      // Considera utilizar la propiedad textContent en lugar de innerText. 
      // La propiedad textContent es más rápida y se recomienda su uso en
      // lugar de innerText, a menos que sea necesario tener en cuenta la
      // formateación visual del contenido del BoundElementProperty
      // console.log('target.innerText', target.innerText);
      // console.log('target.textContent ', target.textContent);
      // if (target.innerText.includes('Gráfico')) {
      //   this.showGraph(event);
      // }
      // if (target.innerText.includes('Programa')) {
      //   this.showProgramaDetalle(event);
      // }
      // if (target.innerText.includes('Orgánico')) {
      //   this.showOrganicoDetalle(event);
      // }

      switch (target.textContent) {
        case 'Gráfico':
          this.showGraph(event);
          break;
        case 'Programa':
          this.showProgramaDetalle(event);
          break;
        case 'Orgánico':
          this.showOrganicoDetalle(event);
          break;
        default:
          // código opcional para manejar casos no cubiertos
          break;
      }

    }
  }

  private _columnDefs: any[];
  private _dataTable: IDataTable;
  private _gridApi: GridApi;
  private _columnApi: ColumnApi;
  gridOptions: GridOptions;
  selectedCodeRowFirstLevel = '';
  private _dataGraph: IDataGraph = {} as IDataGraph;
  /* #endregion */

  constructor(
    public avalaibleYearsService: AvalaibleYearsService,
    private _router: Router,
    private _dataStoreService: DataStoreService,
    private _tableService: TableService,
    private _avalaibleYearsService: AvalaibleYearsService,
    private _prepareDataProgramaDetailsService: PrepareDataProgramaDetailsService,
  ) {
    // this._dataTable = _dataStoreService.getDataTable;
    // console.log("******************* _dataTable *************************")
    // console.log(this._dataTable);

    // const fieldOrder = `Cod${this._dataTable.dataPropertyTable.sufijo}`;
    // this._dataTable.rowData.sort((a, b) => a[fieldOrder] - b[fieldOrder]);
    // console.log(this._dataTable.rowData);
  }

  ngOnInit(): void {
    this._loadTable();
  }

  ngOnChanges(): void {
    this._loadTable();
  }

  private async _loadTable() {
    this._dataTable = this._dataStoreService.getDataTable;
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

      ...this._avalaibleYearsService.getYearsSelected().map(year => {
        return {
          headerName: year,
          children: this._createColumnsChildren(year),
        }
      })

    ];
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
      pagination: true,
      paginationPageSize: 20,
      onRowClicked: () => {
        const selectedRows = this.agGrid.api.getSelectedNodes();
        this._dataStoreService.selectedCodeRowFirstLevel = selectedRows[0].key;

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

  showGraph($event) {
    const selectedRows = this.agGrid.api.getSelectedNodes();
    if (selectedRows.length > 0) {
      this._dataStoreService.selectedCodeRow = selectedRows[0].key;
      this._dataGraph.rowData = this._dataTable.rowData
      this._router.navigateByUrl("/graphGastos").then(() => {
        this._dataStoreService.setData(
          {
            ...this._dataStoreService.dataGraph, graphSubTitle: selectedRows[0].key
          }
        );
      })
      this._dataStoreService.selectedCodeRowFirstLevel = '';
    } else {
      console.log('No hay ninguna fila seleccionada');
      // this._alertService.showAlert(`Selecciona ${this._dataTable.dataPropertyTable.subHeaderName}`);
    }
  }

  showProgramaDetalle($event) {
    const selectedRows = this.agGrid.api.getSelectedNodes();
    if (selectedRows.length > 0) {
      this._dataStoreService.selectedCodeRowFirstLevel = selectedRows[0].key;

      if (this._dataTable.clasificationType === 'gastosProgramaProgramas') {
        this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this._router.navigate(['tableProgramaDetails']);
        });
      }

    }
  }

  showOrganicoDetalle($event) {
    const selectedRows = this.agGrid.api.getSelectedNodes();
    this._dataStoreService.selectedCodeRowFirstLevel = selectedRows[0].key;
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate(['tableOrganicoDetails']);
    });
  }

}
