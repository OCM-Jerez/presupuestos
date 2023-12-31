import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import ComentariosComponent from '@commons/components/level/comentarios/comentarios.component';
import DataGeneralComponent from '@commons/components/level/data-general/data-general.component';
import DocumentosComponent from '@commons/components/level/documentos/documentos.component';
import EstadoLicitacionComponent from '@commons/components/level/estado-licitacion/estado-licitacion.component';
import NoticiasComponent from '@commons/components/level/noticias/noticias.component';
import SeguimientoSubvencionComponent from '@commons/components/level/seguimiento-subvencion/seguimiento-subvencion.component';

import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SupabaseService } from '@app/organigrama/supabase/supabase.service';

import { ICom } from '@interfaces/com.interface';
import { IDoc } from '@interfaces/doc.interface';
import { INew } from '@interfaces/new.interface';
import { IStep } from '@interfaces/step.interface';

interface IOption {
	data: string;
	value: string;
	URL?: string;
}

interface IStepSubvencion {
	descripcion: string;
	observaciones: string;
	cuantia: string;
	isFinish?: string;
}

interface IBarrio {
	data: string;
	value: string;
	URL?: string;
}

@Component({
	selector: 'app-level-last',
	standalone: true,
	imports: [
		NgFor,
		NgIf,
		EstadoLicitacionComponent,
		DataGeneralComponent,
		SeguimientoSubvencionComponent,
		DocumentosComponent,
		ComentariosComponent,
		NoticiasComponent
	],
	templateUrl: './level-last.component.html'
})
export default class LevelLastComponent implements OnInit {
	private _supabaseService = inject(SupabaseService);
	private _route = inject(ActivatedRoute);
	private _http = inject(HttpClient);

	public coms: ICom[] = [];
	public docs: IDoc[] = [];
	public news: INew[] = [];
	public data: IOption[] = [];
	// TODO: - Typar
	public dataSupabase: any[] = [];
	public steps: IStep[] = [];
	public barrios: IBarrio[] = [];
	public stepsSubvencion: IStepSubvencion[] = [];

	public imgURL: string;
	public descripcion: string;

	public isPMP = false;
	public isImpuestos = false;
	public isSubvencion = false;
	public isDistrito = false;
	public isLicitacion = false;
	public isEdificioSingular = false;
	private _isTema = false;

	public hasDocs = false;
	public hasComs = false;
	public hasNews = false;

	public gauge = '/assets/licitaciones/gauge.jpg';
	public _option = '';
	public title = '';

	private titleMap: { [key: string]: string } = {
		festivalJerez: 'Festival de Jerez',
		feria: 'Feria del Caballo',
		titeres: 'Festival Internacional de titeres',
		feriaLibro: 'Feria del libro',
		Navidad: 'Navidad',
		zambombas: 'Zambombas',
		aeropuerto: 'Aeropuerto',
		arboles: 'Arboles',
		asesores: 'Asesores',
		astaRegia: 'Asta Regia',
		bandaMusica: 'Banda Municipal de música',
		declaracionesPoliticos: 'Declaraciones políticos',
		hermandades: 'Hermandades y cofradias',
		ifeca: 'Ifeca',
		museoBelen: 'Museo del belén',
		museoFlamenco: 'Museo del Flamenco',
		oficinaMemoriaDemocratica: 'Oficina de memoria democrática',
		parquesEolicos: 'Plantas fotovoltaicas y parques eólicos',
		presupuestoJuntaAndalucia: 'Presupuesto Junta de Andalucía',
		terrazas: 'Terrazas',
		senalizacion: 'Señalización vertical y horizontal',
		naranjas: 'Recogida naranjas',
		varios: 'Varios',
		palacioRiquelme: 'Palacio Riquelme',
		asiloSanJose: 'Antiguo asilo San Jose',
		antiguaComisariaPoliciaNacional: 'Antigua comisaria Policía Nacional',
		antiguaJefaturaPoliciaLocal: 'Antigua jefatura Policía Local',
		croft: 'Croft',
		callejonBolos: 'Callejón de los bolos',
		palacioVillapanes: 'Palacio de Villapanés',
		claustrosSantoDomingo: 'Claustros de Santo Domingo',
		mercadoAbastos: 'Mercado de Abastos',
		cartuja: 'Cartuja',
		galloAzul: 'El Gallo Azul',
		edificiosSingulares: 'Edificios Singulares',
		apartamentosTuristicos: 'Apartamentos Turísticos',
		proyectosViviendas: 'Proyectos construcción de viviendas',
		registroSolares: 'Registro solares y edificaciones ruinosas',
		mercados: 'Mercados',
		plenoOrdinario20230929: 'Pleno ordinario 29 septiembre 2023',
		plenoExtraordinario20231007: 'Pleno extraordinario y solemne 7 octubre 2023',
		plenoOrdinario20231027: 'Pleno ordinario 27 octubre 2023',
		plenoExtraordinario20231115: 'Pleno extraordinario 15 noviembre 2023',
		plenoExtraordinarioUrgente20231115: 'Pleno extraordinario y urgente 15 noviembre 2023',
		plenoExtraordinario20231122: 'Pleno extraordinario 22 noviembre 2023',
		plenoOrdinario20231124: 'Pleno ordinario 24 noviembre 2023',
		plenoExtraordinario20231215: 'Pleno extraordinario 15 diciembre 2023',
		fundarte: 'Fundación Universitaria (Teatro Villamarta)',
		comujesa: 'COMUJESA. Corporación Municipal de Jerez. S.A.',
		cirjesa: 'CIRJESA. Circuito de Jerez. S.A.',
		emuvijesa: 'EMUVIJESA. Empresa municipal de vivienda S.A.',
		mesaTecnicaSeguridad: 'Mesa técnica de seguridad',
		mesaEmpleo: 'Mesa de empleo',
		consejoLocalInfanciaAdolescencia: 'Consejo local de infancia y adolescencia',
		mesaConvivencia: 'Mesa de convivencia',
		mesaCaballo: 'Mesa del caballo',
		mesaLocalJuventud: 'Mesa local de la juventud',
		elTorno: 'El Torno',
		guadalcacin: 'Guadalcacín',
		laBarca: 'La Barca de la Florida',
		estella: 'Estella del Marqués',
		nuevaJarilla: 'Nueva Jarilla',
		sanIsidro: 'San Isidro del Guadalete',
		torrecera: 'Torrecera',
		presidencia:
			'Comisión de presidencia, centro histórico, fondos europeos, coordinación de gobierno y ordenación del territorio',
		serviciosPublicos:
			'Servicios Comisión de servicios públicos, desarrollo sostenible, medio ambiente, protección animal y participación ciudadana',
		inclusion: 'Comisión de inclusión social, familias, igualdad y diversidad y medio rural',
		turismo: 'Comisión de turismo, cultura, educación, deportes y juventud',
		patrimonio:
			'Comisión de empleo, economía, patrimonio, seguridad, recursos humanos, simplificación administrativa y transparencia',
		cuentas: 'Comisión especial de cuentas',
		sugerencias: 'Comisión especial de sugerencias y reclamaciones',
		capitabilidad: 'Comisión especial de capitalidad cultural',
		presupuestos: 'Comisión especial de presupuestos participativos',
		regeneracion: 'Comisión especial de regeneración democrática y calidad institucional',
		impulso: 'Comisión especial de impulso y seguimiento de las mesas sectoriales',
		deuda: 'Deuda',
		pmp: 'Periodo medio de pago a proveedores',
		impuestos: 'Impuestos',
		dipu2023: 'Subvenciones Diputación 2023',
		PFEA: 'Programa de Fomento del Empleo Agrario (PFEA)',
		distritoCentro: 'Distrito Centro',
		distritoNorte: 'Distrito Norte',
		distritoOeste: 'Distrito Oeste',
		distritoSur: 'Distrito Sur',
		distritoEste: 'Distrito Este',
		distritoNoreste: 'Distrito Noroeste',
		distritoRural: 'Distrito Rural'
	};

	ngOnInit() {
		const { paramMap, routeConfig } = this._route.snapshot;
		const pathFull = routeConfig?.path || '';
		const pathSegments = pathFull.split('/');

		let staticPath = pathSegments.slice(0, -1).join('/');
		let param = '';

		// Si el último segmento de la ruta es dinámico, extrae el parámetro
		if (pathFull.includes('/:') && pathSegments.length > 1) {
			const dynamicSegment = pathSegments[pathSegments.length - 1];
			param = dynamicSegment.split(':')[1];
			this._option = paramMap.get(param);
		} else {
			// Si no es dinámico, utiliza el último segmento como parámetro, si existe
			param = pathSegments.length > 1 ? pathSegments[pathSegments.length - 1] : '';

			switch (param) {
				case 'pmp':
					this.isPMP = true;
					break;
				case 'impuestos':
					this.isImpuestos = true;
					break;
			}

			this._option = param;
			console.log('this._option', this._option);
		}

		this.title = this.titleMap[this._option] || 'FALTA AÑADIR Title';
		staticPath = staticPath ? `${staticPath}/` : '';

		// Logs consolidados
		// console.log('pathFull', pathFull);
		// console.log('staticPath', staticPath);
		// console.log('param', param);
		// console.log('this._option', this._option);

		switch (staticPath) {
			case 'licitaciones/':
				// console.log('staticPath', staticPath);
				this.isLicitacion = true;
				this.imgURL = `/assets/${staticPath}/${this._option}/${this._option}.jpg`;
				break;
			case 'edificioSingular/':
				this.isEdificioSingular = true;
				this.imgURL = `/assets/${staticPath}/${this._option}/${this._option}.jpg`;
				break;
			case 'tema/':
				this._isTema = true;
				break;
			case 'subvencion/':
				this.isSubvencion = true;
				break;
			case 'distritos/':
				this.isDistrito = true;
				this.imgURL = `/assets/${staticPath}/${this._option}/${this._option}.jpg`;
				// console.log('this.imgURL', this.imgURL);
				break;
		}

		// this.fetchData(staticPath, this._option);
		this.fetchDataFromSupabase(staticPath, this._option);
	}

	async fetchDataFromSupabase(path: string, param: string) {
		try {
			this.steps = await this._supabaseService.fetchDataByTagOrder('steps', param, true);
		} catch (error) {
			console.error('Error fetching data:', error);
		}

		try {
			const data1 = await this._supabaseService.fetchDataByTag('licitaciones', param);
			// TODO: crear view en Supabase para hacerlo en ella
			// Lo hago desde este código para evitar problemas con la asignación de nombres en la view con SQL.
			// Ademas que hago la ordenación a la vez de los campos en el orden que quiero que aparezcan en la tabla

			const keyMap = new Map([
				['expediente', 'Expediente'],
				['descripcion', 'Descripción'],
				['codigo_cpv', 'Código CPV'],
				['url_plataforma', 'url Plataforma Contratación'],
				['tipo_contrato', 'Tipo de Contrato'],
				['procedimiento_contratacion', 'Procedimiento'],
				['tipo_tramitación', 'Tramitación'],
				['presupuesto_base_sin_impuestos', 'Presupuesto base sin impuestos'],
				['presupuesto_base_licitación_con_impuestos', 'Presupuesto base licitación con impuestos'],
				['plazo_ejecución', 'Plazo ejecución'],
				['licitadores_presentados', 'Licitadores presentados'],
				['adjudicatario', 'Adjudicatario'],
				['cif_adjudicatario', 'CIF adjudicatario'],
				['url_adjudicatario', 'url Información adjudicatario'],
				['importe_adjudicación_sin_impuestos', 'Importe adjudicación sin impuestos'],
				['importe_adjudicación_con_impuestos', 'Importe adjudicación con impuestos'],
				['tipo_financiacion', 'Tipo financiación'],
				['credito_ampara', 'Credito en que se ampara'],
				['organico', 'Orgánico'],
				['programa', 'Programa'],
				['economico', 'Económico'],
				['distrito', 'Distrito'],
				['url_distrito', 'url Distrito'],
				['url_geolocalización', 'url Geolocalización'],
				['duración_contrato', 'Duración contrato'],
				['canon_concesional', 'Canon concesional']
				// ['valor_estimado_contrato', 'Valor estimado'],
				// ['tag', 'tag'],
			]);

			const dataO = data1.flatMap((item) =>
				Array.from(keyMap.keys())
					.filter((key) => item[key] !== null && item[key] !== '')
					.map((key) => ({
						data: keyMap.get(key),
						value: item[key]
					}))
			);
			this.data = dataO;

			const descripcionObj = this.data.find((obj) => obj.data === 'Descripción');
			if (descripcionObj) {
				this.descripcion = descripcionObj.value;
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}

		try {
			this.news = await this._supabaseService.fetchDataByTagOrder('news', param, false);
			this.hasNews = this.news.length > 0;
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	fetchData(path: string, param: string) {
		// console.log('fetchData', path, param);

		// switch (param) {
		// case 'pmp':
		// 	this.isPMP = true;
		// 	break;
		// case 'impuestos':
		// 	this.isImpuestos = true;
		// 	break;
		// case 'comision':
		// 	path = `art10/infoInstitucional/comisiones`;
		// 	break;

		// case 'subvencion':
		// 	this.isSubvencion = true;
		// 	break;
		// case 'tema':
		// 	this._isTema = true;
		// 	break;
		// case 'edificioSingular':
		// 	this.isEdificioSingular = true;
		// 	this.imgURL = `/assets/${path}/${this._option}/${this._option}.jpg`;
		// 	break;
		// case 'licitacion':
		// 	this.isLicitacion = true;
		// 	this.imgURL = `/assets/${path}/${this._option}/${this._option}.jpg`;
		// 	break;
		// case 'distrito':
		// 	this.isDistrito = true;
		// 	this.imgURL = `/assets/${path}/${this._option}/${this._option}.jpg`;
		// 	break;
		// }

		const pathBase = `/assets/${path}`;
		// console.log('pathBase', pathBase);
		// console.log(`${pathBase}${this._option}/${this._option}.json`);

		console.log('param', param);

		const commonRequests = {
			data: this._http.get<IOption[]>(`${pathBase}${param}/${param}.json`),
			coms: this._http.get<ICom[]>(`${pathBase}${param}/${param}Coms.json`),
			docs: this._http.get<IDoc[]>(`${pathBase}${param}/${param}Docs.json`),
			news: this._http.get<INew[]>(`${pathBase}${param}/${param}News.json`)
		};

		const stepsSubvencionRequest = this.isSubvencion
			? { steps: this._http.get<IStepSubvencion[]>(`${pathBase}${this._option}/${this._option}Steps.json`) }
			: {};

		const stepsRequest = this.isLicitacion
			? { steps: this._http.get<IStep[]>(`${pathBase}${this._option}/${this._option}Steps.json`) }
			: {};

		const barrios = this.isDistrito
			? { barrios: this._http.get<IBarrio[]>(`${pathBase}${this._option}/${this._option}Barrios.json`) }
			: {};

		const allRequests = {
			...commonRequests,
			...stepsRequest,
			...stepsSubvencionRequest,
			...barrios
		};
		// console.log('allRequests', allRequests);

		forkJoin(allRequests)
			.pipe(
				catchError((error) => {
					console.error('Error fetching data:', error);
					return of({
						data: [],
						coms: this._isTema ? [] : undefined,
						docs: this._isTema ? [] : undefined,
						news: [],
						steps: this.isLicitacion ? [] : undefined,
						barrios: this.isDistrito ? [] : undefined
					});
				})
			)
			.subscribe((response) => {
				this.data = response.data;
				this.docs = response.docs;
				this.coms = response.coms;
				this.news = response.news;

				if (this.isSubvencion || this.isLicitacion) {
					this.stepsSubvencion = response.steps as IStepSubvencion[];
				}

				if (this.isLicitacion) {
					this.steps = response.steps as IStep[];
				}

				if (this.isDistrito) {
					this.barrios = response.barrios as IBarrio[];
				}

				const descripcionObj = this.data.find((obj) => obj.data === 'Descripción');
				if (descripcionObj) {
					this.descripcion = descripcionObj.value;
				}

				this.hasComs = this.coms.length > 1;
				this.hasDocs = this.docs.length > 1;
				this.hasNews = this.news.length > 0;
			});

		// setTimeout(() => {
		// 	console.log('this.news', this.news);
		// }, 1000);
	}
}
