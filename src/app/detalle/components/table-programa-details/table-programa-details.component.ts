// import { AppComponent } from './../../../app.component';
import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { AsyncPipe, Location, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import {
	ColDef,
	ColGroupDef,
	ColumnApi,
	ColumnState,
	GridApi,
	GridOptions,
	GridReadyEvent
} from 'ag-grid-community/main';

import { CellRendererOCM } from '@ag-grid/CellRendererOCM';
import localeTextESPes from '@assets/data/localeTextESPes.json';

import { AvalaibleYearsService } from '@services/avalaibleYears.service';
import { DataStoreService } from '@services/dataStore.service';
import { PrepareDataGastosService } from '@services/prepareDataGastos.service';

import { IDataTable } from '@interfaces/dataTable.interface';
import { IGastos } from '@interfaces/gastos.interface';

import { accumulate } from '../../../commons/util/util';

import { getColumnDefsDetails } from '../../../ag-grid/setColumnDefs/programa-details';
import { getColumnDefsGastan } from '../../../ag-grid/setColumnDefs/grupos-programas';
import { getColumnDefsAppPresupuestaria } from '../../../ag-grid/setColumnDefs/aplicacion-presupuestaria';

// import { getGridOptions } from '../../../ag-grid/setGridOptions/programa-details';
import { HasRowClicked } from '@services/hasRowClicked.service';

@Component({
	selector: 'app-table-programa-details',
	templateUrl: './table-programa-details.component.html',
	styleUrls: ['./table-programa-details.component.scss'],
	standalone: true,
	imports: [NgIf, AgGridModule, AsyncPipe]
})
export default class TableProgramaDetailsComponent implements OnInit, OnDestroy {
	public avalaibleYearsService = inject(AvalaibleYearsService);
	private _dataStoreService = inject(DataStoreService);
	private _hasRowClicked = inject(HasRowClicked);

	private _route = inject(ActivatedRoute);
	private _location = inject(Location);
	private _router = inject(Router);
	private _prepareDataGastosService = inject(PrepareDataGastosService);

	@ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
	public gridOptions: GridOptions;
	private _path: string;
	public title: string;
	public buttonExpandirColapsar = true;
	public isExpanded = true;
	public messageYears = this.avalaibleYearsService.message;
	public titleButtom = 'Detalle aplicación presupuestaria';
	public showButtomExpanded = true;
	public hasRowClicked$ = this._hasRowClicked.currentHasRowClicked;
	public hasAppPresupuestaria = false;

	private _columnApi: ColumnApi;
	private _columnDefs: (ColDef | ColGroupDef)[];
	private _dataTable: IDataTable;
	private _gridApi: GridApi;
	private _rowData: IGastos[] = [];
	private _dataTotalizada: any;
	private _subHeaderName = '';
	private sub: Subscription;
	private _defaultSortModel: ColumnState[] = [];
	private _appPresupuestarias = [];

	constructor() {
		this.sub = this._route.params.subscribe((params) => {
			this._path = params['origen'];
			// console.log('this._path', this._path);
		});
	}

	async ngOnInit(): Promise<void> {
		console.log('TableProgramaDetailsComponent ngOnInit');

		this._dataTable = this._dataStoreService.dataTable;
		switch (this._path) {
			case 'details':
				console.log('details');
				this.title = 'Detalle programa ' + this._dataStoreService.selectedCodeRowFirstLevel;
				await this._CalcDataDetails();
				this._columnDefs = getColumnDefsDetails(this.avalaibleYearsService, this._subHeaderName);
				this._setGridOptions();
				// this.gridOptions = getGridOptions(this._rowData, this._columnDefs, this);
				this.titleButtom = 'Detalle app presupuestaria seleccionado';
				break;
			case 'gastan':
				console.log('gastan');
				this.title = 'Programas que gastan del económico ' + this._dataStoreService.selectedCodeRowFirstLevel;
				await this._CalcDataGastan();
				this._columnDefs = getColumnDefsGastan(this.avalaibleYearsService, '2023');
				this._setGridOptions();
				// this.gridOptions = getGridOptions(this._rowData, this._columnDefs, this);
				this.titleButtom = 'Detalle programa seleccionado';
				this.showButtomExpanded = false;

				break;
			case 'organico':
				console.log('organico');
				this.title = 'Programas que componen el orgánico ' + this._dataStoreService.selectedCodeRowFirstLevel;
				await this._CalcDataGastan();
				this._columnDefs = getColumnDefsGastan(this.avalaibleYearsService, '2023');
				this._setGridOptions();
				// this.gridOptions = getGridOptions(this._dataTotalizada, this._columnDefs, this);
				this.titleButtom = 'Detalle programa seleccionado';
				this.showButtomExpanded = false;
				break;
			case 'appPresupuestaria':
				console.log('appPresupuestaria');
				this.title = 'Aplicación presupuestaria ' + this._dataStoreService.selectedCodeRowFirstLevel;
				await this._CalcDataGastan();
				this._columnDefs = getColumnDefsGastan(this.avalaibleYearsService, '2023');
				this._setGridOptions();
				// this.gridOptions = getGridOptions(this._rowData, this._columnDefs, this);
				this.showButtomExpanded = false;
				break;
		}
	}

	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}

	async _CalcDataDetails() {
		this._subHeaderName = this._dataTable.dataPropertyTable.subHeaderName;
		const codigoSearch = this._dataStoreService.selectedCodeRowFirstLevel.split(' ')[0];
		this._rowData = (await this._prepareDataGastosService.getDataAllYear()).filter((x) => x.CodPro == codigoSearch);

		this._rowData = Object.values(
			this._rowData.reduce((acc, obj) => {
				const key = obj.CodEco;
				// Si el objeto con 'CodEco' no existe en el acumulador, lo agregamos
				if (!acc[key]) {
					acc[key] = { ...obj };
				} else {
					// Si ya existe un objeto con el mismo 'CodEco', combinamos ambos objetos
					acc[key] = { ...acc[key], ...obj };
				}
				return acc;
			}, {})
		);
		// console.log('result', this._rowData);
	}

	async _CalcDataGastan() {
		this._dataTotalizada = this._dataStoreService.dataTable;
		let cod = '';
		const codigoSearch = this._dataStoreService.selectedCodeRowFirstLevel.split(' ')[0];
		const clasificationType = this._dataStoreService.dataTable.clasificationType;

		if (this._path === 'gastan') {
			cod = clasificationType === 'gastosEconomicaCapitulos' ? 'CodCap' : 'CodEco';
		} else {
			cod = 'CodOrg';
		}
		this._rowData = (await this._prepareDataGastosService.getDataAllYear()).filter((x) => x[cod] == codigoSearch);

		this._dataTotalizada = this._rowData.reduce((total, item) => {
			if (!total[item.CodPro]) {
				total[item.CodPro] = { ...item };
			} else {
				Object.keys(item).forEach((key) => {
					if (key.endsWith('2023')) {
						// Asume que todos los campos que terminan con "2023" son numéricos
						total[item.CodPro][key] += item[key];
					}
				});
			}
			return total;
		}, {});

		this._rowData = Object.values(this._dataTotalizada);
		console.log('this._rowData', this._rowData);
	}

	_setGridOptions() {
		// const myRowData = this._isIngresos ? this._dataTable.rowDataIngresos : this._dataTable.rowDataGastos;
		// console.log('this._rowData', this._rowData);

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
			localeText: localeTextESPes,
			pagination: true,
			paginationPageSize: 26,
			onRowClicked: () => {
				const selectedRows = this.agGrid.api.getSelectedNodes();
				this._dataStoreService.selectedCodeRowFirstLevel =
					selectedRows[0].data.CodPro + ' ' + selectedRows[0].data.DesPro;
				this._hasRowClicked.change(selectedRows[0].key);
				// console.log(selectedRows[0].data.CodPro + ' ' + selectedRows[0].data.DesPro);
			}
		} as GridOptions;
	}

	onGridReady = (params: GridReadyEvent) => {
		this._gridApi = params.api;
		this._columnApi = params.columnApi;
		this._gridApi.expandAll();

		const defaultSortModel: ColumnState[] = [
			{
				colId: this._dataTable.dataPropertyTable.codField,
				sort: 'asc',
				sortIndex: 0
			}
		];
		params.columnApi.applyColumnState({ state: defaultSortModel });

		// onRowClicked: () => {
		// 	const selectedRows = this.agGrid.api.getSelectedNodes();
		// 	this._dataStoreService.selectedCodeRowFirstLevel = selectedRows[0].key;
		// 	this._hasRowClicked.change(selectedRows[0].key);
		// };
		// switch (this._path) {
		// 	case 'details':
		// 		this._defaultSortModel = [{ colId: 'DesEco', sort: 'asc', sortIndex: 0 }];
		// 		params.columnApi.applyColumnState({ state: this._defaultSortModel });
		// 		break;
		// 	case 'gastan':
		// 		this._defaultSortModel = [{ colId: 'DesPro', sort: 'asc', sortIndex: 0 }];
		// 		params.columnApi.applyColumnState({ state: this._defaultSortModel });
		// 		break;
		// 	case 'organico':
		// 		this._defaultSortModel = [{ colId: 'DesOrg', sort: 'asc', sortIndex: 0 }];
		// 		params.columnApi.applyColumnState({ state: this._defaultSortModel });

		// 		break;
		// }
	};

	_createAppPresupuestarias() {
		// Aplicación presupuestaria = orgánico + programa + económico.
		// Creo item para cada uno de los aplicaciones presupuestarias existentes en programa seleccionado.
		this._rowData.map((item) => {
			item.appPresupuestaria = item.CodOrg + '-' + item.CodPro + '-' + item.CodEco;
			this._appPresupuestarias.push(item.appPresupuestaria);
		});
		// console.log('aplicacionesPresupuestarias', this._appPresupuestarias);
	}

	_filterByAppPresupuestaria(appPresupuestaria) {
		const years = this.avalaibleYearsService.getYearsSelected();
		const dataFinal = [];
		// console.log('this._appPresupuestarias', this._appPresupuestarias);
		// console.log('appPresupuestaria', appPresupuestaria);
		this._appPresupuestarias = this._appPresupuestarias.filter((x) => x === appPresupuestaria);
		// console.log('this._appPresupuestarias', this._appPresupuestarias);

		this._appPresupuestarias.map((item) => {
			const dataIntermedio = this._rowData.filter((x) => x.appPresupuestaria === item);
			// console.log('dataIntermedio', dataIntermedio);

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
		// console.log('this._rowData', this._rowData);
	}

	expandAll() {
		this._gridApi.expandAll();
		this.isExpanded = true;
	}

	collapseAll() {
		this._gridApi.collapseAll();
		this.isExpanded = false;
	}

	async showProgramDetails() {
		// const selectedRows = this.agGrid.api.getSelectedNodes();
		// const aplicacionPresupuestaria =
		// 	selectedRows[0].data.CodOrg + '-' + selectedRows[0].data.CodPro + '-' + selectedRows[0].data.CodEco;
		// this._dataStoreService.selectedCodeRow = aplicacionPresupuestaria;

		// switch (this._path) {
		// case 'details':
		this.title = 'Detalle programa ' + this._dataStoreService.selectedCodeRowFirstLevel;
		await this._CalcDataDetails();
		this._columnDefs = getColumnDefsDetails(this.avalaibleYearsService, this._subHeaderName);
		this._setGridOptions();
		this._gridApi.setRowData(this._rowData);
		this._gridApi.setColumnDefs(this._columnDefs);
		this._gridApi.expandAll();
		this._router.navigateByUrl('/tableProgramaDetails/details');
		this.hasAppPresupuestaria = true;

		// this.gridOptions = getGridOptions(this._rowData, this._columnDefs, this);
		// 		break;
		// 	case 'gastan':
		// 		console.log('gastan');
		// 		this.title = 'Programas que gastan del económico ' + this._dataStoreService.selectedCodeRowFirstLevel;
		// 		await this._CalcDataGastan();
		// 		this._columnDefs = getColumnDefsGastan(this.avalaibleYearsService, '2023');
		// 		this._setGridOptions();
		// 		// this.gridOptions = getGridOptions(this._rowData, this._columnDefs, this);
		// 		this.titleButtom = 'Detalle programa seleccionado';
		// 		this.showButtomExpanded = false;

		// 		break;
		// 	case 'organico':
		// 		console.log('organico');
		// 		this.title = 'Programas que componen el orgánico ' + this._dataStoreService.selectedCodeRowFirstLevel;
		// 		await this._CalcDataGastan();
		// 		this._columnDefs = getColumnDefsGastan(this.avalaibleYearsService, '2023');
		// 		this._setGridOptions();
		// 		// this.gridOptions = getGridOptions(this._dataTotalizada, this._columnDefs, this);
		// 		this.titleButtom = 'Detalle programa seleccionado';
		// 		this.showButtomExpanded = false;
		// 		break;
		// 	case 'appPPresupuestaria':
		// 		console.log('appPPresupuestaria');
		// 		this.title = 'Aplicación presupuestaria ' + this._dataStoreService.selectedCodeRowFirstLevel;
		// 		await this._CalcDataGastan();
		// 		this._columnDefs = getColumnDefsGastan(this.avalaibleYearsService, '2023');
		// 		this._setGridOptions();
		// 		// this.gridOptions = getGridOptions(this._rowData, this._columnDefs, this);
		// 		this.showButtomExpanded = false;
		// 		break;
		// }

		// this._router.navigateByUrl('/tableProgramaDetails/details');
	}

	async _showAppPresupuestaria() {
		this.buttonExpandirColapsar = false;
		// this.hasAppPresupuestaria = false;
		const selectedRow = this.agGrid.api.getSelectedNodes();
		// this._dataStoreService.selectedCodeRowFirstLevel = selectedRow[0].data.CodPro + ' ' + selectedRow[0].data.DesPro;
		this._hasRowClicked.change(null);
		// this._hasRowClicked.change(selectedRow[0].key);
		console.log(selectedRow[0].data);
		await this._createAppPresupuestarias();
		// console.log(selectedRow[0].data.appPresupuestaria);
		await this._filterByAppPresupuestaria(selectedRow[0].data.appPresupuestaria);
		// this._columnDefs = getColumnDefsDetails(this.avalaibleYearsService, this._subHeaderName);
		this._columnDefs = getColumnDefsAppPresupuestaria(this.avalaibleYearsService, this._subHeaderName);

		this._setGridOptions();
		this.title =
			'Detalle aplicación presupuestária ' +
			selectedRow[0].data.CodEco +
			'-' +
			selectedRow[0].data.DesEco +
			' del prográma ' +
			selectedRow[0].data.CodPro +
			'-' +
			selectedRow[0].data.DesPro;
		// console.log(this._rowData);

		this._gridApi.setRowData(this._rowData);
		this._gridApi.setColumnDefs(this._columnDefs);
		this._gridApi.expandAll();
		this._router.navigateByUrl('/tableProgramaDetails/appPresupuestaria');
		this.hasAppPresupuestaria = false;
	}

	volver() {
		this._dataStoreService.selectedCodeRowFirstLevel = '';
		this._location.back();
	}
}
