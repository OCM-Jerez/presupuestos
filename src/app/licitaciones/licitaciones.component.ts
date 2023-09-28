import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { CardLicitacionComponent } from './components/card-licitacion/card-licitacion.component';

const defaultBackground = 'linear-gradient(to bottom, #1C1F26 , #4D4E50)';

@Component({
	selector: 'app-licitaciones',
	standalone: true,
	imports: [CommonModule, CardLicitacionComponent],
	templateUrl: './licitaciones.component.html',
	styleUrls: ['./licitaciones.component.scss']
})
export default class LicitacionesComponent {
	private _router = inject(Router);
	cardMenus = [
		{
			titulo: 'APP OCM',
			rutaImagen: 'assets/licitaciones/appConOCM.jpg',
			funcion: () => window.open('https://con.ocmjerez.org/', '_blank'),
			background: defaultBackground
		},
		this.createCard('Mantenimiento señalización', 'manSeñal2020'),
		this.createCard('Reordenación Puerta Sevilla', 'puertaSevilla2023'),
		this.createCard('Parque La Canaleja', 'laCanaleja2023'),
		this.createCard('Plaza Venus', 'plazaVenus2023'),
		this.createCard('Las Calandrias', 'lasCalandrias2023'),
		this.createCard('Contenedores orgánica', 'contenedoresOrganica2023'),
		this.createCard('Rehabilitacion CEIP Nebrija', 'rehabilitacionCEIPNebrija2023'),
		this.createCard('Remodelación plaza del Mercado', 'plazaMercado2023'),
		this.createCard('Centro cultural Lola Flores', 'CentroCulturalLolaFlores2020'),
		this.createCard('Mejora parque Scout', 'parqueScout2023')
	];

	createCard(titulo: string, route: string) {
		return {
			titulo,
			// Tamaño de la imagen 910x682
			rutaImagen: `assets/licitaciones/${route}/${route}.jpg`,
			funcion: () => this._router.navigateByUrl(`/licitacion/${route}`),
			background: defaultBackground
		};
	}
}
