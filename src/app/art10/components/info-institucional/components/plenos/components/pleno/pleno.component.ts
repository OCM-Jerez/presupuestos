import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { forkJoin } from 'rxjs';

import { ICom } from '@interfaces/com.iterface';
import { IDoc } from '@interfaces/doc.onterface';
import { INew } from '@interfaces/new.interface';

interface IPleno {
	data: string;
	value: string;
	URL?: string;
}

@Component({
	selector: 'app-pleno',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './pleno.component.html',
	styleUrls: ['./pleno.component.scss']
})
export default class PlenoComponent implements OnInit {
	private _route = inject(ActivatedRoute);
	private _http = inject(HttpClient);

	public dataPleno: IPleno[] = [];
	public docs: IDoc[] = [];
	public coms: ICom[] = [];
	public news: INew[] = [];
	public descripcion: string;

	ngOnInit() {
		const pleno = this._route.snapshot.paramMap.get('pleno');

		// Función auxiliar para gestionar suscripciones HTTP
		const fetchData = (path: string) => {
			const pathBase = '/assets/art10/infoInstitucional/plenos';
			// this.imgURL = `/assets/licitaciones/${licitacion}/${licitacion}.jpg`;
			const data$ = this._http.get<IPleno[]>(`${pathBase}/${path}/${path}.json`);
			const docs$ = this._http.get<IDoc[]>(`${pathBase}/${path}/${path}Docs.json`);
			const news$ = this._http.get<INew[]>(`${pathBase}/${path}/${path}News.json`);
			const coms$ = this._http.get<ICom[]>(`${pathBase}/${path}/${path}Coms.json`);

			forkJoin({ data$, docs$, news$, coms$ }).subscribe(({ data$, docs$, news$, coms$ }) => {
				this.dataPleno = data$;
				this.docs = docs$;
				this.news = news$;
				this.coms = coms$;

				const descripcionObj = data$.find((obj) => obj.data === 'Descripción');
				if (descripcionObj) {
					this.descripcion = descripcionObj.value;
				}
			});
		};

		fetchData(pleno);
	}

	hasKey(object: unknown, key: string): boolean {
		return object && Object.prototype.hasOwnProperty.call(object, key);
	}
}
