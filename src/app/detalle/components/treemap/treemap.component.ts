import { Component, OnDestroy, OnInit, inject } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';

import { DataStoreSubtabService } from '@services/dataStoreSubtab.service';
import { DataStoreTabService } from '@services/dataStoreTab.service';
import { PrepareDataTreemapService } from '@services/prepareDataTreemap.service';
import { ReloadTableService } from '@services/reloadTable.service';
import { TableService } from '@services/table.service';

import { IDataTreemap } from '@interfaces/dataTreemap.interface';
import { ISubtabClasification } from '@interfaces/subtabClasification.interface';
import { ITab } from '@interfaces/tab.interface';
import { CLASIFICATION_TYPE } from '@appTypes/clasification.type';

import * as Highcharts from 'highcharts';
import HighchartsTreemap from 'highcharts/modules/treemap';
HighchartsTreemap(Highcharts);
@Component({
	selector: 'app-treemap',
	templateUrl: './treemap.component.html',
	styleUrls: ['./treemap.component.scss'],
	standalone: true
})
export class TreemapComponent implements OnInit, OnDestroy {
	private _dataStoreSubtabService = inject(DataStoreSubtabService);
	private _dataStoreTabService = inject(DataStoreTabService);
	private _prepareDataTreemapService = inject(PrepareDataTreemapService);
	private _reloadTableService = inject(ReloadTableService);
	private _tableService = inject(TableService);

	private _clasification: CLASIFICATION_TYPE;
	private _data: ISubtabClasification;
	private _dataTreeMap: IDataTreemap;
	private _fields = { codigo: '', descripcion: '' };
	private _isIngreso = false;
	private _tabSelected: ITab;
	private _unsubscribe$ = new Subject<void>();

	constructor() {
		this._dataStoreTabService
			.getTab()
			.pipe(takeUntil(this._unsubscribe$))
			.subscribe((storeTab) => {
				this._tabSelected = storeTab;
				this.setFields();
			});
	}

	ngOnInit() {
		this._reloadTableService.reloadTable$.pipe(takeUntil(this._unsubscribe$)).subscribe(() => {
			this.setFields();
		});
	}

	ngOnDestroy() {
		this._unsubscribe$.next();
		this._unsubscribe$.complete();
	}

	async setFields() {
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

		if (this._clasification.startsWith('ingresos')) {
			this._isIngreso = true;
		} else {
			this._isIngreso = false;
		}
		this.calcSeries();
	}

	async calcSeries() {
		const data = await this._tableService.loadData(this._clasification);
		const dataTreemap = this._isIngreso ? data.rowDataIngresos : data.rowDataGastos;

		this._dataTreeMap = this._prepareDataTreemapService.calcSeries(
			dataTreemap,
			this._fields.codigo,
			this._fields.descripcion,
			'Definitivas1'
		);
		this.showTreemap();
	}

	showTreemap() {
		const data: IDataTreemap = this._dataTreeMap;
		Highcharts.chart('treemap', {
			accessibility: {
				enabled: false
			},
			chart: {
				type: 'treemap'
			},
			plotOptions: {
				treemap: {
					layoutAlgorithm: 'squarified'
				}
			},
			title: {
				text: ''
			},
			credits: {
				enabled: false
			},
			legend: {
				enabled: false
			},
			tooltip: {
				enabled: true,
				headerFormat: `<span class="mb-2">{point.key}</span>`,
				pointFormat: `<span class="mb-2">{point.key}</span>`,
				useHTML: true,
				style: {
					fontSize: '18px'
				}
			},
			series: [
				{
					name: null,
					data: data,
					dataLabels: {
						style: {
							fontSize: '14px'
						}
					}
				}
			]
		} as Highcharts.Options);
	}
}
