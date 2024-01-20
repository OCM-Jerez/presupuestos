
import { Component, Input } from '@angular/core';

interface IStepSubvencion {
	descripcion: string;
	observaciones: string;
	cuantia: string;
	isFinish?: string;
}

@Component({
	selector: 'app-seguimiento-subvencion',
	standalone: true,
	imports: [],
	templateUrl: './seguimiento-subvencion.component.html',
	styleUrls: ['./seguimiento-subvencion.component.scss']
})
export default class SeguimientoSubvencionComponent {
	@Input() stepsSubvencion: IStepSubvencion[];
}
