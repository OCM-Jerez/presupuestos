import { Component, Input, OnInit, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

import { IMenuItem } from '@interfaces/menu.interface';

@Component({
	selector: 'app-level2',
	standalone: true,
	imports: [NgFor, CardMenuComponent],
	templateUrl: './level2.component.html'
})
export default class Level2Component implements OnInit {
	@Input() path?: string;
	@Input() title?: string;
	public menuOptions: IMenuItem[] = [];
	private _router = inject(Router);

	ngOnInit(): void {
		console.log('Level2 ', this.path, this.title);

		try {
			import(`../../assets/menuOptions/level2/${this.path}.json`).then((data) => {
				this.menuOptions = data.default.map((item: IMenuItem) => this.createCardMenu(item));
			});
		} catch (error) {
			console.log('error ', error);

			this._router.navigateByUrl(this.path);
		}
	}

	createCardMenu(item: IMenuItem) {
		let URL = ``;

		// console.log('item ', item);

		switch (item.path.split('/')[0]) {
			case 'edificiosSingulares':
			case 'rpt':
			case 'retribuciones2022':
			case 'empleadosNews':
				URL = `${item.path}`;
				break;
			// case 'presupuestos':
			// 	URL = `${item.path}`;
			// 	break;

			default:
				URL = `level3/${encodeURIComponent(item.path)}/${encodeURIComponent(item.title)}`;
				break;
		}
		// console.log('URL ', URL);
		return {
			...item,
			funcion: () => this._router.navigateByUrl(URL)
		};
	}
}
