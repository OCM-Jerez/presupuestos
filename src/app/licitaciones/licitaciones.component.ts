import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { CardLicitacionComponent } from './components/card-licitacion/card-licitacion.component';

@Component({
	selector: 'app-licitaciones',
	standalone: true,
	imports: [CommonModule, CardLicitacionComponent],
	templateUrl: './licitaciones.component.html',
	styleUrls: ['./licitaciones.component.scss']
})
export default class LicitacionesComponent {
	private _router = inject(Router);
	// Tamaño de la imagen 910x682
	cardMenus = [
		{
			titulo: 'APP OCM',
			rutaImagen: 'assets/licitaciones/appConOCM.jpg',
			funcion: () => window.open('https://con.ocmjerez.org/', '_blank'),
			background: 'linear-gradient(to bottom, #1C1F26 , #4D4E50)'
		},
		{
			titulo: 'Parque La Canaleja',
			rutaImagen: 'assets/licitaciones/laCanaleja2023/laCanaleja2023.jpg',
			funcion: () => this._router.navigateByUrl('/licitacion/laCanaleja2023'),
			background: 'linear-gradient(to bottom, #1C1F26 , #4D4E50)'
		},
		{
			titulo: 'Plaza Venus',
			rutaImagen: 'assets/licitaciones/plazaVenus2023/plazaVenus2023.jpg',
			funcion: () => this._router.navigateByUrl('/licitacion/plazaVenus2023'),
			background: 'linear-gradient(to bottom, #1C1F26 , #4D4E50)'
		},
		// {
		// 	rutaImagen: '',
		// 	titulo: '',
		// 	funcion: () => this._router.navigateByUrl('/licitacion/sanBenito2023'),
		// 	background: 'linear-gradient(to bottom, #1C1F26 , #4D4E50)'
		// }
		{
			titulo: 'Las Calandrias',
			rutaImagen: 'assets/licitaciones/lasCalandrias2023/lasCalandrias2023.jpg',
			funcion: () => this._router.navigateByUrl('/licitacion/lasCalandrias2023'),
			background: 'linear-gradient(to bottom, #1C1F26 , #4D4E50)'
		}
		// ,{
		// 	rutaImagen: '',
		// 	titulo: '',
		// 	funcion: () => this._router.navigateByUrl('/licitacion/sanBenito2023'),
		// 	background: 'linear-gradient(to bottom, #1C1F26 , #4D4E50)'
		// }
	];

	licitacion() {
		this._router.navigateByUrl('/visionGlobal');
	}
}
