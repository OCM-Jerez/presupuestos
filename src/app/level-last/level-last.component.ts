import { Component, OnInit, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { forkJoin } from 'rxjs';

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
	imports: [NgFor, NgIf],
	templateUrl: './level-last.component.html',
	styleUrls: ['./level-last.component.scss']
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

	ngOnInit() {
		let pathSegments = [];
		let path = '';
		let parametro = '';
		const { paramMap, routeConfig } = this._route.snapshot;

		if (routeConfig?.path) {
			pathSegments = routeConfig.path.split('/');
			parametro = pathSegments.filter((segment) => !segment.startsWith(':'))[0];
			path = routeConfig?.path.split('/')[1].split(':')[1];
			console.log('pathSegments', pathSegments);
			console.log('parametro', parametro);
			console.log('path', path);
		}

		switch (path) {
			case 'comision':
				parametro = `art10/infoInstitucional/comisiones/permanentes`;
				const comision = paramMap.get(`${path}`);
				console.log('comision', comision);

				const fetchData1 = () => {
					const pathBase = `/assets/${parametro}/`;
					this.imgURL = `/assets/${path}/${pathBase}/${pathBase}.jpg`;
					const data$ = this._http.get<IOption[]>(`${pathBase}${comision}/${comision}.json`);
					const docs$ = this._http.get<IDoc[]>(`${pathBase}/${comision}/${comision}Docs.json`);
					const coms$ = this._http.get<ICom[]>(`${pathBase}/${comision}/${comision}Coms.json`);
					const news$ = this._http.get<INew[]>(`${pathBase}${comision}/${comision}News.json`);
					// const steps$ = this._http.get<IStep[]>(`${pathBase}${tema}/${tema}Steps.json`);

					forkJoin({ data$, news$, coms$, docs$ }).subscribe(({ data$, news$, coms$, docs$ }) => {
						this.data = data$;
						this.coms = coms$;
						this.docs = docs$;
						this.news = news$;
						// this.steps = steps$;

						const descripcionObj = data$.find((obj) => obj.data === 'Descripción');
						if (descripcionObj) {
							this.descripcion = descripcionObj.value;
						}
					});
				};
				fetchData1();
				break;
			case 'ela':
				parametro = `art10/infoInstitucional/elas`;
				const ela = paramMap.get(`${path}`);
				console.log('ela', ela);

				const fetchData2 = () => {
					const pathBase = `/assets/${parametro}/`;
					this.imgURL = `/assets/${path}/${pathBase}/${pathBase}.jpg`;
					const data$ = this._http.get<IOption[]>(`${pathBase}${ela}/${ela}.json`);
					const docs$ = this._http.get<IDoc[]>(`${pathBase}/${ela}/${ela}Docs.json`);
					const coms$ = this._http.get<ICom[]>(`${pathBase}/${ela}/${ela}Coms.json`);
					const news$ = this._http.get<INew[]>(`${pathBase}${ela}/${ela}News.json`);
					// const steps$ = this._http.get<IStep[]>(`${pathBase}${tema}/${tema}Steps.json`);

					forkJoin({ data$, news$, coms$, docs$ }).subscribe(({ data$, news$, coms$, docs$ }) => {
						this.data = data$;
						this.coms = coms$;
						this.docs = docs$;
						this.news = news$;
						// this.steps = steps$;

						const descripcionObj = data$.find((obj) => obj.data === 'Descripción');
						if (descripcionObj) {
							this.descripcion = descripcionObj.value;
						}
					});
				};
				fetchData2();
				break;
			case 'pleno':
				parametro = `art10/infoInstitucional/plenos`;
				const pleno = paramMap.get(`${path}`);
				console.log('pleno', pleno);

				const fetchData3 = () => {
					const pathBase = `/assets/${parametro}/`;
					this.imgURL = `/assets/${path}/${pathBase}/${pathBase}.jpg`;
					const data$ = this._http.get<IOption[]>(`${pathBase}${pleno}/${pleno}.json`);
					const docs$ = this._http.get<IDoc[]>(`${pathBase}/${pleno}/${pleno}Docs.json`);
					const coms$ = this._http.get<ICom[]>(`${pathBase}/${pleno}/${pleno}Coms.json`);
					const news$ = this._http.get<INew[]>(`${pathBase}${pleno}/${pleno}News.json`);
					// const steps$ = this._http.get<IStep[]>(`${pathBase}${tema}/${tema}Steps.json`);

					forkJoin({ data$, news$, coms$, docs$ }).subscribe(({ data$, news$, coms$, docs$ }) => {
						this.data = data$;
						this.coms = coms$;
						this.docs = docs$;
						this.news = news$;
						// this.steps = steps$;

						const descripcionObj = data$.find((obj) => obj.data === 'Descripción');
						if (descripcionObj) {
							this.descripcion = descripcionObj.value;
						}
					});
				};
				fetchData3();
				break;
			case 'mesa':
				parametro = `art10/infoInstitucional/mesas`;
				const mesa = paramMap.get(`${path}`);
				console.log('mesa', mesa);

				const fetchData4 = () => {
					const pathBase = `/assets/${parametro}/`;
					this.imgURL = `/assets/${path}/${pathBase}/${pathBase}.jpg`;
					const data$ = this._http.get<IOption[]>(`${pathBase}${mesa}/${mesa}.json`);
					const docs$ = this._http.get<IDoc[]>(`${pathBase}/${mesa}/${mesa}Docs.json`);
					const coms$ = this._http.get<ICom[]>(`${pathBase}/${mesa}/${mesa}Coms.json`);
					const news$ = this._http.get<INew[]>(`${pathBase}${mesa}/${mesa}News.json`);
					// const steps$ = this._http.get<IStep[]>(`${pathBase}${tema}/${tema}Steps.json`);

					forkJoin({ data$, news$, coms$, docs$ }).subscribe(({ data$, news$, coms$, docs$ }) => {
						this.data = data$;
						this.coms = coms$;
						this.docs = docs$;
						this.news = news$;
						// this.steps = steps$;

						const descripcionObj = data$.find((obj) => obj.data === 'Descripción');
						if (descripcionObj) {
							this.descripcion = descripcionObj.value;
						}
					});
				};
				fetchData4();
				break;
			case 'distrito':
				const distrito = paramMap.get(`${path}`);
				console.log('distrito', distrito);

				const fetchData5 = () => {
					const pathBase = `/assets/${parametro}/`;
					this.imgURL = `/assets/${path}/${pathBase}/${pathBase}.jpg`;
					const data$ = this._http.get<IOption[]>(`${pathBase}${distrito}/${distrito}.json`);
					const docs$ = this._http.get<IDoc[]>(`${pathBase}/${distrito}/${distrito}Docs.json`);
					const coms$ = this._http.get<ICom[]>(`${pathBase}/${distrito}/${distrito}Coms.json`);
					const news$ = this._http.get<INew[]>(`${pathBase}${distrito}/${distrito}News.json`);
					// const steps$ = this._http.get<IStep[]>(`${pathBase}${distrito}/${distrito}Steps.json`);

					forkJoin({ data$, news$, docs$, coms$ }).subscribe(({ data$, news$, docs$, coms$ }) => {
						this.data = data$;
						this.coms = coms$;
						this.docs = docs$;
						this.news = news$;
						// this.steps = steps$;

						const descripcionObj = data$.find((obj) => obj.data === 'Descripción');
						if (descripcionObj) {
							this.descripcion = descripcionObj.value;
						}
					});
				};
				fetchData5();
				break;
			case 'evento':
				const evento = paramMap.get(`${path}`);
				console.log('evento', evento);

				const fetchData6 = () => {
					const pathBase = `/assets/${parametro}/`;
					this.imgURL = `/assets/${path}/${pathBase}/${pathBase}.jpg`;
					const data$ = this._http.get<IOption[]>(`${pathBase}${evento}/${evento}.json`);
					// const docs$ = this._http.get<IDoc[]>(`${pathBase}/${evento}/${evento}Docs.json`);
					// const coms$ = this._http.get<ICom[]>(`${pathBase}/${evento}/${evento}Coms.json`);
					const news$ = this._http.get<INew[]>(`${pathBase}${evento}/${evento}News.json`);
					// const steps$ = this._http.get<IStep[]>(`${pathBase}${evento}/${evento}Steps.json`);

					forkJoin({ data$, news$ }).subscribe(({ data$, news$ }) => {
						this.data = data$;
						// this.coms = coms$;
						// this.docs = docs$;
						this.news = news$;
						// this.steps = steps$;

						const descripcionObj = data$.find((obj) => obj.data === 'Descripción');
						if (descripcionObj) {
							this.descripcion = descripcionObj.value;
						}
					});
				};
				fetchData6();
				break;

			case 'edificioSingular':
				const edificioSingular = paramMap.get(`${path}`);
				console.log('edificioSingular', edificioSingular);

				const fetchData7 = () => {
					const pathBase = `/assets/${parametro}/`;
					this.imgURL = `/assets/${path}/${pathBase}/${pathBase}.jpg`;
					const data$ = this._http.get<IOption[]>(`${pathBase}${edificioSingular}/${edificioSingular}.json`);
					// const docs$ = this._http.get<IDoc[]>(`${pathBase}/${edificioSingular}/${edificioSingular}Docs.json`);
					// const coms$ = this._http.get<ICom[]>(`${pathBase}/${edificioSingular}/${edificioSingular}Coms.json`);
					const news$ = this._http.get<INew[]>(`${pathBase}${edificioSingular}/${edificioSingular}News.json`);
					// const steps$ = this._http.get<IStep[]>(`${pathBase}${edificioSingular}/${edificioSingular}Steps.json`);

					forkJoin({ data$, news$ }).subscribe(({ data$, news$ }) => {
						this.data = data$;
						// this.coms = coms$;
						// this.docs = docs$;
						this.news = news$;
						// this.steps = steps$;

						const descripcionObj = data$.find((obj) => obj.data === 'Descripción');
						if (descripcionObj) {
							this.descripcion = descripcionObj.value;
						}
					});
				};
				fetchData7();
				break;
			case 'licitacion':
				const licitacion = paramMap.get(`${path}`);
				console.log('licitacion', licitacion);

				const fetchData8 = () => {
					const pathBase = `/assets/licitaciones/`;
					this.imgURL = `/assets/${path}/${pathBase}/${pathBase}.jpg`;
					const data$ = this._http.get<IOption[]>(`${pathBase}${licitacion}/${licitacion}.json`);
					// const docs$ = this._http.get<IDoc[]>(`${pathBase}${licitacion}/${licitacion}Docs.json`);
					// const coms$ = this._http.get<ICom[]>(`${pathBase}${licitacion}/${licitacion}Coms.json`);
					const news$ = this._http.get<INew[]>(`${pathBase}${licitacion}/${licitacion}News.json`);
					const steps$ = this._http.get<IStep[]>(`${pathBase}${licitacion}/${licitacion}Steps.json`);

					forkJoin({ data$, news$, steps$ }).subscribe(({ data$, news$, steps$ }) => {
						this.data = data$;
						// this.coms = coms$;
						// this.docs = docs$;
						this.news = news$;
						this.steps = steps$;

						const descripcionObj = data$.find((obj) => obj.data === 'Descripción');
						if (descripcionObj) {
							this.descripcion = descripcionObj.value;
						}
					});
				};
				fetchData8();
				break;
			case 'subvencion':
				const subvencion = paramMap.get(`${path}`);
				console.log('subvencion', subvencion);

				const fetchData9 = () => {
					const pathBase = `/assets/${parametro}/`;
					this.imgURL = `/assets/${path}/${pathBase}/${pathBase}.jpg`;
					const data$ = this._http.get<IOption[]>(`${pathBase}${subvencion}/${subvencion}.json`);
					// const docs$ = this._http.get<IDoc[]>(`${pathBase}${subvencion}/${subvencion}Docs.json`);
					// const coms$ = this._http.get<ICom[]>(`${pathBase}${subvencion}/${subvencion}Coms.json`);
					const news$ = this._http.get<INew[]>(`${pathBase}${subvencion}/${subvencion}News.json`);
					const steps$ = this._http.get<IStepSubvencion[]>(`${pathBase}${subvencion}/${subvencion}Steps.json`);

					forkJoin({ data$, news$, steps$ }).subscribe(({ data$, news$, steps$ }) => {
						this.data = data$;
						// this.coms = coms$;
						// this.docs = docs$;
						this.news = news$;
						this.stepsSubvencion = steps$;

						const descripcionObj = data$.find((obj) => obj.data === 'Descripción');
						if (descripcionObj) {
							this.descripcion = descripcionObj.value;
						}
					});
				};
				fetchData9();
				break;
			default:
				const tema = paramMap.get(`${path}`);
				console.log('tema', tema);

				const fetchData = () => {
					const pathBase = `/assets/${parametro}/`;
					this.imgURL = `/assets/${path}/${pathBase}/${pathBase}.jpg`;
					const data$ = this._http.get<IOption[]>(`${pathBase}${tema}/${tema}.json`);
					// const docs$ = this._http.get<IDoc[]>(`${pathBase}/${path}/${path}Docs.json`);
					// const coms$ = this._http.get<ICom[]>(`${pathBase}/${path}/${path}Coms.json`);
					const news$ = this._http.get<INew[]>(`${pathBase}${tema}/${tema}News.json`);
					const steps$ = this._http.get<IStep[]>(`${pathBase}${tema}/${tema}Steps.json`);

					forkJoin({ data$, news$, steps$ }).subscribe(({ data$, news$, steps$ }) => {
						this.data = data$;
						// this.coms = coms$;
						// this.docs = docs$;
						this.news = news$;
						this.steps = steps$;

						const descripcionObj = data$.find((obj) => obj.data === 'Descripción');
						if (descripcionObj) {
							this.descripcion = descripcionObj.value;
						}
					});
				};
				fetchData();
				break;
		}
	}

	hasKey(object: unknown, key: string): boolean {
		return object && Object.prototype.hasOwnProperty.call(object, key);
	}
}
