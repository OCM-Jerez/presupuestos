import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from "@angular/common";

import { AgGridAngular } from 'ag-grid-angular';
import { ColumnState, GridReadyEvent } from 'ag-grid-community';
import { GridOptions, GridApi } from 'ag-grid-community/main';

import localeTextESPes from '../../../assets/data/localeTextESPes.json';
import { CellRendererOCM } from '../../ag-grid/CellRendererOCM';

import { AvalaibleYearsService } from '../../services/avalaibleYears.service';
import { DataStoreService } from '../../services/dataStore.service';
import { PrepareDataProgramaDetailsService } from '../../services/prepareDataProgramaDetails.service';
import { AlertService } from '../../services/alert.service';

import { IDataTable } from '../../commons/interfaces/dataTable.interface';

import { accumulate } from '../../commons/util/util';
import { PrepareDataGastosService } from '../../services/prepareDataGastos.service';

@Component({
  selector: 'app-table-programa-details',
  templateUrl: './table-programa-details.component.html',
  styleUrls: ['./table-programa-details.component.scss']
})

export class TableProgramaDetailsComponent {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  public gridOptions: GridOptions;
  public isExpanded = true;
  public subHeaderName: string = ""
  private _gridApi: GridApi;
  private _rowData: any[any];
  private _columnDefs: any[any];
  private _dataTable: IDataTable;

  constructor(
    public avalaibleYearsService: AvalaibleYearsService,
    public dataStoreService: DataStoreService,
    private _router: Router,
    private _prepareDataProgramaDetailsService: PrepareDataProgramaDetailsService,
    private _location: Location,
    private _alertService: AlertService,
    private _prepareDataGastosService: PrepareDataGastosService
  ) {
    // console.log('TableProgramaDetailsComponent');

    this._dataTable = dataStoreService.dataTable;
    // console.log('this._dataTable', this._dataTable);
    this.subHeaderName = this._dataTable.dataPropertyTable.subHeaderName,

      this._columnDefs = [
        {
          headerName: this._dataTable.dataPropertyTable.headerName,
          children: [
            {
              headerName: this.subHeaderName,
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
                    // case -1: // Total general.
                    //   return '<span style="color: red; font-size: 18px; font-weight: bold; margin-right: 0px;"> Total general' + '</span>';
                    default:
                      return 'SIN FORMATO';
                  }
                }
              }
            },
            // {
            //   headerName: 'Organico',
            //   field: 'DesOrg',
            //   rowGroup: true,
            //   showRowGroup: 'DesOrg',
            //   filter: false,
            //   width: 300,
            //   pinned: 'left',
            //   columnGroupShow: 'close',
            //   cellRenderer: 'agGroupCellRenderer',
            //   valueGetter: params => {
            //     if (params.data) {
            //       return params.data.CodOrg + ' - ' + params.data.DesOrg;
            //     } else {
            //       return null;
            //     }
            //   },
            //   cellRendererParams: {
            //     suppressCount: true,
            //     innerRenderer: params => {
            //       if (params.node.group) {
            //         return params.value;
            //       } else {
            //         return '';
            //       }
            //     },
            //     footerValueGetter(params) {
            //       const val = params.value.split(' - ')[1];
            //       switch (params.node.level) {
            //         case 1:  // Total organico.
            //           return `<span style="color: red; font-size: 12px;  font-weight: bold; margin-left: 0px;"> Total ${val}</span>`;
            //         case -1: // Total general.
            //           return '';
            //         default:
            //           return 'SIN FORMATO';
            //       }
            //     }
            //   }
            // },
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

        ...this.avalaibleYearsService.getYearsSelected().map(year => {
          return {
            headerName: year,
            children: this.createColumnsChildren(year),
          }
        })

      ];

    this.createDataOCM().then(() => {
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
        rowData: this._rowData,
        columnDefs: this._columnDefs,
        groupDisplayType: 'custom',
        groupIncludeTotalFooter: false,
        groupIncludeFooter: true,
        groupHeaderHeight: 25,
        headerHeight: 26,
        suppressAggFuncInHeader: true,
        rowSelection: 'single',
        localeText: localeTextESPes,
        pagination: false,
      } as GridOptions;
    })
  }

  messageYears = this.avalaibleYearsService.message;

  onGridReady(params: GridReadyEvent) {
    this._gridApi = params.api;
    const defaultSortModel: ColumnState[] = [
      { colId: 'DesEco', sort: 'asc', sortIndex: 0 },
    ];
    params.columnApi.applyColumnState({ state: defaultSortModel });
  }


  async createDataOCM(): Promise<void> {
    // this._rowData = (await this._prepareDataProgramaDetailsService.getDataAllYear())
    //   .filter(x => x.CodPro == this.dataStoreService.selectedCodeRowFirstLevel.split(" ")[0]);

    const codigoSearch = this.dataStoreService.selectedCodeRowFirstLevel.split(" ")[0];
    const codField = this._dataTable.dataPropertyTable.codField;
    // console.log('codigoSearch', codigoSearch);
    // console.log('codField', codField);
    this._rowData = (await this._prepareDataGastosService.getDataAllYear(this.dataStoreService.dataTable.clasificationType))
      .filter(x => x.CodPro == codigoSearch);
    // .filter(x => x[codField] == codigoSearch);
    // console.log('this._rowData', this._rowData);

    // Acumular los datos por aplicación presupuestaria = orgánico + programa + económico.
    let aplicacionesPresupuestarias = []
    // const dataIntermedio = [];
    let dataFinal = [];

    //  Crear key para cada aplicación presupuestaria.
    const years = this.avalaibleYearsService.getYearsSelected()
    // const keys = []
    // console.log("years", years);

    // Creo array de aplicaciones presupuestarias existentes en programa seleccionado.
    this._rowData.map(item => {
      item.AplicacionPresupuestaria = item.CodOrg + '-' + item.CodPro + '-' + item.CodEco;
      aplicacionesPresupuestarias.push(item.AplicacionPresupuestaria)
      // aplicacionesPresupuestarias = [...new Set(aplicacionesPresupuestarias)];
    });
    // console.log("aplicacionesPresupuestarias", aplicacionesPresupuestarias);

    // Creo item para cada uno de los aplicaciones presupuestarias existentes en programa seleccionado.
    aplicacionesPresupuestarias.map(item => {
      const dataIntermedio = this._rowData.filter(x => x.AplicacionPresupuestaria === item);
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
    this._rowData = dataFinal;

    // Necesario debido a tiempo de vida componente.
    setTimeout(() => {
      this.expandAll()
    }, 10)

  }

  createColumnsChildren(year: number) {
    return [
      {
        headerName: 'Creditos definitivos',
        field: `Definitivas${year}`,
        width: 120,
      },
      {
        headerName: 'Pagos',
        field: `Pagos${year}`,
        width: 120,
      },
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
    if (selectedRows.length > 0) {
      const aplicacionPresupuestaria = selectedRows[0].data.CodOrg + '-' + selectedRows[0].data.CodPro + '-' + selectedRows[0].data.CodEco;
      this.dataStoreService.selectedCodeRow = aplicacionPresupuestaria;
      this._router.navigateByUrl('/tableAplicacionPresupuestaria')
    } else {
      this._alertService.showAlert('Selecciona un económico');
    }
  }

  volver() {
    this._location.back();
  }

}


// createColumnsChildren(year: number) {
//   return [
//     {
//       headerName: 'Créditos',
//       children: [
//         // {
//         //   headerName: 'Previsiones Iniciales',
//         //   field: `Iniciales${year}`,
//         //   columnGroupShow: 'close'
//         // },
//         // {
//         //   headerName: 'Total Modificaciones',
//         //   field: `Modificaciones${year}`,
//         //   width: 140,
//         //   columnGroupShow: 'close'
//         // },
//         {
//           headerName: 'Creditos definitivos',
//           field: `Definitivas${year}`,
//           width: 120,
//           columnGroupShow: 'close'
//         },
//       ]
//     },
//     {
//       headerName: 'Gastos',
//       children: [
//         // {
//         //   headerName: 'Gastos Comprometidos',
//         //   field: `GastosComprometidos${year}`,
//         //   width: 140,
//         //   columnGroupShow: 'close',
//         // },
//         // {
//         //   headerName: 'Obligaciones reconocidas netas',
//         //   field: `ObligacionesReconocidasNetas${year}`,
//         //   width: 135,
//         //   columnGroupShow: 'close'
//         // },
//         {
//           headerName: 'Pagos',
//           field: `Pagos${year}`,
//           width: 120,
//           columnGroupShow: 'close'
//         },
//         // {
//         //   headerName: 'Obligaciones pendientes de pago al final periodo',
//         //   field: `ObligacionesPendientePago${year}`,
//         //   width: 120,
//         //   columnGroupShow: 'close'
//         // },
//       ]
//     },
//     // {
//     //   headerName: 'Remanente Credito',
//     //   field: `RemanenteCredito${year}`,
//     // },
//   ];
// }