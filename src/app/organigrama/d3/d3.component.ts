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

	// Salarios
	salarioAlcaldesa = this.formatter.format(74135);
	salarioTenienteAlcaldesa = this.formatter.format(57867);
	salarioTenienteAlcaldesa80 = this.formatter.format(57867 * 0.8);
	salarioDelegado = this.formatter.format(52517);

	salarioPortavozGrupo = this.formatter.format(43782);
	salarioVicePortavozGrupo = this.formatter.format(36000);

	salarioAsesorComunicacion = this.formatter.format(51316);
	SalarioAsesorGobierno = this.formatter.format(43673);
	SalarioAsesorGobierno50 = this.formatter.format(43673 * 0.5);
	salarioSecretarioGrupo = this.formatter.format(32755);
	salarioSecretarioGrupo25 = this.formatter.format(32755 * 0.25);
	salarioSecretarioGrupo50 = this.formatter.format(32755 * 0.5);
	salarioSecretarioGrupo75 = this.formatter.format(32755 * 0.75);
	salarioAsesorGrupo = this.formatter.format(32755);
	salarioAsesorGrupo50 = this.formatter.format(32755 * 0.5);

	totalSecretariosGrupo = this.formatter.format(32755 * 4);
	totalAsesoresGobierno = this.formatter.format(43673 * 7.5); // El maximo es 8
	totalAsesoresGrupos = this.formatter.format(32755 * 2); // Solo tienen el PP y PSOE
	totalAsesores = this.formatter.format(43673 * 7.5 + 32755 * 2);

	totalGrupoMunicipal = this.formatter.format(43782 + 36000);
	totalGruposMunicipales = this.formatter.format(43782 + 36000 + 43782 + 36000 + 43782 + 36000);

	totalTenienteAlcaldesa = 57867 * 4 + 57867 * 0.8;
	totalDelegados = 52517 * 7;
	totalGobiernoLocal = this.formatter.format(74135 + this.totalTenienteAlcaldesa + this.totalDelegados);

	totalCorporacion = this.formatter.format(719516 + 239346 + 131020 + 393058);

	chart: OrgChart;
	data: INodeInfo[] = [
		{
			id: 0,
			// parentId: 0,
			name: 'Corporación 2023-2027',
			position: '',
			salary: this.totalCorporacion,
			image: 'assets/organigrama/corporacion.png'
		},

		// Nivel 1
		{
			id: 10,
			parentId: 0,
			name: 'Gobierno Local',
			// position: '',
			salary: this.totalGobiernoLocal,
			image: 'assets/organigrama/gobierno.png'
		},
		{
			id: 20,
			parentId: 0,
			name: 'Grupos municipales',
			position: '',
			salary: this.totalGruposMunicipales,
			image: 'assets/organigrama/grupoMunicipal.png'
		},
		{
			id: 30,
			parentId: 0,
			name: 'Secretarios Grupos Municipales',
			// position: '',
			salary: this.totalSecretariosGrupo,
			image: 'assets/organigrama/secretario.png'
		},
		{
			id: 40,
			parentId: 0,
			name: 'Asesores',
			// position: '',
			salary: this.totalAsesores,
			image: 'assets/organigrama/asesor.png'
		},

		// grupos municipales
		{
			id: 1000,
			parentId: 20,
			name: 'PP',
			position: 'Grupo municipal',
			salary: 0,
			image: 'assets/organigrama/logoPP.jpg'
		},
		{
			id: 2000,
			parentId: 20,
			name: 'PSOE',
			position: 'Grupo municipal',
			salary: this.totalGrupoMunicipal,
			image: 'assets/organigrama/logoPSOE.jpg'
		},
		{
			id: 3000,
			parentId: 20,
			name: 'La Confluencia',
			position: 'Grupo municipal',
			salary: this.totalGrupoMunicipal,
			image: 'assets/organigrama/logoLaConfluencia.jpg'
		},
		{
			id: 4000,
			parentId: 20,
			name: 'Vox',
			position: 'Grupo municipal',
			salary: this.totalGrupoMunicipal,
			image: 'assets/organigrama/logoVOX.jpg'
		},

		// Secretarios
		{
			id: 1100,
			parentId: 30,
			name: 'PP',
			position: 'Secretario grupo',
			salary: this.salarioSecretarioGrupo,
			image: 'assets/organigrama/logoPP.jpg'
		},
		{
			id: 2100,
			parentId: 30,
			name: 'PSOE',
			position: 'Secretario grupo',
			salary: this.salarioSecretarioGrupo,
			image: 'assets/organigrama/logoPSOE.jpg'
		},
		{
			id: 3100,
			parentId: 30,
			name: 'La Confluencia',
			position: 'Secretario grupo',
			salary: this.salarioSecretarioGrupo,
			image: 'assets/organigrama/logoLaConfluencia.jpg'
		},
		{
			id: 4100,
			parentId: 30,
			name: 'Vox',
			position: 'Secretario grupo',
			salary: this.salarioSecretarioGrupo,
			image: 'assets/organigrama/logoVOX.jpg'
		},

		// Gobierno Local
		{
			id: 1,
			parentId: 10,
			name: 'Mª Jose Garcia Pelayo',
			position: 'Alcaldesa',
			salary: this.salarioAlcaldesa,
			image:
				'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/MJoseGarciaPelayo.jpg'
		},
		{
			id: 101,
			parentId: 1,
			name: 'Agustín Muñoz Martín',
			position: 'Area de Gobierno de Presidencia',
			salary: this.salarioTenienteAlcaldesa,
			image: 'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/AgustinMunoz.jpg'
		},
		{
			id: 102,
			parentId: 1,
			name: 'Jaime Espinar Villar',
			position: 'Area de Gobierno de servicios públicos',
			salary: this.salarioTenienteAlcaldesa,
			image: 'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/JaimaEspinar.jpg'
		},
		{
			id: 103,
			parentId: 1,
			name: 'Susana Sánchez Toro',
			position: 'Area de Gobierno de Inclusión social',
			salary: this.salarioTenienteAlcaldesa,
			image:
				'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/SusanaSanchez.jpg'
		},
		{
			id: 104,
			parentId: 1,
			name: 'Antonio Real Granado',
			position: 'Area de Gobierno de turismo',
			salary: this.salarioTenienteAlcaldesa,
			image: 'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/AntonioReal.jpg'
		},
		{
			id: 105,
			parentId: 1,
			name: 'Jose Ignacio Martinez Moreno',
			position: 'Area de Gobierno de empleo',
			salary: this.salarioTenienteAlcaldesa80,
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
			salary: this.salarioTenienteAlcaldesa,
			image: 'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/AgustinMunoz.jpg'
		},
		{
			id: 202,
			parentId: 101,
			name: 'Belén de la Cuadra Guerrero',
			position: 'Delegación urbanismo',
			salary: this.salarioDelegado,
			image:
				'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/BelenDeLaCuadra.jpg'
		},

		// //Servicios
		{
			id: 203,
			parentId: 102,
			name: 'Jaime Espinar Villar',
			position: 'Delegación servicios públicos',
			salary: this.salarioTenienteAlcaldesa,
			image: 'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/JaimaEspinar.jpg'
		},
		{
			id: 204,
			parentId: 102,
			name: 'José Angel Aparicio Hormigo',
			position: 'Delegación educación',
			salary: this.salarioDelegado,
			image: 'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/JaimaEspinar.jpg'
		},

		//Inclusión social
		{
			id: 205,
			parentId: 103,
			name: 'Susana Sánchez Toro',
			position: 'Delegación ,medio rural, igualdad y diversidad',
			salary: this.salarioTenienteAlcaldesa,
			image:
				'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/SusanaSanchez.jpg'
		},
		{
			id: 206,
			parentId: 103,
			name: 'Carmen Pina Lorente',
			position: 'Delegación participación ciudadana',
			salary: this.salarioDelegado,
			image: 'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/CarmenPina.jpg'
		},
		{
			id: 207,
			parentId: 103,
			name: 'Yesika Quintero Palma',
			position: 'Delegación inclusión social',
			salary: this.salarioDelegado,
			image:
				'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/YessicaQuintero.jpg'
		},

		// //Turismo
		{
			id: 208,
			parentId: 104,
			name: 'Antonio Real Granado',
			position: 'Delegación turismo y promoción de la ciudad',
			salary: this.salarioTenienteAlcaldesa,
			image: 'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/AntonioReal.jpg'
		},
		{
			id: 209,
			parentId: 104,
			name: 'Francisco Zurita Martín',
			position: 'Delegación fiestas y cultura',
			salary: this.salarioDelegado,
			image:
				'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/FranciscoZurita.jpg'
		},
		// //Empleo
		{
			id: 210,
			parentId: 105,
			name: 'Jose Ignacio Martinez Moreno',
			position: 'Delegación seguridad, recursos humanos y administración electrónica y c ',
			salary: this.salarioTenienteAlcaldesa80,
			image:
				'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/JIgancioMartinez.jpg'
		},
		{
			id: 211,
			parentId: 105,
			name: 'Francisco Delgado Aguilera',
			position: 'Delegación economía  hacienda y patrimonio',
			salary: this.salarioDelegado,
			image:
				'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/FranciscoDelgado.jpg'
		},
		{
			id: 212,
			parentId: 105,
			name: 'Nela García Jarillo',
			position: 'Delegación emple, trabajo autónomo  comercio y empresa',
			salary: this.salarioDelegado,
			image: 'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/NelaGarcia.jpg'
		},

		// grupo municipal PP
		{
			id: 114,
			parentId: 1000,
			name: 'Mª Jose Garcia Pelayo',
			position: 'Alcaldesa',
			salary: this.salarioAlcaldesa,
			image:
				'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/MJoseGarciaPelayo.jpg'
		},
		{
			id: 10114,
			parentId: 1000,
			name: 'Agustín Muñoz Martín',
			position: 'Area de Gobierno de Presidencia',
			salary: this.salarioTenienteAlcaldesa,
			image: 'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/AgustinMunoz.jpg'
		},
		{
			id: 10214,
			parentId: 1000,
			name: 'Jaime Espinar Villar',
			position: 'Area de Gobierno de servicios públicos',
			salary: this.salarioTenienteAlcaldesa,
			image: 'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/JaimaEspinar.jpg'
		},
		{
			id: 10314,
			parentId: 1000,
			name: 'Susana Sánchez Toro',
			position: 'Area de Gobierno de Inclusión social',
			salary: this.salarioTenienteAlcaldesa,
			image:
				'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/SusanaSanchez.jpg'
		},
		{
			id: 10414,
			parentId: 1000,
			name: 'Antonio Real Granado',
			position: 'Area de Gobierno de turismo',
			salary: this.salarioTenienteAlcaldesa,
			image: 'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/AntonioReal.jpg'
		},
		{
			id: 10514,
			parentId: 1000,
			name: 'Jose Ignacio Martinez Moreno',
			position: 'Area de Gobierno de empleo',
			salary: this.salarioTenienteAlcaldesa80,
			image:
				'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/JIgancioMartinez.jpg'
		},
		{
			id: 20214,
			parentId: 1000,
			name: 'Belén de la Cuadra Guerrero',
			position: 'Delegación urbanismo',
			salary: this.salarioDelegado,
			image:
				'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/BelenDeLaCuadra.jpg'
		},

		{
			id: 20414,
			parentId: 1000,
			name: 'José Angel Aparicio Hormigo',
			position: 'Delegación educación',
			salary: this.salarioDelegado,
			image: 'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/JaimaEspinar.jpg'
		},

		{
			id: 20614,
			parentId: 1000,
			name: 'Carmen Pina Lorente',
			position: 'Delegación participación ciudadana',
			salary: this.salarioDelegado,
			image: 'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/CarmenPina.jpg'
		},
		{
			id: 20714,
			parentId: 1000,
			name: 'Yesika Quintero Palma',
			position: 'Delegación inclusión social',
			salary: this.salarioDelegado,
			image:
				'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/YessicaQuintero.jpg'
		},

		{
			id: 20914,
			parentId: 1000,
			name: 'Francisco Zurita Martín',
			position: 'Delegación fiestas y cultura',
			salary: this.salarioDelegado,
			image:
				'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/FranciscoZurita.jpg'
		},

		{
			id: 21114,
			parentId: 1000,
			name: 'Francisco Delgado Aguilera',
			position: 'Delegación economía  hacienda y patrimonio',
			salary: this.salarioDelegado,
			image:
				'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/FranciscoDelgado.jpg'
		},
		{
			id: 21214,
			parentId: 1000,
			name: 'Nela García Jarillo',
			position: 'Delegación emple, trabajo autónomo  comercio y empresa',
			salary: this.salarioDelegado,
			image: 'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/NelaGarcia.jpg'
		},
		{
			id: 21215,
			parentId: 1000,
			name: 'Almudena Marina Martínez del Junco',
			position: 'Presidenta Dipuitación de Cádiz',
			salary: 0,
			image:
				'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/AlmudenaMartinez.jpg'
		},

		// Grupo municipal PSOE
		{
			id: 2001,
			parentId: 2000,
			name: 'José Antonio Díaz Hernández',
			position: 'Portavoz grupo',
			salary: this.salarioPortavozGrupo,
			image: 'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2019-2023/PSOE/JANTONIO.svg'
		},
		{
			id: 2002,
			parentId: 2000,
			name: 'Laura Álvarez Cabrera',
			position: 'VivePortavoz grupo',
			salary: this.salarioVicePortavozGrupo,
			image: 'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2019-2023/PSOE/LAURA.svg'
		},
		{
			id: 2010,
			parentId: 2000,
			name: 'Mamen Sánchez Díaz',
			position: 'Concejala',
			salary: 0,
			image: 'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2019-2023/PSOE/MCSANCHEZ.svg'
		},
		{
			id: 2003,
			parentId: 2000,
			name: 'Jesús Alba Guerra',
			position: 'Concejal',
			salary: 0,
			image: 'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2019-2023/PSOE/JESUSALBA.svg'
		},
		{
			id: 2004,
			parentId: 2000,
			name: 'Mª del Carmen Collado Jiménez',
			position: 'Concejala',
			salary: 0,
			image: 'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2019-2023/PSOE/COLLADO.svg'
		},
		{
			id: 2006,
			parentId: 2000,
			name: 'Ana Herica Ramos Campos',
			position: 'Concejala',
			salary: 0,
			image: 'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2019-2023/PSOE/ANAHERICA.svg'
		},
		{
			id: 2007,
			parentId: 2000,
			name: 'Dionisio Díaz Fernández',
			position: 'Concejal',
			salary: 0,
			image:
				'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PSOE/DionisioDiaz.jpg'
		},
		{
			id: 2008,
			parentId: 2000,
			name: 'Almudena Navarro Romero',
			position: 'Concejala',
			salary: 0,
			image:
				'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PSOE/Almudena_Navarro.jpg'
		},
		{
			id: 2009,
			parentId: 2000,
			name: 'Susana Romero Lobato',
			position: 'Concejala',
			salary: 0,
			image:
				'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PSOE/Susana_Romero_Lobato.png'
		},

		// Grupo municipal Confluencia
		{
			id: 3001,
			parentId: 3000,
			name: 'Raul Ruiz-Berdejo',
			position: 'Portavoz grupo',
			salary: this.salarioPortavozGrupo,
			image:
				'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/LACONFLUENCIA/RaulRuizBerdejo.jpg'
		},
		{
			id: 3002,
			parentId: 3000,
			name: 'Ángeles González Eslava',
			position: 'VivePortavoz grupo',
			salary: this.salarioVicePortavozGrupo,
			image:
				'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/LACONFLUENCIA/KikaGonzalez.png'
		},

		// Grupo municipal VOX
		{
			id: 4001,
			parentId: 4000,
			name: 'Antonio Fernández Campos',
			position: 'Portavoz grupo',
			salary: this.salarioPortavozGrupo,
			image:
				'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/VOX/AntonioFernandez.jpg'
		},
		{
			id: 4002,
			parentId: 4000,
			name: 'F. Ignacio Soto',
			position: 'VivePortavoz grupo',
			salary: this.salarioVicePortavozGrupo,
			image: 'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/VOX/IgnacioSoto.jpg'
		},

		// Secretarios Grupo municipal pp
		{
			id: 6000,
			parentId: 1100,
			name: 'Silvia Rodríguez Robles',
			position: 'Secretaria grupo 50%',
			salary: this.salarioSecretarioGrupo50,
			image: ''
		},
		{
			id: 6000,
			parentId: 1100,
			name: 'Cayetano Soto Cáceres',
			position: 'Secretario grupo 50%',
			salary: this.salarioSecretarioGrupo50,
			image: ''
		},

		// Secretarios Grupo municipal PSOE
		{
			id: 6000,
			parentId: 2100,
			name: 'Esther María Mayolin Galán',
			position: 'Secretaria grupo 75%',
			salary: this.salarioSecretarioGrupo75,
			image: ''
		},
		{
			id: 6000,
			parentId: 2100,
			name: ' Alberto Pozo de los Ríos',
			position: 'Secretaria grupo 25%',
			salary: this.salarioSecretarioGrupo25,
			image: ''
		},
		// Secretarios Grupo municipal Confluencia
		{
			id: 6000,
			parentId: 3100,
			name: 'Violeta Márquez Ruiz',
			position: 'Secretaria grupo 100%',
			salary: this.salarioSecretarioGrupo,
			image: ''
		},

		// Secretarios Grupo municipal VOX
		{
			id: 6000,
			parentId: 4100,
			name: 'María Jesús Herencia Montaño',
			position: 'Secretaria grupo 50%',
			salary: this.salarioSecretarioGrupo50,
			image: ''
		},
		{
			id: 6001,
			parentId: 4100,
			name: 'Manuel Jesus Mesa Calvo',
			position: 'Secretario grupo 50%',
			salary: this.salarioSecretarioGrupo50,
			image: ''
		},

		// Asesores
		{
			id: 1111,
			parentId: 40,
			name: 'Gobierno local',
			// position: '',
			salary: 102.793
			// image:
			// 'https://transparencia.jerez.es/fileadmin/Documentos/Transparencia/img/fotos/2023-2027/PP/MJoseGarciaPelayo.jpg'
		},
		{
			id: 1110,
			parentId: 40,
			name: 'PP',
			// position: '',
			salary: this.salarioAsesorGrupo,
			image: 'assets/organigrama/logoPP.jpg'
		},
		{
			id: 2220,
			parentId: 40,
			name: 'PSOE',
			// position: '',
			salary: this.salarioAsesorGrupo,
			image: 'assets/organigrama/logoPSOE.jpg'
		},
		{
			id: 3330,
			parentId: 40,
			name: 'La Confluencia',
			// position: '',
			salary: 0,
			image: 'assets/organigrama/logoLaConfluencia.jpg'
		},
		{
			id: 4440,
			parentId: 40,
			name: 'Vox',
			// position: '',
			salary: 0,
			image: 'assets/organigrama/logoVOX.jpg'
		},

		// Asesores Gobierno local
		{
			id: 6001,
			parentId: 1111,
			name: 'José Antonio Vázquez Laboisse',
			position: 'Asesor comunicación 100%',
			salary: this.salarioAsesorComunicacion,
			image: ''
		},
		{
			id: 6002,
			parentId: 1111,
			name: 'Tomás Pablo Sampalo Torres',
			position: '100%',
			salary: this.SalarioAsesorGobierno,
			image: ''
		},
		{
			id: 6003,
			parentId: 1111,
			name: 'Rafael Mantaras Durán ',
			position: '100%',
			salary: this.SalarioAsesorGobierno,
			image: ''
		},
		{
			id: 6004,
			parentId: 1111,
			name: 'Manuel Moure Sánchez ',
			position: '100%',
			salary: this.SalarioAsesorGobierno,
			image: ''
		},
		{
			id: 6005,
			parentId: 1111,
			name: 'Aiad Abdel-lah Ahmed ',
			position: '100%',
			salary: this.SalarioAsesorGobierno,
			image: ''
		},
		{
			id: 6007,
			parentId: 1111,
			name: 'Dolores Francisca Vallespí Aubá ',
			position: '100%',
			salary: this.SalarioAsesorGobierno,
			image: ''
		},
		{
			id: 6008,
			parentId: 1111,
			name: 'Cristóbal Ortega Muñoz',
			position: '50%',
			salary: this.SalarioAsesorGobierno50,
			image: ''
		},
		{
			id: 6009,
			parentId: 1111,
			name: 'Leopoldo Fernández Vargas-Machuca ',
			position: '50%',
			salary: this.SalarioAsesorGobierno50,
			image: ''
		},
		{
			id: 6010,
			parentId: 1111,
			name: 'Juan Alvarado Garrido',
			position: '50%',
			salary: this.SalarioAsesorGobierno50,
			image: ''
		},

		// Asesores Grupo municipal pp
		{
			id: 6000,
			parentId: 1110,
			name: 'Elvira González Castro',
			position: '50%',
			salary: this.salarioAsesorGrupo50,
			image: ''
		},
		{
			id: 6000,
			parentId: 1110,
			name: 'Javier Mantaras Mechén',
			position: '50%',
			salary: this.salarioAsesorGrupo50,
			image: ''
		},

		// Asesores Grupo municipal PSOE
		{
			id: 6000,
			parentId: 2220,
			name: ' Irene Canca Arévalo ',
			position: '50%',
			salary: this.salarioAsesorGrupo50,
			image: ''
		},
		{
			id: 6000,
			parentId: 2220,
			name: ' Inmaculada de la Corte Granado ',
			position: '50%',
			salary: this.salarioAsesorGrupo50,
			image: ''
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
			.initialExpandLevel(5)
			.initialZoom(0.7)
			.neighbourMargin((a, b) => 20)
			.nodeHeight((d) => 150 + 25)
			.nodeWidth((d) => 160 + 2)
			.svgHeight(600)
			.svgWidth(800)
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
