import { Component, OnInit, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

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
	public menuOptions: MenuItem[] = [];
	public titulo: string;
	private _route = inject(ActivatedRoute);
	private _router = inject(Router);

	ngOnInit(): void {
		this._route.queryParams.subscribe(() => {
			// route
			this.titulo = this._route.snapshot.routeConfig?.path;

			import(`../../assets/menuOptions/level2/${this.titulo}.json`)
				.then((data) => {
					this.menuOptions = data.default.map((item: MenuItem) => this.createCardMenu(item));
				})
				.catch((error) => console.error(`ERROR ../../assets/menuOptions/level2/${this.titulo}.json`, error));
		});
	}

	createCardMenu(item: MenuItem) {
		// console.log(`Level 2 Ruta= ${item.route}`);
		return {
			...item,
			funcion: () => this._router.navigateByUrl(`${item.route}`)
		};
	}
}
