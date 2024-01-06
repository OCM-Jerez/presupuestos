import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { environment } from '@environments/environment';

import { IStep } from '@interfaces/step.interface';

@Component({
	selector: 'app-estado-licitacion',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './estado-licitacion.component.html',
	styleUrls: ['./estado-licitacion.component.scss']
})
export default class EstadoLicitacionComponent implements OnInit {
	@Input() steps: IStep[];
	@Input() imgURL: string;
	@Input() gauge: string;
	private _router = inject(Router);
	private _route = inject(ActivatedRoute);
	private _param = '';
	public canAddRowSupabase = environment.canAddRowSupabase;

	ngOnInit(): void {
		const routeConfig = this._route.snapshot.routeConfig;
		const paramMap = this._route.snapshot.paramMap;
		console.log('this._route.snapshot', this._route.snapshot);

		if (routeConfig && routeConfig.path) {
			const pathSegments = routeConfig.path.split('/');
			const dynamicSegment = pathSegments.find((segment) => segment.startsWith(':'));
			if (dynamicSegment) {
				// Extraer el nombre del parámetro dinámico (sin los dos puntos ':')
				const paramName = dynamicSegment.substring(1);
				this._param = paramMap.get(paramName);
				console.log('param', this._param);
			} else {
				this._param = routeConfig.path.includes('/') ? routeConfig.path.split('/')[1] : routeConfig.path;
				console.log(this._param);
				// console.log('No hay parámetros dinámicos en la ruta');
			}
		} else {
			console.log('Configuración de ruta no disponible');
		}
	}

	addStep(): void {
		this._router.navigateByUrl(`/addStep/${this._param}`);
	}

	editLicitacion(): void {
		// console.log('news', this.news);
		// this._router.navigateByUrl(`/addCom/${this._param}`);
	}
}
