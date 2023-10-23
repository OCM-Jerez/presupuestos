import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { forkJoin } from 'rxjs';

import { INew } from '@interfaces/new.interface';

interface IEla {
	data: string;
	value: string;
	URL?: string;
}
// interface INew {
// 	date: string;
// 	medio: string;
// 	title: string;
// 	URL?: string;
// }

@Component({
	selector: 'app-ela',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './ela.component.html',
	styleUrls: ['./ela.component.scss']
})
export default class ElaComponent implements OnInit {
	private _route = inject(ActivatedRoute);
	private _http = inject(HttpClient);

	public data: IEla[] = [];
	public news: INew[] = [];
	public imgURL: string;
	public descripcion: string;

	ngOnInit() {
		const ela = this._route.snapshot.paramMap.get('ela');
		// Función auxiliar para gestionar suscripciones HTTP
		const fetchData = (path: string) => {
			const pathBase = '/assets/art10/infoInstitucional/elas';

			this.imgURL = `${pathBase}/${ela}/${ela}.jpg`;
			const data$ = this._http.get<IEla[]>(`${pathBase}/${path}/${path}.json`);
			const news$ = this._http.get<INew[]>(`${pathBase}/${path}/${path}News.json`);

			forkJoin({ data$, news$ }).subscribe(({ data$, news$ }) => {
				this.data = data$;
				this.news = news$;

				const descripcionObj = data$.find((obj) => obj.data === 'Descripción');
				if (descripcionObj) {
					this.descripcion = descripcionObj.value;
				}
			});
		};

		fetchData(ela);
	}

	hasKey(object: unknown, key: string): boolean {
		return object && Object.prototype.hasOwnProperty.call(object, key);
	}
}
