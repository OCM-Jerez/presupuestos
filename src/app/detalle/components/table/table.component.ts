import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';

import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { ColumnApi, ColumnState, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community/main';

import { CellRendererOCM, CellRendererOCMtext } from '@ag-grid/CellRendererOCM';
import localeTextESPes from '@assets/data/localeTextESPes.json';

import { AvalaibleYearsService } from '@services/avalaibleYears.service';
import { DataStoreService } from '@services/dataStore.service';
import { HasRowClicked } from '@services/hasRowClicked.service';

import { NgIf } from '@angular/common';
import { IDataTable } from '@interfaces/dataTable.interface';
import { SelectedTabService } from '@services/selectedTab.service';
import { TableService } from '@services/table.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { CLASIFICATION_TYPE } from '../../../commons/types/clasification.type';
import { ReloadTableService } from '../../../services/reloadTable.service';
import { SelectedSubTab1Service } from '../../../services/selectedSubTab1.service';
import { SelectedSubTab2Service } from '../../../services/selectedSubTab2.service';
import { SelectedSubTab4Service } from '../../../services/selectedSubTab4.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [NgIf, AgGridModule]
})
export class TableComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  public modules = [RowGroupingModule];
  public gridOptions: GridOptions;
  private _gridApi: GridApi;
  private _columnApi: ColumnApi;
  private _columnDefs: any[];
  private _dataTable: IDataTable;
  private _subHeaderName: string = '';
  private _isIngresos: boolean = true;
  private _tabSelected: any;
  private _subTabSelected: any;
  private _subTabSelectd1: string;
  private _subTabSelectd2: string;
  private _subTabSelectd4: string;
  private _clasification_type: CLASIFICATION_TYPE;
  private _unsubscribe$ = new Subject<void>();

  constructor(
    private _tableService: TableService,
    private _avalaibleYearsService: AvalaibleYearsService,
    private _dataStoreService: DataStoreService,
    private _hasRowClicked: HasRowClicked,
    private _selectedSubTab1Service: SelectedSubTab1Service,
    private _selectedSubTab2Service: SelectedSubTab2Service,
    private _selectedSubTab4Service: SelectedSubTab4Service,
    private _selectedTabService: SelectedTabService,
    private _reloadTableService: ReloadTableService
  ) {
    this.subscribeToServices();
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    //     console.log('ngOnChanges', changes);
    //     const ingresosClasificaciones: CLASIFICATION_TYPE[] = [
    //         'ingresosEconomicaEconomicos',
    //         'ingresosEconomicaConceptos',
    //         'ingresosEconomicaArticulos',
    //         'ingresosEconomicaCapitulos',
    //     ];
    //     this._dataTable = await this._tableService.loadData(this._tabSelected);
    //     console.log('this._dataTable', this._dataTable);
    //     console.log('this._dataTable.clasificationType', this._dataTable);
    //     if (ingresosClasificaciones.includes(this._dataTable.clasificationType)) {
    //         this._isIngresos = true;
    //     } else {
    //         this._isIngresos = false;
    //     }
    //     if (changes && changes['dataTable']) {
    //         this._loadTable();
    //         if (!changes['dataTable'].firstChange) {
    //             if (this._isIngresos) {
    //                 this._gridApi.setRowData(this._dataTable.rowDataIngresos);
    //             } else {
    //                 this._gridApi.setRowData(this._dataTable.rowDataGastos);
    //             }
    //         }
    //     }
  }

  async ngOnInit(): Promise<void> {
    // console.log('ngOnInit');
    this._hasRowClicked.change(null);

    this._selectedTabService.source$
      .pipe(
        tap((data) => {
          this._tabSelected = data;
          // console.log('this._selectedTabService.source$');
          this._loadTable();
        }),
        takeUntil(this._unsubscribe$)
      )
      .subscribe();

    this._reloadTableService.reloadTable$.pipe(takeUntil(this._unsubscribe$)).subscribe(() => {
      // console.log('reloadTable$');
      this._loadTable();
    });
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  private async _loadTable() {
    // console.log('this._tabSelected', this._tabSelected);
    // console.log('this._subTabSelected1', this._subTabSelectd1);

    switch (this._tabSelected) {
      case 'ingresosEconomicaEconomicos':
        switch (this._subTabSelectd1) {
          case 'Por capítulo ingresos':
            this._clasification_type = 'ingresosEconomicaCapitulos';
            break;
          case 'Por artículo':
            this._clasification_type = 'ingresosEconomicaArticulos';
            // console.log('this._subTabSelected', this._subTabSelected);

            break;
          case 'Por concepto':
            this._clasification_type = 'ingresosEconomicaConceptos';
            break;
          case 'Por económico':
            this._clasification_type = 'ingresosEconomicaEconomicos';
            break;
        }
        break;
      case 'gastosProgramaProgramas':
        switch (this._subTabSelectd2) {
          case 'Por áreas':
            this._clasification_type = 'gastosProgramaAreas';
            break;
          case 'Por política':
            this._clasification_type = 'gastosProgramaPoliticas';
            break;
          case 'Por grupo programas':
            this._clasification_type = 'gastosProgramaGrupos';
            break;
          case 'Por programa':
            this._clasification_type = 'gastosProgramaProgramas';
            break;
        }
        break;
      case 'gastosOrganicaOrganicos':
        this._clasification_type = 'gastosOrganicaOrganicos';
        break;
      case 'gastosEconomicaEconomicos':
        switch (this._subTabSelectd4) {
          case 'Por capítulo gasto':
            this._clasification_type = 'gastosEconomicaCapitulos';
            break;
          case 'Por artículo':
            this._clasification_type = 'gastosEconomicaArticulos';
            break;
          case 'Por concepto':
            this._clasification_type = 'gastosEconomicaConceptos';
            break;
          case 'Por económico':
            this._clasification_type = 'gastosEconomicaEconomicos';
            break;
        }
        break;
    }
    // console.log('this._clasification_type', this._clasification_type);
    this._dataTable = await this._tableService.loadData(this._clasification_type);
    // console.log(this._dataTable);

    this._subHeaderName = this._dataTable.dataPropertyTable.subHeaderName;
    this._isIngresos = this._dataTable.dataPropertyTable.isIngresos;

    this.setColumnDefs();
    this._isIngresos ? this.setGridOptionsIngresos() : this.setGridOptions();

    if (this._gridApi) {
      this._gridApi.setRowData(this._isIngresos ? this._dataTable.rowDataIngresos : this._dataTable.rowDataGastos);
    }
    // console.log('_loadTable', this._tabSelected, this._dataTable, this._isIngresos, this._gridApi);
  }

  subscribeToServices(): void {
    this._selectedSubTab1Service.source$.subscribe((data) => {
      this._subTabSelectd1 = data;
      // console.log('this._subTabSelectd1', this._subTabSelectd1);
    });

    this._selectedSubTab2Service.source$.subscribe((data) => {
      this._subTabSelectd2 = data;
    });

    this._selectedSubTab4Service.source$.subscribe((data) => {
      this._subTabSelectd4 = data;
    });
  }

  setColumnDefs() {
    this._columnDefs = [
      {
        headerName: this._dataTable.dataPropertyTable.headerName,
        children: [
          {
            headerName: this._subHeaderName,
            field: this._dataTable.dataPropertyTable.codField,
            // width: this._dataTable.dataPropertyTable.width,
            width: 750,
            rowGroup: true,
            showRowGroup: this._dataTable.dataPropertyTable.codField,
            cellRenderer: CellRendererOCMtext,
            valueGetter: (params) => {
              if (params.data) {
                return (
                  params.data[this._dataTable.dataPropertyTable.codField] +
                  ' - ' +
                  params.data[this._dataTable.dataPropertyTable.desField]
                );
              } else {
                return null;
              }
            }
          }
        ]
      },

      ...this._avalaibleYearsService.getYearsSelected().map((year) => {
        return {
          headerName: year,
          children: this._isIngresos ? this._createColumnsChildrenIngresos(year) : this._createColumnsChildren(year)
        };
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
            '</div>'
        }
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
        this._hasRowClicked.change(selectedRows[0].key);
      }
    } as GridOptions;
  }

  setGridOptionsIngresos() {
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
            '</div>'
        }
      },
      rowData: this._dataTable.rowDataIngresos,
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
        this._hasRowClicked.change(selectedRows[0].key);
      }
    } as GridOptions;
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
            columnGroupShow: 'closed',
            sort: 'desc'
          }
        ]
      },
      {
        headerName: 'Gastos',
        children: [
          {
            headerName: 'Gastos Comprometidos',
            field: `GastosComprometidos${year}`,
            width: 140,
            columnGroupShow: 'open'
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
            columnGroupShow: 'closed'
          },
          {
            headerName: 'Obligaciones pendientes de pago al final periodo',
            field: `ObligacionesPendientePago${year}`,
            width: 120,
            columnGroupShow: 'closed'
          }
        ]
      },
      {
        headerName: 'Remanente Credito',
        field: `RemanenteCredito${year}`
      }
    ];
  }

  private _createColumnsChildrenIngresos(year: number) {
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
            columnGroupShow: 'closed',
            sort: 'desc'
          }
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
            columnGroupShow: 'closed'
          },
          {
            headerName: 'Pendientes de cobro al final del periodo',
            field: `DerechosPendienteCobro${year}`,
            columnGroupShow: 'open'
          }
        ]
      },
      {
        headerName: 'Exceso o defecto previsión',
        field: `DiferenciaPrevision${year}`
      }
    ];
  }

  onGridReady = (params: GridReadyEvent) => {
    this._gridApi = params.api;
    this._columnApi = params.columnApi;

    const defaultSortModel: ColumnState[] = [
      {
        colId: this._dataTable.dataPropertyTable.codField,
        sort: 'asc',
        sortIndex: 0
      }
    ];
    params.columnApi.applyColumnState({ state: defaultSortModel });
  };
}
