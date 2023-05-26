import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataStoreService } from '@services/dataStore.service';

import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSankey from 'highcharts/modules/sankey';
import { Options } from 'highcharts';
HighchartsMore(Highcharts);
HighchartsSankey(Highcharts);

@Component({
	selector: 'app-sankey-graphs',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './sankey-graphs.component.html',
	styleUrls: ['./sankey-graphs.component.scss']
})
export class SankeyGraphsComponent implements OnInit {
	private _dataStoreService = inject(DataStoreService);

	ngOnInit(): void {
		this._showGraph('Ingresos');
		this._showGraph('Gastos');
	}

	_calcSum(type: string) {
		const data = this._dataStoreService.dataTable['rowData' + type];
		const capitulos = data.map((item) => ({
			name: `${item.CodCap}-${item.DesCap}`,
			value: item.Definitivas2023,
			recaudado: type === 'Ingresos' ? item.DerechosReconocidosNetos2023 : item.Pagos2023
		}));

		return capitulos.reduce((acc, curr) => {
			const index = acc.findIndex((item) => item.name === curr.name);
			index > -1
				? ((acc[index].value += curr.value), (acc[index].recaudado += curr.recaudado))
				: acc.push({
						name: curr.name,
						value: curr.value,
						recaudado: curr.recaudado
				  });
			return acc;
		}, []);
	}

	_showGraph(type: string) {
		const data = this._calcSum(type).map((item, index) => {
			return type === 'Ingresos' ? [item.name, 'Presupuesto', item.value] : ['Presupuesto', item.name, item.value];
		});

		const options: Options = {
			accessibility: { enabled: false },
			title: { text: `<span style= 'font-size: 25px'>${type}</span>` },
			subtitle: { text: '' },
			tooltip: {
				headerFormat: null,
				pointFormat: '{point.fromNode.name} \u2192 {point.toNode.name}: {point.weight} '
				// nodeFormat: '{point.name}: {point.sum} '
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
					data: data,
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
}
