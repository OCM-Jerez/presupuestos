import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { IStep } from '@interfaces/step.interface';

@Component({
	selector: 'app-estado-licitacion',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './estado-licitacion.component.html',
	styleUrls: ['./estado-licitacion.component.scss']
})
export default class EstadoLicitacionComponent {
	@Input() steps: IStep[];
	@Input() imgURL: string;
	@Input() gauge: string;
}
