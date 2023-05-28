import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { ColumnApi, ColumnState, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community/main';

import { CellRendererOCM } from '@ag-grid/CellRendererOCM';
import localeTextESPes from '@assets/data/localeTextESPes.json';

import puestos from '@assets/data/puestosLimpio.json';

@Component({
	selector: 'app-rpt',
	standalone: true,
	imports: [CommonModule, AgGridModule],
	templateUrl: './rpt.component.html',
	styleUrls: ['./rpt.component.scss']
})
export default class RptComponent implements OnInit {
	@ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
	public gridOptions: GridOptions;
	private _columnDefs: any[any];
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
				headerName: 'nivelPuesto',
				field: 'nivelPuesto',
				filter: true,
				width: 75
			},
			{
				headerName: 'puesto',
				field: 'puesto',
				filter: true,
				width: 75
			},
			{
				headerName: 'nombrePuesto',
				field: 'nombrePuesto',
				filter: true,
				width: 425
			},
			{
				headerName: 'departamento',
				field: 'departamento',
				filter: true,
				width: 425
			},
			{
				headerName: 'COMPLEMENTO ESPECÍFICO ANUAL',
				field: 'complementoEspecificoEuros',
				filter: true,
				width: 135,
				cellRenderer: CellRendererOCM
			},
			{
				headerName: 'SITUACIÓN',
				field: 'situacion',
				filter: true,
				width: 120
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

			rowData: puestos,
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

	onGridReady(params: GridReadyEvent) {
		this._gridApi = params.api;
		this._columnApi = params.columnApi;

		const defaultSortModel: ColumnState[] = [
			{
				colId: 'complementoEspecificoEuros',
				sort: 'desc',
				sortIndex: 0
			}
		];
		params.columnApi.applyColumnState({ state: defaultSortModel });
	}
}
