import { Component, OnInit, ViewChild } from '@angular/core';


import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { ColDef, ColumnApi, ColumnState, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community/main';

import { CellRendererOCM } from '@ag-grid/CellRendererOCM';
import localeTextESPes from '@assets/data/localeTextESPes.json';

import RetribPersonal2022 from '@assets/data/RetribPersonal2022.json';

@Component({
	selector: 'app-retribuciones2022',
	standalone: true,
	imports: [AgGridModule],
	templateUrl: './retribuciones2022.component.html',
	styleUrls: ['./retribuciones2022.component.scss']
})
export default class Retribuciones2022Component implements OnInit {
	@ViewChild('agGrid') agGrid: AgGridAngular;
	public gridOptions: GridOptions;
	private _columnDefs: ColDef[];
	private _gridApi: GridApi;
	private _columnApi: ColumnApi;

	async ngOnInit(): Promise<void> {
		this._loadTable();
	}

	private async _loadTable() {
		this._setColumnDefs();
		this._setGridOptions();
	}

	_setColumnDefs() {
		this._columnDefs = [
			{
				headerName: 'apliOrgFunc',
				field: 'apliOrgFunc',
				filter: true,
				width: 75
			},
			{
				headerName: 'tipoPersonal',
				field: 'tipoPersonal',
				filter: true,
				width: 250
			},
			{
				headerName: 'categoria',
				field: 'categoria',
				filter: true,
				width: 125
			},
			{
				headerName: 'puesto',
				field: 'puesto',
				filter: true,
				width: 425
			},
			{
				headerName: 'retribucionBrutaAnual',
				field: 'retribucionBrutaAnual',
				filter: true,
				width: 135,
				cellRenderer: CellRendererOCM
			}
		];
	}

	_setGridOptions() {
		this.gridOptions = {
			defaultColDef: {
				width: 130,
				sortable: true,
				resizable: true,
				filter: true,
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

			rowData: RetribPersonal2022,
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
			paginationPageSize: 50
		} as GridOptions;
	}
	P;
	onGridReady(params: GridReadyEvent) {
		this._gridApi = params.api;
		this._columnApi = params.columnApi;

		const defaultSortModel: ColumnState[] = [
			{
				colId: 'retribucionBrutaAnual',
				sort: 'desc',
				sortIndex: 0
			}
		];
		params.columnApi.applyColumnState({ state: defaultSortModel });
	}
}
