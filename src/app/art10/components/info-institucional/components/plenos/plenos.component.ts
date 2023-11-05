import { Component, OnInit, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { forkJoin } from 'rxjs';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

import { ICom } from '@interfaces/com.interface';
import { IDoc } from '@interfaces/doc.interface';
import { INew } from '@interfaces/new.interface';

interface IPleno {
	data: string;
	value: string;
	URL?: string;
}

@Component({
	selector: 'app-plenos',
	standalone: true,
	imports: [NgFor, NgIf, CardMenuComponent],
	templateUrl: './plenos.component.html',
	styleUrls: ['./plenos.component.scss']
})
export default class PlenosComponent implements OnInit {
	private _router = inject(Router);
	private _http = inject(HttpClient);

	public data: IPleno[] = [];
	public coms: ICom[] = [];
	public docs: IDoc[] = [];
	public news: INew[] = [];

	ngOnInit() {
		const fetchData = () => {
			const pathBase = '/assets/art10/infoInstitucional/plenos';
			const data$ = this._http.get<IPleno[]>(`${pathBase}/plenos.json`);
			const coms$ = this._http.get<ICom[]>(`${pathBase}/plenosComs.json`);
			const docs$ = this._http.get<IDoc[]>(`${pathBase}/plenosDocs.json`);
			const news$ = this._http.get<INew[]>(`${pathBase}/plenosNews.json`);

			forkJoin({ data$, coms$, docs$, news$ }).subscribe(({ data$, coms$, docs$, news$ }) => {
				this.data = data$;
				this.coms = coms$;
				this.docs = docs$;
				this.news = news$;
			});
		};

		fetchData();
	}

	cardMenus = [
		this.createCard('Pleno ordinario 29 septiembre 2023', 'plenoOrdinario20230929'),
		this.createCard('Pleno extraorinario y solemne 7 octubre 2023', 'plenoExtraordinario20231007'),
		this.createCard('Pleno ordinario 27 octubre 2023', 'plenoOrdinario20231027'),
		this.createCard('Pleno extraorinario 15 noviembre 2023', 'plenoExtraordinario20231115')
	];

	createCard(titulo: string, route: string) {
		return {
			titulo,
			rutaImagen: `/assets/art10/infoInstitucional/plenos/plenos.png`,
			funcion: () => this._router.navigateByUrl(`/pleno/${route}`)
		};
	}
}
