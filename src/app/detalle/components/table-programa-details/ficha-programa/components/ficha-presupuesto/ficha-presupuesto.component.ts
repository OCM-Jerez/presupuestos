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
		console.log('ngAfterViewInit');

		// this.graphCapituloGastos();
	}

	ficha() {
		console.log('graphCapituloGastos');

		Highcharts.chart({
			chart: {
				type: 'pie',
				renderTo: 'chart-containerLines',
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
}
