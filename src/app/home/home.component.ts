import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';

import { CardMenuComponent } from '../commons/components/card-menu/card-menu.component';

const defaultBackground = 'linear-gradient(to bottom, #1C1F26 , #4D4E50)';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	standalone: true,
	imports: [NgFor, CardMenuComponent]
})
export default class HomeComponent {
	private _router = inject(Router);

	cardMenus = [
		this.createCardMenu(
			'Presupuestos',
			'/presupuestos',
			'assets/img/home/menu1-400x250.webp',
			'Para que tengas una idea general de los ingresos y gastos del Ayuntamiento de Jerez.'
		),
		this.createCardMenu(
			'Licitaciones',
			'/licitaciones',
			'assets/img/home/menu3-400x250.webp',
			'Todos las licitaciones de obras, contratos menores de nuestro Ayuntamiento'
		),
		this.createCardMenu('Deuda', '/deuda', 'assets/deuda/deuda.jpg', 'Información sobre la deuda'),
		this.createCardMenu(
			'Datos económicos',
			'/datosEconomicos',
			'assets/datosEconomicos/datosEconomicos.jpg',
			'Información económica'
		),

		this.createCardMenu(
			'Entes dependientes',
			'/entesDependientes',
			'assets/entes/fundarte/fundarte.jpg',
			'Entes dependientes del Ayuntamiento'
		),
		this.createCardMenu(
			'Temas generales',
			'/temas',
			'assets/temas/palacioRiquelme/palacioRiquelme.jpg',
			'Temas no incluidos en otros apartados'
		),
		this.createCardMenu(
			'Empleados municipales',
			'/empleados',
			'assets/img/home/menu4-400x250.webp',
			'Información sobre los empleados de nuestro Ayuntamiento'
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
