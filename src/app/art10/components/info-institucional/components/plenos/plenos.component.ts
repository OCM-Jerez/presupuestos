import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

const defaultBackground = 'linear-gradient(to bottom, #1C1F26 , #4D4E50)';

@Component({
	selector: 'app-plenos',
	standalone: true,
	imports: [CommonModule, CardMenuComponent],
	templateUrl: './plenos.component.html',
	styleUrls: ['./plenos.component.scss']
})
export default class PlenosComponent {
	private _router = inject(Router);
	private _location = inject(Location);

	cardMenus = [this.createCard('Pleno ordinario 29 septiembre 2023', 'plenoOrdinario20230929')];

	createCard(titulo: string, route: string) {
		this._location.go('/art10');

		return {
			titulo,
			rutaImagen: `/assets/art10/infoInstitucional/plenos/plenos.png`,
			funcion: () => this._router.navigateByUrl(`/pleno/${route}`),
			background: defaultBackground
		};
	}
}
