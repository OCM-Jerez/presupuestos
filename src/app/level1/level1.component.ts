import { Component, OnInit, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

import { IMenuItem } from '@interfaces/menu.interface';

@Component({
	selector: 'app-level1',
	standalone: true,
	imports: [NgFor, CardMenuComponent],
	templateUrl: './level1.component.html'
})
export default class Level1Component implements OnInit {
	public menuOptions: IMenuItem[] = [];
	public titulo: string;
	private _route = inject(ActivatedRoute);
	private _router = inject(Router);

	ngOnInit(): void {
		this._route.paramMap.subscribe((params) => {
			const route = params.get('level1');
			this.titulo = params.get('titulo');

			import(`../../assets/menuOptions/level1/${route}.json`).then((data) => {
				this.menuOptions = data.default.map((item: IMenuItem) => this.createCardMenu(item));
			});
		});
	}

	createCardMenu(item: IMenuItem) {
		// console.log(`Level 1 Ruta= ${item.route}`);
		return {
			...item,
			funcion: () => this._router.navigateByUrl(`${item.route}`)
		};
	}
}
