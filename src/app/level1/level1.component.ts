import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '@environments/environment';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';
import NoticiasComponent from '@app/commons/components/level/noticias/noticias.component';
import ComentariosComponent from '@app/commons/components/level/comentarios/comentarios.component';
import DocumentosComponent from '@app/commons/components/level/documentos/documentos.component';

import { SupabaseService } from '@services/supabase.service';
import { TagStoreService } from '@services/tagStore.service';
import { TitleStoreService } from '@services/titleStore.service';
import { PathStoreService } from '@services/pathStore.service';

import { IMenuItem } from '@interfaces/menu.interface';
import { ICom } from '@interfaces/com.interface';
import { IDoc } from '@interfaces/doc.interface';
import { INew } from '@interfaces/new.interface';

@Component({
	selector: 'app-level1',
	standalone: true,
	imports: [CardMenuComponent, NoticiasComponent, DocumentosComponent, ComentariosComponent],
	templateUrl: './level1.component.html'
})
export default class Level1Component implements OnInit {
	private _supabaseService = inject(SupabaseService);
	private _pathStoreService = inject(PathStoreService);
	private _tagStoreService = inject(TagStoreService);
	private _titleStoreService = inject(TitleStoreService);
	private _router = inject(Router);
	public menuOptions: IMenuItem[] = [];
	public coms: ICom[] = [];
	public docs: IDoc[] = [];
	public news: INew[] = [];
	public title = this._titleStoreService.getTitle();

	ngOnInit() {
		const tag = this._tagStoreService.getTag();
		import(`../../assets/menuOptions/level1/${tag}.json`).then((data) => {
			this.menuOptions = data.default.map((item: IMenuItem) => {
				const modifiedItem = {
					...item,
					rutaImagen: environment.pathImgSupabase + item.tag + '.jpg'
				};
				return this.createCardMenu(modifiedItem);
			});
			this.fetchDataFromSupabase(tag);
		});
	}

	async fetchDataFromSupabase(tag: string) {
		// console.log('tag', tag);

		try {
			this.news = await this._supabaseService.fetchDataByTagOrder('news', tag, false);
		} catch (error) {
			console.error('Error fetching data:', error);
		}

		try {
			this.coms = await this._supabaseService.fetchDataByTagOrder('comments', tag, false);
		} catch (error) {
			console.error('Error fetching data:', error);
		}

		try {
			this.docs = await this._supabaseService.fetchDataByTagOrder('documents', tag, false);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	createCardMenu(item: IMenuItem) {
		let URL = item.isLastLevel ? 'levelLast' : 'level2';

		if (item.path === 'licitaciones') {
			URL = 'licitaciones';
		}
		if (item.path === 'presupuestos') {
			URL = 'presupuestos';
		}
		return {
			...item,
			funcion: () => {
				this._pathStoreService.setPath(item.path);
				this._tagStoreService.setTag(item.tag);
				this._titleStoreService.setTitle(item.title);
				this._router.navigateByUrl(URL);
			}
		};
	}
}
