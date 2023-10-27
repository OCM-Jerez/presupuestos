import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { forkJoin } from 'rxjs';
import { IStep } from '@interfaces/step.interface';
import { INew } from '@interfaces/new.interface';

interface ITema {
	data: string;
	value: string;
	URL?: string;
}

@Component({
	selector: 'app-tema',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './tema.component.html',
	styleUrls: ['./tema.component.scss']
})
export default class TemaComponent implements OnInit {
	private _route = inject(ActivatedRoute);
	private http = inject(HttpClient);

	public steps: IStep[] = [];
	public data: ITema[] = [];
	public news: INew[] = [];
	public imgURL: string;
	public descripcion: string;

	ngOnInit() {
		const tema = this._route.snapshot.paramMap.get('tema');
		console.log(tema);

		const fetchData = (path: string) => {
			this.imgURL = `/assets/temas/${tema}/${tema}.jpg`;
			const steps$ = this.http.get<IStep[]>(`/assets/temas/${path}/${path}Steps.json`);
			const data$ = this.http.get<ITema[]>(`/assets/temas/${path}/${path}.json`);
			const news$ = this.http.get<INew[]>(`/assets/temas/${path}/${path}News.json`);

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

		fetchData(tema);
	}

	hasKey(object: unknown, key: string): boolean {
		return object && Object.prototype.hasOwnProperty.call(object, key);
	}
}
