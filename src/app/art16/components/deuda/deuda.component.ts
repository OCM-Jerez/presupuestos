import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

@Component({
	selector: 'app-deuda',
	standalone: true,
	imports: [NgFor, CardMenuComponent],
	templateUrl: './deuda.component.html'
})
export default class DeudaComponent {
	private _router = inject(Router);
	cardMenus = [
		this.createCard('Deuda total', 'deudaTotal'),
		this.createCard('Deuda viva', 'deudaViva'),
		this.createCard('Fondo de ordenación', 'fondoOrdenacion'),
		this.createCard('Plan de ajuste', 'planAjuste')
	];

	createCard(titulo: string, route: string) {
		return {
			titulo,
			rutaImagen: `assets/deuda/${route}/${route}.jpg`,
			funcion: () => this._router.navigateByUrl(`/deuda/${route}`)
		};
	}
}
