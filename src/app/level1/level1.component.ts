import { Component, Input, OnInit, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

import { environment } from '@environments/environment';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

interface IMenuItemHome {
	title: string;
	path: string;
	rutaImagen: string;
	funcion: () => void;
	isLastLevel?: boolean;
}

@Component({
	selector: 'app-level1',
	standalone: true,
	imports: [NgFor, CardMenuComponent],
	templateUrl: './level1.component.html'
})
export default class Level1Component implements OnInit {
	@Input() path?: string;
	@Input() title?: string;
	public menuOptions: IMenuItemHome[] = [];
	private _router = inject(Router);

	ngOnInit() {
		import(`../../assets/menuOptions/level1/${this.path}.json`).then((data) => {
			this.menuOptions = data.default.map((item: IMenuItemHome) => {
				const modifiedItem = {
					...item,
					rutaImagen: environment.pathImgSupabase + item.rutaImagen
				};
				return this.createCardMenu(modifiedItem);
			});
		});
	}

	ngOnInitOLD(): void {
		// console.log('Level1 ', this.path, this.title);
		import(`../../assets/menuOptions/level1/${this.path}.json`).then((data) => {
			this.menuOptions = data.default.map((item: IMenuItemHome) => this.createCardMenu(item));
		});
	}

	createCardMenu(item: IMenuItemHome) {
		const URL = item.isLastLevel
			? item.path
			: `level2/${encodeURIComponent(item.path)}/${encodeURIComponent(item.title)} )}`;

		return {
			...item,
			funcion: () => this._router.navigateByUrl(URL)
		};
	}
}
