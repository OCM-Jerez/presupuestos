import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
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

import { accumulate } from '../../../../commons/util/util';
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
  gridOptions: GridOptions;
  selectedCodeRowFirstLevel = '';
  private _gridApi: GridApi;
  private _columnApi: ColumnApi;

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
    // console.log("******************* _dataTable *************************")
    // console.log(this._dataTable);

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
      pagination: false,
      onRowClicked: () => {
        const selectedRows = this.agGrid.api.getSelectedNodes();
        if (selectedRows.length > 0) {
          this._dataStoreService.selectedCodeRowFirstLevel = selectedRows[0].key;
          console.log(this._dataStoreService.selectedCodeRowFirstLevel);
          console.log(this._dataTable.clasificationType);

          if (this._dataTable.clasificationType === 'gastosProgramaProgramas') {
            const isExecuted = confirm("¿Quieres ver el detalle de este programa?");
            if (isExecuted) {
              this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this._router.navigate(['tableProgramaDetails']);
              });
            };
          }
        }

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

  async createDataOCM(): Promise<void> {
    this._dataTable.rowData = (await this._prepareDataProgramaDetailsService.getDataAllYear())
      .filter(x => x.CodPro == this._dataStoreService.selectedCodeRowFirstLevel.split(" ")[0]);

    // Acumular los datos por aplicación presupuestaria = orgánico + programa + económico.
    let aplicacionesPresupuestarias = []
    // const dataIntermedio = [];
    let dataFinal = [];

    //  Crear key para cada aplicación presupuestaria.
    const years = this.avalaibleYearsService.getYearsSelected()
    // const keys = []
    // console.log("years", years);

    // Creo array de aplicaciones presupuestarias existentes en programa seleccionado.
    this._dataTable.rowData.map(item => {
      item.AplicacionPresupuestaria = item.CodOrg + '-' + item.CodPro + '-' + item.CodEco;
      aplicacionesPresupuestarias.push(item.AplicacionPresupuestaria)
      // aplicacionesPresupuestarias = [...new Set(aplicacionesPresupuestarias)];
    });
    console.log("aplicacionesPresupuestarias", [aplicacionesPresupuestarias]);

    // Creo item para cada uno de los aplicaciones presupuestarias existentes en programa seleccionado.
    aplicacionesPresupuestarias.map(item => {
      const dataIntermedio = this._dataTable.rowData.filter(x => x.AplicacionPresupuestaria === item);
      const yearsIniciales = accumulate('Iniciales', dataIntermedio);
      const yearsModificaciones = accumulate('Modificaciones', dataIntermedio);
      const yearsDefinitivas = accumulate('Definitivas', dataIntermedio);
      const yearsGastosComprometidos = accumulate('GastosComprometidos', dataIntermedio);
      const yearsObligacionesNetas = accumulate('ObligacionesReconocidasNetas', dataIntermedio);
      const yearsPagos = accumulate('Pagos', dataIntermedio);
      const yearsObligacionesPendientes = accumulate('ObligacionesPendientePago', dataIntermedio);
      const yearsRemanenteCredito = accumulate('RemanenteCredito', dataIntermedio);

      const value = {
        "AplicacionPresupuestaria": item,
        "CodOrg": item.split('-')[0],
        "CodPro": item.split('-')[1],
        "CodEco": item.split('-')[2],
        "CodCap": item.split('-')[2].charAt(0),
        "DesOrg": dataIntermedio[0].DesOrg,
        "DesPro": dataIntermedio[0].DesPro,
        "DesCap": dataIntermedio[0].DesCap,
        "DesEco": dataIntermedio[0].DesEco,
      }

      const years = this.avalaibleYearsService.getYearsSelected();
      years.forEach((year) => {
        value[`Iniciales${year}`] = yearsIniciales[year];
        value[`Modificaciones${year}`] = yearsModificaciones[year];
        value[`Definitivas${year}`] = yearsDefinitivas[year];
        value[`GastosComprometidos${year}`] = yearsGastosComprometidos[year];
        value[`ObligacionesReconocidasNetas${year}`] = yearsObligacionesNetas[year];
        value[`Pagos${year}`] = yearsPagos[year];
        value[`ObligacionesPendientePago${year}`] = yearsObligacionesPendientes[year];
        value[`RemanenteCredito${year}`] = yearsRemanenteCredito[year]
      })
      dataFinal.push(value)
    });
    this.gridOptions.rowData = dataFinal;
    console.log(typeof (this._dataTable.rowData));
    console.log([this._dataTable.rowData]);

    this._columnDefs = [
      {
        // headerName: this._dataTableGraph.dataPropertyTable.headerName,
        children: [
          {
            headerName: 'Programa',
            field: 'DesPro',
            rowGroup: true,
            showRowGroup: 'DesPro',
            filter: true,
            width: 500,
            pinned: 'left',
            columnGroupShow: 'close',
            cellRenderer: 'agGroupCellRenderer',
            valueGetter: params => {
              if (params.data) {
                return params.data.CodPro + ' - ' + params.data.DesPro;
              } else {
                return null;
              }
            },
            cellRendererParams: {
              suppressCount: true,
              innerRenderer: params => params.node.group ? `<span style="color: black; font-size: 12px; margin-left: 0px;">${params.value}</span>` : null,
              footerValueGetter(params) {
                switch (params.node.level) {
                  case 0:  // Total programa.
                    return `<span style="color: red; font-size: 14px; font-weight: bold; margin-left: 0px;"> Total ${params.value}</span>`;
                  case -1: // Total general.
                    return '<span style="color: red; font-size: 18px; font-weight: bold; margin-right: 0px;"> Total general' + '</span>';
                  default:
                    return 'SIN FORMATO';
                }
              }
            }
          },
          {
            headerName: 'Organico',
            field: 'DesOrg',
            rowGroup: true,
            showRowGroup: 'DesOrg',
            filter: false,
            width: 300,
            pinned: 'left',
            columnGroupShow: 'close',
            cellRenderer: 'agGroupCellRenderer',
            valueGetter: params => {
              if (params.data) {
                return params.data.CodOrg + ' - ' + params.data.DesOrg;
              } else {
                return null;
              }
            },
            cellRendererParams: {
              suppressCount: true,
              innerRenderer: params => {
                if (params.node.group) {
                  return params.value;
                } else {
                  return '';
                }
              },
              footerValueGetter(params) {
                const val = params.value.split(' - ')[1];
                switch (params.node.level) {
                  case 1:  // Total organico.
                    return `<span style="color: red; font-size: 12px;  font-weight: bold; margin-left: 0px;"> Total ${val}</span>`;
                  case -1: // Total general.
                    return '';
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
            columnGroupShow: 'close',
            cellRenderer: 'agGroupCellRenderer',
            valueGetter: params => {
              if (params.data) {
                return params.data.CodCap + ' - ' + params.data.DesCap;
              } else {
                return null;
              }
            },
            cellRendererParams: {
              suppressCount: true,
              innerRenderer: params => {
                if (params.node.group) {
                  return params.value;
                } else {
                  return '';
                }
              },
              footerValueGetter(params) {
                const val = params.value.split(' - ')[1];
                switch (params.node.level) {
                  case 2:  // Total capítulo.
                    return `<span style="color: red; font-size: 12px;  font-weight: bold; margin-left: 0px;"> Total ${val}</span>`;
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
            cellRenderer: "",
            valueGetter: params => {
              if (params.data) {
                return params.data.CodEco + ' - ' + params.data.DesEco;
              } else {
                return null;
              }
            },
          },
        ]
      },

    ];

  }

  expandAll() {
    this._gridApi.expandAll();
  }

  reloadCurrentRoute() {
    let currentUrl = this._router.url;
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate([currentUrl]);
    });
  }

}
