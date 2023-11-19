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
	selector: 'app-level1',
	standalone: true,
	imports: [NgFor, CardMenuComponent],
	templateUrl: './level1.component.html',
	styleUrls: ['./level1.component.scss']
})
export default class Level1Component implements OnInit {
	public menuOptionsLevel1: MenuItem[] = [];
	public titulo: string;
	private _route = inject(ActivatedRoute);
	private _router = inject(Router);

	ngOnInit(): void {
		this._route.paramMap.subscribe((params) => {
			const route = params.get('level1');
			this.titulo = params.get('titulo');
			import(`../../assets/menuOptions/level1/${route}.json`)
				.then((data) => {
					this.menuOptionsLevel1 = data.default.map((item: MenuItem) => this.createCardMenu(item));
				})
				.catch((error) => console.error('Error al cargar el JSON:', error));
		});
	}

	createCardMenu(item: MenuItem) {
		return {
			...item,
			funcion: () => this._router.navigateByUrl(`${item.route}`)
		};
	}
}
