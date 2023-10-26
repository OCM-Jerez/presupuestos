import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

const defaultBackground = 'linear-gradient(to bottom, #1C1F26 , #4D4E50)';

@Component({
	selector: 'app-art15',
	standalone: true,
	imports: [NgFor, CardMenuComponent],
	templateUrl: './art15.component.html',
	styleUrls: ['./art15.component.scss']
})
export default class Art15Component {
	private _router = inject(Router);

	cardMenus = [
		this.createCardMenu('Licitaciones', '/licitaciones', 'assets/img/home/menu3-400x250.webp', ''),
		this.createCardMenu('Subvenciones', '/subvenciones', 'assets/subvenciones/subvenciones.jpg', '')
	];

	createCardMenu(titulo: string, route: string, rutaImagen: string, subtitulo: string) {
		return {
			rutaImagen,
			titulo,
			subtitulo,
			textButton: titulo,
			background: defaultBackground,
			funcion: () => this._router.navigateByUrl(`${route}`)
		};
	}

	// navigate(ruta: string) {
	// 	this._router.navigateByUrl(ruta);
	// }
}
