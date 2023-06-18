import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';

import { CardMenuComponent } from '../commons/components/card-menu/card-menu.component';

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
		{
			rutaImagen: 'assets/img/home/menu1-400x250.webp',
			titulo: 'Retribuciones',
			subtitulo: 'Retribuciones 2022 empleados. Sin incluir antigüedad..',
			funcion: () => this.retribuciones2022(),
			textButton: 'Retribuciones',
			background: 'linear-gradient(to bottom, #FFFDFC , #FCE1CB)'
		},
		{
			rutaImagen: 'assets/img/home/menu2-400x250.webp',
			titulo: 'RPT',
			subtitulo: 'Relación puestos de trabajo. Incluye complemento específico anual.',
			funcion: () => this.rpt(),
			textButton: 'RPT',
			background: 'linear-gradient(to bottom, #FCFEFF , #CDE9FE)'
		}
	];

	rpt() {
		this._router.navigateByUrl('/rpt');
	}

	retribuciones2022() {
		// this._router.navigateByUrl('/retribuciones2022');
		this._router.navigateByUrl('/fichaPrograma');
	}
}
