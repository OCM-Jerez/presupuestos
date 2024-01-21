import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { environment } from '@environments/environment';

import { IStep } from '@interfaces/step.interface';
import { TagStoreService } from '@services/tagStore.service';

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
	// private _route = inject(ActivatedRoute);
	// private _tagStoreService = inject(TagStoreService);

	private _param = '';
	public canAddRowSupabase = environment.canAddRowSupabase;

	ngOnInit(): void {
		// const routeConfig = this._route.snapshot.routeConfig;
		// const paramMap = this._route.snapshot.paramMap;
		// this._param = paramMap.get('tag');
		// 		this._tagStoreService.setTag(this._param);

		// console.log('this._route.snapshot', this._route.snapshot);

		// if (routeConfig && routeConfig.path) {
		// 	const pathSegments = routeConfig.path.split('/');
		// 	console.log('pathSegments', pathSegments);
			
		// 	const dynamicSegment = pathSegments.find((segment) => segment.startsWith(':'));
		// 	console.log('dynamicSegment', dynamicSegment);
			
		// 	if (dynamicSegment) {
		// 		// Extraer el nombre del parámetro dinámico (sin los dos puntos ':')
		// 		const paramName = dynamicSegment.substring(1);
		// 		this._param = paramMap.get('tag');
		// 		console.log('param', this._param);
		// 	} else {
		// 		this._param = routeConfig.path.includes('/') ? routeConfig.path.split('/')[1] : routeConfig.path;
		// 		console.log(this._param);
		// 		// console.log('No hay parámetros dinámicos en la ruta');
		// 	}
		// } else {
		// 	console.log('Configuración de ruta no disponible');
		// }
	}

	addStep(): void {
		// this._router.navigateByUrl(`/addStep/${this._param}`);
		this._router.navigateByUrl(`/addStep`);

	}

	updateLicitacion(): void {
		// this._router.navigateByUrl(`/updateLicitacion/${this._param}`);
		this._router.navigateByUrl(`/updateLicitacion`);

	}
}
