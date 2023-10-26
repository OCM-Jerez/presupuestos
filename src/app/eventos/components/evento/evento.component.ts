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

interface IEvento {
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
	selector: 'app-tema',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './evento.component.html',
	styleUrls: ['./evento.component.scss']
})
export default class EventoComponent implements OnInit {
	private _route = inject(ActivatedRoute);
	private _location = inject(Location);
	private http = inject(HttpClient);

	public steps: IStep[] = [];
	public data: IEvento[] = [];
	public news: INew[] = [];
	public imgURL: string;
	public descripcion: string;

	ngOnInit() {
		const evento = this._route.snapshot.paramMap.get('evento');
		console.log(evento);

		// Función auxiliar para gestionar suscripciones HTTP
		const fetchData = (path: string) => {
			this.imgURL = `/assets/eventos/${evento}/${evento}.jpg`;
			const data$ = this.http.get<IEvento[]>(`/assets/eventos/${path}/${path}.json`);
			const news$ = this.http.get<INew[]>(`/assets/eventos/${path}/${path}News.json`);

			forkJoin({ data$, news$ }).subscribe(({ data$, news$ }) => {
				this.data = data$;
				this.news = news$;

				const descripcionObj = data$.find((obj) => obj.data === 'Descripción');
				if (descripcionObj) {
					this.descripcion = descripcionObj.value;
				}
			});
		};

		fetchData(evento);
	}

	hasKey(object: unknown, key: string): boolean {
		return object && Object.prototype.hasOwnProperty.call(object, key);
	}
}