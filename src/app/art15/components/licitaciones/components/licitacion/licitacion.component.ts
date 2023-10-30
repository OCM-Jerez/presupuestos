import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { forkJoin } from 'rxjs';

import { INew } from '@interfaces/new.interface';
import { IStep } from '@interfaces/step.interface';

interface ILicitacion {
	data: string;
	value: string;
	URL?: string;
}

@Component({
	selector: 'app-licitacion',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './licitacion.component.html',
	styleUrls: ['./licitacion.component.scss']
})
export default class LicitacionComponent implements OnInit {
	private _route = inject(ActivatedRoute);
	private _http = inject(HttpClient);

	public data: ILicitacion[] = [];
	public steps: IStep[] = [];
	public news: INew[] = [];
	public imgURL: string;
	public descripcion: string;
	public gauge = '/assets/licitaciones/gauge.jpg';

	ngOnInit() {
		const licitacion = this._route.snapshot.paramMap.get('licitacion');
		const fetchData = (path: string) => {
			this.imgURL = `/assets/licitaciones/${licitacion}/${licitacion}.jpg`;
			const data$ = this._http.get<ILicitacion[]>(`/assets/licitaciones/${path}/${path}.json`);
			const steps$ = this._http.get<IStep[]>(`/assets/licitaciones/${path}/${path}Steps.json`);
			const news$ = this._http.get<INew[]>(`/assets/licitaciones/${path}/${path}News.json`);

			forkJoin({ steps$, data$, news$ }).subscribe(({ steps$, data$, news$ }) => {
				this.steps = steps$;
				this.data = data$;
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
}
