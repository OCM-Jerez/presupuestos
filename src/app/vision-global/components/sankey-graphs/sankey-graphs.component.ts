import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataStoreService } from '@services/dataStore.service';

import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSankey from 'highcharts/modules/sankey';
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

	private _dataIngresos: any;
	private _dataGastos: any;

	ngOnInit(): void {
		this._loadData();
	}

	private async _loadData() {
		await this.calcSumIngresos();
		this._showGraphIngresos();
		await this.calcSumGastos();
		this._showGraphGastos();
	}

	async calcSumIngresos() {
		this._dataIngresos = this._dataStoreService.dataTable.rowDataIngresos;

		// Creo array de Capitulos de ingresos.
		let capitulos = [];
		for (const item of this._dataIngresos) {
			const value = {
				name: `${item.CodCap}-${item.DesCap}`,
				value: item.Definitivas2023,
				recaudado: item.DerechosReconocidosNetos2023
			};
			capitulos.push(value);
		}

		// Totalizo por capitulo de ingreso
		this._dataIngresos = capitulos.reduce((acc, curr) => {
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

	async calcSumGastos() {
		this._dataGastos = this._dataStoreService.dataTable.rowDataGastos;

		// Creo array de capitulos de gasto
		let capitulosGastos = [];
		for (const item of this._dataGastos) {
			const value = {
				name: `${item.CodCap}-${item.DesCap}`,
				value: item.Definitivas2023,
				recaudado: item.Pagos2023
			};
			capitulosGastos.push(value);
		}

		// Totalizo por capitulo de gastos
		this._dataGastos = capitulosGastos.reduce((acc, curr) => {
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

	_showGraphIngresos() {
		Highcharts.chart('ingresos', {
			accessibility: {
				enabled: false
			},
			title: {
				text: "<span style= 'font-size: 25px'>Ingresos</span>"
			},
			subtitle: {
				text: ''
			},
			tooltip: {
				headerFormat: null,
				pointFormat: '{point.fromNode.name} \u2192 {point.toNode.name}: {point.weight} ',
				nodeFormat: '{point.name}: {point.sum} '
			},
			series: [
				{
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
					data: [
						[this._dataIngresos[0].name, 'Presupuesto', this._dataIngresos[0].value],
						[this._dataIngresos[1].name, 'Presupuesto', this._dataIngresos[1].value],
						[this._dataIngresos[2].name, 'Presupuesto', this._dataIngresos[2].value],
						[this._dataIngresos[3].name, 'Presupuesto', this._dataIngresos[3].value],
						[this._dataIngresos[4].name, 'Presupuesto', this._dataIngresos[4].value],
						[this._dataIngresos[5].name, 'Presupuesto', this._dataIngresos[5].value],
						[this._dataIngresos[6].name, 'Presupuesto', this._dataIngresos[6].value],
						[this._dataIngresos[7].name, 'Presupuesto', this._dataIngresos[7].value],
						[this._dataIngresos[8].name, 'Presupuesto', this._dataIngresos[8].value]
					],
					type: 'sankey',
					name: 'Ingresos',
					dataLabels: {
						style: {
							color: '#1a1a1a',
							textOutline: false
						}
					}
				}
			]
		} as any);
	}

	_showGraphGastos() {
		Highcharts.chart('gastos', {
			accessibility: {
				enabled: false
			},
			title: {
				text: "<span style= 'font-size: 25px'>Gastos</span>"
			},
			subtitle: {
				text: ''
			},
			tooltip: {
				headerFormat: null,
				pointFormat: '{point.fromNode.name} \u2192 {point.toNode.name}: {point.weight}',
				nodeFormat: '{point.name}: {point.sum}'
			},
			series: [
				{
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
					data: [
						['Presupuesto', this._dataGastos[0].name, this._dataGastos[0].value],
						['Presupuesto', this._dataGastos[1].name, this._dataGastos[1].value],
						['Presupuesto', this._dataGastos[2].name, this._dataGastos[2].value],
						['Presupuesto', this._dataGastos[3].name, this._dataGastos[3].value],
						['Presupuesto', this._dataGastos[4].name, this._dataGastos[4].value],
						['Presupuesto', this._dataGastos[5].name, this._dataGastos[5].value],
						['Presupuesto', this._dataGastos[6].name, this._dataGastos[6].value],
						['Presupuesto', this._dataGastos[7].name, this._dataGastos[7].value],
						['Presupuesto', this._dataGastos[8].name, this._dataGastos[8].value]
					],
					type: 'sankey',
					name: '',
					dataLabels: {
						style: {
							color: '#1a1a1a',
							textOutline: false
						}
					}
				}
			]
		} as any);
	}
}
