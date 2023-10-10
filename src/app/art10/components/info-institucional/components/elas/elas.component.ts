import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

const defaultBackground = 'linear-gradient(to bottom, #1C1F26 , #4D4E50)';

interface INew {
	date: string;
	medio: string;
	title: string;
	URL?: string;
}

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
	private _route = inject(ActivatedRoute);
	private _http = inject(HttpClient);

	public data: IEla[] = [];
	public news: INew[] = [];
	public imgURL: string;

	ngOnInit() {
		// const ela = this._route.snapshot.paramMap.get('ela');

		// Función auxiliar para gestionar suscripciones HTTP
		const fetchData = () => {
			const pathBase = '/assets/art10/infoInstitucional/elas';

			// this.imgURL = `${pathBase}/${ela}/${ela}.jpg`;
			// console.log(this.imgURL);

			const data$ = this._http.get<IEla[]>(`${pathBase}/elas.json`);
			const news$ = this._http.get<INew[]>(`${pathBase}/elasNews.json`);

			forkJoin({ data$, news$ }).subscribe(({ data$, news$ }) => {
				this.data = data$;
				this.news = news$;

				// const descripcionObj = data$.find((obj) => obj.data === 'Descripción');
				// if (descripcionObj) {
				// 	this.descripcion = descripcionObj.value;
				// }
			});
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
		this._location.go('/art10');

		return {
			titulo,
			rutaImagen: `/assets/art10/infoInstitucional/elas/${route}/${route}.jpg`,
			funcion: () => this._router.navigateByUrl(`/ela/${route}`),
			background: defaultBackground
		};
	}
}
