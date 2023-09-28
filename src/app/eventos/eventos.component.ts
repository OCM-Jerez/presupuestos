import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import CardEventoComponent from './components/card-evento/card-evento.component';

const defaultBackground = 'linear-gradient(to bottom, #1C1F26 , #4D4E50)';

@Component({
	selector: 'app-temas',
	standalone: true,
	imports: [CommonModule, CardEventoComponent],
	templateUrl: './eventos.component.html',
	styleUrls: ['./eventos.component.scss']
})
export default class TemasComponent {
	private _router = inject(Router);
	cardMenus = [
		this.createCard('Navidad', 'Navidad'),
		this.createCard('Feria', 'feria'),
		this.createCard('Festival de Jerez', 'festivalJerez')
	];

	createCard(titulo: string, route: string) {
		return {
			titulo,
			// Tamaño de la imagen 910x682
			rutaImagen: `assets/eventos/${route}/${route}.jpg`,
			funcion: () => this._router.navigateByUrl(`/eventos/${route}`),
			background: defaultBackground
		};
	}
}
