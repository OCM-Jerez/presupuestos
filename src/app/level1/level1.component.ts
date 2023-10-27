import { Component, OnInit, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

const defaultBackground = 'linear-gradient(to bottom, #1C1F26 , #4D4E50)';

@Component({
	selector: 'app-level1',
	standalone: true,
	imports: [NgFor, CardMenuComponent],
	templateUrl: './level1.component.html',
	styleUrls: ['./level1.component.scss']
})
export default class Level1Component implements OnInit {
	public cardMenus: any;
	public createdCards: any[] = [];
	public titulo: string;
	private _route = inject(ActivatedRoute);
	private _router = inject(Router);

	ngOnInit(): void {
		this._route.queryParams.subscribe((params) => {
			this.cardMenus = JSON.parse(params['menuOptionsLevel1']);
			this.titulo = params['titulo'];
			this.createdCards = this.cardMenus.map((menu: { titulo: string; route: string; rutaImagen: string }) => {
				return this.createCard(menu.titulo, menu.route, menu.rutaImagen);
			});
		});
	}

	createCard(titulo: string, route: string, rutaImagen: string) {
		return {
			titulo,
			rutaImagen,
			funcion: () => this._router.navigateByUrl(`${route}`),
			background: defaultBackground
		};
	}
}
