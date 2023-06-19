import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
HighchartsMore(Highcharts);

@Component({
	selector: 'app-ficha-presupuesto',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './ficha-presupuesto.component.html',
	styleUrls: ['./ficha-presupuesto.component.scss']
})
export class FichaPresupuestoComponent implements AfterViewInit {
	ngAfterViewInit() {
		setTimeout(() => {
			this.graphCapituloGastos();
			this.graph1();
			this.graph2();
			this.graph3();
		}, 50);
	}

	graphCapituloGastos() {
		Highcharts.chart('chart-capitulosGastos', {
			chart: {
				type: 'pie',
				// renderTo: 'chart-containerLines',
				options3d: {
					enabled: true,
					alpha: 45
				}
			},
			title: {
				text: 'Beijing 2022 gold medals by country',
				align: 'left'
			},
			subtitle: {
				text: '3D donut in Highcharts',
				align: 'left'
			},
			plotOptions: {
				pie: {
					innerSize: 100,
					depth: 45
				}
			},
			series: [
				{
					type: 'pie',
					name: 'Medals',
					data: [
						['Norway', 16],
						['Germany', 12],
						['USA', 8],
						['Sweden', 8],
						['Netherlands', 8],
						['ROC', 6],
						['Austria', 7],
						['Canada', 4],
						['Japan', 3]
					]
				}
			]
		});
	}

	graph1() {
		Highcharts.chart('graph1', {
			chart: {
				type: 'pie',
				// renderTo: 'chart-containerLines',
				options3d: {
					enabled: true,
					alpha: 45
				}
			},
			title: {
				text: 'Beijing 2022 gold medals by country',
				align: 'left'
			},
			subtitle: {
				text: '3D donut in Highcharts',
				align: 'left'
			},
			plotOptions: {
				pie: {
					innerSize: 100,
					depth: 45
				}
			},
			series: [
				{
					type: 'pie',
					name: 'Medals',
					data: [
						['Norway', 16],
						['Germany', 12],
						['USA', 8]
					]
				}
			]
		});
	}

	graph2() {
		Highcharts.chart('graph2', {
			chart: {
				type: 'pie',
				// renderTo: 'chart-containerLines',
				options3d: {
					enabled: true,
					alpha: 45
				}
			},
			title: {
				text: 'Beijing 2022 gold medals by country',
				align: 'left'
			},
			subtitle: {
				text: '3D donut in Highcharts',
				align: 'left'
			},
			plotOptions: {
				pie: {
					innerSize: 100,
					depth: 45
				}
			},
			series: [
				{
					type: 'pie',
					name: 'Medals',
					data: [
						['Norway', 36],
						['Germany', 21],
						['Austria', 7],
						['USA', 14]
					]
				}
			]
		});
	}

	graph3() {
		Highcharts.chart('graph3', {
			chart: {
				type: 'pie',
				// renderTo: 'chart-containerLines',
				options3d: {
					enabled: true,
					alpha: 45
				}
			},
			title: {
				text: 'Beijing 2022 gold medals by country',
				align: 'left'
			},
			subtitle: {
				text: '3D donut in Highcharts',
				align: 'left'
			},
			plotOptions: {
				pie: {
					innerSize: 100,
					depth: 45
				}
			},
			series: [
				{
					type: 'pie',
					name: 'Medals',
					data: [
						['Norway', 56],
						['Germany', 32],
						['USA', 28]
					]
				}
			]
		});
	}
}
