import { Component, OnInit, inject } from '@angular/core';

import { environment } from '@environments/environment';

import ComentariosComponent from '@commons/components/level/comentarios/comentarios.component';
import DataGeneralComponent from '@commons/components/level/data-general/data-general.component';
import DocumentosComponent from '@commons/components/level/documentos/documentos.component';
import EstadoLicitacionComponent from '@commons/components/level/estado-licitacion/estado-licitacion.component';
import NoticiasComponent from '@commons/components/level/noticias/noticias.component';
import SeguimientoSubvencionComponent from '@commons/components/level/seguimiento-subvencion/seguimiento-subvencion.component';

import { SupabaseService } from '@services/supabase.service';
import { TagStoreService } from '@services/tagStore.service';
import { PathStoreService } from '@services/pathStore.service';
import { TitleStoreService } from '@services/titleStore.service';

import { ICom } from '@interfaces/com.interface';
import { IDoc } from '@interfaces/doc.interface';
import { INew } from '@interfaces/new.interface';
import { IStep } from '@interfaces/step.interface';

interface IOption {
	data: string;
	value: string;
	URL?: string;
}

interface IStepSubvencion {
	descripcion: string;
	observaciones: string;
	cuantia: string;
	isFinish?: string;
}

interface IBarrio {
	data: string;
	value: string;
	URL?: string;
}

@Component({
	selector: 'app-level-last',
	standalone: true,
	imports: [
		EstadoLicitacionComponent,
		DataGeneralComponent,
		SeguimientoSubvencionComponent,
		DocumentosComponent,
		ComentariosComponent,
		NoticiasComponent
	],
	templateUrl: './level-last.component.html'
})
export default class LevelLastComponent implements OnInit {
	private _supabaseService = inject(SupabaseService);
	private _tagStoreService = inject(TagStoreService);
	private _titleStoreService = inject(TitleStoreService);
	private _pathStoreService = inject(PathStoreService);
	public coms: ICom[] = [];
	public docs: IDoc[] = [];
	public news: INew[] = [];
	public data: IOption[] = [];
	// TODO: - Typar
	public dataSupabase: any[] = [];
	public steps: IStep[] = [];
	public barrios: IBarrio[] = [];
	public stepsSubvencion: IStepSubvencion[] = [];
	public imgURL: string;
	public descripcion: string;
	public isPMP = false;
	public isDeudaTotal = false;
	public deudaTotalImgURL = `${environment.pathImgSupabase}/2023.07.28.jpg`;
	public isDeudaViva = false;
	public deudaVivaImgURL = `${environment.pathImgSupabase}/2023.06.29.jpg`;
	public isFondoOrdenacion = false;
	public planAjuste20230918 = false;
	public isImpuestos = false;
	public isSubvencion = false;
	public isDistrito = false;
	public isLicitacion = false;
	// public isEdificioSingular = false;
	public hasDocs = false;
	public hasComs = false;
	public hasNews = false;
	public gauge = environment.pathImgSupabase + 'gauge.jpg';
	public pmpURL = environment.pathImgSupabase + '2023-12.jpg';
	public title = this._titleStoreService.getTitle();

	ngOnInit() {
		const path = this._pathStoreService.getPath();
		this._pathStoreService.setPath('');
		const tag = this._tagStoreService.getTag();
		console.log('path', path);
		console.log('tag', tag);

		this._tagStoreService.setTag(tag);

		switch (path) {
			case 'deudaTotal':
				this.isDeudaTotal = true;
				break;
			case 'deudaViva':
				this.isDeudaViva = true;
				break;
			// case 'fondoOrdenacion':
			// 	this.isFondoOrdenacion = true;
			// 	break;
			// case 'planAjuste20230918':
			// 	this.planAjuste20230918 = true;
			// 	break;
			case 'pmp':
				this.isPMP = true;
				break;
			case 'licitaciones':
				this.isLicitacion = true;
				this.imgURL = environment.pathImgSupabase + tag + '.jpg';
				break;
			case 'subvencion':
				this.isSubvencion = true;
				break;
			case 'distritos':
				this.isDistrito = true;
				this.imgURL = environment.pathImgSupabase + tag + '.jpg';
				break;
		}

		this.fetchDataFromSupabase(tag, path);
	}

	async fetchDataFromSupabase(tag: string, path: string) {
		if (path === 'licitaciones') {
			try {
				this.steps = await this._supabaseService.fetchDataByTagOrder('steps', tag, true);
			} catch (error) {
				console.error('Error fetching data:', error);
			}

			try {
				const data1 = await this._supabaseService.fetchDataByTag('licitaciones', tag);
				// TODO: crear view en Supabase para hacerlo en ella
				// Lo hago desde este código para evitar problemas con la asignación de nombres en la view con SQL.
				// Ademas que hago la ordenación a la vez de los campos en el orden que quiero que aparezcan en la tabla

				const keyMap = new Map([
					['expediente', 'Expediente'],
					['descripcion', 'Descripción'],
					['codigo_cpv', 'Código CPV'],
					['url_plataforma', 'url Plataforma Contratación'],
					['tipo_contrato', 'Tipo de Contrato'],
					['procedimiento_contratacion', 'Procedimiento'],
					['tipo_tramitación', 'Tramitación'],
					['sistema_contratacion', 'Sistema de contratación'],
					['presupuesto_base_sin_impuestos', 'Presupuesto base sin impuestos'],
					['presupuesto_base_licitación_con_impuestos', 'Presupuesto base licitación con impuestos'],
					['plazo_ejecución', 'Plazo ejecución'],
					['licitadores_presentados', 'Licitadores presentados'],
					['adjudicatario', 'Adjudicatario'],
					['cif_adjudicatario', 'CIF adjudicatario'],
					['url_adjudicatario', 'url Información adjudicatario'],
					['importe_adjudicación_sin_impuestos', 'Importe adjudicación sin impuestos'],
					['importe_adjudicación_con_impuestos', 'Importe adjudicación con impuestos'],
					['tipo_financiacion', 'Tipo financiación'],
					['valor_estimado_contrato', 'Valor estimado del contrato'],
					['credito_ampara', 'Credito en que se ampara'],
					['organico', 'Orgánico'],
					['programa', 'Programa'],
					['economico', 'Económico'],
					['distrito', 'Distrito'],
					['url_distrito', 'url Distrito'],
					['url_geolocalización', 'url Geolocalización'],
					['duración_contrato', 'Duración contrato'],
					['canon_concesional', 'Canon concesional']
					// ['valor_estimado_contrato', 'Valor estimado'],
					// ['tag', 'tag'],
				]);

				const dataO = data1.flatMap((item) =>
					Array.from(keyMap.keys())
						.filter((key) => item[key] !== null && item[key] !== '')
						.map((key) => ({
							data: keyMap.get(key),
							value: item[key]
						}))
				);
				this.data = dataO;

				const descripcionObj = this.data.find((obj) => obj.data === 'Descripción');
				if (descripcionObj) {
					this.descripcion = descripcionObj.value;
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		}

		try {
			this.news = await this._supabaseService.fetchDataByTagOrder('news', tag, false);
			this.hasNews = this.news.length > 0;
		} catch (error) {
			console.error('Error fetching data:', error);
		}

		try {
			this.coms = await this._supabaseService.fetchDataByTagOrder('comments', tag, false);
			this.hasComs = this.coms.length > 0;
		} catch (error) {
			console.error('Error fetching data:', error);
		}

		try {
			this.docs = await this._supabaseService.fetchDataByTagOrder('documents', tag, false);
			this.hasDocs = this.docs.length > 0;
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}
}
