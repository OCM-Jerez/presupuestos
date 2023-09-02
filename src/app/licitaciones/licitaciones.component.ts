import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { CardMenuComponent } from './components/card-menu/card-menu.component';

@Component({
	selector: 'app-licitaciones',
	standalone: true,
	imports: [CommonModule, CardMenuComponent],
	templateUrl: './licitaciones.component.html',
	styleUrls: ['./licitaciones.component.scss']
})
export default class LicitacionesComponent {
	private _router = inject(Router);
	cardMenus = [
		{
			rutaImagen: 'assets/img/logoOCM.png',
			titulo: 'APP OCM',
			funcion: () => window.open('https://con.ocmjerez.org/', '_blank'),
			background: 'linear-gradient(to bottom, #FCFEFF , #CDE9FE)'
		},
		{
			rutaImagen: 'assets/licitaciones/laCanaleja2023.jpg',
			titulo: 'Parque La Canaleja',
			funcion: () => this._router.navigateByUrl('/laCanaleja2023/laCanaleja2023'),
			textButton: 'Ver',
			background: 'linear-gradient(to bottom, #FFFDFC , #FCE1CB)'
		},

		{
			rutaImagen: '',
			titulo: '',
			funcion: () => this._router.navigateByUrl('/laCanaleja2023/sanBenito2023'),
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
