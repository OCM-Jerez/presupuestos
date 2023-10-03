import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { forkJoin } from 'rxjs';

interface INew {
	date: string;
	medio: string;
	title: string;
	URL?: string;
}

@Component({
	selector: 'app-noticias',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './noticias.component.html',
	styleUrls: ['./noticias.component.scss']
})
export default class NoticiasComponent implements OnInit {
	private _route = inject(ActivatedRoute);
	private _location = inject(Location);
	private _http = inject(HttpClient);

	public news: INew[] = [];

	ngOnInit() {
		// Función auxiliar para gestionar suscripciones HTTP
		const fetchData = () => {
			const news$ = this._http.get<INew[]>(`/assets/empleados/empleadosNews.json`);

			forkJoin({ news$ }).subscribe(({ news$ }) => {
				this.news = news$;
			});
		};

		fetchData();
	}

	hasKey(object: unknown, key: string): boolean {
		return object && Object.prototype.hasOwnProperty.call(object, key);
	}

	volver() {
		this._location.back();
	}
}
