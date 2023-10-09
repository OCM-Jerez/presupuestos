import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

const defaultBackground = 'linear-gradient(to bottom, #1C1F26 , #4D4E50)';
@Component({
	selector: 'app-elas',
	standalone: true,
	imports: [CommonModule, CardMenuComponent],
	templateUrl: './elas.component.html',
	styleUrls: ['./elas.component.scss']
})
export default class ELAsComponent {
	private _router = inject(Router);
	private _location = inject(Location);

	cardMenus = [
		this.createCard('El Torno', 'elTorno'),
		this.createCard('Guadalcacín', 'guadalcacin'),
		this.createCard('La Barca de la Florida', 'laBarca'),
		this.createCard('Estella del Marqués', 'estella'),
		this.createCard('Nueva Jarilla', 'nuevaJarilla'),
		this.createCard('San Isidro del Guadalete', 'sanIsidro'),
		this.createCard('Torrecera', 'torrecera')
	];

	createCard(titulo: string, route: string) {
		this._location.go('/art10');

		return {
			titulo,
			rutaImagen: `/assets/art10/infoInstitucional/elas/${route}/${route}.jpg`,
			funcion: () => this._router.navigateByUrl(`/ela/${route}`),
			background: defaultBackground
		};
	}
}
