import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { forkJoin } from 'rxjs';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

import { ICom } from '@interfaces/com.interface';
import { IDoc } from '@interfaces/doc.interface';
import { INew } from '@interfaces/new.interface';

const defaultBackground = 'linear-gradient(to bottom, #1C1F26 , #4D4E50)';

interface IEla {
	data: string;
	value: string;
	URL?: string;
}

@Component({
	selector: 'app-elas',
	standalone: true,
	imports: [CommonModule, CardMenuComponent],
	templateUrl: './elas.component.html',
	styleUrls: ['./elas.component.scss']
})
export default class ELAsComponent implements OnInit {
	private _router = inject(Router);
	private _location = inject(Location);
	private _http = inject(HttpClient);

	public data: IEla[] = [];
	public coms: ICom[] = [];
	public docs: IDoc[] = [];
	public news: INew[] = [];
	public imgURL: string;
	public descripcion: string;

	ngOnInit() {
		const fetchData = () => {
			const pathBase = '/assets/art10/infoInstitucional/elas';
			// this.imgURL = `${pathBase}/${ela}/${ela}.jpg`;

			const data$ = this._http.get<IEla[]>(`${pathBase}/elas.json`);
			const docs$ = this._http.get<IDoc[]>(`${pathBase}/elasDocs.json`);
			const news$ = this._http.get<INew[]>(`${pathBase}/elasNews.json`);
			const coms$ = this._http.get<ICom[]>(`${pathBase}/elasComs.json`);

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
		this.createCard('El Torno', 'elTorno'),
		this.createCard('Guadalcacín', 'guadalcacin'),
		this.createCard('La Barca de la Florida', 'laBarca'),
		this.createCard('Estella del Marqués', 'estella'),
		this.createCard('Nueva Jarilla', 'nuevaJarilla'),
		this.createCard('San Isidro del Guadalete', 'sanIsidro'),
		this.createCard('Torrecera', 'torrecera')
	];

	createCard(titulo: string, route: string) {
		// this._location.go('/art10');

		return {
			titulo,
			rutaImagen: `/assets/art10/infoInstitucional/elas/${route}/${route}.jpg`,
			background: defaultBackground,
			funcion: () => this._router.navigateByUrl(`/ela/${route}`)
		};
	}
}
