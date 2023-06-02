import { GridOptions } from 'ag-grid-community/main';
import localeTextESPes from '@assets/data/localeTextESPes.json';
import { CellRendererOCM } from '../CellRendererOCM';

export function getGridOptions(rowData, columnDefs) {
	// gridOptions: GridOptions;

	return {
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
		rowData: rowData,
		columnDefs: columnDefs,
		groupDisplayType: 'custom',
		groupIncludeTotalFooter: true,
		groupIncludeFooter: true,
		groupHeaderHeight: 25,
		headerHeight: 54,
		suppressAggFuncInHeader: true,
		rowSelection: 'single',
		localeText: localeTextESPes
	} as GridOptions;
}
