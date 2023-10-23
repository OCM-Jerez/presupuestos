import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

const defaultBackground = 'linear-gradient(to bottom, #1C1F26 , #4D4E50)';

@Component({
	selector: 'app-temas',
	standalone: true,
	imports: [CommonModule, CardMenuComponent],
	templateUrl: './eventos.component.html',
	styleUrls: ['./eventos.component.scss']
})
export default class TemasComponent {
	private _router = inject(Router);
	cardMenus = [
		this.createCard('Festival de Jerez', 'festivalJerez'),
		this.createCard('Feria', 'feria'),
		this.createCard('Festival Internacional de titeres', 'titeres'),
		this.createCard('Feria del libro', 'feriaLibro'),
		this.createCard('Navidad', 'Navidad')
	];

	createCard(titulo: string, route: string) {
		return {
			titulo,
			rutaImagen: `assets/eventos/${route}/${route}.jpg`,
			funcion: () => this._router.navigateByUrl(`/eventos/${route}`),
			background: defaultBackground
		};
	}
}
