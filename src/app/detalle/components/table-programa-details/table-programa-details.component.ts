import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { Location, NgIf } from '@angular/common';
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

import { AvalaibleYearsService } from '@services/avalaibleYears.service';
import { DataStoreService } from '@services/dataStore.service';
import { PrepareDataGastosService } from '@services/prepareDataGastos.service';

import { IDataTable } from '@interfaces/dataTable.interface';
import { IGastos } from '@interfaces/gastos.interface';

import { accumulate } from '../../../commons/util/util';

import { getColumnDefsDetails } from '../../../ag-grid/setColumnDefs/programa-details';
import { getColumnDefsGastan } from '../../../ag-grid/setColumnDefs/grupos-programas';

import { getGridOptions } from '../../../ag-grid/setGridOptions/programa-details';

@Component({
	selector: 'app-table-programa-details',
	templateUrl: './table-programa-details.component.html',
	styleUrls: ['./table-programa-details.component.scss'],
	standalone: true,
	imports: [NgIf, AgGridModule]
})
export default class TableProgramaDetailsComponent implements OnInit, OnDestroy {
	public avalaibleYearsService = inject(AvalaibleYearsService);
	public dataStoreService = inject(DataStoreService);
	private _route = inject(ActivatedRoute);
	private _location = inject(Location);
	private _router = inject(Router);
	private _prepareDataGastosService = inject(PrepareDataGastosService);

	@ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
	public gridOptions: GridOptions;
	private _path: string;
	public title: string;
	public isExpanded = true;
	public messageYears = this.avalaibleYearsService.message;

	private _columnApi: ColumnApi;
	private _columnDefs: (ColDef | ColGroupDef)[];
	private _dataTable: IDataTable;
	private _gridApi: GridApi;
	private _rowData: IGastos[] = [];
	private _dataTotalizada: any;
	private _subHeaderName = '';
	private sub: Subscription;
	private _defaultSortModel: ColumnState[] = [];

	constructor() {
		this.sub = this._route.params.subscribe((params) => {
			this._path = params['origen'];
			console.log('this._path', this._path);
		});
	}

	async ngOnInit(): Promise<void> {
		switch (this._path) {
			case 'details':
				console.log('details');
				this.title = 'Detalle programa' + this.dataStoreService.selectedCodeRowFirstLevel;
				await this._CalcDataDetails();
				this._columnDefs = getColumnDefsDetails(this.avalaibleYearsService, this._subHeaderName);
				this.gridOptions = getGridOptions(this._rowData, this._columnDefs);
				break;
			case 'gastan':
				console.log('gastan');
				this.title = 'Programas que gastan del económico ' + this.dataStoreService.selectedCodeRowFirstLevel;
				await this._CalcDataGastan();
				this._columnDefs = getColumnDefsGastan(this.avalaibleYearsService, this._subHeaderName);
				this.gridOptions = getGridOptions(this._rowData, this._columnDefs);

				break;
			case 'organico':
				console.log('organico');
				this.title = 'Programas que componen el orgánico ' + this.dataStoreService.selectedCodeRowFirstLevel;
				await this._CalcDataGastan();
				this._columnDefs = getColumnDefsGastan(this.avalaibleYearsService, '2023');
				this.gridOptions = getGridOptions(this._dataTotalizada, this._columnDefs);
				break;
			case 'appPPresupuestaria':
				console.log('appPPresupuestaria');
				this.title = 'Aplicación presupuestaria ' + this.dataStoreService.selectedCodeRowFirstLevel;
				await this._CalcDataGastan();
				this._columnDefs = getColumnDefsGastan(this.avalaibleYearsService, '2023');
				this.gridOptions = getGridOptions(this._rowData, this._columnDefs);
				break;
		}
	}

	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}

	async _CalcDataDetails() {
		this._dataTable = this.dataStoreService.dataTable;
		this._subHeaderName = this._dataTable.dataPropertyTable.subHeaderName;
		const codigoSearch = this.dataStoreService.selectedCodeRowFirstLevel.split(' ')[0];
		this._rowData = (await this._prepareDataGastosService.getDataAllYear()).filter((x) => x.CodPro == codigoSearch);
	}

	async _CalcDataGastan() {
		this._dataTotalizada = this.dataStoreService.dataTable;
		let cod = '';
		const codigoSearch = this.dataStoreService.selectedCodeRowFirstLevel.split(' ')[0];
		const clasificationType = this.dataStoreService.dataTable.clasificationType;

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

		this._dataTotalizada = Object.values(this._dataTotalizada);
	}

	onGridReady = (params: GridReadyEvent) => {
		this._gridApi = params.api;
		this._columnApi = params.columnApi;
		this._gridApi.expandAll();
		console.log(this._dataTable);

		const defaultSortModel: ColumnState[] = [
			{
				colId: this._dataTable.dataPropertyTable.codField,
				sort: 'asc',
				sortIndex: 0
			}
		];
		params.columnApi.applyColumnState({ state: defaultSortModel });
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
		this._router.navigateByUrl('/tableProgramaDetails/appPPresupuestaria');
	}

	volver() {
		this.dataStoreService.selectedCodeRowFirstLevel = '';
		this._location.back();
	}
}
