import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

const defaultBackground = 'linear-gradient(to bottom, #1C1F26 , #4D4E50)';

@Component({
	selector: 'app-info-institucional',
	standalone: true,
	imports: [CommonModule, CardMenuComponent],
	templateUrl: './info-institucional.component.html',
	styleUrls: ['./info-institucional.component.scss']
})
export default class InfoInstitucionalComponent {
	private _router = inject(Router);
	private _location = inject(Location);

	cardMenus = [
		this.createCard('Plenos', 'plenos', `assets/art10/infoInstitucional/plenos/plenos.png`),
		this.createCard('Comisiones', 'comisiones', 'assets/comisiones/comisiones.jpg'),
		this.createCard('Entes dependientes', 'entesDependientes', 'assets/entes/fundarte/fundarte.jpg'),
		this.createCard('ELAS (Entidades Locales Autónomas)', 'elas', 'assets/art10/infoInstitucional/elas/elas.jpg')
	];

	createCard(titulo: string, route: string, rutaImagen: string) {
		this._location.go('/art10');

		return {
			titulo,
			rutaImagen,
			funcion: () => this._router.navigateByUrl(`/art10/${route}`),
			background: defaultBackground
		};
	}
}
