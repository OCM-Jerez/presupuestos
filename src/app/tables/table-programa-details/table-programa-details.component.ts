import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Location, NgIf } from '@angular/common';
import { Router } from '@angular/router';

import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { ColDef, ColGroupDef, ColumnApi, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community/main';

import { AvalaibleYearsService } from '@services/avalaibleYears.service';
import { DataStoreService } from '@services/dataStore.service';
import { PrepareDataGastosService } from '@services/prepareDataGastos.service';

import { IDataTable } from '@interfaces/dataTable.interface';

import localeTextESPes from '@assets/data/localeTextESPes.json';
import { CellRendererOCM } from '../../ag-grid/CellRendererOCM';
import { accumulate } from '../../commons/util/util';
import { IGastos } from '@interfaces/gastos.interface';

@Component({
	selector: 'app-table-programa-details',
	templateUrl: './table-programa-details.component.html',
	styleUrls: ['./table-programa-details.component.scss'],
	standalone: true,
	imports: [NgIf, AgGridModule]
})
export default class TableProgramaDetailsComponent implements OnInit {
	private _location = inject(Location);
	private _router = inject(Router);
	private _prepareDataGastosService = inject(PrepareDataGastosService);
	public avalaibleYearsService = inject(AvalaibleYearsService);
	public dataStoreService = inject(DataStoreService);

	@ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
	public gridOptions: GridOptions;
	public isExpanded = true;
	public messageYears = this.avalaibleYearsService.message;
	private _subHeaderName = '';
	private _rowData: IGastos[] = [];
	private _columnApi: ColumnApi;
	private _gridApi: GridApi;
	private _columnDefs: (ColDef | ColGroupDef)[];
	private _dataTable: IDataTable;

	ngOnInit(): void {
		this._loadTable();
	}

	async _loadTable() {
		this._dataTable = this.dataStoreService.dataTable;
		this._subHeaderName = this._dataTable.dataPropertyTable.subHeaderName;
		const codigoSearch = this.dataStoreService.selectedCodeRowFirstLevel.split(' ')[0];
		// const codField = this._dataTable.dataPropertyTable.codField;
		this._rowData = (await this._prepareDataGastosService.getDataAllYear()).filter((x) => x.CodPro == codigoSearch);
		this._setColumnDefs();
		this._setGridOptions();
		this._pushAplicacionesPresupuestarias(this._rowData);
	}

	_pushAplicacionesPresupuestarias(rowData) {
		const aplicacionesPresupuestarias = [];
		const dataFinal = [];
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
			this._rowData = dataFinal;
		});
	}

	_setColumnDefs() {
		this._columnDefs = [
			{
				children: [
					{
						headerName: this._subHeaderName,
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
							if (params?.data) {
								return params.data.CodPro + ' - ' + params.data.DesPro;
							} else {
								return '';
							}
						},
						cellRendererParams: {
							suppressCount: true,
							innerRenderer: (params) => {
								// console.log('params-1--->', params);
								return params?.node?.group && params?.value
									? `<span style="color: black; font-size: 18px; margin-left: 0px;">${params.value}</span>`
									: '';
							},

							footerValueGetter(params) {
								// console.log('params -2--->', params);
								if (!params?.value) {
									return '';
								}

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
							// console.log('params -3--->', params);
							if (params?.data) {
								const valCap = params.data.CodCap + ' - ' + params.data.DesCap;
								return `<span style="color: black; font-size: 16px; margin-left: 0px;">${valCap}</span>`;
							} else {
								return '';
							}
						},
						cellRendererParams: {
							suppressCount: true,
							innerRenderer: (params) => {
								// console.log('params -4--->', params);
								if (!params?.value) {
									return '';
								}

								if (params.node.group) {
									return params.value;
								} else {
									return '';
								}
							},
							footerValueGetter(params) {
								// console.log('params -5--->', params);
								if (!params?.value) return '';

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
						cellRenderer: 'agGroupCellRenderer',
						valueGetter: (params) => {
							// console.log('params -6--->', params);
							if (params?.data) {
								return params.data.CodEco + ' - ' + params.data.DesEco;
							} else {
								return '';
							}
						}
					}
				]
			},

			...this.avalaibleYearsService.getYearsSelected().map((year) => {
				return {
					// headerName: year,
					children: this.createColumnsChildren(year)
				};
			})
		];
	}

	_setGridOptions() {
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
			rowData: this._rowData,
			columnDefs: this._columnDefs,
			groupDisplayType: 'custom',
			groupIncludeTotalFooter: true,
			groupIncludeFooter: true,
			groupHeaderHeight: 25,
			headerHeight: 54,
			suppressAggFuncInHeader: true,
			rowSelection: 'single',
			localeText: localeTextESPes
			// pagination: true,
			// paginationPageSize: 20
		} as GridOptions;
	}

	onGridReady = (params: GridReadyEvent) => {
		this._gridApi = params.api;
		this._columnApi = params.columnApi;
		this._gridApi.expandAll();
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
}
