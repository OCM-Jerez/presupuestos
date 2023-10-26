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

interface IEnte {
	data: string;
	value: string;
	URL?: string;
}

@Component({
	selector: 'app-entes-dependientes',
	standalone: true,
	imports: [CommonModule, CardMenuComponent],
	templateUrl: './entes-dependientes.component.html',
	styleUrls: ['./entes-dependientes.component.scss']
})
export default class EntesDependientesComponent implements OnInit {
	private _router = inject(Router);
	private _location = inject(Location);
	private _http = inject(HttpClient);

	public data: IEnte[] = [];
	public coms: ICom[] = [];
	public docs: IDoc[] = [];
	public news: INew[] = [];
	public imgURL: string;
	public descripcion: string;

	ngOnInit() {
		const fetchData = () => {
			const pathBase = '/assets/art10/infoInstitucional/entes';
			// this.imgURL = `${pathBase}/${ela}/${ela}.jpg`;

			const data$ = this._http.get<IEnte[]>(`${pathBase}/entes.json`);
			const docs$ = this._http.get<IDoc[]>(`${pathBase}/entesDocs.json`);
			const news$ = this._http.get<INew[]>(`${pathBase}/entesNews.json`);
			const coms$ = this._http.get<ICom[]>(`${pathBase}/entesComs.json`);

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
		this.createCard('Fundación Universitaria (Teatro Villamarta)', 'fundarte'),
		this.createCard('COMUJESA. Coporación Municipal de Jerez. S.A.', 'comujesa')
	];

	createCard(titulo: string, route: string) {
		// this._location.go('/art10');

		return {
			titulo,
			rutaImagen: `assets/art10/infoInstitucional/entes/${route}/${route}.jpg`,
			background: defaultBackground,
			funcion: () => this._router.navigateByUrl(`/entesDependientes/${route}`)
		};
	}

	// hasKey(object: unknown, key: string): boolean {
	// 	return object && Object.prototype.hasOwnProperty.call(object, key);
	// }
}
