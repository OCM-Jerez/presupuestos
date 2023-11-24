import { Component, OnInit, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

import homeMenuOptions from '../../assets/menuOptions/home.json';

import { CardMenuComponent } from '@commons/components/card-menu/card-menu.component';

interface MenuItem {
	titulo: string;
	route: string;
	rutaImagen: string;
	funcion: () => void;
}

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	standalone: true,
	imports: [NgFor, CardMenuComponent]
})
export default class HomeComponent implements OnInit {
	private _router = inject(Router);
	public menuOptionsHome: MenuItem[] = [];

	ngOnInit() {
		this.menuOptionsHome = homeMenuOptions.map((item) => this.createCardMenu(item));
	}

	createCardMenu(item: { titulo: string; route: string; rutaImagen: string }) {
		return {
			...item,
			funcion: () =>
				this._router.navigateByUrl(`level1/${encodeURIComponent(item.route)}/${encodeURIComponent(item.titulo)}`)
		};
	}
}
