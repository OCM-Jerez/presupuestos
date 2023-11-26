import { Component, Input, OnInit, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

interface IMenuItemHome {
	title: string;
	path: string;
	rutaImagen: string;
	funcion: () => void;
	hasMenu?: boolean;
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

	ngOnInit(): void {
		console.log('Level1 ', this.path, this.title);
		import(`../../assets/menuOptions/level1/${this.path}.json`).then((data) => {
			this.menuOptions = data.default.map((item: IMenuItemHome) => this.createCardMenu(item));
		});
	}

	createCardMenu(item: IMenuItemHome) {
		const URL = item.hasMenu
			? `level2/${encodeURIComponent(item.path)}/${encodeURIComponent(item.title)} )}`
			: item.path;

		return {
			...item,
			funcion: () => this._router.navigateByUrl(URL)
		};
	}
}
