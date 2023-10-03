import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { CardDeudaComponent } from './components/card-deuda/card-deuda.component';

const defaultBackground = 'linear-gradient(to bottom, #1C1F26 , #4D4E50)';

@Component({
	selector: 'app-datos-economicos',
	standalone: true,
	imports: [CommonModule, CardDeudaComponent],
	templateUrl: './datos-economicos.component.html',
	styleUrls: ['./datos-economicos.component.scss']
})
export default class DatosEconomicosComponent {
	private _router = inject(Router);
	cardMenus = [
		this.createCard('Periode Medio de Pago a proveedores (PMP)', 'pmp')
		// this.createCard('Deuda viva', 'deudaViva')
	];

	createCard(titulo: string, route: string) {
		return {
			titulo,
			// Tamaño de la imagen 910x682
			rutaImagen: `assets/datosEconomicos/${route}/${route}.jpg`,
			funcion: () => this._router.navigateByUrl(`/datosEconomicos/${route}`),
			background: defaultBackground
		};
	}
}
