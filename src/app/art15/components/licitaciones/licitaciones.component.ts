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
	public getAllLicitaciones() {
		return [...this.licitacionesCEE, ...this.licitacionesESP, ...this.licitacionesDiputacion, ...this.licitacionesAyto];
	}
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

	// licitacionesAytoAll = [
	// 	this.createCard('Parque La Canaleja', 'laCanaleja2023', 'adjudicada'),
	// 	this.createCard('Planta tratamiento residuos solidos "Las Calandrias" ', 'lasCalandrias2023', 'adjudicada'),
	// 	this.createCard(
	// 		'materiales audiovisuales promocionales del destino turístico Jerez',
	// 		'materialesPromocionalesTurismo2023',
	// 		'adjudicada'
	// 	),
	// 	this.createCard('Obras en San Benito', 'sanBenito2023', 'adjudicada'),
	// 	this.createCard('Recogida residuos + limpieza viaria', 'recogidaResiduos2019', 'adjudicada'),
	// 	this.createCard('Parque Salud Pérez Leytón', 'parqueSaludPerezLeyton2022', 'adjudicada'),
	// 	this.createCard('Mantenimiento señalización', 'manSenal2020', 'adjudicada'),
	// 	this.createCard('Ordenación de equipamiento público en Villas del Este', 'villasDelEste2023', 'terminada'),
	// 	this.createCard('Plaza Venus', 'plazaVenus2023', 'adjudicada'),
	// 	this.createCard('Reforma integral de Plaza Madrid', 'plazaMadrid2023', 'pendiente'),
	// 	this.createCard('Reforma cubiertas Palacio Villapanés', 'palacioVillapanes2023', 'pendiente'),
	// 	this.createCard('Recogida animales perdidos', 'animalesPerdidos2023', 'adjudicada'),
	// 	this.createCard('Suministro de equipos de protección individual (EPIS)', 'epis2023', 'adjudicada'),
	// 	this.createCard('Montaje palcos Semana Santa', 'palcos2023', 'adjudicada'),
	// 	this.createCard('Renting vehiculos policía local', 'vehiculosPolicia2024', 'adjudicada'),
	// 	this.createCard('Servicios de vigilancia de seguridad y de auxiliares de control', 'vigilancia2024', 'licitada'),
	// 	this.createCard('Instalación aire acondicionado Teatro Villmarta', 'climatizacionVillamarta2024', 'licitada'),
	// 	this.createCard('Suministro de alimentos con destino Parque Zoológico', 'alimentosZoo2024', 'licitada'),
	// 	this.createCard('Renovación de Licencias Cytomic. Ciberseguridad', 'licenciasCytomic2024', 'terminada'),
	// 	this.createCard(
	// 		'Servicio y suministro para el control del consumo de drogas',
	// 		'controlConsumoDrogas2024',
	// 		'licitada'
	// 	)
	// ];

	// licitacionesCEEAll = [
	// 	this.createCard('Reordenación Puerta Sevilla-Puerta Santiago 1ª fase', 'puertaSevilla2023', 'adjudicada'),
	// 	this.createCard('Contenedores orgánica', 'contenedoresOrganica2023', 'adjudicada'),
	// 	this.createCard('Rehabilitacion CEIP Nebrija', 'rehabilitacionCEIPNebrija2023', 'adjudicada'),
	// 	this.createCard('Remodelación plaza del Mercado', 'plazaMercado2023', 'adjudicada'),
	// 	this.createCard('Centro cultural Lola Flores', 'centroCulturalLolaFlores2023'),
	// 	this.createCard('Mejora parque Scout', 'parqueScout2023', 'adjudicada'),
	// 	this.createCard('Adaptación Parque Williams ', 'parqueWilliams2023', 'adjudicada'),
	// 	this.createCard('Proyecto Smart City Jerez (fase 1 y fase 2)', 'smartCity2023', 'adjudicada'),
	// 	this.createCard(
	// 		'Obras reforma y mejora de la eficiencia energética del CEIP Tartessos',
	// 		'rehabilitacionCEIPTartessos2023',
	// 		'adjudicada'
	// 	),
	// 	this.createCard('Sistema información para la Policia Local', 'sistemaInformacionPoliciaLocal2023', 'adjudicada'),
	// 	this.createCard(
	// 		'Suministro equipos audio, vídeo y fotografía (Plataforma Smart City)',
	// 		'audioVideoSmartCity2023',
	// 		'adjudicada'
	// 	),
	// 	this.createCard(
	// 		'Suministro de equipamiento informático (hardware y software).',
	// 		'equiposInformaticos2023',
	// 		'adjudicada'
	// 	),
	// 	this.createCard('Suministro de software BIM (Building Information Modeling) ', 'softwareBIM2023', 'adjudicada'),
	// 	this.createCard('Suministro de un autobús eléctrico 7,50 metros', 'microbusElectrico2023', 'adjudicada'),
	// 	this.createCard('Suministro de equipos de topografía', 'equiposTopografia2023', 'adjudicada'),
	// 	this.createCard('Espacios de sombra en Plaza Belén', 'plazaBelen2023', 'pendiente'),
	// 	this.createCard('Reparación cubierta sala Pescaderia Vieja', 'salaPescaderia2023', 'adjudicada')
	// ];

	// licitacionesESP = [];

	// licitacionesDiputacionAll = [
	// 	this.createCard('Mejoras instalaciones Complejo “Pedro Garrido”', 'pedroGarrido2023', 'adjudicada'),
	// 	this.createCard('Conservación preventiva Palacio Riquelme', 'palacioRiquelme2023', 'adjudicada'),
	// 	this.createCard('Reparación y conservación en la Torre de la Atalaya', 'torreAtalaya2023', 'adjudicada'),
	// 	this.createCard('Mejoras Complejo Deportivo “Manuel Mestre”', 'piscinaManuelMestre2023', 'adjudicada'),
	// 	this.createCard('Parque San Telmo', 'parqueSanTelmo2023', 'adjudicada'),
	// 	this.createCard('Reordenación Puerta Sevilla-Puerta Santiago 2ª fase', 'puertaSevilla22023', 'adjudicada'),
	// 	this.createCard('Reordenación calles Barranco y Doctor Lillo', 'callesBarrancoyDoctorLillo', 'adjudicada'),
	// 	this.createCard(
	// 		'Dotación de pasillo cubierto en el CEIP Las Granjas.',
	// 		'pasilloCubiertoCEIPLasGranjas2023',
	// 		'adjudicada'
	// 	),
	// 	this.createCard('Bulevar entre las calles Oro y Almargen', 'bulevarOroAlmargen', 'adjudicada'),
	// 	this.createCard('Adecuación de parcela en Avda de las Acacias', 'acacias2023', 'adjudicada'),
	// 	this.createCard('Perimetro del Complejo Deportivo y Estadio Chapín', 'perimetroChapin2022', 'adjudicada'),
	// 	this.createCard('Restauración del templete municipal de la Alameda Vieja', 'templeteAlamedaVieja2023', 'pendiente'),
	// 	this.createCard('Proyecto para albergue para mujeres solas o con responsabilidades', 'albergue2023', 'adjudicada')
	// ];

	// licitacionesSolaresAll = [
	// 	this.createCard('Calle Morla 1', 'subastaInmuebleMorla1', 'licitada'),
	// 	this.createCard('Calle Porvenir 32', 'subastaInmueblePorvenir32', 'licitada'),
	// 	this.createCard('Calle Tirso de Molina 16', 'subastaInmuebleTirsoDeMolina16', 'licitada')
	// ];

	async ngOnInit() {
		await this.getFromSupabase();
		this.licitacionesAyto = this.licitacionesAytoAll;
		this.licitacionesCEE = this.licitacionesCEEAll;
		this.licitacionesDiputacion = this.licitacionesDiputacionAll;
		this.licitacionesSolares = this.licitacionesSolaresAll;
		this.licitacionesAll = this.getAllLicitaciones();
	}

	async getFromSupabase() {
		this.licitacionesAytoAll = await this._supabaseService.fetchDataByFinanciacion('ayuntamiento');
		console.log('licitacionesAytoAll', this.licitacionesAytoAll);
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
			estado: estado // Incluye 'estado' en el objeto retornado
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
