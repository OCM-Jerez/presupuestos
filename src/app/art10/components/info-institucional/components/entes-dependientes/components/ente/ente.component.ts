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
	selector: 'app-ente',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './ente.component.html',
	styleUrls: ['./ente.component.scss']
})
export default class EnteComponent implements OnInit {
	private _route = inject(ActivatedRoute);
	private _location = inject(Location);
	private http = inject(HttpClient);

	public steps: IStep[] = [];
	public dataLicitacion: ILicitacion[] = [];
	public news: INew[] = [];
	public imgURL: string;
	public nombre: string;

	ngOnInit() {
		const ente = this._route.snapshot.paramMap.get('ente');

		// Función auxiliar para gestionar suscripciones HTTP
		const fetchData = (path: string) => {
			this.imgURL = `/assets/art10/infoInstitucional/entes/${ente}/${ente}.jpg`;
			const steps$ = this.http.get<IStep[]>(`/assets/art10/infoInstitucional/entes/${path}/${path}Steps.json`);
			const data$ = this.http.get<ILicitacion[]>(`/assets/art10/infoInstitucional/entes/${path}/${path}.json`);
			const news$ = this.http.get<INew[]>(`/assets/art10/infoInstitucional/entes/${path}/${path}News.json`);

			forkJoin({ steps$, data$, news$ }).subscribe(({ steps$, data$, news$ }) => {
				this.steps = steps$;
				this.dataLicitacion = data$;
				this.news = news$;

				const nameObj = data$.find((obj) => obj.data === 'Nombre');
				if (nameObj) {
					this.nombre = nameObj.value;
				}
			});
		};

		fetchData(ente);
	}

	hasKey(object: unknown, key: string): boolean {
		return object && Object.prototype.hasOwnProperty.call(object, key);
	}

	// volver() {
	// 	this._location.back();
	// }
}
