import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '@environments/environment';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';
import ComentariosComponent from '@commons/components/level/comentarios/comentarios.component';
import DataGeneralComponent from '@commons/components/level/data-general/data-general.component';
import DocumentosComponent from '@commons/components/level/documentos/documentos.component';
import EstadoLicitacionComponent from '@commons/components/level/estado-licitacion/estado-licitacion.component';
import NoticiasComponent from '@commons/components/level/noticias/noticias.component';
import SeguimientoSubvencionComponent from '@commons/components/level/seguimiento-subvencion/seguimiento-subvencion.component';

import { EnsureTitleService } from '@services/ensureTitle.service';
import { GetNewsComsDocs } from '@services/getNewsComsDocs.service';

import { ICom } from '@interfaces/com.interface';
import { IDoc } from '@interfaces/doc.interface';
import { INew } from '@interfaces/new.interface';
import { IMenuItem } from '@interfaces/menu.interface';
import { SupabaseService } from '@services/supabase.service';

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
	@Input() tag: string;
	private _supabaseService = inject(SupabaseService);
	private _ensureTitleService = inject(EnsureTitleService);
	private _router = inject(Router);
	private _getNewsComsDocs = inject(GetNewsComsDocs);
	public menuOptions: IMenuItem[] = [];
	public coms: ICom[] = [];
	public docs: IDoc[] = [];
	public news: INew[] = [];
	public isComisiones = false;
	public title: string;

	async ngOnInit() {
		// const tag = this._tagStoreService.getTag();
		// const path = this._pathStoreService.getPath();
		this.tag === 'comisiones' ? (this.isComisiones = true) : (this.isComisiones = false);
		const data = await this._supabaseService.fetchDataByLevel('level3', this.tag);

		this.menuOptions = data.map((item: IMenuItem) => {
			const modifiedItem = {
				...item,
				rutaImagen: environment.pathImgSupabase + item.tag + '.jpg'
			};
			return this.createCardMenu(modifiedItem);
		});

		await this.ensureTitle();

		[this.news, this.coms, this.docs] = await this._getNewsComsDocs.fetchDataFromSupabase(this.tag);
	}

	createCardMenu(item: IMenuItem) {
		const URL = item.isLastLevel ? 'levelLast/' + item.tag : 'level2/' + item.tag;
		return {
			...item,
			funcion: () => {
				this._router.navigateByUrl(URL);
			}
		};
	}

	async ensureTitle() {
		if (!this.title) {
			this.title = await this._ensureTitleService.ensureTitle(this.tag);
		}
	}
}
