import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardEnteComponent } from './components/card-ente/card-ente.component';

const defaultBackground = 'linear-gradient(to bottom, #1C1F26 , #4D4E50)';

@Component({
	selector: 'app-entes-dependientes',
	standalone: true,
	imports: [CommonModule, CardEnteComponent],
	templateUrl: './entes-dependientes.component.html',
	styleUrls: ['./entes-dependientes.component.scss']
})
export default class EntesDependientesComponent {
	private _router = inject(Router);

	cardMenus = [
		this.createCard('Fundación Universitaria (Teatro Villamarta)', 'fundarte')
		// this.createCard('Parque La Canaleja', 'laCanaleja2023'),
		// this.createCard('Plaza Venus', 'plazaVenus2023'),
		// this.createCard('Las Calandrias', 'lasCalandrias2023'),
		// this.createCard('Contenedores orgánica', 'contenedoresOrganica2023'),
		// this.createCard('Rehabilitacion CEIP Nebrija', 'rehabilitacionCEIPNebrija2023'),
		// this.createCard('Remodelación plaza del Mercado', 'plazaMercado2023'),
		// this.createCard('Centro cultural Lola Flores', 'CentroCulturalLolaFlores2020')
	];

	createCard(titulo: string, route: string) {
		return {
			titulo,
			// Tamaño de la imagen 910x682
			rutaImagen: `assets/entes/${route}/${route}.jpg`,
			funcion: () => this._router.navigateByUrl(`/entesDependientes/${route}`),
			background: defaultBackground
		};
	}
}
