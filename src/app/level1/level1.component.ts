import { Component, Input, OnInit, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

import { environment } from '@environments/environment';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';
import NoticiasComponent from '@app/commons/components/level/noticias/noticias.component';

import { INew } from '@interfaces/new.interface';
import { SupabaseService } from '@services/supabase.service';
import { TagStoreService } from '@services/tagStore.service';

interface IMenuItemHome {
	title: string;
	path: string;
	tag: string;
	funcion: () => void;
	isLastLevel?: boolean;
	rutaImagen?: string;
}

@Component({
	selector: 'app-level1',
	standalone: true,
	imports: [NgFor, CardMenuComponent, NoticiasComponent],
	templateUrl: './level1.component.html'
})
export default class Level1Component implements OnInit {
	@Input() path?: string;
	@Input() title?: string;
	private _supabaseService = inject(SupabaseService);
	private _tagStoreService = inject(TagStoreService);

	public menuOptions: IMenuItemHome[] = [];
	private _router = inject(Router);
	public news: INew[] = [];

	ngOnInit() {
		this._tagStoreService.setTag(this.path);
		import(`../../assets/menuOptions/level1/${this.path}.json`).then((data) => {
			this.menuOptions = data.default.map((item: IMenuItemHome) => {
				const modifiedItem = {
					...item,
					rutaImagen: environment.pathImgSupabase + item.tag + '.jpg'
				};
				this.fetchDataFromSupabase(this.path);
				return this.createCardMenu(modifiedItem);
			});
		});
	}

	async fetchDataFromSupabase(tag: string) {
		try {
			this.news = await this._supabaseService.fetchDataByTagOrder('news', tag, false);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	createCardMenu(item: IMenuItemHome) {
		let URL = item.isLastLevel
			? `levelLast/${encodeURIComponent(item.path)}/${encodeURIComponent(item.title)}/${encodeURIComponent(item.tag)}`
			: `level2/${encodeURIComponent(item.path)}/${encodeURIComponent(item.title)}`;

		if (item.title === 'Licitaciones') {
			URL = 'licitaciones';
		}
		if (item.title === 'Presupuestos') {
			URL = 'presupuestos';
		}
		return {
			...item,
			funcion: () => this._router.navigateByUrl(URL)
		};
	}
}
