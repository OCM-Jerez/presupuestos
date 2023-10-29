import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { forkJoin } from 'rxjs';

import { ICom } from '@interfaces/com.interface';
import { IDoc } from '@interfaces/doc.interface';
import { INew } from '@interfaces/new.interface';

interface IData {
	data: string;
	value: string;
	URL?: string;
}
@Component({
	selector: 'app-proyectos-viviendas',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './proyectos-viviendas.component.html',
	styleUrls: ['./proyectos-viviendas.component.scss']
})
export default class ProyectosViviendasComponent implements OnInit {
	private _http = inject(HttpClient);
	public data: IData[] = [];
	public docs: IDoc[] = [];
	public coms: ICom[] = [];
	public news: INew[] = [];
	public descripcion: string;

	ngOnInit() {
		const fetchData = () => {
			const pathBase = '/assets/medioambiental';
			const path = 'proyectosViviendas';
			// this.imgURL = `/assets/licitaciones/${licitacion}/${licitacion}.jpg`;
			const data$ = this._http.get<IData[]>(`${pathBase}/${path}/${path}.json`);
			const docs$ = this._http.get<IDoc[]>(`${pathBase}/${path}/${path}Docs.json`);
			const news$ = this._http.get<INew[]>(`${pathBase}/${path}/${path}News.json`);
			const coms$ = this._http.get<ICom[]>(`${pathBase}/${path}/${path}Coms.json`);

			forkJoin({ data$, docs$, news$, coms$ }).subscribe(({ data$, docs$, news$, coms$ }) => {
				this.data = data$;
				this.docs = docs$;
				this.news = news$;
				this.coms = coms$;

				const descripcionObj = data$.find((obj) => obj.data === 'Descripción');
				if (descripcionObj) {
					this.descripcion = descripcionObj.value;
				}
			});
		};

		fetchData();
	}

	hasKey(object: unknown, key: string): boolean {
		return object && Object.prototype.hasOwnProperty.call(object, key);
	}
}
