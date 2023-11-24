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
	private _route = inject(ActivatedRoute);
	private _http = inject(HttpClient);
	public data: IOption[] = [];
	public coms: ICom[] = [];
	public docs: IDoc[] = [];
	public news: INew[] = [];
	public steps: IStep[] = [];
	public stepsSubvencion: IStepSubvencion[] = [];
	public imgURL: string;
	public descripcion: string;
	public isSubvencion = false;
	public isDistrito = false;
	public isLicitacion = false;
	public isEdificioSingular = false;
	private _isTema = false;
	public hasDocs = false;
	public hasComs = false;
	public hasNews = false;
	public gauge = '/assets/licitaciones/gauge.jpg';
	private _option = '';

	ngOnInit() {
		const { paramMap, routeConfig } = this._route.snapshot;
		const pathSegments = routeConfig?.path.split('/') || [];
		const parametro = pathSegments.filter((segment) => !segment.startsWith(':'))[0];
		const path = pathSegments[1]?.split(':')[1] || '';
		this._option = paramMap.get(`${path}`);
		// console.log('Level last this._option', this._option);
		// console.log('Level last parametro', parametro);

		this.fetchData(parametro, path);
	}

	fetchData(parametro: string, path: string) {
		switch (parametro) {
			case 'registroSolares':
				this._option = 'registroSolares';
				parametro = `medioambiental`;
				break;
			case 'apartamentosTuristicos':
				this._option = 'apartamentosTuristicos';
				parametro = `medioambiental`;
				break;
			case 'proyectosViviendas':
				this._option = 'proyectosViviendas';
				parametro = `medioambiental`;
				break;
			default:
				break;
		}

		switch (path) {
			case 'comision':
				parametro = `art10/infoInstitucional/comisiones/permanentes`;
				break;
			case 'ente':
				parametro = `art10/infoInstitucional/entes`;
				break;
			case 'ela':
				parametro = `art10/infoInstitucional/elas`;
				break;
			case 'pleno':
				parametro = `art10/infoInstitucional/plenos`;
				break;
			case 'mesa':
				parametro = `art10/infoInstitucional/mesas`;
				break;
			case 'subvencion':
				this.isSubvencion = true;
				break;
			case 'tema':
				this._isTema = true;
				break;
			case 'edificioSingular':
				this.isEdificioSingular = true;
				this.imgURL = `/assets/${parametro}/${this._option}/${this._option}.jpg`;
				break;
			case 'licitacion':
				this.isLicitacion = true;
				this.imgURL = `/assets/${parametro}/${this._option}/${this._option}.jpg`;
				break;
			case 'distrito':
				this.isDistrito = true;
				this.imgURL = `/assets/${parametro}/${this._option}/${this._option}.jpg`;
				break;
		}

		const pathBase = `/assets/${parametro}/`;

		const commonRequests = {
			data: this._http.get<IOption[]>(`${pathBase}${this._option}/${this._option}.json`),
			coms: this._http.get<ICom[]>(`${pathBase}${this._option}/${this._option}Coms.json`),
			docs: this._http.get<IDoc[]>(`${pathBase}${this._option}/${this._option}Docs.json`),
			news: this._http.get<INew[]>(`${pathBase}${this._option}/${this._option}News.json`)
		};

		const stepsSubvencionRequest = this.isSubvencion
			? { steps: this._http.get<IStepSubvencion[]>(`${pathBase}${this._option}/${this._option}Steps.json`) }
			: {};

		const stepsRequest = this.isLicitacion
			? { steps: this._http.get<IStep[]>(`${pathBase}${this._option}/${this._option}Steps.json`) }
			: {};

		const allRequests = {
			...commonRequests,
			...stepsRequest,
			...stepsSubvencionRequest
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
						steps: this.isLicitacion ? [] : undefined
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

				const descripcionObj = this.data.find((obj) => obj.data === 'Descripción');
				if (descripcionObj) {
					this.descripcion = descripcionObj.value;
				}

				this.hasComs = this.coms.length > 1;
				this.hasDocs = this.docs.length > 1;
				this.hasNews = this.news.length > 0;
			});
	}
}
