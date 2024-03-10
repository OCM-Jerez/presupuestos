import { Component, OnInit, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { environment } from '@environments/environment';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

import { SupabaseService } from '@services/supabase.service';
import { PathStoreService } from '@services/pathStore.service';
import { TagStoreService } from '@services/tagStore.service';
import { TitleStoreService } from '@services/titleStore.service';

@Component({
	selector: 'app-licitaciones',
	standalone: true,
	imports: [FormsModule, CardMenuComponent, NgClass],
	templateUrl: './licitaciones.component.html',
	styleUrls: ['./licitaciones.component.scss']
})
export default class LicitacionesComponent implements OnInit {
	private _supabaseService = inject(SupabaseService);
	private _router = inject(Router);
	private _tagStoreService = inject(TagStoreService);
	private _titleStoreService = inject(TitleStoreService);
	private _pathStoreService = inject(PathStoreService);
	public licitacionesAll = [];
	public licitacionesAyto = [];
	public licitacionesAytoAll = [];
	public licitacionesCEE = [];
	public licitacionesCEEAll = [];
	public licitacionesESP = [];
	public licitacionesESPAll = [];
	public licitacionesDiputacion = [];
	public licitacionesDiputacionAll = [];
	public licitacionesSolares = [];
	public licitacionesSolaresAll = [];
	public searchText: string;
	public canAddRowSupabase = environment.canAddRowSupabase;
	public selectedButton = 'ayuntamiento';
	public selectedButtonClasification = 'ayuntamientotodas';

	botonesTipos = [
		{ label: 'Todas', tipo: 'todas' },
		{ label: 'Ayuntamiento', tipo: 'ayuntamiento' },
		{ label: 'CEE', tipo: 'cee' },
		{ label: 'Gobierno de España', tipo: 'gobierno' },
		{ label: 'Junta Andalucía', tipo: 'junta' },
		{ label: 'Diputación', tipo: 'diputacion' },
		{ label: 'subasta solares', tipo: 'solares' }
	];

	botonesTodas = [
		{ label: 'Todas', tipo: 'todas', estado: 'todas' },
		{ label: 'Pendientes', tipo: 'todas', estado: 'pendiente' },
		{ label: 'Adjudicadas', tipo: 'todas', estado: 'adjudicada' },
		{ label: 'Licitadas', tipo: 'todas', estado: 'licitada' },
		{ label: 'Terminadas', tipo: 'todas', estado: 'terminada' }
	];

	botonesAyuntamiento = [
		{ label: 'Todas', tipo: 'ayuntamiento', estado: 'todas' },
		{ label: 'Pendientes', tipo: 'ayuntamiento', estado: 'pendiente' },
		{ label: 'Adjudicadas', tipo: 'ayuntamiento', estado: 'adjudicada' },
		{ label: 'Licitadas', tipo: 'ayuntamiento', estado: 'licitada' },
		{ label: 'Terminadas', tipo: 'ayuntamiento', estado: 'terminada' }
	];

	botonesCEE = [
		{ label: 'Todas', tipo: 'cee', estado: 'todas' },
		{ label: 'Pendientes', tipo: 'cee', estado: 'pendiente' },
		{ label: 'Adjudicadas', tipo: 'cee', estado: 'adjudicada' },
		{ label: 'Licitadas', tipo: 'cee', estado: 'licitada' },
		{ label: 'Terminadas', tipo: 'cee', estado: 'terminada' }
	];

	botonesDiputacion = [
		{ label: 'Todas', tipo: 'diputacion', estado: 'todas' },
		{ label: 'Pendientes', tipo: 'diputacion', estado: 'pendiente' },
		{ label: 'Adjudicadas', tipo: 'diputacion', estado: 'adjudicada' },
		{ label: 'Licitadas', tipo: 'diputacion', estado: 'licitada' },
		{ label: 'Terminadas', tipo: 'diputacion', estado: 'terminada' }
	];

	botonesSolares = [
		{ label: 'Todas', tipo: 'solares', estado: 'todas' },
		{ label: 'Terminadas', tipo: 'solares', estado: 'terminada' }
	];

	async ngOnInit() {
		await this.getFromSupabase();
		this.licitacionesAyto = this.licitacionesAytoAll;
		this.licitacionesCEE = this.licitacionesCEEAll;
		this.licitacionesDiputacion = this.licitacionesDiputacionAll;
		this.licitacionesSolares = this.licitacionesSolaresAll;
		this.licitacionesAll = this.getAllLicitaciones();
	}

	getAllLicitaciones() {
		return [...this.licitacionesCEE, ...this.licitacionesESP, ...this.licitacionesDiputacion, ...this.licitacionesAyto];
	}

	async getFromSupabase() {
		this.licitacionesAytoAll = await this._supabaseService.fetchDataByFinanciacion('ayuntamiento');
		this.licitacionesAytoAll = this.licitacionesAytoAll.map((item) => {
			return this.createCard(item.title, item.tag, item.estado);
		});

		this.licitacionesCEEAll = await this._supabaseService.fetchDataByFinanciacion('CEE');
		this.licitacionesCEEAll = this.licitacionesCEEAll.map((item) => {
			return this.createCard(item.title, item.tag, item.estado);
		});

		this.licitacionesDiputacionAll = await this._supabaseService.fetchDataByFinanciacion('diputacion');
		this.licitacionesDiputacionAll = this.licitacionesDiputacionAll.map((item) => {
			return this.createCard(item.title, item.tag, item.estado);
		});

		this.licitacionesSolaresAll = await this._supabaseService.fetchDataByFinanciacion('subastaSolares');
		this.licitacionesSolaresAll = this.licitacionesSolaresAll.map((item) => {
			return this.createCard(item.title, item.tag, item.estado);
		});
	}

	createCard(title: string, tag: string, estado?: string) {
		return {
			title,
			tag,
			rutaImagen: environment.pathImgSupabase + tag + '.jpg',
			funcion: () => {
				this._pathStoreService.setPath('licitaciones');
				this._tagStoreService.setTag(tag);
				this._titleStoreService.setTitle(title);
				this._router.navigateByUrl('licitaciones/' + tag);
			},
			highlighted: false,
			estado: estado
		};
	}

	filterData() {
		const lowercasedFilter = this.searchText.toLowerCase();

		if (!this.searchText) {
			this.resetFilter();
		} else {
			this.applyFilter(lowercasedFilter);
		}
	}

	resetFilter() {
		this.getAllLicitaciones().forEach((licitacion) => {
			licitacion.highlighted = false;
		});
	}

	applyFilter(filterValue: string) {
		this.getAllLicitaciones().forEach((licitacion) => {
			licitacion.highlighted = licitacion.title.toLowerCase().includes(filterValue);
		});
	}

	addNew(): void {
		this._router.navigateByUrl('/addNewLicitacion');
	}

	appOCM() {
		window.open('https://con.ocmjerez.org/', '_blank');
	}

	private estados = {
		todas: { isCEE: true, isDiputacion: true, isAyuntamiento: true, isGobierno: true, isJunta: true, isSolares: true },
		cee: {
			isCEE: true,
			isDiputacion: false,
			isAyuntamiento: false,
			isGobierno: false,
			isJunta: false,
			isSolares: false
		},
		diputacion: {
			isCEE: false,
			isDiputacion: true,
			isAyuntamiento: false,
			isGobierno: false,
			isJunta: false,
			isSolares: false
		},
		ayuntamiento: {
			isCEE: false,
			isDiputacion: false,
			isAyuntamiento: true,
			isGobierno: false,
			isJunta: false,
			isSolares: false
		},
		gobierno: {
			isCEE: false,
			isDiputacion: false,
			isAyuntamiento: false,
			isGobierno: true,
			isJunta: false,
			isSolares: false
		},
		junta: {
			isCEE: false,
			isDiputacion: false,
			isAyuntamiento: false,
			isGobierno: false,
			isJunta: true,
			isSolares: false
		},
		solares: {
			isCEE: false,
			isDiputacion: false,
			isAyuntamiento: false,
			isGobierno: false,
			isJunta: false,
			isSolares: true
		}
	};

	cambiarEstado(tipo: string) {
		this.selectedButton = tipo;
		// Establece todos los estados a falso inicialmente
		Object.keys(this.estados[tipo]).forEach((key) => {
			this[key] = false;
		});

		// Establece el estado especificado a verdadero
		Object.keys(this.estados[tipo]).forEach((key) => {
			this[key] = this.estados[tipo][key];
		});
	}

	filterByTipoEstado(tipo: string, estado?: string) {
		if (estado !== 'todas') {
			this.selectedButtonClasification = tipo + estado;
			switch (tipo) {
				case 'todas':
					this.licitacionesAll = this.getAllLicitaciones();
					this.licitacionesAll = this.licitacionesAll.filter((licitacion) => licitacion.estado === estado);
					break;
				case 'ayuntamiento':
					this.licitacionesAyto = this.licitacionesAytoAll.filter((licitacion) => licitacion.estado === estado);
					break;
				case 'cee':
					this.licitacionesCEE = this.licitacionesCEEAll.filter((licitacion) => licitacion.estado === estado);
					break;
				case 'diputacion':
					this.licitacionesDiputacion = this.licitacionesDiputacionAll.filter(
						(licitacion) => licitacion.estado === estado
					);
					break;
			}
		} else {
			this.selectedButtonClasification = tipo + estado;
			switch (tipo) {
				case 'todas':
					// this.selectedButtonClasification === 'todasTodas';
					this.licitacionesAll = this.getAllLicitaciones();
					break;
				case 'ayuntamiento':
					// this.selectedButtonClasification === 'ayuntamientotodas';
					this.licitacionesAyto = this.licitacionesAytoAll;
					break;
				case 'cee':
					this.licitacionesCEE = this.licitacionesCEEAll;
					break;
				case 'diputacion':
					this.licitacionesDiputacion = this.licitacionesDiputacionAll;
					break;
				case 'solares':
					this.licitacionesSolares = this.licitacionesSolaresAll;
					break;
			}
		}
	}
}
