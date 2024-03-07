import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '@environments/environment';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';
import NoticiasComponent from '@app/commons/components/level/noticias/noticias.component';
import ComentariosComponent from '@app/commons/components/level/comentarios/comentarios.component';
import DocumentosComponent from '@app/commons/components/level/documentos/documentos.component';

import { SupabaseService } from '@services/supabase.service';
import { EnsureTitleService } from '@services/ensureTitle.service';
import { GetNewsComsDocs } from '@services/getNewsComsDocs.service';

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
	@Input() tag: string;
	private _supabaseService = inject(SupabaseService);
	private _ensureTitleService = inject(EnsureTitleService);
	private _router = inject(Router);
	private _getNewsComsDocs = inject(GetNewsComsDocs);
	public menuOptions: IMenuItem[] = [];
	public coms: ICom[] = [];
	public docs: IDoc[] = [];
	public news: INew[] = [];
	public title: string;

	async ngOnInit() {
		const data = await this._supabaseService.fetchDataByLevel('level1', this.tag);
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
		let URL = item.isLastLevel ? 'levelLast/' + item.tag : 'level2/' + item.tag;

		if (item.tag === 'licitaciones') {
			URL = 'licitaciones';
		}
		if (item.tag === 'presupuestos') {
			URL = 'presupuestos';
		}
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
