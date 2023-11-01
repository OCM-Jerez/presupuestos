import { Component, OnInit, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { forkJoin } from 'rxjs';

// import { ICom } from '@interfaces/com.interface';
// import { IDoc } from '@interfaces/doc.interface';
import { INew } from '@interfaces/new.interface';
import { IStep } from '@interfaces/step.interface';

interface ITema {
	data: string;
	value: string;
	URL?: string;
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
	public data: ITema[] = [];
	// public coms: ICom[] = [];
	// public docs: IDoc[] = [];
	public news: INew[] = [];
	public steps: IStep[] = [];
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
					const data$ = this._http.get<ITema[]>(`${pathBase}${comision}/${comision}.json`);
					// const docs$ = this._http.get<IDoc[]>(`${pathBase}/${path}/${path}Docs.json`);
					// const coms$ = this._http.get<ICom[]>(`${pathBase}/${path}/${path}Coms.json`);
					const news$ = this._http.get<INew[]>(`${pathBase}${comision}/${comision}News.json`);
					// const steps$ = this._http.get<IStep[]>(`${pathBase}${tema}/${tema}Steps.json`);

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
				fetchData1();
				break;

			default:
				const tema = paramMap.get(`${path}`);
				console.log('tema', tema);

				const fetchData = () => {
					const pathBase = `/assets/${parametro}/`;
					this.imgURL = `/assets/${path}/${pathBase}/${pathBase}.jpg`;
					const data$ = this._http.get<ITema[]>(`${pathBase}${tema}/${tema}.json`);
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
