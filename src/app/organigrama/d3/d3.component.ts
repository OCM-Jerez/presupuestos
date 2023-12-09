// Basado en https://stackblitz.com/edit/js-pr15gr?file=index.html

import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as d3 from 'd3';
import { OrgChart } from 'd3-org-chart';

interface INodeInfo {
	id: number;
	parentId?: number;
	name: string;
	position: string;
	salary?: number;
	image: string;
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
	chart: OrgChart;
	data: INodeInfo[] = [
		{
			id: 100,
			// parentId: 0,
			name: 'Mª Jose Garcia Pelayo',
			position: 'Alcaldesa',
			salary: 102.793,
			image:
				'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/MJoseGarciaPelayo.jpg'
		},
		{
			id: 101,
			parentId: 100,
			name: 'Agustín Muñoz Martín',
			position: 'Area de Gobierno de Presidencia',
			salary: 57.867,
			image: 'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/AgustinMunoz.jpg'
		},
		{
			id: 102,
			parentId: 100,
			name: 'Jaime Espinar Villar',
			position: 'Area de Gobierno de servicios públicos',
			salary: 57.867,
			image: 'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/JaimaEspinar.jpg'
		},
		{
			id: 103,
			parentId: 100,
			name: 'Susana Sánchez Toro',
			position: 'Area de Gobierno de Inclusión social',
			salary: 57.867,
			image:
				'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/SusanaSanchez.jpg'
		},
		{
			id: 104,
			parentId: 100,
			name: 'Antonio Real Granado',
			position: 'Area de Gobierno de turismo',
			salary: 57.867,
			image: 'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/AntonioReal.jpg'
		},
		{
			id: 105,
			parentId: 100,
			name: 'Jose Ignacio Martinez Moreno',
			position: 'Area de Gobierno de empleo',
			salary: 57.867,
			image:
				'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/JIgancioMartinez.jpg'
		},

		//Delegaciones
		//Presidencia
		{
			id: 201,
			parentId: 101,
			name: 'Agustín Muñoz Martín',
			position: 'Delegación centro histórico',
			salary: 57.867,
			image: 'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/AgustinMunoz.jpg'
		},
		{
			id: 202,
			parentId: 101,
			name: 'Belén de la Cuadra Guerrero',
			position: 'Delegación urbanismo',
			salary: 52.517,
			image:
				'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/BelenDeLaCuadra.jpg'
		},

		// //Servicios
		{
			id: 203,
			parentId: 102,
			name: 'Jaime Espinar Villar',
			position: 'Delegación servicios públicos',
			salary: 57.867,
			image: 'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/JaimaEspinar.jpg'
		},
		{
			id: 204,
			parentId: 102,
			name: 'José Angel Aparicio Hormigo',
			position: 'Delegación educación',
			salary: 52.517,
			image: 'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/JaimaEspinar.jpg'
		},

		//Inclusión social
		{
			id: 205,
			parentId: 103,
			name: 'Susana Sánchez Toro',
			position: 'Delegación ,medio rural, igualdad y diversidad',
			salary: 57.867,
			image:
				'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/SusanaSanchez.jpg'
		},
		{
			id: 206,
			parentId: 103,
			name: 'Carmen Pina Lorente',
			position: 'Delegación participación ciudadana',
			salary: 52.517,
			image: 'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/CarmenPina.jpg'
		},
		{
			id: 207,
			parentId: 103,
			name: 'Yesika Quintero Palma',
			position: 'Delegación inclusión social',
			salary: 52.517,
			image:
				'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/YessicaQuintero.jpg'
		},

		// //Turismo
		{
			id: 208,
			parentId: 104,
			name: 'Antonio Real Granado',
			position: 'Delegación turismo y promoción de la ciudad',
			salary: 57.867,
			image: 'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/AntonioReal.jpg'
		},
		{
			id: 209,
			parentId: 104,
			name: 'Francisco Zurita Martín',
			position: 'Delegación fiestas y cultura',
			salary: 52.517,
			image:
				'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/FranciscoZurita.jpg'
		},
		// //Empleo
		{
			id: 210,
			parentId: 105,
			name: 'Jose Ignacio Martinez Moreno',
			position: 'Delegación seguridad, recursos humanos y administración electrónica y c ',
			salary: 57.867,
			image:
				'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/JIgancioMartinez.jpg'
		},
		{
			id: 211,
			parentId: 105,
			name: 'Francisco Delgado Aguilera',
			position: 'Delegación economía  hacienda y patrimonio',
			salary: 52.517,
			image:
				'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/FranciscoDelgado.jpg'
		},
		{
			id: 212,
			parentId: 105,
			name: 'Nela García Jarillo',
			position: 'Delegación emple, trabajo autónomo  comercio y empresa',
			salary: 52.517,
			image: 'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/NelaGarcia.jpg'
		}
	];

	ngAfterViewInit() {
		// d3.csv('https://raw.githubusercontent.com/bumbeishvili/sample-data/main/data-oracle.csv').then((data) => {
		// 	this.data = data;
		// 	this.initChart();
		// });
		this.initChart();
	}

	private initChart() {
		this.chart = new OrgChart()
			.childrenMargin((d) => 50)
			.compact(false)
			.compactMarginBetween((d) => 35)
			.compactMarginPair((d) => 30)
			.container(this.chartContainer.nativeElement)
			.data(this.data)
			.initialExpandLevel(2)
			.initialZoom(0.7)
			.neighbourMargin((a, b) => 20)
			.nodeHeight((d) => 150 + 25)
			.nodeWidth((d) => 160 + 2)
			.svgHeight(600)
			.svgWidth(800)
			.onNodeClick((d) => {
				console.log(d);
				switch (d.data.id) {
					case 100:
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

		// Aplicación de estilos a los enlaces
		d3.selectAll('.link').style('stroke', 'grey').style('stroke-width', '2px');

		return `
		<div style="${nodeContainerStyle}">
		  <div style="${nodeStyle}">
			<div style="${salaryStyle}">${d.data.salary} €</div>
			<div style="${dotStyle}">.</div>
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
		this.chart.zoomOut(1);
		this.chart.render();

		// this.chart.setCentered(100);
	}

	collapseDelegaciones() {
		this.chart.setExpanded(201, false);
		this.chart.setExpanded(203, false);
		this.chart.setExpanded(205, false);
		this.chart.setExpanded(208, false);
		this.chart.setExpanded(210, false).setCentered(100).render();
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
