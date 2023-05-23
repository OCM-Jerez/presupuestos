import { Location } from '@angular/common';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { ColumnState, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community/main';

import { CellRendererOCM, CellRendererOCMtext } from '@ag-grid/CellRendererOCM';
import localeTextESPes from '@assets/data/localeTextESPes.json';

import { AvalaibleYearsService } from '@services/avalaibleYears.service';
import { DataStoreService } from '@services/dataStore.service';
import { PrepareDataGastosService } from '@services/prepareDataGastos.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-table-gastos-gruposprogramas-details',
	templateUrl: './table-gastos-gruposprogramas-details.component.html',
	styleUrls: ['./table-gastos-gruposprogramas-details.component.scss'],
	standalone: true,
	imports: [AgGridModule]
})
export default class TableGastosGruposprogramasDetailsComponent implements OnDestroy {
	@ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
	public gridOptions: GridOptions;
	private _columnDefs: any[any];
	private _gridApi: GridApi;
	private _rowData: any[any];
	messageYears = this.avalaibleYearsService.message;
	private sub: Subscription;
	id: string;

	constructor(
		private _router: Router,
		public avalaibleYearsService: AvalaibleYearsService,
		public dataStoreService: DataStoreService,
		private _prepareDataGastosService: PrepareDataGastosService,
		private _route: ActivatedRoute,
		private _location: Location
	) {
		this.sub = this._route.params.subscribe((params) => {
			this.id = params['origen'];
		});

		this._columnDefs = [
			{
				headerName: '',
				children: [
					{
						headerName: 'Programa',
						field: 'DesPro',
						rowGroup: true,
						showRowGroup: 'DesPro',
						filter: true,
						width: 700,
						pinned: 'left',
						columnGroupShow: 'closed',
						cellRenderer: CellRendererOCMtext,
						// cellRenderer: (params) => {
						//     switch (params.node.level) {
						//         case 0: // Cada una de las lineas
						//             return `<span style="text-align: left"> ${params.value}</span>`;
						//         case -1: // Total general
						//             return '<span style="text-align: right; color: red; font-size: 18px; font-weight: bold; margin-right: 0px;"> Total general</span>';
						//         default:
						//             return 'SIN FORMATO';
						//     }
						// },
						valueGetter: (params) => {
							return `${params.data.CodPro + ' - ' + params.data.DesPro}`;
						}
					}
				]
			},

			...this.avalaibleYearsService.getYearsSelected().map((year) => {
				return {
					headerName: year,
					// children: this.createColumnsChildren(year),
					children: this.createColumnsChildrenDetalle(year)
				};
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
							'</div>'
					}
				},

				// PROPERTIES - object properties, myRowData and myColDefs are created somewhere in your application
				rowData: this._rowData,
				columnDefs: this._columnDefs,
				groupDisplayType: 'custom',
				groupIncludeTotalFooter: true,
				groupIncludeFooter: true,
				groupHeaderHeight: 25,
				headerHeight: 26,
				suppressAggFuncInHeader: true,
				rowSelection: 'single',
				localeText: localeTextESPes,
				pagination: false
			} as GridOptions;
		});
	}

	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}

	onGridReady(params: GridReadyEvent) {
		this._gridApi = params.api;
		const defaultSortModel: ColumnState[] = [{ colId: `Pagos2023`, sort: 'desc', sortIndex: 0 }];
		params.columnApi.applyColumnState({ state: defaultSortModel });
	}

	async createDataOCM(): Promise<void> {
		let cod = '';
		const codigoSearch = this.dataStoreService.selectedCodeRowFirstLevel.split(' ')[0];
		const clasificationType = this.dataStoreService.dataTable.clasificationType;
		console.log(codigoSearch, clasificationType);

		if (this.id === 'gastan') {
			cod = clasificationType === 'gastosEconomicaCapitulos' ? 'CodCap' : 'CodEco';
		} else {
			cod = 'CodOrg';
		}
		console.log(cod);
		this._rowData = await this._prepareDataGastosService.getDataAllYear(clasificationType);
		console.log(this._rowData);

		this._rowData = (await this._prepareDataGastosService.getDataAllYear(clasificationType)).filter(
			(x) => x[cod] == codigoSearch
		);
		console.log(this._rowData);
	}

	createColumnsChildrenDetalle(year: number) {
		return [
			{
				headerName: 'Créditos',
				children: [
					{
						headerName: 'Previsiones Iniciales',
						field: `Iniciales${year}`,
						columnGroupShow: 'closed'
					},
					{
						headerName: 'Total Modificaciones',
						field: `Modificaciones${year}`,
						width: 140,
						columnGroupShow: 'closed'
					},
					{
						headerName: 'Creditos definitivos',
						field: `Definitivas${year}`,
						width: 140,
						columnGroupShow: 'closed'
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
						columnGroupShow: 'closed'
					},
					{
						headerName: 'Obligaciones reconocidas netas',
						field: `ObligacionesReconocidasNetas${year}`,
						width: 135,
						columnGroupShow: 'closed'
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

	createColumnsChildren(year: number) {
		return [
			{
				headerName: 'Creditos definitivos',
				field: `Definitivas${year}`,
				width: 110,
				columnGroupShow: 'closed'
			},
			{
				headerName: 'Pagos',
				field: `Pagos${year}`,
				columnGroupShow: 'closed',
				width: 110
			}
		];
	}

	showProgramaDetails() {
		const selectedRows = this.agGrid.api.getSelectedNodes();
		this.dataStoreService.selectedCodeRowFirstLevel = selectedRows[0].key;
		this._router.navigateByUrl('/tableProgramaDetails');
	}

	volver() {
		this.dataStoreService.selectedCodeRowFirstLevel = '';
		this._location.back();
	}
}
