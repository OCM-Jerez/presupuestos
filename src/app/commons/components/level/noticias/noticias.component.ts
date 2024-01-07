import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@environments/environment';

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
	public canAddRowSupabase = environment.canAddRowSupabase;

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
				this._param = routeConfig.path.includes('/') ? routeConfig.path.split('/')[1] : routeConfig.path;
				console.log(this._param);
			}
		} else {
			console.log('Configuración de ruta no disponible');
		}
	}

	addNew(): void {
		this._router.navigateByUrl(`/addNew/${this._param}`);
	}

	addCom(): void {
		this._router.navigateByUrl(`/addCom/${this._param}`);
	}

	addDoc(): void {
		this._router.navigateByUrl(`/addDoc/${this._param}`);
	}
}
