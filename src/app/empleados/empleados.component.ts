import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { NgFor } from '@angular/common';

import { CardMenuComponent } from '../commons/components/card-menu/card-menu.component';

import puestos from '@assets/data/puestosLimpio.json';

import { CardIndiceComponent } from '../commons/components/card/card.component';

import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { ColumnApi, ColumnState, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community/main';

import { CellRendererOCM, CellRendererOCMtext } from '@ag-grid/CellRendererOCM';
import localeTextESPes from '@assets/data/localeTextESPes.json';
import { CellRendererOCMtext1 } from '@ag-grid/CellRendererOCM1';
import { Router } from '@angular/router';

@Component({
	selector: 'app-empleados',
	templateUrl: './empleados.component.html',
	styleUrls: ['./empleados.component.scss'],
	standalone: true,
	imports: [NgFor, CardIndiceComponent, CardMenuComponent, AgGridModule]
})
export default class EmpleadosComponent implements OnInit {
	private _router = inject(Router);

	@ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
	public gridOptions: GridOptions;
	private _columnDefs: any[any];
	private _gridApi: GridApi;
	private _columnApi: ColumnApi;
	private _rowData: any[any];

	cardMenus = [
		{
			rutaImagen: 'assets/img/home/menu1-400x250.webp',
			titulo: 'Retribuciones',
			subtitulo: 'Retribuciones 2022 empleados. Sin incluir antigüedad..',
			funcion: () => this.visionGlobal(),
			textButton: 'Retirbuciones',
			background: 'linear-gradient(to bottom, #FFFDFC , #FCE1CB)'
		},
		{
			rutaImagen: 'assets/img/home/menu2-400x250.webp',
			titulo: 'RPT',
			subtitulo: 'Relación puestos de trabajo. Incluye complemento específico anual.',
			// funcion: () => this.detalle(),
			textButton: 'RPT',
			background: 'linear-gradient(to bottom, #FCFEFF , #CDE9FE)'
		}
		// {
		// 	rutaImagen: 'assets/img/home/menu3-400x250.webp',
		// 	titulo: 'Licitaciones',
		// 	subtitulo: 'Todos las licitaciones de obras, contratos menores de nuestro Ayuntamiento',
		// 	// funcion: () => this.licitaciones(),
		// 	textButton: 'Licitaciones',
		// 	background: 'linear-gradient(to bottom, #F1F8E9 , #DCEDC8)'
		// },
		// {
		// 	rutaImagen: 'assets/img/home/menu4-400x250.webp',
		// 	titulo: 'Empleados municipales',
		// 	subtitulo: 'Información sobre los empleados de nuestro Ayuntamiento',
		// 	// funcion: () => this.empleados(),
		// 	textButton: 'Empleados',
		// 	background: 'linear-gradient(to bottom, #F5F5F5 , #E0E0E0)'
		// }
	];

	items = [
		{
			indice: '1.',
			title: 'Retribuciones',
			footer: 'Retribuciones 2022 empleados. Sin incluir antigüedad.',
			img: '../../assets/img/vision-global/busget-stream-1.webp'
		},
		{
			indice: '2.',
			title: 'RPT',
			footer: 'Relación puestos de trabajo. Incluye complemento específico anual.',
			img: '../../assets/img/vision-global/busget-stream-1.webp'
		},
		{
			indice: '3.',
			title: 'Funcionarios',
			footer: 'En desarrollo...',
			img: '../../assets/img/vision-global/busget-stream-1.webp'
		},
		{
			indice: '4.',
			title: 'Laborales',
			footer: 'En desarrollo...',
			img: '../../assets/img/vision-global/busget-stream-2.webp'
		},
		{
			indice: '5.',
			title: 'Eventuales',
			footer: 'En desarrollo...',
			img: '../../assets/img/vision-global/busget-stream-3.webp'
		}
	];

	async ngOnInit(): Promise<void> {
		this._loadTable();
	}

	visionGlobal() {
		this._router.navigateByUrl('/visionGlobal');
	}

	private async _loadTable() {
		this._setColumnDefs();
		this._setGridOptions();
	}

	_setColumnDefs() {
		this._columnDefs = [
			// {
			// headerName: '',
			// children: [
			{
				headerName: 'ID',
				field: 'ID',
				filter: true,
				width: 75,
				pinned: 'left'
			},
			{
				headerName: 'nivelPuesto',
				field: 'nivelPuesto',
				filter: true,
				width: 75,
				pinned: 'left'
			},
			{
				headerName: 'puesto',
				field: 'puesto',
				filter: true,
				width: 75,
				pinned: 'left'
			},
			{
				headerName: 'nombrePuesto',
				field: 'nombrePuesto',
				filter: true,
				width: 600,
				pinned: 'left'
			},
			{
				headerName: 'departamento',
				field: 'departamento',
				filter: true,
				width: 600,
				pinned: 'left'
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
				// cellRenderer: CellRendererOCMtext
			}
		];
		// }
		// ];
	}

	_setGridOptions() {
		this.gridOptions = {
			defaultColDef: {
				width: 130,
				sortable: true,
				resizable: true,
				filter: true,
				// aggFunc: 'sum',
				// cellRenderer: CellRendererOCMtext,
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
		console.log(this.gridOptions.rowData);
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
