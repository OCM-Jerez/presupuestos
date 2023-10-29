import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { forkJoin } from 'rxjs';

import { INew } from '@interfaces/new.interface';

interface IStep {
	descripcion: string;
	observaciones: string;
	cuantia: string;
	isFinish?: string;
}

interface ILicitacion {
	data: string;
	value: string;
	URL?: string;
}

@Component({
	selector: 'app-subvencion',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './subvencion.component.html',
	styleUrls: ['./subvencion.component.scss']
})
export default class SubvencionComponent implements OnInit {
	private _route = inject(ActivatedRoute);
	private _location = inject(Location);
	private http = inject(HttpClient);

	public steps: IStep[] = [];
	public data: ILicitacion[] = [];
	public news: INew[] = [];
	public imgURL: string;
	public descripcion: string;

	ngOnInit() {
		const subvencion = this._route.snapshot.paramMap.get('subvencion');
		const fetchData = (path: string) => {
			this.imgURL = `/assets/temas/${subvencion}/${subvencion}.jpg`;
			const steps$ = this.http.get<IStep[]>(`/assets/subvenciones/${path}/${path}Steps.json`);
			const data$ = this.http.get<ILicitacion[]>(`/assets/subvenciones/${path}/${path}.json`);
			const news$ = this.http.get<INew[]>(`/assets/subvenciones/${path}/${path}News.json`);

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

		fetchData(subvencion);
	}

	hasKey(object: unknown, key: string): boolean {
		return object && Object.prototype.hasOwnProperty.call(object, key);
	}
}
