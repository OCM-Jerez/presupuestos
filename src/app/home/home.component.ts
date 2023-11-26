import { Component, OnInit, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

import { CardMenuComponent } from '@commons/components/card-menu/card-menu.component';

// import { IMenuItem } from '@interfaces/menu.interface';

interface IMenuItemHome {
	title: string;
	path: string;
	rutaImagen: string;
	funcion: () => void;
	hasMenu: boolean;
}

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	standalone: true,
	imports: [NgFor, CardMenuComponent]
})
export default class HomeComponent implements OnInit {
	private _router = inject(Router);
	public menuOptionsHome: IMenuItemHome[] = [];

	ngOnInit() {
		import(`@assets/menuOptions/home.json`).then((data) => {
			this.menuOptionsHome = data.default.map((item: IMenuItemHome) => this.createCardMenu(item));
		});
	}

	createCardMenu(item: IMenuItemHome) {
		return {
			...item,
			funcion: () =>
				this._router.navigateByUrl(
					`level1/${encodeURIComponent(item.path)}/${encodeURIComponent(item.title)}/${encodeURIComponent(
						item.hasMenu
					)}`
				)
		};
	}
}
