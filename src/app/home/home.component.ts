import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';

import { CardMenuComponent } from '../commons/components/card-menu/card-menu.component';
import { HttpClient } from '@angular/common/http';

const defaultBackground = 'linear-gradient(to bottom, #1C1F26 , #4D4E50)';

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
		this._http.get<any[]>('/assets/menuOptions/home.json').subscribe((data) => {
			this.menuOptionsHome = data.map((item) =>
				this.createCardMenu(item.titulo, item.route, item.rutaImagen, item.subtitulo)
			);
		});
	}

	createCardMenu(titulo: string, route: string, rutaImagen: string, subtitulo: string) {
		let menuOptionsLevel1;
		switch (titulo) {
			case 'Artículo 10. Información institucional y organizativa.':
				this._http.get<any[]>('/assets/menuOptions/level1/art10.json').subscribe((data) => {
					menuOptionsLevel1 = data;
				});
				break;
			case 'Artículo 15. Información sobre contratos, convenios y subvenciones.':
				this._http.get<any[]>('/assets/menuOptions/level1/art15.json').subscribe((data) => {
					menuOptionsLevel1 = data;
				});
				break;
			case 'Artículo 16. Información económica, financiera y presupuestaria.':
				this._http.get<any[]>('/assets/menuOptions/level1/art16.json').subscribe((data) => {
					menuOptionsLevel1 = data;
				});
				break;
			case 'Medioambiental, urbanística y vivienda':
				this._http.get<any[]>('/assets/menuOptions/level1/medioambiental.json').subscribe((data) => {
					menuOptionsLevel1 = data;
				});
				break;
			case 'Eventos culturales':
				this._http.get<any[]>('/assets/menuOptions/level1/eventos.json').subscribe((data) => {
					menuOptionsLevel1 = data;
				});
				break;
			case 'Temas generales':
				this._http.get<any[]>('/assets/menuOptions/level1/temas.json').subscribe((data) => {
					menuOptionsLevel1 = data;
				});
				break;
			case 'Distritos y barrios':
				this._http.get<any[]>('/assets/menuOptions/level1/distritos.json').subscribe((data) => {
					menuOptionsLevel1 = data;
				});
				break;

			default:
				break;
		}

		return {
			rutaImagen,
			titulo,
			subtitulo,
			textButton: titulo,
			background: defaultBackground,
			funcion: () => {
				const navigationExtras = {
					queryParams: { cardMenus: JSON.stringify(menuOptionsLevel1), titulo: titulo }
				};
				this._router.navigate(['/level1'], navigationExtras);
			}
		};
	}
}
