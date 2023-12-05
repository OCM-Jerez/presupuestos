import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';

import * as Highcharts from 'highcharts';
import HCSankey from 'highcharts/modules/sankey';
import HCOrganization from 'highcharts/modules/organization';

HCSankey(Highcharts);
HCOrganization(Highcharts);

@Component({
	selector: 'app-organigrama',
	standalone: true,
	imports: [CommonModule, HighchartsChartModule],
	templateUrl: './organigrama.component.html',
	styleUrls: ['./organigrama.component.scss']
})
export default class OrganigramaComponent {
	Highcharts: typeof Highcharts = Highcharts;

	chartOptions: Highcharts.Options = {
		title: {
			text: 'Organigrama Ayuntamiento de Jerez',
			style: {
				fontSize: '24px'
			}
		},
		chart: {
			height: 475,
			width: 1200,
			inverted: true
			// height: 475,
			// width: 450,
			// inverted: false
		},
		series: [
			{
				type: 'organization',
				name: 'Highsoft',
				keys: ['from', 'to'],
				// nodePadding: 20,

				data: [
					{ from: 'alcaldesa', to: 'PRE' },
					{ from: 'alcaldesa', to: 'SER' },
					{ from: 'alcaldesa', to: 'INC' },
					{ from: 'alcaldesa', to: 'TUR' },
					{ from: 'alcaldesa', to: 'EMP' },
					{ from: 'PRE', to: 'CEN' },
					{ from: 'PRE', to: 'URB' },
					{ from: 'SER', to: 'DELSER' },
					{ from: 'SER', to: 'DELEDU' },
					{ from: 'INC', to: 'DELRUR' },
					{ from: 'INC', to: 'DELINC' },
					{ from: 'INC', to: 'DELPAR' },
					{ from: 'TUR', to: 'DELTUR' },
					{ from: 'TUR', to: 'DELCUL' },
					{ from: 'EMP', to: 'DELECO' },
					{ from: 'EMP', to: 'DELSEG' },
					{ from: 'EMP', to: 'DELEMP' }
				],
				levels: [
					{
						level: 0,
						color: '#1769AA',
						dataLabels: {
							color: 'white'
						}
					},
					{
						level: 1,
						color: '#1769AA',
						dataLabels: {
							color: 'white'
						},
						borderColor: 'white'
					},
					{
						level: 2,
						color: '#1769AA'
					},
					{
						level: 4,
						color: '#359154'
					}
				],

				point: {
					events: {
						click: function () {
							console.log(this.name);
							switch (this.name) {
								case 'Mª Jose Garcia Pelayo':
									window.location.href = '/#/pelayo';
									// window.open(
									// 	'/#/explicamos'
									// 'https://transparencia.jerez.es/infopublica/institucional/corporacion/2023-2027/maria-jose-garcia-pelayo'
									// );
									break;

								default:
									break;
							}
						}
					}
				},
				nodes: [
					{
						id: 'Board',
						title: 'Ayuntamiento de Jerez',
						name: ' ',
						description: 'Ayuntamiento de Jerez',
						color: 'red'
					},
					// D:\presupuestos\node_modules\highcharts\highcharts.src.d.ts
					{
						colorIndex: 0,
						// color: 'blue',
						column: 0,
						dataLabels: {
							align: 'right',
							allowOverlap: true,
							animation: true,
							// backgroundSColor: 'green',
							borderColor: 'red',
							borderRadius: 0,
							borderWidth: 0,
							className: 'highcharts-data-label-box',
							color: 'white',
							crop: false,
							defer: false,
							enabled: true,
							// filter: {},
							// format: '{point.name}',
							// formatter: function () {
							// 	return this.point.name;
							// },
							inside: true,
							// // linkTextPath: 'foo',
							// nodeFormat: '{point.name}',
							// nodeFormatter: function () {
							// 	return this.point.name;
							// },
							// nullFormat: 'null',
							// nullFormatter: function () {
							// 	return 'null';
							// },
							overflow: 'justify',
							padding: 5,
							position: 'center',
							rotation: 0,
							shadow: false,
							shape: 'square',
							style: {
								color: 'red',
								fontSize: '10px',
								fontWeight: 'bold',
								textOutline: '1px contrast'
							},
							// useHTML: boolean,
							verticalAlign: 'right',
							x: 0,
							y: 0,
							zIndex: 6
						},
						description: 'Descripcion Alcaldesa',
						id: 'alcaldesa',
						image:
							'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/MJoseGarciaPelayo.jpg',
						layout: 'normal',
						level: 0,
						name: 'Mª Jose Garcia Pelayo',
						offsetHorizontal: -10,
						offsetVertical: -50,
						title: 'title Alcaldesa '
					},

					{
						id: 'PRE',
						color: 'green',
						title: 'PRESIDENCIA',
						name: 'Agustín Muñoz Martín',
						image:
							'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/AgustinMunoz.jpg'
					},
					{
						id: 'SER',
						color: 'green',
						title: 'Servicios públicos',
						name: 'Jaime Espinar Villar',
						image:
							'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/JaimaEspinar.jpg'
					},
					{
						id: 'INC',
						color: 'green',
						title: 'Inclusión social',
						name: 'Susana Sánchez Toro',
						image:
							'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/SusanaSanchez.jpg'
					},
					{
						id: 'TUR',
						color: 'green',
						title: 'Turismo',
						name: 'Antonio Real Granado',
						image:
							'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/AntonioReal.jpg'
					},
					{
						id: 'EMP',
						color: 'green',
						title: 'Empleo',
						name: 'Jose Ignacio Martinez Moreno',
						image:
							'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/JIgancioMartinez.jpg'
					},

					//Delegaciones
					// Presidencia
					{
						id: 'CEN',
						color: '#7DCEA0',
						title: 'Centro histórico',
						name: 'Agustín Muñoz Martín',
						column: 2,
						image:
							'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/AgustinMunoz.jpg'
					},
					{
						id: 'URB',
						color: '#7DCEA0',
						title: 'URBANISMO',
						name: 'Belén de la Cuadra Guerrero',
						column: 3,
						image:
							'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/BelenDeLaCuadra.jpg'
					},

					//Servicios
					{
						id: 'DELSER',
						color: '#7DCEA0',
						title: 'Servicios',
						name: 'Jaime Espinar Villar',
						column: 2,
						image:
							'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/JaimaEspinar.jpg'
					},
					{
						id: 'DELEDU',
						color: '#7DCEA0',
						title: 'Educación',
						name: 'José Angel Aparicio Hormigo',
						column: 3,
						image:
							'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/JAngelAparicio.jpg'
					},

					//Inclusión social
					{
						id: 'DELRUR',
						color: '#7DCEA0',
						title: 'Rural',
						name: 'Susana Sánchez Toro',
						column: 2,
						image:
							'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/SusanaSanchez.jpg'
					},
					{
						id: 'DELPAR',
						color: '#7DCEA0',
						title: 'Participación ciudadana',
						name: 'Carmen Pina Lorente',
						column: 3,
						image:
							'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/CarmenPina.jpg'
					},
					{
						id: 'DELINC',
						color: '#7DCEA0',
						title: 'Inclusión social',
						name: 'Yesika Quintero Palma',
						column: 3,
						image:
							'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/YessicaQuintero.jpg',
						offsetVertical: 42
					},

					//Turismo
					{
						id: 'DELTUR',
						color: '#7DCEA0',
						title: 'Educación',
						name: 'Antonio Real Granado',
						column: 2,
						image:
							'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/AntonioReal.jpg'
					},
					{
						id: 'DELCUL',
						color: '#7DCEA0',
						title: 'Cultura y fiestas',
						name: 'Francisco Zurita Martín',
						column: 3,
						image:
							'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/FranciscoZurita.jpg'
					},

					//Empleo

					{
						id: 'DELSEG',
						color: '#7DCEA0',
						title: 'Educación',
						name: 'Jose Ignacio Martinez Moreno',
						column: 2,
						image:
							'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/JIgancioMartinez.jpg'
					},
					{
						id: 'DELECO',
						color: '#7DCEA0',
						title: 'Economía y hacienda',
						name: 'Francisco Delgado aguilera',
						column: 3,
						image:
							'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/FranciscoDelgado.jpg'
					},
					{
						id: 'DELEMP',
						color: '#7DCEA0',
						title: 'Empleo',
						name: 'Nela García Jarillo',
						column: 3,
						image:
							'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/NelaGarcia.jpg',
						// offsetVertical: 100 // izquierda - derecha
						offsetVertical: 125
						// offsetHorizontal: -80 // arriba-abajo
					}
				],
				colorByPoint: false,
				color: '#007ad0',
				dataLabels: {
					color: 'white'
				},
				borderColor: 'white',
				nodeWidth: 60,
				minNodeLength: 10,
				nodePadding: 10,
				minLinkWidth: 12
			}
		]
	};
}
