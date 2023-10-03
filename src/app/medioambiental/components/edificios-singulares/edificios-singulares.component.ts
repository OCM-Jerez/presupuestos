import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import CardEdificioSingularComponent from './components/card-edificio-singular/card-edificio-singular.component';

const defaultBackground = 'linear-gradient(to bottom, #1C1F26 , #4D4E50)';

@Component({
	selector: 'app-temas',
	standalone: true,
	imports: [CommonModule, CardEdificioSingularComponent],
	templateUrl: './edificios-singulares.component.html',
	styleUrls: ['./edificios-singulares.component.scss']
})
export default class EdificiosSingularesComponent {
	private _router = inject(Router);
	cardMenus = [
		this.createCard('Palacio Riquelme', 'palacioRiquelme'),
		this.createCard('Antiguo asilo San Jose', 'asiloSanJose'),
		this.createCard('Antigua comisaria Policia Nacional', 'antiguaComisariaPoliciaNacional'),
		this.createCard('Antigua jefatura Policia Local', 'antiguaJefaturaPoliciaLocal')
	];

	createCard(titulo: string, route: string) {
		return {
			titulo,
			// Tamaño de la imagen 910x682
			rutaImagen: `assets/edificiosSingulares/${route}/${route}.jpg`,
			funcion: () => this._router.navigateByUrl(`/edificiosSingulares/${route}`),
			background: defaultBackground
		};
	}
}
