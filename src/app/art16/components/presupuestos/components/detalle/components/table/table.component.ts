import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { NgIf } from '@angular/common';

import { Subject, takeUntil, tap } from 'rxjs';

import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
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

import { CellRendererOCM, CellRendererOCMtext } from '@ag-grid/CellRendererOCM';
import localeTextESPes from '@assets/data/localeTextESPes.json';

import { AvalaibleYearsService } from '@services/avalaibleYears.service';
import { DataStoreService } from '@services/dataStore.service';
import { DataStoreSubtabService } from '@services/dataStoreSubtab.service';
import { DataStoreTabService } from '@services/dataStoreTab.service';
import { HasRowClicked } from '@services/hasRowClicked.service';
import { ReloadTableService } from '@services/reloadTable.service';
import { TableService } from '@services/table.service';

import { CLASIFICATION_TYPE } from '@appTypes/clasification.type';
import { IDataTable } from '@interfaces/dataTable.interface';
import { ISubtabClasification } from '@interfaces/subtabClasification.interface';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
	standalone: true,
	imports: [NgIf, AgGridModule]
})
export class TableComponent implements OnInit, OnDestroy {
	private _avalaibleYearsService = inject(AvalaibleYearsService);
	private _dataStoreService = inject(DataStoreService);
	private _dataStoreSubtabService = inject(DataStoreSubtabService);
	private _dataStoreTabService = inject(DataStoreTabService);
	private _hasRowClicked = inject(HasRowClicked);
	private _reloadTableService = inject(ReloadTableService);
	private _tableService = inject(TableService);

	@ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
	public modules = [RowGroupingModule];
	public gridOptions: GridOptions;
	private _clasification: CLASIFICATION_TYPE;
	private _columnApi: ColumnApi;
	private _columnDefs: (ColDef | ColGroupDef)[];
	private _data: ISubtabClasification;
	private _dataTable: IDataTable;
	private _fields = { codigo: '', descripcion: '' };
	private _gridApi: GridApi;
	private _headerName = '';
	private _isIngresos = true;
	private _subHeaderName = '';
	private _tabSelected: { clasificationType: string };
	private _unsubscribe$ = new Subject<void>();
	private _myYear: number;

	async ngOnInit(): Promise<void> {
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

		this._clasification = this._data.key as CLASIFICATION_TYPE;
		this._fields.codigo = this._data.codField;
		this._fields.descripcion = this._data.desField;
		this._dataTable = await this._tableService.loadData(this._clasification);
		this._headerName = this._dataTable.dataPropertyTable.headerName;
		this._subHeaderName = this._dataTable.dataPropertyTable.subHeaderName;
		this._isIngresos = this._dataTable.dataPropertyTable.isIngresos;
		this._setColumnDefs();
		this._setGridOptions();

		if (this._gridApi) {
			this._gridApi.setRowData(this._isIngresos ? this._dataTable.rowDataIngresos : this._dataTable.rowDataGastos);
			this._gridApi.setColumnDefs(this._columnDefs);
		}
	}

	_setColumnDefs() {
		this._columnDefs = [
			{
				headerName: this._headerName,
				children: [
					{
						headerName: this._subHeaderName,
						field: this._fields.codigo,
						sort: 'asc',
						// width: this._dataTable.dataPropertyTable.width,
						width: 750,
						rowGroup: true,
						showRowGroup: this._dataTable.dataPropertyTable.codField,
						cellRenderer: CellRendererOCMtext,
						valueGetter: (params) => {
							if (params.data) {
								// Necesario parta ordenar correctamente los códigos de 1 dígito en orgánicos.
								const myCode =
									params.data[this._fields.codigo] < 10 && this._fields.codigo === 'CodOrg'
										? '0' + params.data[this._fields.codigo]
										: params.data[this._fields.codigo];
								return `${myCode} - ${params.data[this._fields.descripcion]}`;
							}
							return null;
						}
					}
				]
			},

			...this._avalaibleYearsService.getYearsSelected().map((year) => {
				if (this._avalaibleYearsService.getYearsSelected().length === 1) {
					this._myYear = 1;
				} else {
					this._myYear = year;
				}

				return {
					headerName: year.toLocaleString(),
					children: this._isIngresos
						? this._createColumnsChildrenIngresos(this._myYear)
						: this._createColumnsChildrenGastos(this._myYear)
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
