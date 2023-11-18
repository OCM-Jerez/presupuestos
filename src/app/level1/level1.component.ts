import { Component, OnInit, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

@Component({
	selector: 'app-level1',
	standalone: true,
	imports: [NgFor, CardMenuComponent],
	templateUrl: './level1.component.html',
	styleUrls: ['./level1.component.scss']
})
export default class Level1Component implements OnInit {
	public menuOptionsLevel1: any;
	public createdCards: any[] = [];
	public titulo: string;
	private _route = inject(ActivatedRoute);
	private _router = inject(Router);

	ngOnInit(): void {
		this._route.queryParams.subscribe((params) => {
			this.menuOptionsLevel1 = JSON.parse(params['menuOptionsLevel1']);
			this.titulo = params['titulo'];

			this.createdCards = this.menuOptionsLevel1.map((menu: { titulo: string; route: string; rutaImagen: string }) => {
				return this.createCard(menu.titulo, menu.route, menu.rutaImagen);
			});
		});
	}

	createCard(titulo: string, route: string, rutaImagen: string) {
		return {
			titulo,
			rutaImagen,
			funcion: () => this._router.navigateByUrl(`${route}`)
		};
	}
}
