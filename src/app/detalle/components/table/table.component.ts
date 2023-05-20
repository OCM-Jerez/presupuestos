import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Subject, takeUntil, tap } from 'rxjs';

import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { ColumnApi, ColumnState, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community/main';

import { CellRendererOCM, CellRendererOCMtext } from '@ag-grid/CellRendererOCM';
import localeTextESPes from '@assets/data/localeTextESPes.json';

import { AvalaibleYearsService } from '@services/avalaibleYears.service';
import { DataStoreService } from '@services/dataStore.service';
import { DataStoreSubtabService } from '@services/dataStoreSubtab.service';
import { HasRowClicked } from '@services/hasRowClicked.service';
import { ReloadTableService } from '@services/reloadTable.service';
import { TableService } from '@services/table.service';

import { IDataTable } from '@interfaces/dataTable.interface';

import { CLASIFICATION_TYPE } from '@appTypes/clasification.type';
import { DataStoreTabService } from '../../../services/dataStoreTab.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [NgIf, AgGridModule]
})
export class TableComponent implements OnInit, OnDestroy {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  public modules = [RowGroupingModule];
  public gridOptions: GridOptions;
  private _clasification: CLASIFICATION_TYPE;
  private _columnApi: ColumnApi;
  private _gridApi: GridApi;
  private _columnDefs: any[];
  private _dataTable: IDataTable;
  private _fields = { codigo: '', descripcion: '' };
  private _isIngresos: boolean = true;
  private _headerName: string = '';
  private _subHeaderName: string = '';
  // private _subTabSelectd1: string;
  // private _subTabSelectd2: string;
  // private _subTabSelectd4: string;
  private _tabSelected: any;
  private _unsubscribe$ = new Subject<void>();
  private _data: any;

  constructor(
    private _avalaibleYearsService: AvalaibleYearsService,
    private _dataStoreService: DataStoreService,
    private _hasRowClicked: HasRowClicked,
    private _reloadTableService: ReloadTableService,
    // private _selectedSubtab1Service: SelectedSubtab1Service,
    // private _selectedSubtab2Service: SelectedSubtab2Service,
    // private _selectedSubtab4Service: SelectedSubtab4Service,
    // private _selectedTabService: SelectedTabService,
    private _tableService: TableService,
    private _dataStoreTabService: DataStoreTabService,
    private _dataStoreSubtabService: DataStoreSubtabService
  ) {
    // this._subscribeToServices();
  }

  async ngOnInit(): Promise<void> {
    console.log('TableComponent.ngOnInit()');

    this._hasRowClicked.change(null);

    this._dataStoreTabService
      .getTab()
      .pipe(
        tap((data) => {
          this._tabSelected = data;
          this._loadTable();
        }),
        takeUntil(this._unsubscribe$)
      )
      .subscribe();

    this._reloadTableService.reloadTable$.pipe(takeUntil(this._unsubscribe$)).subscribe(() => {
      this._loadTable();
    });
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  private async _loadTable() {
    this._hasRowClicked.change(null);
    console.log('this._tabSelected', this._tabSelected);

    switch (this._tabSelected.clasificationType) {
      case 'ingresosEconomicaEconomicos':
        this._data = this._dataStoreSubtabService.getData1();
        break;
      case 'gastosProgramaProgramas':
        this._data = this._dataStoreSubtabService.getData2();
        break;
      case 'gastosOrganicaOrganicos':
        this._data = this._dataStoreSubtabService.getData3();
        break;
      case 'gastosEconomicaEconomicos':
        this._data = this._dataStoreSubtabService.getData4();
        break;
    }

    console.log('this._data', this._data);

    // console.log('data', data);
    this._clasification = this._data.key as CLASIFICATION_TYPE;
    this._fields.codigo = this._data.codField;
    this._fields.descripcion = this._data.desField;
    // console.log('this._clasification', this._clasification);
    // console.log('this._fields', this._fields);

    // switch (this._tabSelected) {
    //   case 'ingresosEconomicaEconomicos':
    //     switch (this._subTabSelectd1) {
    //       case 'Por capítulo ingresos':
    //         this._clasification = 'ingresosEconomicaCapitulos';
    //         this._fields = { codigo: 'CodCap', descripcion: 'DesCap' };
    //         break;
    //       case 'Por artículo':
    //         this._clasification = 'ingresosEconomicaArticulos';
    //         this._fields = { codigo: 'CodArt', descripcion: 'DesArt' };
    //         break;
    //       case 'Por concepto':
    //         this._clasification = 'ingresosEconomicaConceptos';
    //         this._fields = { codigo: 'CodCon', descripcion: 'DesCon' };
    //         break;
    //       case 'Por económico':
    //         this._clasification = 'ingresosEconomicaEconomicos';
    //         this._fields = { codigo: 'CodEco', descripcion: 'DesEco' };
    //         break;
    //       default:
    //         break;
    //     }
    //     break;
    //   case 'gastosProgramaProgramas':
    //     // this._fields = { codigo: 'CodPro', descripcion: 'DesPro' };
    //     switch (this._subTabSelectd2) {
    //       case 'Por áreas':
    //         this._clasification = 'gastosProgramaAreas';
    //         this._fields = { codigo: 'CodAre', descripcion: 'DesAre' };
    //         break;
    //       case 'Por política':
    //         this._clasification = 'gastosProgramaPoliticas';
    //         this._fields = { codigo: 'CodPol', descripcion: 'DesPol' };
    //         break;
    //       case 'Por grupo programas':
    //         this._clasification = 'gastosProgramaGrupos';
    //         this._fields = { codigo: 'CodGru', descripcion: 'DesGru' };
    //         break;
    //       case 'Por programa':
    //         this._clasification = 'gastosProgramaProgramas';
    //         this._fields = { codigo: 'CodPro', descripcion: 'DesPro' };
    //         break;
    //       default:
    //         break;
    //     }
    //     break;
    //   case 'gastosOrganicaOrganicos':
    //     this._clasification = 'gastosOrganicaOrganicos';
    //     this._fields = { codigo: 'CodOrg', descripcion: 'DesOrg' };
    //     break;
    //   case 'gastosEconomicaEconomicos':
    //     switch (this._subTabSelectd4) {
    //       case 'Por capítulo gasto':
    //         this._clasification = 'gastosEconomicaCapitulos';
    //         this._fields = { codigo: 'CodCap', descripcion: 'DesCap' };
    //         break;
    //       case 'Por artículo':
    //         this._clasification = 'gastosEconomicaArticulos';
    //         this._fields = { codigo: 'CodArt', descripcion: 'DesArt' };
    //         break;
    //       case 'Por concepto':
    //         this._clasification = 'gastosEconomicaConceptos';
    //         this._fields = { codigo: 'CodCon', descripcion: 'DesCon' };
    //         break;
    //       case 'Por económico':
    //         this._clasification = 'gastosEconomicaEconomicos';
    //         this._fields = { codigo: 'CodEco', descripcion: 'DesEco' };
    //         break;
    //       default:
    //         break;
    //     }
    //     break;
    //   default:
    //     break;
    // }

    this._dataTable = await this._tableService.loadData(this._clasification);
    this._headerName = this._dataTable.dataPropertyTable.headerName;
    this._subHeaderName = this._dataTable.dataPropertyTable.subHeaderName;
    this._isIngresos = this._dataTable.dataPropertyTable.isIngresos;

    this._setColumnDefs();
    this._setGridOptions();
    // this._isIngresos ? this.setGridOptionsIngresos() : this.setGridOptions();

    if (this._gridApi) {
      this._gridApi.setRowData(this._isIngresos ? this._dataTable.rowDataIngresos : this._dataTable.rowDataGastos);
      this._gridApi.setColumnDefs(this._columnDefs);
    }
  }

  // _subscribeToServices(): void {
  //   this._selectedSubtab1Service.source$.subscribe((data) => {
  //     this._subTabSelectd1 = data;
  //   });

  //   this._selectedSubtab2Service.source$.subscribe((data) => {
  //     this._subTabSelectd2 = data;
  //   });

  //   this._selectedSubtab4Service.source$.subscribe((data) => {
  //     this._subTabSelectd4 = data;
  //   });
  // }

  _setColumnDefs() {
    this._columnDefs = [
      {
        headerName: this._headerName,
        children: [
          {
            headerName: this._subHeaderName,
            field: this._fields.codigo,
            // width: this._dataTable.dataPropertyTable.width,
            width: 750,
            rowGroup: true,
            showRowGroup: this._dataTable.dataPropertyTable.codField,
            cellRenderer: CellRendererOCMtext,
            valueGetter: (params) => {
              if (params.data) {
                return params.data[this._fields.codigo] + ' - ' + params.data[this._fields.descripcion];
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
          children: this._isIngresos
            ? this._createColumnsChildrenIngresos(year)
            : this._createColumnsChildrenGastos(year)
        };
      })
    ];
  }

  _setGridOptions() {
    const myRowData = this._isIngresos ? this._dataTable.rowDataIngresos : this._dataTable.rowDataGastos;
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
      rowData: myRowData,
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
      paginationPageSize: 26,
      onRowClicked: () => {
        const selectedRows = this.agGrid.api.getSelectedNodes();
        this._dataStoreService.selectedCodeRowFirstLevel = selectedRows[0].key;
        this._hasRowClicked.change(selectedRows[0].key);
      }
    } as GridOptions;
  }

  // setGridOptionsIngresos() {
  //   this.gridOptions = {
  //     defaultColDef: {
  //       width: 130,
  //       sortable: true,
  //       resizable: true,
  //       filter: true,
  //       aggFunc: 'sum',
  //       cellRenderer: CellRendererOCM,
  //       headerComponentParams: {
  //         template:
  //           '<div class="ag-cell-label-container" role="presentation">' +
  //           '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button" ></span>' +
  //           '  <div ref="eLabel" class="ag-header-cell-label" role="presentation" >' +
  //           '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
  //           '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
  //           '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
  //           '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
  //           '    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
  //           '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
  //           '  </div>' +
  //           '</div>'
  //       }
  //     },
  //     rowData: this._dataTable.rowDataIngresos,
  //     columnDefs: this._columnDefs,
  //     groupDisplayType: 'custom',
  //     groupIncludeTotalFooter: true,
  //     groupIncludeFooter: true,
  //     groupHeaderHeight: 25,
  //     headerHeight: 54,
  //     suppressAggFuncInHeader: true,
  //     rowSelection: 'single',
  //     localeText: localeTextESPes,
  //     pagination: true,
  //     paginationPageSize: 20,
  //     onRowClicked: () => {
  //       const selectedRows = this.agGrid.api.getSelectedNodes();
  //       this._dataStoreService.selectedCodeRowFirstLevel = selectedRows[0].key;
  //       this._hasRowClicked.change(selectedRows[0].key);
  //     }
  //   } as GridOptions;
  // }

  private _createColumnsChildrenIngresos(year: number) {
    return [
      this._createColumns(year),
      this._createChildColumns(year, 'Derechos', [
        { name: 'DerechosReconocidos', show: 'open' },
        { name: 'DerechosAnulados', show: 'open' },
        { name: 'DerechosCancelados', show: 'open' },
        { name: 'DerechosReconocidosNetos', show: 'open' },
        { name: 'RecaudacionNeta', show: 'closed' },
        { name: 'DerechosPendienteCobro', show: 'open' }
      ]),
      {
        headerName: 'Exceso o defecto previsión',
        field: `DiferenciaPrevision${year}`
      }
    ];
  }

  private _createColumnsChildrenGastos(year: number) {
    return [
      this._createColumns(year),
      this._createChildColumns(year, 'Gastos', [
        { name: 'GastosComprometidos', width: 140, show: 'open' },
        { name: 'ObligacionesReconocidasNetas', width: 135, show: 'open' },
        { name: 'Pagos', show: 'closed' },
        { name: 'ObligacionesPendientePago', width: 120, show: 'closed' }
      ]),
      {
        headerName: 'Remanente Credito',
        field: `RemanenteCredito${year}`
      }
    ];
  }

  private _createColumns(year: number) {
    return {
      headerName: 'Créditos',
      children: [
        { headerName: 'Previsiones Iniciales', field: `Iniciales${year}`, columnGroupShow: 'open' },
        { headerName: 'Total Modificaciones', field: `Modificaciones${year}`, width: 140, columnGroupShow: 'open' },
        {
          headerName: 'Creditos definitivos',
          field: `Definitivas${year}`,
          width: 140,
          columnGroupShow: 'closed',
          sort: 'desc'
        }
      ]
    };
  }

  private _createChildColumns(
    year,
    headerName: string,
    fields: { name: string; width?: number; show: 'open' | 'closed'; sort?: 'desc' }[]
  ) {
    return {
      headerName,
      children: fields.map((field) => ({
        headerName: field.name,
        field: `${field.name}${year}`,
        width: field.width,
        columnGroupShow: field.show,
        sort: field.sort
      }))
    };
  }

  // private _createColumnsChildrenGastos(year: number) {
  //   return [
  //     {
  //       headerName: 'Créditos',
  //       children: [
  //         {
  //           headerName: 'Previsiones Iniciales',
  //           field: `Iniciales${year}`,
  //           columnGroupShow: 'open'
  //         },
  //         {
  //           headerName: 'Total Modificaciones',
  //           field: `Modificaciones${year}`,
  //           width: 140,
  //           columnGroupShow: 'open'
  //         },
  //         {
  //           headerName: 'Creditos definitivos',
  //           field: `Definitivas${year}`,
  //           width: 140,
  //           columnGroupShow: 'closed',
  //           sort: 'desc'
  //         }
  //       ]
  //     },
  //     {
  //       headerName: 'Gastos',
  //       children: [
  //         {
  //           headerName: 'Gastos Comprometidos',
  //           field: `GastosComprometidos${year}`,
  //           width: 140,
  //           columnGroupShow: 'open'
  //         },
  //         {
  //           headerName: 'Obligaciones reconocidas netas',
  //           field: `ObligacionesReconocidasNetas${year}`,
  //           width: 135,
  //           columnGroupShow: 'open'
  //         },
  //         {
  //           headerName: 'Pagos',
  //           field: `Pagos${year}`,
  //           columnGroupShow: 'closed'
  //         },
  //         {
  //           headerName: 'Obligaciones pendientes de pago al final periodo',
  //           field: `ObligacionesPendientePago${year}`,
  //           width: 120,
  //           columnGroupShow: 'closed'
  //         }
  //       ]
  //     },
  //     {
  //       headerName: 'Remanente Credito',
  //       field: `RemanenteCredito${year}`
  //     }
  //   ];
  // }

  // private _createColumnsChildrenIngresos(year: number) {
  //   return [
  //     {
  //       headerName: 'Créditos',
  //       children: [
  //         {
  //           headerName: 'Previsiones iniciales',
  //           field: `Iniciales${year}`,
  //           columnGroupShow: 'open'
  //         },
  //         {
  //           headerName: 'Total modificaciones',
  //           field: `Modificaciones${year}`,
  //           columnGroupShow: 'open'
  //         },
  //         {
  //           headerName: 'Previsiones definitivas',
  //           field: `Definitivas${year}`,
  //           columnGroupShow: 'closed',
  //           sort: 'desc'
  //         }
  //       ]
  //     },

  //     {
  //       headerName: 'Derechos',
  //       children: [
  //         {
  //           headerName: 'Reconocidos netos',
  //           field: `DerechosReconocidos${year}`,
  //           columnGroupShow: 'open'
  //         },
  //         {
  //           headerName: 'Anulados',
  //           field: `DerechosAnulados${year}`,
  //           columnGroupShow: 'open'
  //         },
  //         {
  //           headerName: 'Cancelados',
  //           field: `DerechosCancelados${year}`,
  //           columnGroupShow: 'open'
  //         },
  //         {
  //           headerName: 'Recaudados',
  //           field: `DerechosReconocidosNetos${year}`,
  //           columnGroupShow: 'open'
  //         },
  //         {
  //           headerName: 'Recaudación neta',
  //           field: `RecaudacionNeta${year}`,
  //           columnGroupShow: 'closed'
  //         },
  //         {
  //           headerName: 'Pendientes de cobro al final del periodo',
  //           field: `DerechosPendienteCobro${year}`,
  //           columnGroupShow: 'open'
  //         }
  //       ]
  //     },
  //     {
  //       headerName: 'Exceso o defecto previsión',
  //       field: `DiferenciaPrevision${year}`
  //     }
  //   ];
  // }

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
