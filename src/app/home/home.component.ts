import { Component, OnInit, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { CardMenuComponent } from '../commons/components/card-menu/card-menu.component';

interface MenuItem {
	titulo: string;
	route: string;
	rutaImagen: string;
	subtitulo: string;
}

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	standalone: true,
	imports: [NgFor, CardMenuComponent]
})
export default class HomeComponent implements OnInit {
	private _router = inject(Router);
	private _http = inject(HttpClient);
	public menuOptionsHome = [];

	ngOnInit() {
		this._http.get<MenuItem[]>('/assets/menuOptions/home.json').subscribe((data) => {
			const menuOptionsPromises = data.map((item) =>
				this.createCardMenu(item.titulo, item.route, item.rutaImagen, item.subtitulo)
			);
			Promise.all(menuOptionsPromises).then((resolvedOptions) => {
				this.menuOptionsHome = resolvedOptions;
			});
		});
	}

	async createCardMenu(titulo: string, route: string, rutaImagen: string, subtitulo: string) {
		const jsonPath = `/assets/menuOptions/level1/${route.split('/').pop()}.json`;
		const menuOptionsLevel1 = await this._http
			.get<MenuItem[]>(jsonPath)
			.toPromise()
			.catch(() => []);
		return {
			rutaImagen,
			titulo,
			subtitulo,
			funcion: () => {
				const navigationExtras = {
					queryParams: { menuOptionsLevel1: JSON.stringify(menuOptionsLevel1), titulo }
				};
				this._router.navigate(['level1'], navigationExtras);
			}
		};
	}
}
