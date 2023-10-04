import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

const defaultBackground = 'linear-gradient(to bottom, #1C1F26 , #4D4E50)';

@Component({
	selector: 'app-info-organizativa',
	standalone: true,
	imports: [CommonModule, CardMenuComponent],
	templateUrl: './info-organizativa.component.html',
	styleUrls: ['./info-organizativa.component.scss']
})
export default class InfoOrganizativaComponent {
	private _router = inject(Router);
	private _location = inject(Location);

	cardMenus = [this.createCard('Empleados', 'empleados', 'assets/img/home/menu4-400x250.webp')];

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
