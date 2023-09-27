import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';

import { CardComisionComponent } from './components/card-comision/card-comision.component';

const defaultBackground = 'linear-gradient(to bottom, #1C1F26 , #4D4E50)';

@Component({
	selector: 'app-comisiones',
	standalone: true,
	imports: [CommonModule, CardComisionComponent],
	templateUrl: './comisiones.component.html',
	styleUrls: ['./comisiones.component.scss']
})
export default class ComisionesComponent {
	private _router = inject(Router);
	private _location = inject(Location);

	comisionesPermanentes = [
		this.createCard(
			'Comisión de presidencia, centro histórico, fondos europeos, coordinación de gobierno y ordenación del territorio',
			'presidencia'
		),
		this.createCard(
			'Comisión de servicios públicos, desarrollo sostenible, medio ambiente, protección animal y participación ciudadana',
			'serviciosPublicos'
		),
		this.createCard('Comisión de inclusión social, familias, igualdad y diversidad y medio rural', 'inclusion'),
		this.createCard('Comisión de turismo, cultura, educación, deportes y juventud', 'turismo'),
		this.createCard(
			'Comisión de empleo, economía, patrimonio, seguridad, recursos humanos, simplificación administrativa y transparencia',
			'patrimonio'
		)
	];

	comisionesEspeciales = [
		this.createCard('Comisión especial de cuentas', 'cuentas'),
		this.createCard('Comisión especial de sugerencias y reclamaciones', 'sugerencias'),
		this.createCard('Comisión especial de capitalidad cultural', 'capitabilidad'),
		this.createCard('Comisión especial de presupuestos participativos', 'presupuestos'),
		this.createCard('Comisión especial de regeneración democrática y calidad institucional', 'regeneracion'),
		this.createCard('Comisión especial de impulso y seguimiento de las mesas sectoriales', 'impulso')
	];

	createCard(titulo: string, route: string) {
		this._location.go('/comisiones');
		console.log(this._location.path() + '/' + route);

		return {
			titulo,
			// Tamaño de la imagen 910x682
			// rutaImagen: `assets/comisiones/${route}/${route}.jpg`,
			funcion: () => this._router.navigateByUrl(`/comision/${route}`),
			background: defaultBackground
		};
	}
}
