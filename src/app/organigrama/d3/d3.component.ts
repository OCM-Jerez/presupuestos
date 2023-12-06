import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as d3 from 'd3';
import { OrgChart } from 'd3-org-chart';

@Component({
	selector: 'app-d3',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './d3.component.html',
	styleUrls: ['./d3.component.scss']
})
export default class D3Component {
	@ViewChild('chartContainer') private chartContainer: ElementRef;
	chart: any;
	data: any;

	// eslint-disable-next-line @angular-eslint/use-lifecycle-interface
	ngAfterViewInit() {
		// d3.json(
		// 	'https://gist.githubusercontent.com/bumbeishvili/dc0d47bc95ef359fdc75b63cd65edaf2/raw/c33a3a1ef4ba927e3e92b81600c8c6ada345c64b/orgChart.json'
		d3.csv('https://raw.githubusercontent.com/bumbeishvili/sample-data/main/data-oracle.csv').then((data) => {
			this.data = data;
			console.log(data);
		});
		// if (!this.chart) {

		// espera a que se cargue data
		setTimeout(() => {
			this.chart = new OrgChart();
			console.log(this.chart);
			this.updateChart();
		}, 1000);
	}

	ngOnChanges() {
		this.updateChart();
	}

	updateChart() {
		if (!this.data) {
			return;
		}
		if (!this.chart) {
			return;
		}
		this.chart
			.container(this.chartContainer.nativeElement)
			.data(this.data)
			.svgWidth(500)
			.initialZoom(1)
			.onNodeClick((d) => console.log(d + ' node clicked'))
			.render();
	}
}
