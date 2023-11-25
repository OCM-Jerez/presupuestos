import { Component, Input, OnInit, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

import { IMenuItem } from '@interfaces/menu.interface';

@Component({
	selector: 'app-level1',
	standalone: true,
	imports: [NgFor, CardMenuComponent],
	templateUrl: './level1.component.html'
})
export default class Level1Component implements OnInit {
	@Input() route?: string;
	@Input() title?: string;
	public menuOptions: IMenuItem[] = [];
	private _router = inject(Router);

	ngOnInit(): void {
		console.log('Level1 ', this.route, this.title);
		import(`../../assets/menuOptions/level1/${this.route}.json`).then((data) => {
			this.menuOptions = data.default.map((item: IMenuItem) => this.createCardMenu(item));
		});
	}

	createCardMenu(item: IMenuItem) {
		return {
			...item,
			// funcion: () => this._router.navigateByUrl(`${item.route}`)
			funcion: () =>
				this._router.navigateByUrl(`level2/${encodeURIComponent(item.path)}/${encodeURIComponent(item.title)}`)
		};
	}
}
