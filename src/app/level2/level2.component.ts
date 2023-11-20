import { Component, OnInit, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';
import { HttpClient } from '@angular/common/http';

interface MenuItem {
	titulo: string;
	route: string;
	rutaImagen: string;
	funcion: () => void;
}
@Component({
	selector: 'app-level2',
	standalone: true,
	imports: [NgFor, CardMenuComponent],
	templateUrl: './level2.component.html'
})
export default class Level2Component implements OnInit {
	public menuOptionsLevel2: MenuItem[] = [];
	public titulo: string;
	private _route = inject(ActivatedRoute);
	private _router = inject(Router);
	private _http = inject(HttpClient);

	ngOnInit(): void {
		this._route.queryParams.subscribe(() => {
			this.titulo = this._route.snapshot.routeConfig?.path;

			import(`../../assets/menuOptions/level2/${this.titulo}.json`)
				.then((data) => {
					this.menuOptionsLevel2 = data.default.map((item: MenuItem) => this.createCardMenu(item));
				})
				.catch((error) => console.error(`ERROR ../../assets/menuOptions/level2/${this.titulo}.json`, error));
		});
	}

	ngOnInitOLD(): void {
		this._route.queryParams.subscribe(() => {
			this.titulo = this._route.snapshot.routeConfig?.path;

			this._http.get<MenuItem[]>(`/assets/menuOptions/level2/${this.titulo}.json`).subscribe((data) => {
				this.menuOptionsLevel2 = data.map((item) => this.createCardMenu(item));
			});
		});
	}

	createCardMenu(item: MenuItem) {
		// console.log(`${item.titulo.toLowerCase()}`);
		switch (item.route.split('/')[0]) {
			case 'edificiosSingulares':
				// console.log(item.route);
				return {
					...item,
					funcion: () => this._router.navigateByUrl(`${item.route}`)
				};

				break;

			default:
				break;
		}
		return {
			...item,
			funcion: () => this._router.navigateByUrl(`${item.titulo.toLowerCase()}`)
		};
	}
}
