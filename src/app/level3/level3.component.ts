import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '@environments/environment';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';
import ComentariosComponent from '@commons/components/level/comentarios/comentarios.component';
import DataGeneralComponent from '@commons/components/level/data-general/data-general.component';
import DocumentosComponent from '@commons/components/level/documentos/documentos.component';
import EstadoLicitacionComponent from '@commons/components/level/estado-licitacion/estado-licitacion.component';
import NoticiasComponent from '@commons/components/level/noticias/noticias.component';
import SeguimientoSubvencionComponent from '@commons/components/level/seguimiento-subvencion/seguimiento-subvencion.component';

import { SupabaseService } from '@services/supabase.service';
import { PathStoreService } from '@services/pathStore.service';
import { TagStoreService } from '@services/tagStore.service';
import { TitleStoreService } from '@services/titleStore.service';

import { ICom } from '@interfaces/com.interface';
import { IDoc } from '@interfaces/doc.interface';
import { INew } from '@interfaces/new.interface';
import { IMenuItem } from '@interfaces/menu.interface';

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
	private _supabaseService = inject(SupabaseService);
	private _tagStoreService = inject(TagStoreService);
	private _titleStoreService = inject(TitleStoreService);
	private _pathStoreService = inject(PathStoreService);
	private _router = inject(Router);
	public menuOptions: IMenuItem[] = [];
	public coms: ICom[] = [];
	public docs: IDoc[] = [];
	public news: INew[] = [];
	public isComisiones = false;
	public title = this._titleStoreService.getTitle();

	ngOnInit() {
		const tag = this._tagStoreService.getTag();
		const path = this._pathStoreService.getPath();
		path === 'comisiones' ? (this.isComisiones = true) : (this.isComisiones = false);

		import(`../../assets/menuOptions/level3/${tag}.json`).then((data) => {
			this.menuOptions = data.default.map((item: IMenuItem) => {
				const modifiedItem = {
					...item,
					rutaImagen: environment.pathImgSupabase + item.tag + '.jpg'
				};
				return this.createCardMenu(modifiedItem);
				// }
			});
			this.fetchDataFromSupabase(tag);
		});
	}

	async fetchDataFromSupabase(tag: string) {
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
