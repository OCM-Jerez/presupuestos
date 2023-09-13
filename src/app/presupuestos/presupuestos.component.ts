import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';

import { CardInfoHomeComponent } from './components/card-info-home/card-info-home.component';
import { CardMenuComponent } from '../commons/components/card-menu/card-menu.component';
import { CardTableHomeComponent } from './components/card-table-home/card-table-home.component';

const defaultBackground = 'linear-gradient(to bottom, #1C1F26 , #4D4E50)';

@Component({
	selector: 'app-presupuestos',
	templateUrl: './presupuestos.component.html',
	styleUrls: ['./presupuestos.component.scss'],
	standalone: true,
	imports: [NgFor, CardMenuComponent, CardTableHomeComponent, CardInfoHomeComponent]
})
export default class PresupuestosComponent {
	private _router = inject(Router);

	cardMenus = [
		this.createCardMenu(
			'Visión global',
			'/visionGlobal',
			'assets/img/home/menu1-400x250.webp',
			'Para que tengas una idea general de los ingresos y gastos del Ayuntamiento de Jerez.'
		),
		this.createCardMenu(
			'Detalle del presupuesto',
			'/detalle',
			'assets/img/home/menu2-400x250.webp',
			'Educación, protección y bienestar social, cultura... ¿Qué área te interesa?'
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
