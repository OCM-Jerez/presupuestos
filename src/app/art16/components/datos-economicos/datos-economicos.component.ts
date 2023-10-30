import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

@Component({
	selector: 'app-datos-economicos',
	standalone: true,
	imports: [NgFor, CardMenuComponent],
	templateUrl: './datos-economicos.component.html',
	styleUrls: ['./datos-economicos.component.scss']
})
export default class DatosEconomicosComponent {
	private _router = inject(Router);
	cardMenus = [this.createCard('Periode Medio de Pago a proveedores (PMP)', 'pmp')];

	createCard(titulo: string, route: string) {
		return {
			titulo,
			rutaImagen: `assets/datosEconomicos/${route}/${route}.jpg`,
			funcion: () => this._router.navigateByUrl(`/datosEconomicos/${route}`)
		};
	}
}
