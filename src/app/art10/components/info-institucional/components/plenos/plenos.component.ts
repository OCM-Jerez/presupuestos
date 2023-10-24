import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

import { ICom } from '@interfaces/com.interface';
import { IDoc } from '@interfaces/doc.interface';
import { INew } from '@interfaces/new.interface';
import { forkJoin } from 'rxjs';

const defaultBackground = 'linear-gradient(to bottom, #1C1F26 , #4D4E50)';

interface IPleno {
	data: string;
	value: string;
	URL?: string;
}

@Component({
	selector: 'app-plenos',
	standalone: true,
	imports: [CommonModule, CardMenuComponent],
	templateUrl: './plenos.component.html',
	styleUrls: ['./plenos.component.scss']
})
export default class PlenosComponent implements OnInit {
	private _router = inject(Router);
	private _location = inject(Location);
	private _http = inject(HttpClient);

	public data: IPleno[] = [];
	public coms: ICom[] = [];
	public docs: IDoc[] = [];
	public news: INew[] = [];
	public descripcion: string;

	ngOnInit() {
		// Función auxiliar para gestionar suscripciones HTTP
		const fetchData = () => {
			const pathBase = '/assets/art10/infoInstitucional/plenos';

			const data$ = this._http.get<IPleno[]>(`${pathBase}/plenos.json`);
			const docs$ = this._http.get<IDoc[]>(`${pathBase}/plenosDocs.json`);
			const news$ = this._http.get<INew[]>(`${pathBase}/plenosNews.json`);
			const coms$ = this._http.get<ICom[]>(`${pathBase}/plenosComs.json`);

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
		this.createCard('Pleno ordinario 29 septiembre 2023', 'plenoOrdinario20230929'),
		this.createCard('Pleno extraorinario y solemne 7 octubre 2023', 'plenoExtraordinario20231007')
	];

	createCard(titulo: string, route: string) {
		this._location.go('/art10');

		return {
			titulo,
			rutaImagen: `/assets/art10/infoInstitucional/plenos/plenos.png`,
			funcion: () => this._router.navigateByUrl(`/pleno/${route}`),
			background: defaultBackground
		};
	}
}
