// Basado en https://stackblitz.com/edit/js-pr15gr?file=index.html

import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as d3 from 'd3';
import { OrgChart } from 'd3-org-chart';

interface INodeInfo {
	id: number;
	parentId?: number;
	name: string;
	position?: string;
	salary?: any;
	image?: string;
	expanded?: boolean;
}

@Component({
	selector: 'app-d3',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './d3.component.html',
	styleUrls: ['./d3.component.scss']
})
export default class D3Component implements AfterViewInit {
	@ViewChild('chartContainer') private chartContainer: ElementRef;
	formatter = new Intl.NumberFormat('de-DE', {
		style: 'decimal',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	});

	chart: OrgChart;
	data: INodeInfo[] = [];

	ngAfterViewInit() {
		d3.json('assets/organigrama/organigrama.json').then((data: INodeInfo[]) => {
			this.data = data;
			this.initChart();
		});
	}

	private initChart() {
		this.chart = new OrgChart()
			.childrenMargin((d) => 50)
			.compact(false)
			.compactMarginBetween((d) => 35)
			.compactMarginPair((d) => 30)
			.container(this.chartContainer.nativeElement)
			.data(this.data)
			.initialExpandLevel(1)
			.initialZoom(0.7)
			.neighbourMargin((a, b) => 20)
			.nodeHeight((d) => 160 + 25)
			.nodeWidth((d) => 160 + 2)
			.svgHeight(600)
			.svgWidth(600)
			.onNodeClick((d) => {
				console.log(d);
				switch (d.data.id) {
					case 1:
						window.location.href = '/#/pelayo';
						break;
					default:
						break;
				}
			})
			.nodeContent((d, i, arr, state) => {
				return this.createNodeHtml(d);
			})
			.render();
		console.log(this.chart);

		// this.chart.setCentered();
		// this.chart.fit();
		// this.chart.render();
	}

	createNodeHtml(d) {
		// Pre-cálculo de valores
		const paddingSize = 25 + 2;
		const nodeWidth = d.width - 2;
		const nodeHeight = d.height - paddingSize;
		const marginTop = -(paddingSize + 20);
		const borderStyle =
			d.data._highlighted || d.data._upToTheRootHighlighted ? '5px solid #E27396' : '2px solid #808080';

		// Estilos definidos como constantes
		const nodeContainerStyle = `width:${d.width}px; height:${d.height}px; padding-top:${paddingSize}px; padding-left:1px; padding-right:1px`;
		const nodeStyle = `font-family: 'Inter', sans-serif; margin-left:-1px; border-radius:10px; background-color:#FFFFFF; width:${nodeWidth}px; height:${nodeHeight}px; border: ${borderStyle}`;
		const salaryStyle = `font-size:15px; display:flex; justify-content:flex-end; margin-top:5px; margin-right:8px`;
		const dotStyle = `display:flex; justify-content:flex-end; margin-top:5px; margin-right:8px`;
		const coloredCircleStyle = `background-color:#FFFFFF; margin-top:${marginTop}px; margin-left:15px; border-radius:100px; width:50px; height:50px;`;
		const imageContainerStyle = `margin-top:${marginTop}px; margin-left:20px;`;
		const imageStyle = `border-radius:100px; width:40px; height:40px;`;
		const nameStyle = `font-size:15px; color:#08011E; margin-left:20px; margin-top:10px`;
		const positionStyle = `color:#716E7B; margin-left:20px; margin-top:3px; font-size:10px`;

		// Aplicación de estilos a las líneas de enlaces
		d3.selectAll('.link').style('stroke', 'grey').style('stroke-width', '2px');

		return `
		<div style="${nodeContainerStyle}">
		  <div style="${nodeStyle}">
			<div style="${dotStyle}">.</div>
			<div style="${salaryStyle}">${this.formatter.format(d.data.salary)} €</div>
			<div style="${coloredCircleStyle}"></div>
			<div style="${imageContainerStyle}"><img src="${d.data.image}" style="${imageStyle}" /></div>
			<div style="${nameStyle}">${d.data.name}</div>
			<div style="${positionStyle}">${d.data.position}</div>
			</div>
		</div>
	  `;
	}

	showConnections() {
		this.chart.connections([{ from: 100, to: 101, label: 'Delega en ' }]).render();
	}
	hideConnections() {
		this.chart.connections([{ from: 100, to: 1000, label: '' }], false).render();
		this.chart.setHighlighted(100);
	}

	expandDelegaciones() {
		this.chart.setExpanded(201);
		this.chart.setExpanded(203);
		this.chart.setExpanded(205);
		this.chart.setExpanded(208);
		this.chart.setExpanded(210);
		this.chart.setCentered(10);
		this.chart.initialZoom(0.6);
		d3.selectAll('.node').style('border', '2px solid red');
		this.chart.render();
	}

	collapseDelegaciones() {
		this.chart.setExpanded(201, false);
		this.chart.setExpanded(203, false);
		this.chart.setExpanded(205, false);
		this.chart.setExpanded(208, false);
		this.chart.setExpanded(210, false).setCentered(10).render();
	}

	zoomIn() {
		this.chart.zoomIn(1);
	}

	zoomOut() {
		this.chart.zoomOut(1);
	}

	searchNode(e, option: string) {
		const value = e.srcElement.value.toLowerCase();
		if (!value) {
			this.chart.clearHighlighting();
			return;
		}

		const data = this.chart.data();
		data.forEach((d) => {
			const content = d[option].toLowerCase();
			const isMatch = content.includes(value);
			d._highlighted = isMatch;
			d._expanded = isMatch;
		});

		this.chart.data(data).render().fit();
	}
}
