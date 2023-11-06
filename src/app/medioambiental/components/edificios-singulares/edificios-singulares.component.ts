import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

@Component({
	selector: 'app-temas',
	standalone: true,
	imports: [CommonModule, CardMenuComponent],
	templateUrl: './edificios-singulares.component.html',
	styleUrls: ['./edificios-singulares.component.scss']
})
export default class EdificiosSingularesComponent {
	private _router = inject(Router);

	cardMenus = [
		this.createCard('Palacio Riquelme', 'palacioRiquelme'),
		this.createCard('Antiguo asilo San Jose', 'asiloSanJose'),
		this.createCard('Antigua comisaria Policia Nacional', 'antiguaComisariaPoliciaNacional'),
		this.createCard('Antigua jefatura Policia Local', 'antiguaJefaturaPoliciaLocal'),
		this.createCard('Bodegas Croft', 'Croft'),
		this.createCard('Callejón de los Bolos', 'callejonBolos'),
		this.createCard('Palacio VillaPanés', 'palacioVillapanes'),
		this.createCard('Claustros de Santo Domingo', 'claustrosSantoDomingo')
	];

	createCard(titulo: string, route: string) {
		return {
			titulo,
			rutaImagen: `assets/edificiosSingulares/${route}/${route}.jpg`,
			funcion: () => this._router.navigateByUrl(`/edificiosSingulares/${route}`)
		};
	}
}
