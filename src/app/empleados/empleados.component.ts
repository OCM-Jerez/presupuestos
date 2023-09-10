import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';

import { CardMenuComponent } from '../commons/components/card-menu/card-menu.component';

const defaultBackground = 'linear-gradient(to bottom, #1C1F26 , #4D4E50)';

@Component({
	selector: 'app-empleados',
	templateUrl: './empleados.component.html',
	styleUrls: ['./empleados.component.scss'],
	standalone: true,
	imports: [NgFor, CardMenuComponent]
})
export default class EmpleadosComponent {
	private _router = inject(Router);

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
		)
	];

	createCardMenu(titulo: string, ruta: string, rutaImagen: string, subtitulo: string) {
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
