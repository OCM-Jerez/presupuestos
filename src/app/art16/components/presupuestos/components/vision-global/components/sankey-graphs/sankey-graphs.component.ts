import { Component, OnInit, inject } from '@angular/core';


import { Subject, switchMap, takeUntil } from 'rxjs';

import { DataStoreService } from '@services/dataStore.service';
import { ReloadTableService } from '@services/reloadTable.service';
import { TableService } from '@services/table.service';

interface ICapitulo {
	name: string;
	value: number;
}

interface IdataGraph {
	from: string;
	to: string;
	weight: number;
}

import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSankey from 'highcharts/modules/sankey';
import { Options } from 'highcharts';
HighchartsMore(Highcharts);
HighchartsSankey(Highcharts);

@Component({
	selector: 'app-sankey-graphs',
	standalone: true,
	imports: [],
	templateUrl: './sankey-graphs.component.html',
	styleUrls: ['./sankey-graphs.component.scss']
})
export class SankeyGraphsComponent implements OnInit {
	private _dataStoreService = inject(DataStoreService);
	private _reloadTableService = inject(ReloadTableService);
	private _tableService = inject(TableService);

	private _data: IdataGraph[] = [];
	private _unsubscribe$ = new Subject<void>();

	ngOnInit(): void {
		this._reloadTableService.reloadTable$
			.pipe(
				switchMap(() => this._showGraph('Ingresos')),
				switchMap(() => this._showGraph('Gastos')),
				takeUntil(this._unsubscribe$)
			)
			.subscribe();

		// Inicializa los gráficos en el inicio
		this._showGraph('Ingresos').then(() => this._showGraph('Gastos'));
	}

	async _showGraph(type: string) {
		await this._calcSum(type);

		const options: Options = {
			accessibility: { enabled: false },
			title: { text: `<span style= 'font-size: 25px'>${type}</span>` },
			subtitle: { text: '' },
			tooltip: {
				headerFormat: null,
				pointFormat: '{point.fromNode.name} \u2192 {point.toNode.name}: {point.weight} '
			},
			series: [
				{
					type: 'sankey',
					name: type,
					borderColor: '#1a1a1a',
					borderWidth: 1,
					colors: [
						'#1E90FF',
						'#1eff8d',
						'#ce9eff',
						'#1eff8d',
						'#1eff8d',
						'#1eff8d',
						'#1eff8d',
						'#ce9eff',
						'#ce9eff',
						'#ce9eff',
						'#ce9eff'
					],
					keys: ['from', 'to', 'weight'],
					data: this._data,
					dataLabels: {
						style: {
							color: '#1a1a1a',
							textOutline: 'none'
						}
					}
				}
			]
		};

		Highcharts.chart(type, options);
	}

	async _calcSum(type: string) {
		await this._tableService.loadData('ingresosEconomicaCapitulos');
		const data = this._dataStoreService.dataTable['rowData' + type];

		// Utilizando un objeto como mapa y asegurándonos de que TypeScript entienda su tipo
		const map: { [key: string]: ICapitulo } = {};

		data.forEach((item) => {
			const name = `${item.CodCap}-${item.DesCap}`;
			if (!map[name]) {
				map[name] = {
					name: name,
					value: 0
				};
			}

			map[name].value += item.Definitivas1;
		});

		// Convierte el objeto a una matriz y actualiza this._data
		this._data = Object.values(map).map((item: ICapitulo) => {
			return {
				from: type === 'Ingresos' ? item.name : 'Presupuesto',
				to: type === 'Ingresos' ? 'Presupuesto' : item.name,
				weight: item.value
			};
		});

		return this._data;
	}
}
