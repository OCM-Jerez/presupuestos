import { Component, Input, OnInit, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

import { environment } from '@environments/environment';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';
import NoticiasComponent from '@app/commons/components/level/noticias/noticias.component';
import { SupabaseService } from '@app/organigrama/supabase/supabase.service';
import { INew } from '@interfaces/new.interface';

interface IMenuItemHome {
	title: string;
	path: string;
	tag: string;
	funcion: () => void;
	isLastLevel?: boolean;
	rutaImagen?: string;
}
@Component({
	selector: 'app-level2',
	standalone: true,
	imports: [NgFor, CardMenuComponent, NoticiasComponent],
	templateUrl: './level2.component.html'
})
export default class Level2Component implements OnInit {
	@Input() path?: string;
	@Input() title?: string;
	private _supabaseService = inject(SupabaseService);
	private _router = inject(Router);
	public menuOptions: IMenuItemHome[] = [];
	public news: INew[] = [];
	public hasNews = false;

	ngOnInit() {
		import(`../../assets/menuOptions/level2/${this.path}.json`).then((data) => {
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

	async fetchDataFromSupabase(param: string) {
		try {
			this.news = await this._supabaseService.fetchDataByTagOrder('news', param, false);
			this.hasNews = this.news.length > 0;
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	createCardMenu(item: IMenuItemHome) {
		const URL = item.isLastLevel
			? `levelLast/${encodeURIComponent(item.path)}/${encodeURIComponent(item.title)}/${encodeURIComponent(item.tag)}`
			: `level3/${encodeURIComponent(item.path)}/${encodeURIComponent(item.title)}`;
		return {
			...item,
			funcion: () => this._router.navigateByUrl(URL)
		};
	}
}
