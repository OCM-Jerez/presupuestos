import { Component, Input, OnInit, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

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
	@Input() route?: string;
	@Input() title?: string;
	public menuOptions: MenuItem[] = [];
	private _router = inject(Router);

	ngOnInit(): void {
		console.log('Level2 ', this.route, this.title);
		import(`../../assets/menuOptions/level2/${this.route}.json`).then((data) => {
			this.menuOptions = data.default.map((item: MenuItem) => this.createCardMenu(item));
		});
	}

	createCardMenu(item: MenuItem) {
		return {
			...item,
			funcion: () => this._router.navigateByUrl(`${item.route}`)
		};
	}
}
