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
			height: 400,
			width: 1200,
			inverted: true
		},
		series: [
			{
				type: 'organization',
				name: 'Highsoft',
				keys: ['from', 'to'],
				// nodePadding: 20,

				data: [
					// { from: 'Shareholders', to: 'Board' },
					// { from: 'Board', to: 'alcaldesa' },
					{ from: 'alcaldesa', to: 'PRE' },
					{ from: 'alcaldesa', to: 'SER' },
					{ from: 'alcaldesa', to: 'INC' },
					{ from: 'alcaldesa', to: 'TUR' },
					{ from: 'alcaldesa', to: 'EMP' },
					{ from: 'PRE', to: 'CEN' },
					{ from: 'PRE', to: 'URB' },
					{ from: 'SER', to: 'DELSER' },
					{ from: 'SER', to: 'DELEDU' },
					{ from: 'INC', to: 'DELINC' },
					{ from: 'INC', to: 'DELIGU' },
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
						description: 'Ayuntamiento de Jerez'
					},
					{
						id: 'alcaldesa',
						title: 'Alcaldesa ',
						name: 'Mª Jose Garcia Pelayo',
						image:
							'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/MJoseGarciaPelayo.jpg'
					},

					{
						id: 'PRE',
						title: 'PRESIDENCIA',
						name: 'Agustín Muñoz Martín',
						// info: "Statistics of International Trade in Services Section",
						image:
							'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/AgustinMunoz.jpg',
						offsetHorizontal: -10,
						offsetVertical: -10
					},
					{
						id: 'SER',
						title: 'Servicios públicos',
						name: 'Jaime Espinar Villar',
						image:
							'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/JaimaEspinar.jpg'
					},
					{
						id: 'INC',
						title: 'Inclusión social',
						name: 'Susana Sánchez Toro',
						image:
							'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/SusanaSanchez.jpg'
					},
					{
						id: 'TUR',
						title: 'Turismo',
						name: 'Antonio Real Granado',
						// color: '#007ad0',
						image:
							'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/AntonioReal.jpg'
					},
					{
						id: 'EMP',
						title: 'Empleo',
						name: 'Jose Ignacio Martinez Moreno',
						// offsetHorizontal: -10,
						// offsetVertical: 50,
						// color: '#007ad0',
						image:
							'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/JIgancioMartinez.jpg'
					},

					//Delegaciones
					// Presidencia
					{
						id: 'CEN',
						title: 'Centro histórico',
						name: 'Agustín Muñoz Martín',
						image:
							'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131120/Highsoft_04074_.jpg'
					},
					{
						id: 'URB',
						title: 'URBANISMO',
						name: 'Belén de la Cuadra Guerrero',
						// column: 3,
						image:
							'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131120/Highsoft_04074_.jpg'
					},

					//Servicios
					{
						id: 'DELSER',
						title: 'Educación',
						name: 'Agustín Muñoz Martín',
						image:
							'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131120/Highsoft_04074_.jpg'
					},
					{
						id: 'DELEDU',
						title: 'Educación',
						name: 'Agustín Muñoz Martín',
						image:
							'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131120/Highsoft_04074_.jpg'
					},

					//Inclusión social
					{
						id: 'DELINC',
						title: 'Educación',
						name: 'Agustín Muñoz Martín',
						image:
							'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131120/Highsoft_04074_.jpg'
					},
					{
						id: 'DELIGU',
						title: 'Educación',
						name: 'Agustín Muñoz Martín',
						image:
							'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131120/Highsoft_04074_.jpg'
					},
					{
						id: 'DELPAR',
						title: 'Educación',
						name: 'Agustín Muñoz Martín',
						image:
							'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131120/Highsoft_04074_.jpg'
					},

					//Turismo
					{
						id: 'DELTUR',
						title: 'Educación',
						name: 'Antonio Real Granado',
						image: 'https://www.jerez.es/nc/especiales/imagenes/2019/10/antonio_real_granado.jpg'
					},
					{
						id: 'DELCUL',
						title: 'Educación',
						name: 'Agustín Muñoz Martín',
						image:
							'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131120/Highsoft_04074_.jpg'
					},

					//Empleo
					{
						id: 'DELECO',
						title: 'Educación',
						name: 'Agustín Muñoz Martín',
						image:
							'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131120/Highsoft_04074_.jpg'
					},
					{
						id: 'DELSEG',
						title: 'Educación',
						name: 'Agustín Muñoz Martín',
						image:
							'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131120/Highsoft_04074_.jpg'
					},
					{
						id: 'DELEMP',
						title: 'Educación',
						name: 'Agustín Muñoz Martín',
						image:
							'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131120/Highsoft_04074_.jpg'
					}
				],
				colorByPoint: false,
				color: '#007ad0',
				dataLabels: {
					color: 'white'
				},
				borderColor: 'white',
				nodeWidth: 85,
				minNodeLength: 10,
				nodePadding: 10
			}
		]
	};
}
