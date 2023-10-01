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
			// Tamaño de la imagen 910x682
			rutaImagen: `assets/deuda/${route}/${route}.jpg`,
			funcion: () => this._router.navigateByUrl(`/art10/${route}`),
			background: defaultBackground
		};
	}
}
