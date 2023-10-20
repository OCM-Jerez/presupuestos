import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

const defaultBackground = 'linear-gradient(to bottom, #1C1F26 , #4D4E50)';

@Component({
	selector: 'app-art16',
	standalone: true,
	imports: [NgFor, CardMenuComponent],
	templateUrl: './art16.component.html',
	styleUrls: ['./art16.component.scss']
})
export default class Art16Component {
	private _router = inject(Router);

	cardMenus = [
		this.createCardMenu('Presupuestos', '/presupuestos', 'assets/img/home/menu1-400x250.webp', ''),
		this.createCardMenu('Deuda', '/deuda', 'assets/deuda/deuda.jpg', 'Información sobre la deuda'),
		this.createCardMenu('PMP', '/pmp', `assets/datosEconomicos/pmp/pmp.jpg`, ''),
		this.createCardMenu('Impuestos', '/impuestos', `assets/art16/impuestos/impuestos.jpg`, '')
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
