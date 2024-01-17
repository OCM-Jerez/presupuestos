// Basado en https://stackblitz.com/edit/js-pr15gr?file=index.html

import { Component, ElementRef, ViewChild, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as d3 from 'd3';
import { OrgChart } from 'd3-org-chart';

import { SupabaseService } from '../ficha-empleado/supabase.service';

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
	selector: 'app-organigrama-politico',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './organigrama-politico.component.html',
	styleUrls: ['./organigrama-politico.component.scss']
})
export default class OrganigramaPoliticoComponent implements AfterViewInit {
	@ViewChild('chartContainer') private chartContainer: ElementRef;
	private _supabaseService = inject(SupabaseService);
	public positionData: any[] = null;

	formatter = new Intl.NumberFormat('de-DE', {
		style: 'decimal',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	});

	chart: OrgChart;
	data: INodeInfo[] = [];

	ngAfterViewInit() {
		// d3.json('assets/organigrama/organigrama.json').then((data: INodeInfo[]) => {
		// 	this.data = data;
		// 	this.initChart();
		// });
		this.fetchData();
	}

	async fetchData() {
		try {
			this.data = await this._supabaseService.fetchData('organigrama');
			this.data.sort((a, b) => a.id - b.id);
			this.initChart();
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	private initChart() {
		this.chart = new OrgChart()
			.childrenMargin(() => 50)
			.compact(false)
			.compactMarginBetween(() => 35)
			.compactMarginPair(() => 30)
			.container(this.chartContainer.nativeElement)
			.data(this.data)
			.initialExpandLevel(1)
			.initialZoom(0.7)
			.neighbourMargin((a, b) => 100)
			.nodeHeight(() => 160 + 25)
			.nodeWidth(() => 160 + 2)
			.nodeButtonWidth(() => 40)
			.nodeButtonHeight(() => 40)
			.nodeButtonX(() => -20)
			.nodeButtonY(() => -20)
			// .node.x(() => 20)
			.svgHeight(750)
			.svgWidth(600)
			// d es la data del node selelect
			.onNodeClick((d) => {
				// console.log(d);
				// window.location.href = `/#/employeeRecod/${d.data.id}`;
				if (d.data.id === 1) {
					window.location.href = `/#/fichaEmpleado/${d.data.id}`;
				} else {
					alert('No hay datos por el momento');
				}
			})
			// .nodeContent((d, i, arr, state) => {  No se para que sirven el resto de params
			.nodeContent((d) => {
				// if (d.data.id === 0) {
				// 	d.x = -150; // Mueve el node

				// 	// this.chart.nodeButtonX((d) => {
				// 	// 	return 55;
				// 	// });

				// 	return this.createNodeHtmlAyto(d);
				// }
				// if (d.data.id === 1) {
				// 	d.x = -350; // Mueve el node
				// 	// d.nodeButtonx = -260; // NO FUNCIONA
				// 	// this.chart.nodeButtonX((d) => -60);

				// 	return this.createNodeHtmlAlcalde(d);
				// }

				// if (d.data.id === 101) {
				// 	// d.x = -1400; // Mueve el node
				// 	return this.createNodeHtmlPrimerTeniente(d);
				// }

				// if (d.data.id > 101 && d.data.id < 200) {
				// 	return this.createNodeHtmlTeniente(d);
				// }

				return this.createNodeHtml(d);
			})

			.render();

		this.chart.nodeButtonX((d) => {
			// console.log('d.data.id', d.data.id);

			// FIXME: No detecta el paso por el node 0
			if (d.data.id === 0) {
				// console.log('d.data.id', d.data.id);
				return 5;
			}
			if (d.data.id === 1) {
				// console.log('d.data.id', d.data.id);
				return 55;
			}
			// if (d.data.id === 1) return 55;
			// if (d.data.id === 101) return 30;
			return -20;
		});

		setTimeout(() => {
			this.expandDelegaciones();
		}, 1000);
	}

	// TODO: Refactorizar
	createNodeHtmlAyto(d) {
		const paddingSize = 25 + 2;
		const nodeWidth = d.width + 350;
		const nodeHeight = d.height - paddingSize;
		const marginTop = -(paddingSize + 20);
		const borderStyle =
			d.data._highlighted || d.data._upToTheRootHighlighted ? '5px solid #E27396' : '2px solid #808080';

		// Estilos definidos como constantes
		const nodeContainerStyle = `width:${d.width}px; height:${d.height}px; padding-top:${paddingSize}px; padding-left:1px; padding-right:1px`;
		const nodeStyle = `font-family: 'Inter', sans-serif; margin-left:-1px; border-radius:10px; background-color:#1769AA; width:${nodeWidth}px; height:${nodeHeight}px; border: ${borderStyle}`;
		const salaryStyle = `font-size:28px; color: white; display:flex; justify-content:flex-end; margin-top:5px; margin-right:8px`;
		const dotStyle = `display:flex; justify-content:flex-end; margin-top:5px; margin-right:8px`;
		const coloredCircleStyle = `background-color:#FFFFFF; margin-top:${marginTop}px; margin-left:15px; border-radius:100px; width:50px; height:50px;`;
		const imageContainerStyle = `margin-top:${marginTop}px; margin-left:20px;`;
		const imageStyle = `border-radius:100px; width:40px; height:40px;`;
		const nameStyle = `font-size:28px; color:white; margin-left:20px; margin-top:10px`;
		const positionStyle = `color:white; margin-left:20px; margin-top:3px; font-size:28px`;

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

	// TODO: Refactorizar
	createNodeHtmlAlcalde(d) {
		const paddingSize = 25 + 2;
		const nodeWidth = d.width + 150;
		const nodeHeight = d.height - paddingSize;
		const marginTop = -(paddingSize + 20);
		const borderStyle =
			d.data._highlighted || d.data._upToTheRootHighlighted ? '5px solid #E27396' : '2px solid #808080';

		// Estilos definidos como constantes
		const nodeContainerStyle = `width:${d.width}px; height:${d.height}px; padding-top:${paddingSize}px; padding-left:1px; padding-right:1px`;
		const nodeStyle = `font-family: 'Inter', sans-serif; margin-left:-1px; border-radius:10px; background-color:#009aaf; width:${nodeWidth}px; height:${nodeHeight}px; border: ${borderStyle}`;
		const salaryStyle = `font-size:22px; color: white; display:flex; justify-content:flex-end; margin-top:5px; margin-right:8px`;
		const dotStyle = `display:flex; justify-content:flex-end; margin-top:5px; margin-right:8px`;
		const coloredCircleStyle = `background-color:#FFFFFF; margin-top:${marginTop}px; margin-left:15px; border-radius:100px; width:50px; height:50px;`;
		const imageContainerStyle = `margin-top:${marginTop}px; margin-left:20px;`;
		const imageStyle = `border-radius:100px; width:40px; height:40px;`;
		const nameStyle = `font-size:22px; color:white; margin-left:20px; margin-top:10px`;
		const positionStyle = `color:white; margin-left:20px; margin-top:3px; font-size:22px`;

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
			<div style="${positionStyle}">${d.data.id}</div>
			</div>
		</div>
	  `;
	}

	// TODO: Refactorizar
	createNodeHtmlPrimerTeniente(d) {
		const paddingSize = 25 + 2;
		const nodeWidth = d.width + 200;
		const nodeHeight = d.height - paddingSize;
		const marginTop = -(paddingSize + 20);
		const borderStyle =
			d.data._highlighted || d.data._upToTheRootHighlighted ? '5px solid #E27396' : '2px solid #808080';

		// Estilos definidos como constantes
		const nodeContainerStyle = `width:${d.width}px; height:${d.height}px; padding-top:${paddingSize}px; padding-left:1px; padding-right:1px`;
		const nodeStyle = `font-family: 'Inter', sans-serif; margin-left:-1px; border-radius:10px; background-color:#24e9ff; width:${nodeWidth}px; height:${nodeHeight}px; border: ${borderStyle}`;
		const salaryStyle = `font-size:22px; color: black; display:flex; justify-content:flex-end; margin-top:5px; margin-right:8px`;
		const dotStyle = `display:flex; justify-content:flex-end; margin-top:5px; margin-right:8px`;
		const coloredCircleStyle = `background-color:#FFFFFF; margin-top:${marginTop}px; margin-left:15px; border-radius:100px; width:50px; height:50px;`;
		const imageContainerStyle = `margin-top:${marginTop}px; margin-left:20px;`;
		const imageStyle = `border-radius:100px; width:40px; height:40px;`;
		const nameStyle = `font-size:15px; color:black; margin-left:20px; margin-top:10px`;
		const positionStyle = `color:black; margin-left:20px; margin-top:3px; font-size:16px`;

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
			<div style="${positionStyle}">${d.data.id}</div>
			</div>
		</div>
	  `;
	}

	// TODO: Refactorizar
	createNodeHtmlTeniente(d) {
		const paddingSize = 25 + 2;
		const nodeWidth = d.width + 200;
		const nodeHeight = d.height - paddingSize;
		const marginTop = -(paddingSize + 20);
		const borderStyle =
			d.data._highlighted || d.data._upToTheRootHighlighted ? '5px solid #E27396' : '2px solid #808080';

		// Estilos definidos como constantes
		const nodeContainerStyle = `width:${d.width}px; height:${d.height}px; padding-top:${paddingSize}px; padding-left:1px; padding-right:1px`;
		const nodeStyle = `font-family: 'Inter', sans-serif; margin-left:-1px; border-radius:10px; background-color:#ccfaff; width:${nodeWidth}px; height:${nodeHeight}px; border: ${borderStyle}`;
		const salaryStyle = `font-size:22px; color: black; display:flex; justify-content:flex-end; margin-top:5px; margin-right:8px`;
		const dotStyle = `display:flex; justify-content:flex-end; margin-top:5px; margin-right:8px`;
		const coloredCircleStyle = `background-color:#FFFFFF; margin-top:${marginTop}px; margin-left:15px; border-radius:100px; width:50px; height:50px;`;
		const imageContainerStyle = `margin-top:${marginTop}px; margin-left:20px;`;
		const imageStyle = `border-radius:100px; width:40px; height:40px;`;
		const nameStyle = `font-size:15px; color:black; margin-left:20px; margin-top:10px`;
		const positionStyle = `color:black; margin-left:20px; margin-top:3px; font-size:16px`;

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
			<div style="${positionStyle}">${d.data.id}</div>
			</div>
		</div>
	  `;
	}

	// TODO: Refactorizar
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
			<div style="${positionStyle}">${d.data.id}</div>
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
		this.chart.setCentered(104);
		this.chart.initialZoom(0.6);
		// d3.selectAll('.node').style('border', '2px solid red');
		// this.chart.fit();
		this.chart.render();
	}

	collapseDelegaciones() {
		this.chart.setExpanded(201, false);
		this.chart.setExpanded(203, false);
		this.chart.setExpanded(205, false);
		this.chart.setExpanded(208, false);
		this.chart.setExpanded(210, false).setCentered(105).render();
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
