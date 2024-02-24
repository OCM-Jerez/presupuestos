import { Component, Input, OnInit, inject } from '@angular/core';
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
import { __importDefault } from 'tslib';

@Component({
	selector: 'app-level1',
	standalone: true,
	imports: [CardMenuComponent, NoticiasComponent, DocumentosComponent, ComentariosComponent],
	templateUrl: './level1.component.html'
})
export default class Level1Component implements OnInit {
	@Input() tag: string;
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
		// const tag = this._tagStoreService.getTag();

		import(`../../assets/menuOptions/level1/${this.tag}.json`).then((data) => {
			this.menuOptions = data.default.map((item: IMenuItem) => {
				const modifiedItem = {
					...item,
					rutaImagen: environment.pathImgSupabase + item.tag + '.jpg'
				};
				return this.createCardMenu(modifiedItem);
			});
			this.fetchDataFromSupabase(this.tag);
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
		let URL = item.isLastLevel ? 'levelLast/' + item.tag : 'level2/' + item.tag;

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
