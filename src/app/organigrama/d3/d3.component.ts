// Basado en https://stackblitz.com/edit/js-pr15gr?file=index.html

import { Component, ElementRef, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as d3 from 'd3';
import { OrgChart } from 'd3-org-chart';

interface INodeInfo {
	id: number;
	parentId?: number;
	name: string;
	position: string;
	image: string;
}

@Component({
	selector: 'app-d3',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './d3.component.html',
	styleUrls: ['./d3.component.scss']
})
export default class D3Component implements AfterViewInit, OnChanges {
	@ViewChild('chartContainer') private chartContainer: ElementRef;
	chart: OrgChart;
	data: INodeInfo[] = [
		{
			id: 100,
			// parentId: 0,
			name: 'Mª Jose Garcia Pelayo',
			position: 'Alcaldesa',
			image:
				'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/MJoseGarciaPelayo.jpg'
		},
		{
			id: 101,
			parentId: 100,
			name: 'Agustín Muñoz Martín',
			position: 'Area de Gobierno de Presidencia',
			image: 'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/AgustinMunoz.jpg'
		},
		{
			id: 102,
			parentId: 100,
			name: 'Jaime Espinar Villar',
			position: 'Area de Gobierno de servicios públicos',
			image: 'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/JaimaEspinar.jpg'
		},
		{
			id: 103,
			parentId: 100,
			name: 'Susana Sánchez Toro',
			position: 'Area de Gobierno de Inclusión social',
			image:
				'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/SusanaSanchez.jpg'
		},
		{
			id: 104,
			parentId: 100,
			name: 'Antonio Real Granado',
			position: 'Area de Gobierno de turismo',
			image: 'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/AntonioReal.jpg'
		},
		{
			id: 105,
			parentId: 100,
			name: 'Jose Ignacio Martinez Moreno',
			position: 'Area de Gobierno de empleo',
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
			image: 'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/AgustinMunoz.jpg'
		},
		{
			id: 202,
			parentId: 101,
			name: 'Belén de la Cuadra Guerrero',
			position: 'Delegación urbanismo',
			image:
				'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/BelenDeLaCuadra.jpg'
		},

		// //Servicios
		{
			id: 203,
			parentId: 102,
			name: 'Jaime Espinar Villar',
			position: 'Delegación servicios públicos',
			image: 'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/JaimaEspinar.jpg'
		},
		{
			id: 204,
			parentId: 102,
			name: 'José Angel Aparicio Hormigo',
			position: 'Delegación educación',
			image: 'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/JaimaEspinar.jpg'
		},

		//Inclusión social
		{
			id: 205,
			parentId: 103,
			name: 'Susana Sánchez Toro',
			position: 'Delegación ,medio rural, igualdad y diversidad',
			image:
				'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/SusanaSanchez.jpg'
		},
		{
			id: 206,
			parentId: 103,
			name: 'Carmen Pina Lorente',
			position: 'Delegación participación ciudadana',
			image: 'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/CarmenPina.jpg'
		},
		{
			id: 207,
			parentId: 103,
			name: 'Yesika Quintero Palma',
			position: 'Delegación inclusión social',
			image:
				'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/YessicaQuintero.jpg'
		},

		// //Turismo
		{
			id: 208,
			parentId: 104,
			name: 'Antonio Real Granado',
			position: 'Delegación turismo y promoción de la ciudad',
			image: 'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/AntonioReal.jpg'
		},
		{
			id: 209,
			parentId: 104,
			name: 'Francisco Zurita Martín',
			position: 'Delegación fiestas y cultura',
			image:
				'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/FranciscoZurita.jpg'
		},
		// //Empleo
		{
			id: 210,
			parentId: 105,
			name: 'Jose Ignacio Martinez Moreno',
			position: 'Delegación dad, recursos humanos y administración electrónica y c ',
			image:
				'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/JIgancioMartinez.jpg'
		},
		{
			id: 211,
			parentId: 105,
			name: 'Francisco Delgado Aguilera',
			position: 'Delegación economía  hacienda y patrimonio',
			image:
				'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/FranciscoDelgado.jpg'
		},
		{
			id: 212,
			parentId: 105,
			name: 'Nela García Jarillo',
			position: 'Delegación emple, trabajo autónomo  comercio y empresa',
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

	ngOnChanges() {
		this.updateChart();
	}

	private initChart() {
		this.chart = new OrgChart()
			.compact(false)
			.pagingStep((d) => 5)
			.minPagingVisibleNodes((d) => 14)
			.container(this.chartContainer.nativeElement)
			.svgWidth(800)
			.svgHeight(600)
			.data(this.data)
			.onNodeClick((d) => {
				// console.log('Node clicked:', d);
				console.log(d);
				console.log(typeof d);

				switch (d.data.id) {
					case 100:
						window.location.href = '/#/pelayo';
						break;

					default:
						break;
				}
			})
			.pagingButton((d, i, arr, state) => {
				const step = state.pagingStep(d.parent);
				const currentIndex = d.parent.data._pagingStep;
				const diff = d.parent.data._directSubordinatesPaging - currentIndex;
				const min = Math.min(diff, step);
				return `
						   <div style="margin-top:50px;">
							  <div style="display:flex;width:170px;border-radius:20px;padding:5px 15px; padding-bottom:4px;;background-color:#E5E9F2">
							  <div><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							  <path d="M5.59 7.41L10.18 12L5.59 16.59L7 18L13 12L7 6L5.59 7.41ZM16 6H18V18H16V6Z" fill="#716E7B" stroke="#716E7B"/>
							  </svg>
							  </div><div style="line-height:2"> Show next ${min}  nodes </div></div>
						   </div>
						`;
			})
			.nodeWidth((d) => 160 + 2)
			.nodeHeight((d) => 100 + 25)
			.childrenMargin((d) => 50)
			.compactMarginBetween((d) => 35)
			.compactMarginPair((d) => 30)
			.neighbourMargin((a, b) => 20)
			.nodeContent((d, i, arr, state) => {
				const color = '#FFFFFF';
				const imageDiffVert = 25 + 2;
				return `
			  <div style='width:${d.width}px;height:${d.height}px;padding-top:${
					imageDiffVert - 2
				}px;padding-left:1px;padding-right:1px'>
				<div style="font-family: 'Inter', sans-serif;background-color:${color};  margin-left:-1px;width:${
					d.width - 2
				}px;height:${d.height - imageDiffVert}px;border-radius:10px;border: ${
					d.data._highlighted || d.data._upToTheRootHighlighted ? '5px solid #E27396"' : '1px solid #E4E2E9"'
				}">
				  <div style="display:flex;justify-content:flex-end;margin-top:5px;margin-right:8px">#${d.data.id}</div>
				  <div style="background-color:${color};margin-top:${
					-imageDiffVert - 20
				}px;margin-left:15px;border-radius:100px;width:50px;height:50px;"></div>
				  <div style="margin-top:${-imageDiffVert - 20}px;"><img src="${
					d.data.image
				}" style="margin-left:20px;border-radius:100px;width:40px;height:40px;" /></div>
				  <div style="font-size:15px;color:#08011E;margin-left:20px;margin-top:10px">${d.data.name}</div>
				  <div style="color:#716E7B;margin-left:20px;margin-top:3px;font-size:10px;">${d.data.position}</div>
				</div>
			  </div>
			`;
			})
			// Agrega el botón de paginación y otras configuraciones aquí
			.render();
	}

	private updateChart() {
		if (this.chart && this.data) {
			this.chart.data(this.data).render();
		}
	}
}
