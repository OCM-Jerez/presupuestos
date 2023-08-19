import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';

import { CardInfoHomeComponent } from './components/card-info-home/card-info-home.component';
import { CardMenuComponent } from '../commons/components/card-menu/card-menu.component';
import { CardTableComponent } from './components/card-table-home/card-table.component';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	standalone: true,
	imports: [NgFor, CardMenuComponent, CardTableComponent, CardInfoHomeComponent]
})
export default class HomeComponent {
	private _router = inject(Router);

	cardMenus = [
		{
			rutaImagen: 'assets/img/home/menu1-400x250.webp',
			titulo: 'Visión global',
			subtitulo: 'Para que tengas una idea general de los ingresos y gastos del Ayuntamiento de Jerez.',
			funcion: () => this.visionGlobal(),
			textButton: 'Visión global',
			background: 'linear-gradient(to bottom, #FFFDFC , #FCE1CB)'
		},
		{
			rutaImagen: 'assets/img/home/menu2-400x250.webp',
			titulo: 'Detalle del presupuesto',
			subtitulo: 'Educación, protección y bienestar social, cultura... ¿Qué área te interesa?',
			funcion: () => this.detalle(),
			textButton: 'Detalle',
			background: 'linear-gradient(to bottom, #FCFEFF , #CDE9FE)'
		},
		{
			rutaImagen: 'assets/img/home/menu3-400x250.webp',
			titulo: 'Licitaciones',
			subtitulo: 'Todos las licitaciones de obras, contratos menores de nuestro Ayuntamiento',
			funcion: () => this.licitaciones(),
			textButton: 'Licitaciones',
			background: 'linear-gradient(to bottom, #F1F8E9 , #DCEDC8)'
		},
		{
			rutaImagen: 'assets/img/home/menu4-400x250.webp',
			titulo: 'Empleados municipales',
			subtitulo: 'Información sobre los empleados de nuestro Ayuntamiento',
			funcion: () => this.empleados(),
			textButton: 'Empleados',
			background: 'linear-gradient(to bottom, #F5F5F5 , #E0E0E0)'
		}
	];

	visionGlobal() {
		this._router.navigateByUrl('/visionGlobal');
	}

	detalle() {
		this._router.navigateByUrl('/detalle');
	}

	licitaciones() {
		window.open('https://con.ocmjerez.org/', '_blank');
	}

	empleados() {
		this._router.navigateByUrl('/empleados');
	}
}
