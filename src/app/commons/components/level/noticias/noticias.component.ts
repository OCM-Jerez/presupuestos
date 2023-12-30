import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// import { INew } from '@interfaces/new.interface';

@Component({
	selector: 'app-noticias',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './noticias.component.html',
	styleUrls: ['./noticias.component.scss']
})
export default class NoticiasComponent implements OnInit {
	@Input() news: any[];
	private _router = inject(Router);
	private _route = inject(ActivatedRoute);
	private _param = '';

	ngOnInit(): void {
		const routeConfig = this._route.snapshot.routeConfig;
		const paramMap = this._route.snapshot.paramMap;

		if (routeConfig && routeConfig.path) {
			const pathSegments = routeConfig.path.split('/');
			const dynamicSegment = pathSegments.find((segment) => segment.startsWith(':'));
			if (dynamicSegment) {
				// Extraer el nombre del parámetro dinámico (sin los dos puntos ':')
				const paramName = dynamicSegment.substring(1);
				this._param = paramMap.get(paramName);
			} else {
				console.log('No hay parámetros dinámicos en la ruta');
			}
		} else {
			console.log('Configuración de ruta no disponible');
		}
	}

	addNew(): void {
		// console.log('news', this.news);
		this._router.navigateByUrl(`/addNew/${this._param}`);
	}
}
