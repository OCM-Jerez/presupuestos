import { Location, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { ColumnApi, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community/main';

import { AvalaibleYearsService } from '@services/avalaibleYears.service';
import { DataStoreService } from '@services/dataStore.service';

import { IDataTable } from '@interfaces/dataTable.interface';

import { PrepareDataGastosService } from '@services/prepareDataGastos.service';

import localeTextESPes from '@assets/data/localeTextESPes.json';
import { CellRendererOCM } from '../../ag-grid/CellRendererOCM';
import { accumulate } from '../../commons/util/util';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-table-programa-details',
  templateUrl: './table-programa-details.component.html',
  styleUrls: ['./table-programa-details.component.scss'],
  standalone: true,
  imports: [NgIf, AgGridModule]
})
export class TableProgramaDetailsComponent implements OnInit {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  public modules = [RowGroupingModule];
  public gridOptions: GridOptions;
  public isExpanded = true;
  public subHeaderName: string = '';
  public rowData: any[any];
  public messageYears = this.avalaibleYearsService.message;
  private _columnApi: ColumnApi;
  private _gridApi: GridApi;
  private _columnDefs: any[any];
  private _dataTable: IDataTable;

  constructor(
    public avalaibleYearsService: AvalaibleYearsService,
    public dataStoreService: DataStoreService,
    private _router: Router,
    private _location: Location,
    private _prepareDataGastosService: PrepareDataGastosService
  ) { }

  ngOnInit(): void {
    this._loadTable();
  }

  async _loadTable() {
    this._dataTable = await this.dataStoreService.dataTable;
    this.subHeaderName = this._dataTable.dataPropertyTable.subHeaderName;
    const codigoSearch = this.dataStoreService.selectedCodeRowFirstLevel.split(' ')[0];
    const codField = this._dataTable.dataPropertyTable.codField;
    console.log('codigoSearch', codigoSearch);
    console.log('codField', codField);
    this.rowData = (
      await this._prepareDataGastosService.getDataAllYear(this.dataStoreService.dataTable.clasificationType)
    ).filter((x) => x.CodPro == codigoSearch);

    // this._pushAplicacionesPresupuestarias(this.rowData);
    console.log('this.rowData', this.rowData);
    this._setColumnDefs();
    this._setGridOptions();
  }

  _pushAplicacionesPresupuestarias(rowData) {
    let aplicacionesPresupuestarias = [];
    let dataFinal = [];
    const years = this.avalaibleYearsService.getYearsSelected();
    // Aplicación presupuestaria = orgánico + programa + económico.
    // Creo item para cada uno de los aplicaciones presupuestarias existentes en programa seleccionado.
    rowData.map((item) => {
      item.AplicacionPresupuestaria = item.CodOrg + '-' + item.CodPro + '-' + item.CodEco;
      aplicacionesPresupuestarias.push(item.AplicacionPresupuestaria);
    });

    aplicacionesPresupuestarias.map((item) => {
      const dataIntermedio = rowData.filter((x) => x.AplicacionPresupuestaria === item);
      const value = {
        AplicacionPresupuestaria: item,
        CodOrg: item.split('-')[0],
        CodPro: item.split('-')[1],
        CodEco: item.split('-')[2],
        CodCap: item.split('-')[2].charAt(0),
        DesOrg: dataIntermedio[0].DesOrg,
        DesPro: dataIntermedio[0].DesPro,
        DesCap: dataIntermedio[0].DesCap,
        DesEco: dataIntermedio[0].DesEco
      };

      years.forEach((year) => {
        value[`Iniciales${year}`] = accumulate('Iniciales', dataIntermedio)[year];
        value[`Modificaciones${year}`] = accumulate('Modificaciones', dataIntermedio)[year];
        value[`Definitivas${year}`] = accumulate('Definitivas', dataIntermedio)[year];
        value[`GastosComprometidos${year}`] = accumulate('GastosComprometidos', dataIntermedio)[year];
        value[`ObligacionesReconocidasNetas${year}`] = accumulate('ObligacionesReconocidasNetas', dataIntermedio)[year];
        value[`Pagos${year}`] = accumulate('Pagos', dataIntermedio)[year];
        value[`ObligacionesPendientePago${year}`] = accumulate('ObligacionesPendientePago', dataIntermedio)[year];
        value[`RemanenteCredito${year}`] = accumulate('RemanenteCredito', dataIntermedio)[year];
      });
      dataFinal.push(value);
      this.rowData = dataFinal;
    });
  }

  _setColumnDefs() {
    this._columnDefs = [
      {
        // headerName: this._dataTable.dataPropertyTable.headerName,
        children: [
          {
            headerName: this.subHeaderName,
            field: 'DesPro',
            rowGroup: true,
            showRowGroup: 'DesPro',
            filter: true,
            width: 500,
            pinned: 'left',
            columnGroupShow: 'closed',
            cellRenderer: 'agGroupCellRenderer',
            // cellRenderer: CellRendererOCMtext,
            valueGetter: (params) => {
              if (params.data) {
                return params.data.CodPro + ' - ' + params.data.DesPro;
              } else {
                return null;
              }
            },
            cellRendererParams: {
              suppressCount: true,
              innerRenderer: (params) =>
                params.node.group
                  ? `<span style="color: black; font-size: 18px; margin-left: 0px;">${params.value}</span>`
                  : null,
              footerValueGetter(params) {
                switch (params.node.level) {
                  case 0: // Total programa.
                    return `<span style="color: red; font-size: 18px; font-weight: bold; margin-left: 0px;"> Total ${params.value}</span>`;
                  // case -1: // Total general.
                  //   return '<span style="color: red; font-size: 18px; font-weight: bold; margin-right: 0px;"> Total general' + '</span>';
                  default:
                    return 'SIN FORMATO';
                }
              }
            }
          },
          {
            headerName: 'Capítulo',
            field: 'DesCap',
            rowGroup: true,
            showRowGroup: 'DesCap',
            filter: false,
            width: 300,
            pinned: 'left',
            columnGroupShow: 'closed',
            cellRenderer: 'agGroupCellRenderer',
            valueGetter: (params) => {
              if (params.data) {
                const valCap = params.data.CodCap + ' - ' + params.data.DesCap;
                return `<span style="color: black; font-size: 16px; margin-left: 0px;">${valCap}</span>`;
              } else {
                return null;
              }
            },
            cellRendererParams: {
              suppressCount: true,
              innerRenderer: (params) => {
                if (params.node.group) {
                  return params.value;
                } else {
                  return '';
                }
              },
              footerValueGetter(params) {
                const val = params.value.split(' - ')[1];
                switch (params.node.level) {
                  case 2: // Total capítulo.
                    return `<span style="color: red; font-size: 18px;  font-weight: bold; margin-left: 0px;"> Total ${val}</span>`;
                  case -1: // Total general.
                    return '';
                  default:
                    return 'SIN FORMATO';
                }
              }
            }
          },
          {
            headerName: 'Económico',
            field: 'DesEco',
            width: 500,
            pinned: 'left',
            filter: true,
            cellRenderer: '',
            valueGetter: (params) => {
              if (params.data) {
                return params.data.CodEco + ' - ' + params.data.DesEco;
              } else {
                return null;
              }
            }
          }
        ]
      },

      ...this.avalaibleYearsService.getYearsSelected().map((year) => {
        return {
          headerName: year,
          children: this.createColumnsChildren(year)
        };
      })
    ];
  }

  _setGridOptions() {
    // await this._waitForGridApi();
    // if (this._gridApi) {
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
      rowData: this.rowData,
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
      paginationPageSize: 20
    } as GridOptions;
    // }
    console.log('gridOptions', this.gridOptions);
  }

  onGridReady = (params: GridReadyEvent) => {
    console.log('onGridReady');
    this._gridApi = params.api;
    console.log('this._gridApi', this._gridApi);
    this._gridApi.setRowData(this.rowData);

    this._columnApi = params.columnApi;
    // const defaultSortModel: ColumnState[] = [{ colId: 'DesEco', sort: 'asc', sortIndex: 0 }];
    // params.columnApi.applyColumnState({ state: defaultSortModel });
  };

  createColumnsChildren(year: number) {
    return [
      {
        headerName: 'Creditos definitivos',
        field: `Definitivas${year}`,
        width: 120
      },
      {
        headerName: 'Pagos',
        field: `Pagos${year}`,
        width: 120
      }
    ];
  }

  expandAll() {
    this._gridApi.expandAll();
    this.isExpanded = true;
  }

  collapseAll() {
    this._gridApi.collapseAll();
    this.isExpanded = false;
  }

  showAplicacionPresupuestaria() {
    const selectedRows = this.agGrid.api.getSelectedNodes();
    const aplicacionPresupuestaria =
      selectedRows[0].data.CodOrg + '-' + selectedRows[0].data.CodPro + '-' + selectedRows[0].data.CodEco;
    this.dataStoreService.selectedCodeRow = aplicacionPresupuestaria;
    this._router.navigateByUrl('/tableAplicacionPresupuestaria');
  }

  volver() {
    this.dataStoreService.selectedCodeRowFirstLevel = '';
    this._location.back();
  }

  _waitForGridApi(): Promise<void> {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (this._gridApi) {
          clearInterval(interval);
          resolve();
        }
        console.log('Waiting for grid api');
      }, 50);
    });
  }
}
