import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { forkJoin } from 'rxjs';

interface IComision {
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
	selector: 'app-comision',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './comision.component.html',
	styleUrls: ['./comision.component.scss']
})
export default class ComisionComponent implements OnInit {
	private _route = inject(ActivatedRoute);
	private _location = inject(Location);
	private http = inject(HttpClient);

	public news: INew[] = [];
	public dataComision: IComision[] = [];

	public imgURL: string;
	public descripcion: string;

	ngOnInit() {
		const comision = this._route.snapshot.paramMap.get('comision');
		// Función auxiliar para gestionar suscripciones HTTP
		const fetchData = (path: string) => {
			// this.imgURL = `/assets/comision/${comision}/${comision}.jpg`;
			// const steps$ = this.http.get<IStep[]>(`/assets/comision/${path}/${path}Steps.json`);
			const data$ = this.http.get<IComision[]>(`/assets/comisiones/permanentes/${path}/${path}.json`);
			const news$ = this.http.get<INew[]>(`/assets/comisiones/permanentes/${path}/${path}News.json`);

			forkJoin({ data$, news$ }).subscribe(({ data$, news$ }) => {
				this.dataComision = data$;
				this.news = news$;

				const descripcionObj = data$.find((obj) => obj.data === 'Descripción');
				if (descripcionObj) {
					this.descripcion = descripcionObj.value;
				}
			});
		};

		fetchData(comision);
	}

	hasKey(object: unknown, key: string): boolean {
		return object && Object.prototype.hasOwnProperty.call(object, key);
	}

	// volver() {
	// 	this._location.back();
	// }
}
