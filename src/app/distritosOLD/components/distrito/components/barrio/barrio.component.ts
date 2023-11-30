import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { forkJoin } from 'rxjs';

interface IBarrio {
	data: string;
	value: string;
	URL?: string;
}

interface IDoc {
	date: string;
	emisor: string;
	title: string;
	URL?: string;
}

interface INew {
	date: string;
	medio: string;
	title: string;
	URL?: string;
}

@Component({
	selector: 'app-barrio',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './barrio.component.html',
	styleUrls: ['./barrio.component.scss']
})
export default class BarrioComponent implements OnInit {
	private _route = inject(ActivatedRoute);
	private _location = inject(Location);
	private http = inject(HttpClient);

	public docs: IDoc[] = [];
	public data: IBarrio[] = [];
	public news: INew[] = [];
	public imgURL: string;
	public descripcion: string;

	ngOnInit() {
		const barrio = this._route.snapshot.paramMap.get('barrio');
		console.log(barrio);

		// Función auxiliar para gestionar suscripciones HTTP
		const fetchData = (path: string) => {
			const pathBase = '/assets/barrios';
			console.log(pathBase + '/' + path + '.json');

			this.imgURL = `${pathBase}/${path}/${path}.jpg`;
			const data$ = this.http.get<IBarrio[]>(`${pathBase}/${path}/${path}.json`);
			const docs$ = this.http.get<IDoc[]>(`${pathBase}/${path}/${path}Docs.json`);
			const news$ = this.http.get<INew[]>(`${pathBase}/${path}/${path}News.json`);

			forkJoin({ docs$, data$, news$ }).subscribe(({ docs$, data$, news$ }) => {
				this.docs = docs$;
				this.data = data$;
				this.news = news$;

				const descripcionObj = data$.find((obj) => obj.data === 'Descripción');
				if (descripcionObj) {
					this.descripcion = descripcionObj.value;
				}
			});
		};

		fetchData('barriadaLaAsuncion');
	}

	hasKey(object: unknown, key: string): boolean {
		return object && Object.prototype.hasOwnProperty.call(object, key);
	}
}
