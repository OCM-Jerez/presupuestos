import { Component, Input, OnInit, inject } from '@angular/core';

import { Router } from '@angular/router';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

import ComentariosComponent from '@commons/components/level/comentarios/comentarios.component';
import DataGeneralComponent from '@commons/components/level/data-general/data-general.component';
import DocumentosComponent from '@commons/components/level/documentos/documentos.component';
import EstadoLicitacionComponent from '@commons/components/level/estado-licitacion/estado-licitacion.component';
import NoticiasComponent from '@commons/components/level/noticias/noticias.component';
import SeguimientoSubvencionComponent from '@commons/components/level/seguimiento-subvencion/seguimiento-subvencion.component';

import { ICom } from '@interfaces/com.interface';
import { IDoc } from '@interfaces/doc.interface';
import { INew } from '@interfaces/new.interface';

import { environment } from '@environments/environment';

import { IMenuItem } from '@interfaces/menu.interface';
import { SupabaseService } from '@services/supabase.service';
import { PathStoreService } from '@services/pathStore.service';
import { TagStoreService } from '@services/tagStore.service';
import { TitleStoreService } from '@services/titleStore.service';

interface IMenuItemHome {
	title: string;
	path: string;
	tag: string;
	rutaImagen: string;
	funcion: () => void;
	isLastLevel?: boolean;
}

@Component({
	selector: 'app-level3',
	standalone: true,
	imports: [
    CardMenuComponent,
    EstadoLicitacionComponent,
    DataGeneralComponent,
    SeguimientoSubvencionComponent,
    DocumentosComponent,
    ComentariosComponent,
    NoticiasComponent
],
	templateUrl: './level3.component.html'
})
export default class Level3Component implements OnInit {
	// @Input() path?: string;
	// @Input() title?: string;
	private _supabaseService = inject(SupabaseService);
	private _tagStoreService = inject(TagStoreService);
	private _titleStoreService = inject(TitleStoreService);
	private _pathStoreService = inject(PathStoreService);

	public menuOptions: IMenuItem[] = [];
	private _router = inject(Router);

	public coms: ICom[] = [];
	public docs: IDoc[] = [];
	public news: INew[] = [];

	public hasDocs = false;
	public hasComs = false;
	public hasNews = false;

	public isComisiones = false;
	public title = this._titleStoreService.getTitle();


	ngOnInit() {
		const tag = this._tagStoreService.getTag();
		// console.log('path', this.path);
		import(`../../assets/menuOptions/level3/${tag}.json`).then((data) => {
			this.menuOptions = data.default.map((item: IMenuItemHome) => {
				if (tag === 'comisiones') {
					this.isComisiones = true;
					this.fetchDataFromSupabase(tag);
					return this.createCardMenu(item);
				} else {
					const modifiedItem = {
						...item,
						rutaImagen: environment.pathImgSupabase + item.tag + '.jpg'
					};
					this.fetchDataFromSupabase(tag);
					return this.createCardMenu(modifiedItem);
				}
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
		return {
			...item,
			funcion: () => {
				this._pathStoreService.setPath(item.path);
				this._tagStoreService.setTag(item.tag);
				this._titleStoreService.setTitle(item.title);
				this._router.navigateByUrl('levelLast');
			} 
		};
	}
}
