import { Component, OnInit, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

import { environment } from '@environments/environment';

import { CardMenuComponent } from '@commons/components/card-menu/card-menu.component';

import { IMenuItem } from '@interfaces/menu.interface';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	standalone: true,
	imports: [NgFor, CardMenuComponent]
})
export default class HomeComponent implements OnInit {
	private _router = inject(Router);
	public menuOptionsHome: IMenuItem[] = [];

	ngOnInit() {
		import(`@assets/menuOptions/home.json`).then((data) => {
			this.menuOptionsHome = data.default.map((item: IMenuItem) => {
				const modifiedItem = {
					...item,
					rutaImagen: environment.pathImgSupabase + item.rutaImagen
				};
				return this.createCardMenu(modifiedItem);
			});
		});
	}

	createCardMenu(item: IMenuItem) {
		return {
			...item,
			funcion: () =>
				this._router.navigateByUrl(
					`level1/${encodeURIComponent(item.path)}/${encodeURIComponent(item.title)}
					)}`
				)
		};
	}
}
