import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { forkJoin } from 'rxjs';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

import { ICom } from '@interfaces/com.interface';
import { IDoc } from '@interfaces/doc.interface';
import { INew } from '@interfaces/new.interface';

interface IMesa {
	data: string;
	value: string;
	URL?: string;
}

@Component({
	selector: 'app-mesas',
	standalone: true,
	imports: [CommonModule, CardMenuComponent],
	templateUrl: './mesas.component.html',
	styleUrls: ['./mesas.component.scss']
})
export default class MesasComponent implements OnInit {
	private _router = inject(Router);
	private _location = inject(Location);
	private _http = inject(HttpClient);

	public data: IMesa[] = [];
	public coms: ICom[] = [];
	public docs: IDoc[] = [];
	public news: INew[] = [];
	public imgURL: string;
	public descripcion: string;

	ngOnInit() {
		const fetchData = () => {
			const pathBase = '/assets/art10/infoInstitucional/mesas';
			this.imgURL = `${pathBase}/mesas.jpg`;

			const data$ = this._http.get<IMesa[]>(`${pathBase}/mesas.json`);
			const docs$ = this._http.get<IDoc[]>(`${pathBase}/mesasDocs.json`);
			const news$ = this._http.get<INew[]>(`${pathBase}/mesasNews.json`);
			const coms$ = this._http.get<ICom[]>(`${pathBase}/mesasComs.json`);

			forkJoin({ data$, docs$, coms$, news$ }).subscribe(({ data$, docs$, coms$, news$ }) => {
				this.data = data$;
				this.docs = docs$;
				this.news = news$;
				this.coms = coms$;
			});

			const descripcionObj = this.data.find((obj) => obj.data === 'Descripción');
			if (descripcionObj) {
				this.descripcion = descripcionObj.value;
			}
		};

		fetchData();
	}

	cardMenus = [
		this.createCard('Mesa técnica de seguridad', 'mesaTecnicaSeguridad'),
		this.createCard('Mesa del caballo', 'mesaCaballo')
	];

	createCard(titulo: string, route: string) {
		return {
			titulo,
			rutaImagen: `assets/art10/infoInstitucional/mesas/${route}/${route}.jpg`,
			funcion: () => this._router.navigateByUrl(`/mesas/${route}`)
		};
	}
}
