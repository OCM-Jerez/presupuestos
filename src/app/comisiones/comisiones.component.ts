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
			'COMISIÓN DE PRESIDENCIA, CENTRO HISTÓRICO, FONDOS EUROPEOS, COORDINACIÓN DE GOBIERNO Y ORDENACIÓN DEL TERRITORIO',
			'presidencia'
		),
		this.createCard(
			'COMISIÓN DE SERVICIOS PÚBLICOS, DESARROLLO SOSTENIBLE, MEDIO AMBIENTE, PROTECCIÓN ANIMAL Y PARTICIPACIÓN CIUDADANA',
			'serviciosPublicos'
		),
		this.createCard('COMISIÓN DE INCLUSIÓN SOCIAL, FAMILIAS, IGUALDAD Y DIVERSIDAD Y MEDIO RURA', 'inclusion'),
		this.createCard('COMISIÓN DE TURISMO, CULTURA, EDUCACIÓN, DEPORTES Y JUVENTUD', 'turismo'),
		this.createCard(
			'COMISIÓN DE EMPLEO, ECONOMÍA, PATRIMONIO, SEGURIDAD, RECURSOS HUMANOS, SIMPLIFICACIÓN ADMINISTRATIVA Y TRANSPARENCIA',
			'patrimonio'
		)
	];

	comisionesEspeciales = [
		this.createCard('COMISIÓN ESPECIAL DE CUENTAS', 'cuentas'),
		this.createCard('COMISIÓN ESPECIAL DE SUGERENCIAS Y RECLAMACIONES', 'sugerencias'),
		this.createCard('COMISIÓN ESPECIAL DE CAPITALIDAD CULTURAL', 'capitabilidad'),
		this.createCard('COMISIÓN ESPECIAL DE PRESUPUESTOS PARTICIPATIVOS', 'presupuestos'),
		this.createCard('COMISIÓN ESPECIAL DE REGENERACIÓN DEMOCRÁTICA Y CALIDAD INSTITUCIONAL', 'regeneracion'),
		this.createCard('COMISIÓN ESPECIAL DE IMPULSO Y SEGUIMIENTO DE LAS MESAS SECTORIALES', 'impulso')
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
