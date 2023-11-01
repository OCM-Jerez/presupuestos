import { Component, OnInit, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { forkJoin } from 'rxjs';

// import { ICom } from '@interfaces/com.interface';
// import { IDoc } from '@interfaces/doc.interface';
import { INew } from '@interfaces/new.interface';
import { IStep } from '@interfaces/step.interface';

interface ITema {
	data: string;
	value: string;
	URL?: string;
}

@Component({
	selector: 'app-tema',
	standalone: true,
	imports: [NgFor, NgIf],
	templateUrl: './tema.component.html',
	styleUrls: ['./tema.component.scss']
})
export default class TemaComponent implements OnInit {
	private _route = inject(ActivatedRoute);
	private _http = inject(HttpClient);
	public data: ITema[] = [];
	// public coms: ICom[] = [];
	// public docs: IDoc[] = [];
	public news: INew[] = [];
	public steps: IStep[] = [];
	public imgURL: string;
	public descripcion: string;

	ngOnInit() {
		const tema = this._route.snapshot.paramMap.get('tema');
		const fetchData = (path: string) => {
			const pathBase = '/assets/temas/';
			this.imgURL = `/assets/temas/${tema}/${tema}.jpg`;
			const data$ = this._http.get<ITema[]>(`${pathBase}/${path}/${path}.json`);
			// const docs$ = this._http.get<IDoc[]>(`${pathBase}/${path}/${path}Docs.json`);
			// const coms$ = this._http.get<ICom[]>(`${pathBase}/${path}/${path}Coms.json`);
			const news$ = this._http.get<INew[]>(`${pathBase}/${path}/${path}News.json`);
			const steps$ = this._http.get<IStep[]>(`${pathBase}/${path}/${path}Steps.json`);

			forkJoin({ data$, news$, steps$ }).subscribe(({ data$, news$, steps$ }) => {
				this.data = data$;
				// this.coms = coms$;
				// this.docs = docs$;
				this.news = news$;
				this.steps = steps$;

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
