import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';

import { CardMenuComponent } from '../commons/components/card-menu/card-menu.component';

const defaultBackground = 'linear-gradient(to bottom, #1C1F26 , #4D4E50)';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	standalone: true,
	imports: [NgFor, CardMenuComponent]
})
export default class HomeComponent {
	private _router = inject(Router);

	cardMenus = [
		this.createCardMenu(
			'Artículo 10. Información institucional y organizativa.',
			'/art10',
			'assets/art10/ayto.webp',
			''
		),
		this.createCardMenu(
			'Artículo 11. Información sobre altos cargos y personas que ejerzan la máxima responsabilidad de las entidades incluidas en el ámbito de aplicación de la Ley.',
			'/art11',
			'assets/art11/art11.jpg',
			''
		),
		this.createCardMenu(
			'Artículo 12. Información sobre planificación y evaluación.',
			'/art12',
			'assets/art12/art12.jpg',
			''
		),
		this.createCardMenu('Artículo 13. Información de relevancia jurídica.', '/art13', 'assets/art13/art13.jpg', ''),
		this.createCardMenu(
			'Artículo 14. Información sobre procedimientos, cartas de servicio y participación ciudadana.',
			'/art14',
			'assets/art14/art14.jpg',
			''
		),
		this.createCardMenu(
			'Artículo 15. Información sobre contratos, convenios y subvenciones.',
			'/art15',
			'assets/art15/art15.jpg',
			''
		),
		this.createCardMenu(
			'Artículo 16. Información económica, financiera y presupuestaria.',
			'/art16',
			'assets/art16/art16.jpg',
			''
		),
		this.createCardMenu(
			'Medioambiental, urbanística y vivienda',
			'/medioambiental',
			'assets/medioambiental/medioambiental.jpg',
			''
		),
		this.createCardMenu('Eventos culturales', '/eventos', 'assets/eventos/feria/feria.jpg', 'Navidad, feria, etc   .'),

		this.createCardMenu(
			'Temas generales',
			'/temas',
			'assets/temas/ifeca/ifeca.jpg',
			'Temas no incluidos en otros apartados'
		),

		this.createCardMenu(
			'Distritos y barrios',
			'/distritos',
			'assets/distritos/distritos.jpg',
			'Información georeferenciada sobre distritos y barrios'
		)
	];

	createCardMenu(titulo: string, ruta: string, rutaImagen: string, subtitulo: string) {
		return {
			rutaImagen,
			titulo,
			subtitulo,
			textButton: titulo,
			background: defaultBackground,
			funcion: () => this.navigate(ruta)
		};
	}

	navigate(ruta: string) {
		this._router.navigateByUrl(ruta);
	}
}
