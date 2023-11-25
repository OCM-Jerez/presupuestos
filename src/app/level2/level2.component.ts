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
		import(`../../assets/menuOptions/level2/${this.path}.json`).then((data) => {
			this.menuOptions = data.default.map((item: IMenuItem) => this.createCardMenu(item));
		});
	}

	createCardMenu(item: IMenuItem) {
		return {
			...item,
			// funcion: () => this._router.navigateByUrl(`${item.path}`)
			funcion: () =>
				this._router.navigateByUrl(`level3/${encodeURIComponent(item.path)}/${encodeURIComponent(item.title)}`)
		};
	}
}
