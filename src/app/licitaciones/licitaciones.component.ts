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
		this.createCard('Reordenación Puerta sevilla', 'puertaSevilla2023'),
		this.createCard('Parque La Canaleja', 'laCanaleja2023'),
		this.createCard('Plaza Venus', 'plazaVenus2023'),
		this.createCard('Las Calandrias', 'lasCalandrias2023'),
		this.createCard('Contenedores orgánica', 'contenedoresOrganica2023'),
		this.createCard('Rehabilitacion CEIP Nebrija', 'rehabilitacionCEIPNebrija2023'),
		this.createCard('Remodelación plaza del Mercado', 'plazaMercado2023'),
		this.createCard('Centro cultural Lola Flores', 'CentroCulturalLolaFlores2020')
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

	// cardMenus = [
	// 	{
	// 		titulo: 'APP OCM',
	// 		rutaImagen: 'assets/licitaciones/appConOCM.jpg',
	// 		funcion: () => window.open('https://con.ocmjerez.org/', '_blank'),
	// 		background: 'linear-gradient(to bottom, #1C1F26 , #4D4E50)'
	// 	},
	// 	{
	// 		rutaImagen: 'assets/licitaciones/puertaSevilla2023/puertaSevilla2023.jpg',
	// 		titulo: 'Reordenación Puerta sevilla',
	// 		funcion: () => this._router.navigateByUrl('/licitacion/puertaSevilla2023'),
	// 		background: 'linear-gradient(to bottom, #1C1F26 , #4D4E50)'
	// 	},
	// 	{
	// 		titulo: 'Parque La Canaleja',
	// 		rutaImagen: 'assets/licitaciones/laCanaleja2023/laCanaleja2023.jpg',
	// 		funcion: () => this._router.navigateByUrl('/licitacion/laCanaleja2023'),
	// 		background: 'linear-gradient(to bottom, #1C1F26 , #4D4E50)'
	// 	},
	// 	{
	// 		titulo: 'Plaza Venus',
	// 		rutaImagen: 'assets/licitaciones/plazaVenus2023/plazaVenus2023.jpg',
	// 		funcion: () => this._router.navigateByUrl('/licitacion/plazaVenus2023'),
	// 		background: 'linear-gradient(to bottom, #1C1F26 , #4D4E50)'
	// 	},
	// 	// {
	// 	// 	rutaImagen: '',
	// 	// 	titulo: '',
	// 	// 	funcion: () => this._router.navigateByUrl('/licitacion/sanBenito2023'),
	// 	// 	background: 'linear-gradient(to bottom, #1C1F26 , #4D4E50)'
	// 	// }
	// 	{
	// 		titulo: 'Las Calandrias',
	// 		rutaImagen: 'assets/licitaciones/lasCalandrias2023/lasCalandrias2023.jpg',
	// 		funcion: () => this._router.navigateByUrl('/licitacion/lasCalandrias2023'),
	// 		background: 'linear-gradient(to bottom, #1C1F26 , #4D4E50)'
	// 	},
	// 	// ,{
	// 	// 	titulo: '',
	// 	// 	rutaImagen: '',
	// 	// 	funcion: () => this._router.navigateByUrl('/licitacion/sanBenito2023'),
	// 	// 	background: 'linear-gradient(to bottom, #1C1F26 , #4D4E50)'
	// 	// }

	// 	{
	// 		rutaImagen: 'assets/licitaciones/contenedoresOrganica2023/contenedoresOrganica2023.jpg',
	// 		titulo: 'Contenedores orgánica',
	// 		funcion: () => this._router.navigateByUrl('/licitacion/contenedoresOrganica2023'),
	// 		background: 'linear-gradient(to bottom, #1C1F26 , #4D4E50)'
	// 	},
	// 	{
	// 		rutaImagen: 'assets/licitaciones/rehabilitacionCEIPNebrija2023/Nebrija.jpg',
	// 		titulo: 'Rehabilitacion CEIP Nebrija',
	// 		funcion: () => this._router.navigateByUrl('/licitacion/rehabilitacionCEIPNebrija2023'),
	// 		background: 'linear-gradient(to bottom, #1C1F26 , #4D4E50)'
	// 	},
	// 	{
	// 		titulo: 'Remodelación plaza del Mercado',
	// 		rutaImagen: '',
	// 		funcion: () => this._router.navigateByUrl('/licitacion/plazaMercado2023'),
	// 		background: 'linear-gradient(to bottom, #1C1F26 , #4D4E50)'
	// 	}
	// ];

	// licitacion() {
	// 	this._router.navigateByUrl('/visionGlobal');
	// }
}
