import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardInfoComponent } from '../../../../../commons/components/card-info/card-info.component';

@Component({
	selector: 'app-ficha-indice',
	standalone: true,
	imports: [CommonModule, CardInfoComponent],
	templateUrl: './ficha-indice.component.html',
	styleUrls: ['./ficha-indice.component.scss']
})
export default class FichaIndiceComponent {
	private _router = inject(Router);

	cardsInfo = [
		{
			rutaImagen: 'assets/img/home/menu1-400x250.webp',
			titulo: 'Presupuesto',
			subtitulo: ' ',
			funcion: () => this.fichaPresupuesto(),
			textButton: 'Visión global',
			background: 'linear-gradient(to bottom, #FFFDFC , #FCE1CB)'
		},
		{
			rutaImagen: 'assets/img/home/menu4-400x250.webp',
			titulo: 'Empleados municipales',
			subtitulo: '',
			funcion: () => this.empleados(),
			textButton: 'Empleados',
			background: 'linear-gradient(to bottom, #F5F5F5 , #E0E0E0)'
		},
		{
			rutaImagen: 'assets/img/home/menu2-400x250.webp',
			titulo: 'Detalle del presupuesto',
			subtitulo: '',
			funcion: () => this.detalle(),
			textButton: 'Detalle',
			background: 'linear-gradient(to bottom, #FCFEFF , #CDE9FE)'
		},
		{
			rutaImagen: 'assets/img/home/menu3-400x250.webp',
			titulo: 'Licitaciones',
			subtitulo: '',
			funcion: () => this.licitaciones(),
			textButton: 'Licitaciones',
			background: 'linear-gradient(to bottom, #F1F8E9 , #DCEDC8)'
		},
		{
			rutaImagen: 'assets/img/home/menu1-400x250.webp',
			titulo: 'Presupuesto',
			subtitulo: ' ',
			funcion: () => this.fichaPresupuesto(),
			textButton: 'Visión global',
			background: 'linear-gradient(to bottom, #FFFDFC , #FCE1CB)'
		},
		{
			rutaImagen: 'assets/img/home/menu4-400x250.webp',
			titulo: 'Empleados municipales',
			subtitulo: '',
			funcion: () => this.empleados(),
			textButton: 'Empleados',
			background: 'linear-gradient(to bottom, #F5F5F5 , #E0E0E0)'
		},
		{
			rutaImagen: 'assets/img/home/menu2-400x250.webp',
			titulo: 'Detalle del presupuesto',
			subtitulo: '',
			funcion: () => this.detalle(),
			textButton: 'Detalle',
			background: 'linear-gradient(to bottom, #FCFEFF , #CDE9FE)'
		},
		{
			rutaImagen: 'assets/img/home/menu3-400x250.webp',
			titulo: 'Licitaciones',
			subtitulo: '',
			funcion: () => this.licitaciones(),
			textButton: 'Licitaciones',
			background: 'linear-gradient(to bottom, #F1F8E9 , #DCEDC8)'
		},
		{
			rutaImagen: 'assets/img/home/menu4-400x250.webp',
			titulo: 'Empleados municipales',
			subtitulo: '',
			funcion: () => this.empleados(),
			textButton: 'Empleados',
			background: 'linear-gradient(to bottom, #F5F5F5 , #E0E0E0)'
		},
		{
			rutaImagen: 'assets/img/home/menu2-400x250.webp',
			titulo: 'Detalle del presupuesto',
			subtitulo: '',
			funcion: () => this.detalle(),
			textButton: 'Detalle',
			background: 'linear-gradient(to bottom, #FCFEFF , #CDE9FE)'
		}
	];

	fichaPresupuesto() {
		console.log('vision global');
		this._router.navigateByUrl('/fichaPresupuesto');
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
