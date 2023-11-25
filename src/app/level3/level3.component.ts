import { Component, OnInit, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

import ComentariosComponent from '@commons/components/level/comentarios/comentarios.component';
import DataGeneralComponent from '@commons/components/level/data-general/data-general.component';
import DocumentosComponent from '@commons/components/level/documentos/documentos.component';
import EstadoLicitacionComponent from '@commons/components/level/estado-licitacion/estado-licitacion.component';
import NoticiasComponent from '@commons/components/level/noticias/noticias.component';
import SeguimientoSubvencionComponent from '@commons/components/level/seguimiento-subvencion/seguimiento-subvencion.component';
import { catchError, forkJoin, of } from 'rxjs';

import { ICom } from '@interfaces/com.interface';
import { IDoc } from '@interfaces/doc.interface';
import { INew } from '@interfaces/new.interface';

import { IMenuItem } from '@interfaces/menu.interface';

@Component({
	selector: 'app-level3',
	standalone: true,
	imports: [
		NgFor,
		NgIf,
		CardMenuComponent,
		EstadoLicitacionComponent,
		DataGeneralComponent,
		SeguimientoSubvencionComponent,
		DocumentosComponent,
		ComentariosComponent,
		NoticiasComponent
	],
	templateUrl: './level3.component.html'
})
export default class Level3Component implements OnInit {
	public menuOptionsLevel3: IMenuItem[] = [];
	public titulo: string;
	private _route = inject(ActivatedRoute);
	private _router = inject(Router);
	private _http = inject(HttpClient);

	public coms: ICom[] = [];
	public docs: IDoc[] = [];
	public news: INew[] = [];
	public hasDocs = false;
	public hasComs = false;
	public hasNews = false;

	ngOnInit(): void {
		this._route.queryParams.subscribe(() => {
			// console.log(this._route.snapshot.routeConfig);
			this.titulo = this._route.snapshot.routeConfig?.path;
			console.log('this.titulo', this.titulo);

			import(`../../assets/menuOptions/level3/${this.titulo}.json`)
				.then((data) => {
					this.menuOptionsLevel3 = data.default.map((item: IMenuItem) => this.createCardMenu(item));
					this.fetchData(this.titulo);
				})
				.catch((error) => console.error('Error al cargar el JSON:', error));
		});
	}

	fetchData(titulo: string) {
		switch (titulo) {
			case 'comision':
				// parametro = `art10/infoInstitucional/comisiones/permanentes`;
				break;
			case 'elas':
				titulo = `art10/infoInstitucional`;
				break;
			case 'entes':
				titulo = `art10/infoInstitucional`;
				break;
			case 'mesas':
				titulo = `art10/infoInstitucional`;
				break;
			case 'plenos':
				titulo = `art10/infoInstitucional`;
				break;
				break;
			case 'retribuciones2022':
				titulo = `art10/infoInstitucional/retribuciones2022`;
				break;
			case 'subvencion':
				// this.isSubvencion = true;
				break;
			case 'tema':
				// this._isTema = true;
				break;
			case 'edificioSingular':
				// this.isEdificioSingular = true;
				// this.imgURL = `/assets/${parametro}/${this._option}/${this._option}.jpg`;
				break;
			case 'licitacion':
				// this.isLicitacion = true;
				// this.imgURL = `/assets/${parametro}/${this._option}/${this._option}.jpg`;
				break;
			case 'distrito':
				// this.isDistrito = true;
				// this.imgURL = `/assets/${parametro}/${this._option}/${this._option}.jpg`;
				break;
		}

		const pathBase = `/assets/${titulo}/`;

		const commonRequests = {
			// data: this._http.get<IOption[]>(`${pathBase}${this._option}/${this._option}.json`),
			coms: this._http.get<ICom[]>(`${pathBase}${this.titulo}/${this.titulo}Coms.json`),
			docs: this._http.get<IDoc[]>(`${pathBase}${this.titulo}/${this.titulo}Docs.json`),
			news: this._http.get<INew[]>(`${pathBase}${this.titulo}/${this.titulo}News.json`)
		};

		// const stepsSubvencionRequest = this.isSubvencion
		// 	? { steps: this._http.get<IStepSubvencion[]>(`${pathBase}${this._option}/${this._option}Steps.json`) }
		// 	: {};

		// const stepsRequest = this.isLicitacion
		// 	? { steps: this._http.get<IStep[]>(`${pathBase}${this._option}/${this._option}Steps.json`) }
		// 	: {};

		const allRequests = {
			...commonRequests
			// ...stepsRequest,
			// ...stepsSubvencionRequest
		};
		// console.log('allRequests', allRequests);

		forkJoin(allRequests)
			.pipe(
				catchError((error) => {
					console.error('Error fetching data:', error);
					return of({
						// data: [],
						coms: [],
						docs: [],
						news: []
						// steps: this.isLicitacion ? [] : undefined
					});
				})
			)
			.subscribe((response) => {
				// this.data = response.data;
				this.docs = response.docs;
				this.coms = response.coms;
				this.news = response.news;

				// if (this.isSubvencion || this.isLicitacion) {
				// 	this.stepsSubvencion = response.steps as IStepSubvencion[];
				// }

				// if (this.isLicitacion) {
				// 	this.steps = response.steps as IStep[];
				// }

				// const descripcionObj = this.data.find((obj) => obj.data === 'Descripción');
				// if (descripcionObj) {
				// 	this.descripcion = descripcionObj.value;
				// }

				this.hasComs = this.coms.length > 1;
				this.hasDocs = this.docs.length > 1;
				this.hasNews = this.news.length > 0;
			});
	}

	createCardMenu(item: IMenuItem) {
		return {
			...item,
			funcion: () => this._router.navigateByUrl(`${item.route}`)
		};
	}
}
