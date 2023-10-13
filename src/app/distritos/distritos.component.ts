import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

const defaultBackground = 'linear-gradient(to bottom, #1C1F26 , #4D4E50)';

@Component({
	selector: 'app-distritos',
	standalone: true,
	imports: [CommonModule, CardMenuComponent],
	templateUrl: './distritos.component.html',
	styleUrls: ['./distritos.component.scss']
})
export default class DistritosComponent {
	private _router = inject(Router);
	cardMenus = [
		this.createCard('Distrito Centro', 'distritoCentro'),
		this.createCard('DistritoNorte', 'distritoNorte'),
		this.createCard('Distrito Sur', 'distritoSur'),
		this.createCard('Distrito Este', 'distritoEste'),
		this.createCard('Distrito Oeste', 'distritoOeste'),
		this.createCard('Distrito Noreste', 'distritoNoreste'),
		this.createCard('Distrito Rural', 'distritoRural')
	];

	createCard(titulo: string, route: string) {
		return {
			titulo,
			rutaImagen: `assets/distritos/${route}/${route}.jpg`,
			funcion: () => this._router.navigateByUrl(`/distritos/${route}`),
			background: defaultBackground
		};
	}
}
