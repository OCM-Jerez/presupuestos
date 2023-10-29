import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { forkJoin } from 'rxjs';

import { IStep } from '@interfaces/step.interface';
import { INew } from '@interfaces/new.interface';

interface IEdificio {
	data: string;
	value: string;
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
	private http = inject(HttpClient);

	public steps: IStep[] = [];
	public data: IEdificio[] = [];
	public news: INew[] = [];
	public imgURL: string;
	public descripcion: string;

	ngOnInit() {
		const edificio = this._route.snapshot.paramMap.get('edificioSingular');
		const fetchData = (path: string) => {
			this.imgURL = `/assets/edificiosSingulares/${edificio}/${edificio}.jpg`;
			const steps$ = this.http.get<IStep[]>(`/assets/edificiosSingulares/${path}/${path}Steps.json`);
			const data$ = this.http.get<IEdificio[]>(`/assets/edificiosSingulares/${path}/${path}.json`);
			const news$ = this.http.get<INew[]>(`/assets/edificiosSingulares/${path}/${path}News.json`);

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

		fetchData(edificio);
	}

	hasKey(object: unknown, key: string): boolean {
		return object && Object.prototype.hasOwnProperty.call(object, key);
	}
}
