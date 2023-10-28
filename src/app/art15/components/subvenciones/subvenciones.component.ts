import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

interface IStep {
	date: string;
	step: string;
	isFinish?: string;
}

interface ILicitacion {
	data: string;
	value: string;
	URL?: string;
}
interface INew {
	date: string;
	medio: string;
	title: string;
	URL?: string;
}

@Component({
	selector: 'app-subvenciones',
	standalone: true,
	imports: [CommonModule, CardMenuComponent],
	templateUrl: './subvenciones.component.html',
	styleUrls: ['./subvenciones.component.scss']
})
export default class SubvencionesComponent {
	private _router = inject(Router);
	cardMenus = [
		this.createCard('Fondos Diputación 2023', 'dipu2023'),
		this.createCard('Programa de Fomento del Empleo Agrario (PFEA).', 'PFEA')
	];

	createCard(titulo: string, route: string) {
		return {
			titulo,
			rutaImagen: `assets/subvenciones/${route}/${route}.jpg`,
			funcion: () => this._router.navigateByUrl(`/subvenciones/${route}`)
		};
	}
}
