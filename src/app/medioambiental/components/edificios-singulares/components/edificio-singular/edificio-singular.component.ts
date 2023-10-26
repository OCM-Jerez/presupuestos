import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { forkJoin } from 'rxjs';

interface IStep {
	date: string;
	step: string;
	isFinish?: string;
}

interface ILicitacion {
	data: string;
	value: string;
	URL?: string;
}
interface INew {
	date: string;
	medio: string;
	title: string;
	URL?: string;
}

@Component({
	selector: 'app-edificio-singular',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './edificio-singular.component.html',
	styleUrls: ['./edificio-singular.component.scss']
})
export default class TemaComponent implements OnInit {
	private _route = inject(ActivatedRoute);
	private _location = inject(Location);
	private http = inject(HttpClient);

	public steps: IStep[] = [];
	public dataLicitacion: ILicitacion[] = [];
	public news: INew[] = [];
	public imgURL: string;
	public descripcion: string;

	ngOnInit() {
		const licitacion = this._route.snapshot.paramMap.get('edificioSingular');
		console.log(licitacion);

		// Función auxiliar para gestionar suscripciones HTTP
		const fetchData = (path: string) => {
			this.imgURL = `/assets/edificiosSingulares/${licitacion}/${licitacion}.jpg`;
			const steps$ = this.http.get<IStep[]>(`/assets/edificiosSingulares/${path}/${path}Steps.json`);
			const data$ = this.http.get<ILicitacion[]>(`/assets/edificiosSingulares/${path}/${path}.json`);
			const news$ = this.http.get<INew[]>(`/assets/edificiosSingulares/${path}/${path}News.json`);

			forkJoin({ steps$, data$, news$ }).subscribe(({ steps$, data$, news$ }) => {
				this.steps = steps$;
				this.dataLicitacion = data$;
				this.news = news$;

				const descripcionObj = data$.find((obj) => obj.data === 'Descripción');
				if (descripcionObj) {
					this.descripcion = descripcionObj.value;
				}
			});
		};

		fetchData(licitacion);
	}

	hasKey(object: unknown, key: string): boolean {
		return object && Object.prototype.hasOwnProperty.call(object, key);
	}

	// volver() {
	// 	this._location.back();
	// }
}