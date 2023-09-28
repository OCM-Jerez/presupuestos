import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import CardTemaComponent from './components/card-tema/card-tema.component';

const defaultBackground = 'linear-gradient(to bottom, #1C1F26 , #4D4E50)';

@Component({
	selector: 'app-temas',
	standalone: true,
	imports: [CommonModule, CardTemaComponent],
	templateUrl: './temas.component.html',
	styleUrls: ['./temas.component.scss']
})
export default class TemasComponent {
	private _router = inject(Router);
	cardMenus = [
		this.createCard('Museo del belén', 'museoBelen'),
		this.createCard('Palacio Riquelme', 'palacioRiquelme'),
		this.createCard('Mesa del Caballo', 'mesaCaballo'),
		this.createCard('Asesores', 'asesores'),
		this.createCard('Asta Regia', 'astaRegia'),
		this.createCard('Navidad', 'Navidad'),
		this.createCard('Feria', 'feria'),
		this.createCard('Ifeca', 'ifeca')
	];

	createCard(titulo: string, route: string) {
		return {
			titulo,
			// Tamaño de la imagen 910x682
			rutaImagen: `assets/temas/${route}/${route}.jpg`,
			funcion: () => this._router.navigateByUrl(`/temas/${route}`),
			background: defaultBackground
		};
	}
}
