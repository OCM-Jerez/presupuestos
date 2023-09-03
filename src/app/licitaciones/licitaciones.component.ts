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
			rutaImagen: 'assets/img/logoOCM.png',
			funcion: () => window.open('https://con.ocmjerez.org/', '_blank'),
			background: 'linear-gradient(to bottom, #1C1F26 , #4D4E50)'
		},
		{
			titulo: 'Parque La Canaleja',
			rutaImagen: 'assets/licitaciones/laCanaleja2023.jpg',
			funcion: () => this._router.navigateByUrl('/laCanaleja2023/laCanaleja2023'),
			background: 'linear-gradient(to bottom, #1C1F26 , #4D4E50)'
		},
		{
			titulo: 'Plaza Venus',
			rutaImagen: 'assets/licitaciones/plazaVenus2023.jpg',
			funcion: () => this._router.navigateByUrl('/laCanaleja2023/plazaVenus2023'),
			background: 'linear-gradient(to bottom, #1C1F26 , #4D4E50)'
		},
		{
			rutaImagen: '',
			titulo: 'San Benito',
			funcion: () => this._router.navigateByUrl('/laCanaleja2023/sanBenito2023'),
			textButton: 'Ver',
			background: 'linear-gradient(to bottom, #F1F8E9 , #DCEDC8)'
		},
		{
			rutaImagen: '',
			titulo: '',
			funcion: () => this.licitacion(),
			textButton: 'Ver',
			background: 'linear-gradient(to bottom, #FFFDFC , #FCE1CB)'
		},
		{
			rutaImagen: '',
			titulo: '',
			funcion: () => this.licitacion(),
			textButton: 'Ver',
			background: 'linear-gradient(to bottom, #FCFEFF , #CDE9FE)'
		},
		{
			rutaImagen: '',
			titulo: '',
			funcion: () => this.licitacion(),
			textButton: 'Ver',
			background: 'linear-gradient(to bottom, #F1F8E9 , #DCEDC8)'
		},
		{
			rutaImagen: '',
			titulo: '',
			funcion: () => this.licitacion(),
			textButton: 'Ver',
			background: 'linear-gradient(to bottom, #F5F5F5 , #E0E0E0)'
		},
		{
			rutaImagen: '',
			titulo: '',
			funcion: () => this.licitacion(),
			textButton: 'Ver',
			background: 'linear-gradient(to bottom, #FFFDFC , #FCE1CB)'
		},
		{
			rutaImagen: '',
			titulo: '',
			funcion: () => this.licitacion(),
			textButton: 'Ver',
			background: 'linear-gradient(to bottom, #FCFEFF , #CDE9FE)'
		},
		{
			rutaImagen: '',
			titulo: '',
			funcion: () => this.licitacion(),
			textButton: 'Ver',
			background: 'linear-gradient(to bottom, #F1F8E9 , #DCEDC8)'
		},
		{
			rutaImagen: '',
			titulo: '',
			funcion: () => this.licitacion(),
			textButton: 'Ver',
			background: 'linear-gradient(to bottom, #F5F5F5 , #E0E0E0)'
		},
		{
			rutaImagen: '',
			titulo: '',
			funcion: () => this.licitacion(),
			textButton: 'Ver',
			background: 'linear-gradient(to bottom, #FFFDFC , #FCE1CB)'
		},
		{
			rutaImagen: '',
			titulo: '',
			funcion: () => this.licitacion(),
			textButton: 'Ver',
			background: 'linear-gradient(to bottom, #FCFEFF , #CDE9FE)'
		},
		{
			rutaImagen: '',
			titulo: '',
			funcion: () => this.licitacion(),
			textButton: 'Ver',
			background: 'linear-gradient(to bottom, #F1F8E9 , #DCEDC8)'
		},
		{
			rutaImagen: '',
			titulo: '',
			funcion: () => this.licitacion(),
			textButton: 'Ver',
			background: 'linear-gradient(to bottom, #F5F5F5 , #E0E0E0)'
		},
		{
			rutaImagen: '',
			titulo: '',
			funcion: () => this.licitacion(),
			textButton: 'Ver',
			background: 'linear-gradient(to bottom, #FFFDFC , #FCE1CB)'
		},
		{
			rutaImagen: '',
			titulo: '',
			funcion: () => this.licitacion(),
			textButton: 'Ver',
			background: 'linear-gradient(to bottom, #FCFEFF , #CDE9FE)'
		},
		{
			rutaImagen: '',
			titulo: '',
			funcion: () => this.licitacion(),
			textButton: 'Ver',
			background: 'linear-gradient(to bottom, #F1F8E9 , #DCEDC8)'
		},
		{
			rutaImagen: '',
			titulo: '',
			funcion: () => this.licitacion(),
			textButton: 'Ver',
			background: 'linear-gradient(to bottom, #F5F5F5 , #E0E0E0)'
		},
		{
			rutaImagen: '',
			titulo: '',
			funcion: () => this.licitacion(),
			textButton: 'Ver',
			background: 'linear-gradient(to bottom, #FFFDFC , #FCE1CB)'
		},
		{
			rutaImagen: '',
			titulo: '',
			funcion: () => this.licitacion(),
			textButton: 'Ver',
			background: 'linear-gradient(to bottom, #FCFEFF , #CDE9FE)'
		},
		{
			rutaImagen: '',
			titulo: '',
			funcion: () => this.licitacion(),
			textButton: 'Ver',
			background: 'linear-gradient(to bottom, #F1F8E9 , #DCEDC8)'
		},
		{
			rutaImagen: '',
			titulo: '',
			funcion: () => this.licitacion(),
			textButton: 'Ver',
			background: 'linear-gradient(to bottom, #F5F5F5 , #E0E0E0)'
		}
	];

	licitacion() {
		this._router.navigateByUrl('/visionGlobal');
	}
}
