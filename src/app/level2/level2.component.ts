import { Component, OnInit, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';
import { HttpClient } from '@angular/common/http';

interface MenuItem {
	titulo: string;
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
	public createdCards: MenuItem[] = [];
	public titulo: string;
	private _route = inject(ActivatedRoute);
	private _router = inject(Router);
	private _http = inject(HttpClient);

	ngOnInit(): void {
		this._route.queryParams.subscribe(() => {
			this.titulo = this._route.snapshot.routeConfig?.path;

			this._http.get<MenuItem[]>(`/assets/menuOptions/level2/${this.titulo}.json`).subscribe((data) => {
				this.createdCards = data.map((item) => this.createCardMenu(item));
			});
		});
	}

	createCardMenu(item: MenuItem) {
		return {
			titulo: item.titulo,
			rutaImagen: item.rutaImagen,
			funcion: () => this._router.navigateByUrl(`${item.titulo.toLowerCase()}`)
		};
	}
}