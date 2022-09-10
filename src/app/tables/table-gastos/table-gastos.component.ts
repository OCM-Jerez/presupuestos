import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AgGridAngular } from 'ag-grid-angular';
import { ColumnApi, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community/main';

import localeTextESPes from '../../../assets/data/localeTextESPes.json';
import { CellRendererOCM, CellRendererOCMtext } from '../../ag-grid/CellRendererOCM';

import { AvalaibleYearsService } from '../../services/avalaibleYears.service';
import { DataStoreService } from '../../services/dataStore.service';
import { PrepareDataGraphTreeService } from '../../services/prepareDataGraphTree.service';
import { AlertService } from '../../services/alert.service';

import { IDataTable } from '../../commons/interfaces/dataTable.interface';
import { IDataGraph } from '../../commons/interfaces/dataGraph.interface';

@Component({
  selector: 'app-compara-gas',
  templateUrl: './table-gastos.component.html',
})
export class TableGastosComponent implements OnInit {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  public gridOptions: GridOptions;
  public hasGraphTree = true;

  public hasOrganicoDetails = false;

  public hasAreaDetails = false;
  public hasPoliticaDetails = false;
  public hasGrupoProgramaDetails = false;
  public hasProgramaDetails = false;

  public hasCapituloDetails = false;
  public hasArticuloDetails = false;
  public hasConceptoDetails = false;
  public hasEconomicoDetails = false;


  private _columnDefs: any[];
  private _dataTable: IDataTable;
  private _dataGraph: IDataGraph = {} as IDataGraph;
  private _gridApi: GridApi;
  private _columnApi: ColumnApi;

  constructor(
    public avalaibleYearsService: AvalaibleYearsService,
    private _router: Router,
    private _dataStoreService: DataStoreService,
    private _prepareDataGraphTreeService: PrepareDataGraphTreeService,
    private _alertService: AlertService
  ) {
    this._dataTable = _dataStoreService.getDataTable;
    const fieldOrder = `Cod${this._dataTable.dataPropertyTable.sufijo}`;
    this._dataTable.rowData.sort((a, b) => a[fieldOrder] - b[fieldOrder]);

    console.log(this._dataTable.clasificationType);
    if (this._dataTable.clasificationType === 'gastosOrganicaOrganicos') { this.hasOrganicoDetails = true };

    if (this._dataTable.clasificationType === 'gastosProgramaAreas') { this.hasAreaDetails = true };
    if (this._dataTable.clasificationType === 'gastosProgramaPoliticas') { this.hasPoliticaDetails = true };
    if (this._dataTable.clasificationType === 'gastosProgramaGrupos') { this.hasGrupoProgramaDetails = true };
    if (this._dataTable.clasificationType === 'gastosProgramaProgramas') { this.hasProgramaDetails = true };

    if (this._dataTable.clasificationType === 'gastosEconomicaCapitulos') { this.hasCapituloDetails = true };
    if (this._dataTable.clasificationType === 'gastosEconomicaArticulos') { this.hasArticuloDetails = true };
    if (this._dataTable.clasificationType === 'gastosEconomicaConceptos') { this.hasConceptoDetails = true };
    if (this._dataTable.clasificationType === 'gastosEconomicaEconomicos') { this.hasEconomicoDetails = true };

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

      ...this.avalaibleYearsService.getYearsSelected().map(year => {
        return {
          headerName: year,
          children: this.createColumnsChildren(year),
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
      // groupSuppressAutoColumn: true,
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

    // setTimeout(() => {
    //   this.gridOptions.columnApi.applyColumnState({
    //     state: [
    //       { colId: 'Orgánico', sort: 'asc', sortIndex: 0 }
    //     ],
    //     defaultState: { sort: null }
    //   })
    // }, 100);

  }

  onGridReady = (params: GridReadyEvent) => {
    this._gridApi = params.api;
    this._columnApi = params.columnApi;
    // const defaultSortModel: ColumnState[] = [
    //   { colId: 'CodOrg', sort: 'asc', sortIndex: 0 },
    // ];
    // params.columnApi.applyColumnState({ state: defaultSortModel });
  }


  ngOnInit(): void {
    // if (this._dataTable.dataPropertyTable.subHeaderName === 'Orgánico' || this._dataTable.dataPropertyTable.subHeaderName === 'Area de gasto') {
    //   this.hasGraphTree = true;
    // }
  }

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

  showGraph() {
    const selectedRows = this.agGrid.api.getSelectedNodes();
    if (selectedRows.length > 0) {
      this._dataStoreService.selectedCodeRow = selectedRows[0].key;
      this._dataGraph.graphSubTitle = selectedRows[0].key;
      this._dataGraph.rowData = this._dataTable.rowData
      this._router.navigateByUrl("/graphGastos").then(() => {
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

  showOrganicoDetails() {
    const selectedRows = this.agGrid.api.getSelectedNodes();
    if (selectedRows.length > 0) {
      this._dataStoreService.selectedCodeRowFirstLevel = selectedRows[0].key;
      this._router.navigateByUrl("/tableOrganicoDetails")
    } else {
      this._alertService.showAlert(`Selecciona ${this._dataTable.dataPropertyTable.subHeaderName}`);
    }
  }

  showAreaDetails() {
    const selectedRows = this.agGrid.api.getSelectedNodes();
    if (selectedRows.length > 0) {
      this._dataStoreService.selectedCodeRowFirstLevel = selectedRows[0].key;
      this._router.navigateByUrl("/tableAreaDetails")
    } else {
      this._alertService.showAlert(`Selecciona ${this._dataTable.dataPropertyTable.subHeaderName}`);
    }
  }

  showPoliticaDetails() {
    const selectedRows = this.agGrid.api.getSelectedNodes();
    if (selectedRows.length > 0) {
      this._dataStoreService.selectedCodeRowFirstLevel = selectedRows[0].key;
      this._router.navigateByUrl("/tablePoliticaDetails")
    } else {
      this._alertService.showAlert(`Selecciona ${this._dataTable.dataPropertyTable.subHeaderName}`);
    }
  }

  showGrupoProgramaDetails() {
    const selectedRows = this.agGrid.api.getSelectedNodes();
    if (selectedRows.length > 0) {
      this._dataStoreService.selectedCodeRowFirstLevel = selectedRows[0].key;
      this._router.navigateByUrl("/tableGrupoProgramaDetails")
    } else {
      this._alertService.showAlert(`Selecciona ${this._dataTable.dataPropertyTable.subHeaderName}`);
    }
  }

  showProgramaDetails() {
    const selectedRows = this.agGrid.api.getSelectedNodes();
    if (selectedRows.length > 0) {
      this._dataStoreService.selectedCodeRowFirstLevel = selectedRows[0].key;
      this._router.navigateByUrl("/tableProgramaDetails")
    } else {
      this._alertService.showAlert(`Selecciona ${this._dataTable.dataPropertyTable.subHeaderName}`);
    }
  }

  showCapituloDetails() {
    const selectedRows = this.agGrid.api.getSelectedNodes();
    if (selectedRows.length > 0) {
      this._dataStoreService.selectedCodeRowFirstLevel = selectedRows[0].key;
      // Para que de tiempo a ver el efecto pulsado del button
      setTimeout(() => this._router.navigateByUrl("/tableCapituloDetails"), 50);
    } else {
      this._alertService.showAlert(`Selecciona ${this._dataTable.dataPropertyTable.subHeaderName}`);
    }
  }

  showArticuloDetails() {
    const selectedRows = this.agGrid.api.getSelectedNodes();
    if (selectedRows.length > 0) {
      this._dataStoreService.selectedCodeRowFirstLevel = selectedRows[0].key;
      setTimeout(() => this._router.navigateByUrl("/tableArticuloDetails"), 50);
    } else {
      this._alertService.showAlert(`Selecciona ${this._dataTable.dataPropertyTable.subHeaderName}`);
    }
  }

  showConceptoDetails() {
    const selectedRows = this.agGrid.api.getSelectedNodes();
    if (selectedRows.length > 0) {
      this._dataStoreService.selectedCodeRowFirstLevel = selectedRows[0].key;
      setTimeout(() => this._router.navigateByUrl("/tableConceptoDetails"), 50);
    } else {
      this._alertService.showAlert(`Selecciona ${this._dataTable.dataPropertyTable.subHeaderName}`);
    }
  }

  showEconomicoDetails() {
    const selectedRows = this.agGrid.api.getSelectedNodes();
    if (selectedRows.length > 0) {
      this._dataStoreService.selectedCodeRowFirstLevel = selectedRows[0].key;
      setTimeout(() => this._router.navigateByUrl("/tableEconomicoDetails"), 50);
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

  volver() {
    setTimeout(() => this._router.navigateByUrl("/home"), 50);
  }

}
