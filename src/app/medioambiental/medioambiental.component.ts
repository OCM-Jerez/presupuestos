import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

const defaultBackground = 'linear-gradient(to bottom, #1C1F26 , #4D4E50)';

@Component({
	selector: 'app-medioambiental',
	standalone: true,
	imports: [NgFor, CardMenuComponent],
	templateUrl: './medioambiental.component.html',
	styleUrls: ['./medioambiental.component.scss']
})
export default class MedioambientalComponent {
	private _router = inject(Router);

	cardMenus = [
		this.createCardMenu(
			'Edificios singulares',
			'/edificiosSingulares',
			'assets/edificiosSingulares/palacioRiquelme/palacioRiquelme.jpg',
			''
		),
		this.createCardMenu(
			'Apartamentos turísticos',
			'/apartamentosTuristicos',
			'assets/medioambiental/apartamentosTuristicos/apartamentosTuristicos.jpg',
			''
		),
		this.createCardMenu(
			'Proyectos construcción de viviendas',
			'/proyectosViviendas',
			'assets/medioambiental/proyectosViviendas/proyectosViviendas.jpg',
			''
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
