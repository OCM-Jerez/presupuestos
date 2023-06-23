import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
HighchartsMore(Highcharts);

@Component({
	selector: 'app-ficha-personal',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './ficha-personal.component.html',
	styleUrls: ['./ficha-personal.component.scss']
})
export default class FichaPersonalComponent implements AfterViewInit {
	ngAfterViewInit() {
		setTimeout(() => {
			this.graphPersonal();
		}, 1500);
	}

	graphPersonal() {
		console.log('graphPersonal');

		Highcharts.chart('', {
			chart: {
				type: 'pie',
				// renderTo: ,
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
}
