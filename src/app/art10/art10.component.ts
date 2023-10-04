import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

const defaultBackground = 'linear-gradient(to bottom, #1C1F26 , #4D4E50)';

@Component({
	selector: 'app-art10',
	standalone: true,
	imports: [CommonModule, CardMenuComponent],
	templateUrl: './art10.component.html',
	styleUrls: ['./art10.component.scss']
})
export default class Art10Component {
	private _router = inject(Router);
	cardMenus = [
		this.createCard(
			'Informacion institucional',
			'infoIntitucional',
			`assets/art10/infoInstitucional/plenos/plenos.png`
		),
		this.createCard('Informacion organizativa', 'infoOrganizativa', `assets/art10/infoInstitucional/plenos/plenos.png`)
	];

	createCard(titulo: string, route: string, rutaImagen: string) {
		return {
			titulo,
			rutaImagen,
			funcion: () => this._router.navigateByUrl(`/art10/${route}`),
			background: defaultBackground
		};
	}
}
