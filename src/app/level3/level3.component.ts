import { Component, Input, OnInit, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

import ComentariosComponent from '@commons/components/level/comentarios/comentarios.component';
import DataGeneralComponent from '@commons/components/level/data-general/data-general.component';
import DocumentosComponent from '@commons/components/level/documentos/documentos.component';
import EstadoLicitacionComponent from '@commons/components/level/estado-licitacion/estado-licitacion.component';
import NoticiasComponent from '@commons/components/level/noticias/noticias.component';
import SeguimientoSubvencionComponent from '@commons/components/level/seguimiento-subvencion/seguimiento-subvencion.component';

import { catchError, forkJoin, of } from 'rxjs';

import { ICom } from '@interfaces/com.interface';
import { IDoc } from '@interfaces/doc.interface';
import { INew } from '@interfaces/new.interface';

import { environment } from '@environments/environment';

import { IMenuItem } from '@interfaces/menu.interface';
import { SupabaseService } from '@app/organigrama/supabase/supabase.service';

@Component({
	selector: 'app-level3',
	standalone: true,
	imports: [
		NgFor,
		NgIf,
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
	@Input() path?: string;
	@Input() title?: string;
	private _supabaseService = inject(SupabaseService);

	public menuOptions: IMenuItem[] = [];
	private _router = inject(Router);
	private _http = inject(HttpClient);

	public coms: ICom[] = [];
	public docs: IDoc[] = [];
	public news: INew[] = [];

	public hasDocs = false;
	public hasComs = false;
	public hasNews = false;

	public isComisiones = false;

	ngOnInit() {
		import(`../../assets/menuOptions/level3/${this.path}.json`).then((data) => {
			this.menuOptions = data.default.map((item: IMenuItem) => {
				if (this.path === 'comisiones') {
					this.fetchDataFromSupabase(this.path);
					return this.createCardMenu(item);
				} else {
					const modifiedItem = {
						...item,
						rutaImagen: environment.pathImgSupabase + item.rutaImagen
					};
					this.fetchDataFromSupabase(this.path);
					return this.createCardMenu(modifiedItem);
				}
			});
		});
	}

	ngOnInitOLD(): void {
		console.log('Level3 ', this.path, this.title);
		// console.log(`../../assets/menuOptions/level3/${this.path}.json`);
		import(`../../assets/menuOptions/level3/${this.path}.json`).then((data) => {
			this.menuOptions = data.default.map((item: IMenuItem) => this.createCardMenu(item));
			// this.fetchData(this.path);
			this.fetchDataFromSupabase(this.path);
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

	fetchData(path: string) {
		switch (path) {
			case 'comisiones':
				this.isComisiones = true;
				break;
		}

		const pathBase = `/assets/art10/infoInstitucional/`;

		// console.log('pathBase', pathBase);

		const commonRequests = {
			coms: this._http.get<ICom[]>(`${pathBase}${this.path}/${this.path}Coms.json`),
			docs: this._http.get<IDoc[]>(`${pathBase}${this.path}/${this.path}Docs.json`),
			news: this._http.get<INew[]>(`${pathBase}${this.path}/${this.path}News.json`)
		};

		const allRequests = {
			...commonRequests
		};
		// console.log('allRequests', allRequests);

		forkJoin(allRequests)
			.pipe(
				catchError((error) => {
					console.error('Error fetching data:', error);
					return of({
						coms: [],
						docs: [],
						news: []
					});
				})
			)
			.subscribe((response) => {
				this.docs = response.docs;
				this.coms = response.coms;
				this.news = response.news;

				this.hasComs = this.coms.length > 1;
				this.hasDocs = this.docs.length > 1;
				this.hasNews = this.news.length > 0;
			});
	}

	createCardMenu(item: IMenuItem) {
		// console.log('createCardMenu', item);

		return {
			...item,
			funcion: () => this._router.navigateByUrl(`${item.path}`)
		};
	}
}
