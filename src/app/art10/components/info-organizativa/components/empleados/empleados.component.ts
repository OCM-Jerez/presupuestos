import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

const defaultBackground = 'linear-gradient(to bottom, #1C1F26 , #4D4E50)';

@Component({
	selector: 'app-empleados',
	templateUrl: './empleados.component.html',
	styleUrls: ['./empleados.component.scss'],
	standalone: true,
	imports: [CardMenuComponent]
})
export default class EmpleadosComponent {
	private _router = inject(Router);
	private _location = inject(Location);

	cardMenus = [
		this.createCardMenu(
			'Retribuciones',
			'/retribuciones2022',
			'assets/img/home/menu1-400x250.webp',
			'Retribuciones 2022 empleados. Sin incluir antigüedad.'
		),
		this.createCardMenu(
			'RPT',
			'/rpt',
			'assets/img/home/menu2-400x250.webp',
			'Relación puestos de trabajo. Incluye complemento específico anual.'
		),
		this.createCardMenu('Noticias', '/empleadosNews', 'assets/empleados/empleadosNews.jpg', 'Noticias relacionadas.')
	];

	createCardMenu(titulo: string, ruta: string, rutaImagen: string, subtitulo: string) {
		this._location.go('/art10');

		return {
			rutaImagen,
			titulo,
			subtitulo,
			textButton: titulo,
			background: defaultBackground,
			funcion: () => this.navigate(ruta)
		};
	}

	navigate(ruta: string) {
		this._router.navigateByUrl(ruta);
	}
}
