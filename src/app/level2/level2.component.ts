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
import { INew } from '@interfaces/new.interface';
import { ICom } from '@interfaces/com.interface';
import { IDoc } from '@interfaces/doc.interface';
@Component({
	selector: 'app-level2',
	standalone: true,
	imports: [CardMenuComponent, NoticiasComponent, DocumentosComponent, ComentariosComponent],
	templateUrl: './level2.component.html'
})
export default class Level2Component implements OnInit {
	private _supabaseService = inject(SupabaseService);
	private _router = inject(Router);
	private _tagStoreService = inject(TagStoreService);
	private _titleStoreService = inject(TitleStoreService);
	private _pathStoreService = inject(PathStoreService);
	public menuOptions: IMenuItem[] = [];
	public coms: ICom[] = [];
	public docs: IDoc[] = [];
	public news: INew[] = [];
	public title = this._titleStoreService.getTitle();

	ngOnInit() {
		const tag = this._tagStoreService.getTag();
		import(`../../assets/menuOptions/level2/${tag}.json`).then((data) => {
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
		const dataTypes = ['news', 'comments', 'documents'];

		[this.news, this.coms, this.docs] = await Promise.all(
			dataTypes.map((type) =>
				this._supabaseService.fetchDataByTagOrder(type, tag, false).catch((error) => {
					console.error(`Error fetching ${type}:`, error);
				})
			)
		);
	}

	createCardMenu(item: IMenuItem) {
		let URL = item.isLastLevel ? 'levelLast' : 'level3';

		switch (item.path) {
			case 'retribuciones2022':
				URL = 'retribuciones2022';
				break;
			case 'rpt':
				URL = 'rpt';
				break;
			case 'organigramaPolitico':
				URL = 'organigramaPolitico';
				break;
			case 'organigramaOrganizativo':
				URL = 'organigramaOrganizativo';
				break;
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
