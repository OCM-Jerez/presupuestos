import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { CardDeudaComponent } from './components/card-deuda/card-deuda.component';

const defaultBackground = 'linear-gradient(to bottom, #1C1F26 , #4D4E50)';

@Component({
	selector: 'app-deuda',
	standalone: true,
	imports: [CommonModule, CardDeudaComponent],
	templateUrl: './deuda.component.html',
	styleUrls: ['./deuda.component.scss']
})
export default class DeudaComponent {
	private _router = inject(Router);
	cardMenus = [this.createCard('Deuda total', 'deudaTotal'), this.createCard('Deuda viva', 'deudaViva')];

	createCard(titulo: string, route: string) {
		console.log('createCard', titulo, route);

		return {
			titulo,
			// Tamaño de la imagen 910x682
			rutaImagen: `assets/deuda/${route}/${route}.jpg`,
			funcion: () => this._router.navigateByUrl(`/deuda/${route}`),
			background: defaultBackground
		};
	}
}
