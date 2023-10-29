import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { forkJoin } from 'rxjs';

import { IDoc } from '@interfaces/doc.interface';
import { INew } from '@interfaces/new.interface';

interface IDistrito {
	data: string;
	value: string;
	URL?: string;
}

interface IBarrio {
	data: string;
	value: string;
	URL?: string;
}
@Component({
	selector: 'app-distrito',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './distrito.component.html',
	styleUrls: ['./distrito.component.scss']
})
export default class DistritoComponent implements OnInit {
	private _route = inject(ActivatedRoute);
	private _http = inject(HttpClient);

	public docs: IDoc[] = [];
	public data: IDistrito[] = [];
	public news: INew[] = [];
	public barrios: IBarrio[] = [];
	public imgURL: string;
	public descripcion: string;

	ngOnInit() {
		const distrito = this._route.snapshot.paramMap.get('distrito');
		const fetchData = (path: string) => {
			const pathBase = '/assets/distritos';
			this.imgURL = `${pathBase}/${distrito}/${distrito}.jpg`;
			const data$ = this._http.get<IDistrito[]>(`${pathBase}/${path}/${path}.json`);
			const docs$ = this._http.get<IDoc[]>(`${pathBase}/${path}/${path}Docs.json`);
			const news$ = this._http.get<INew[]>(`${pathBase}/${path}/${path}News.json`);
			const barrios$ = this._http.get<IBarrio[]>(`${pathBase}/${path}/${path}Barrios.json`);

			forkJoin({ docs$, data$, news$, barrios$ }).subscribe(({ docs$, data$, news$, barrios$ }) => {
				this.data = data$;
				this.docs = docs$;
				this.news = news$;
				this.barrios = barrios$;

				const descripcionObj = data$.find((obj) => obj.data === 'Descripción');
				if (descripcionObj) {
					this.descripcion = descripcionObj.value;
				}
			});
		};

		fetchData(distrito);
	}

	hasKey(object: unknown, key: string): boolean {
		return object && Object.prototype.hasOwnProperty.call(object, key);
	}
}
