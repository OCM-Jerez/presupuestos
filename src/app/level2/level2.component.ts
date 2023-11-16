import { Component, OnInit, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';
import { HttpClient } from '@angular/common/http';

interface MenuItem {
	titulo: string;
	route: string;
	rutaImagen: string;
	subtitulo: string;
}
@Component({
	selector: 'app-level1',
	standalone: true,
	imports: [NgFor, CardMenuComponent],
	templateUrl: './level2.component.html'
})
export default class Level2Component implements OnInit {
	public menuOptionsLevel1: any;
	public createdCards: any[] = [];
	public titulo: string;
	private _route = inject(ActivatedRoute);
	private _router = inject(Router);
	private _http = inject(HttpClient);

	ngOnInit(): void {
		// console.log(this._route);

		this._route.queryParams.subscribe((params) => {
			this.titulo = this._route.snapshot.routeConfig?.path;
			console.log(this.titulo);

			this._http.get<MenuItem[]>(`/assets/menuOptions/level2/${this.titulo}.json`).subscribe((data) => {
				const menuOptionsPromises = data.map((item) =>
					this.createCardMenu(item.titulo, item.route, item.rutaImagen, item.subtitulo)
				);
				Promise.all(menuOptionsPromises).then((resolvedOptions) => {
					this.createdCards = resolvedOptions;
				});
			});

			// this.menuOptionsLevel1 = JSON.parse(params['menuOptionsLevel1']);
			// console.log(this.menuOptionsLevel1);

			// this.titulo = params['titulo'];
			// his.createdCardst = this.menuOptionsLevel1.map((menu: { titulo: string; route: string; rutaImagen: string }) => {
			// 	return this.createCard(menu.titulo, menu.route, menu.rutaImagen);
			// });
		});
	}

	async createCardMenu(titulo: string, route: string, rutaImagen: string, subtitulo: string) {
		const jsonPath = `/assets/menuOptions/level2/${titulo}.json`;
		console.log(route);
		console.log(jsonPath);

		const menuOptionsLevel2 = await this._http
			.get<MenuItem[]>(jsonPath)
			.toPromise()
			.catch(() => []);
		return {
			titulo,
			// funcion: () => {
			// 	const navigationExtras = {
			// 		queryParams: { menuOptionsLevel1: JSON.stringify(menuOptionsLevel2), titulo }
			// 	};
			// 	this._router.navigate(['level2'], navigationExtras);

			// }
			funcion: () => this._router.navigateByUrl(`/licitaciones/${route}`)
		};
	}
}
