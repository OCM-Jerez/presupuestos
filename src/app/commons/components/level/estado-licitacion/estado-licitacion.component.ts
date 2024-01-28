import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '@environments/environment';

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
	private _router = inject(Router);
	public canAddRowSupabase = environment.canAddRowSupabase;

	addStep(): void {
		this._router.navigateByUrl(`/addStep`);
	}

	updateLicitacion(): void {
		this._router.navigateByUrl(`/updateLicitacion`);
	}
}
