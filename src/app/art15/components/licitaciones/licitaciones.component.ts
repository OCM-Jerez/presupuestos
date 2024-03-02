import { Component, OnInit, inject } from '@angular/core';
import { NgClass } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { environment } from '@environments/environment';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

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
	private _router = inject(Router);
	private _tagStoreService = inject(TagStoreService);
	private _titleStoreService = inject(TitleStoreService);
	private _pathStoreService = inject(PathStoreService);
	private getAllLicitaciones() {
		return [...this.licitacionesCEE, ...this.licitacionesESP, ...this.licitacionesDiputacion, ...this.licitacionesAyto];
	}
	public licitacionesAyto = [];
	public licitacionesCEE = [];
	public licitacionesDiputacion = [];
	public licitacionesSolares = [];
	public searchText: string;
	public canAddRowSupabase = environment.canAddRowSupabase;
	public isAyuntamiento = true;
	public isDiputacion = false;
	public isJunta = false;
	public isGobierno = false;
	public isCEE = false;
	public isSolares = false;

	public isTodasAyto = true;
	public isPendientesAyto = false;
	public isLicitacionesAyto = false;
	public isAdjudicadasAyto = false;
	public isTerminadasAyto = false;

	// OCM = [
	// 	{
	// 		titulo: 'APP OCM',
	// 		rutaImagen: environment.pathImgSupabase + 'appConOCM.jpg',
	// 		funcion: () => window.open('https://con.ocmjerez.org/', '_blank')
	// 	}
	// ];

	licitacionesAytoAll = [
		this.createCard('Recogida residuos + limpieza viaria', 'recogidaResiduos2019', 'adjudicada'),
		this.createCard('Parque Salud Pérez Leytón', 'parqueSaludPerezLeyton2022', 'adjudicada'),
		this.createCard('Mantenimiento señalización', 'manSenal2020', 'adjudicada'),
		this.createCard('Ordenación de equipamiento público en Villas del Este', 'villasDelEste2023', 'terminada'),
		this.createCard('Plaza Venus', 'plazaVenus2023', 'adjudicada'),
		this.createCard('Reforma integral de Plaza Madrid', 'plazaMadrid2023', 'pendiente'),
		this.createCard('Reforma cubiertas Palacio Villapanés', 'palacioVillapanes2023', 'pendiente'),
		this.createCard('Recogida animales perdidos', 'animalesPerdidos2023', 'adjudicada'),
		this.createCard('Suministro de equipos de protección individual (EPIS)', 'epis2023', 'adjudicada'),
		this.createCard('Montaje palcos Semana Santa', 'palcos2023', 'adjudicada'),
		this.createCard('Renting vehiculos policía local', 'vehiculosPolicia2024', 'adjudicada'),
		this.createCard('Servicios de vigilancia de seguridad y de auxiliares de control', 'vigilancia2024', 'licitada'),
		this.createCard('Instalación aire acondicionado Teatro Villmarta', 'climatizacionVillamarta2024', 'licitada'),
		this.createCard('Suministro de alimentos con destino Parque Zoológico', 'alimentosZoo2024', 'licitada'),
		this.createCard('Renovación de Licencias Cytomic. Ciberseguridad', 'ciberseguridad2024', 'licitada'),
		this.createCard(
			'Servicio y suministro para el control del consumo de drogas',
			'controlConsumoDrogas2024',
			'licitada'
		)
	];

	licitacionesCEEAll = [
		this.createCard('Reordenación Puerta Sevilla-Puerta Santiago 1ª fase', 'puertaSevilla2023', 'adjudicada'),
		this.createCard('Contenedores orgánica', 'contenedoresOrganica2023', 'adjudicada'),
		this.createCard('Rehabilitacion CEIP Nebrija', 'rehabilitacionCEIPNebrija2023', 'adjudicada'),
		this.createCard('Remodelación plaza del Mercado', 'plazaMercado2023', 'adjudicada'),
		this.createCard('Centro cultural Lola Flores', 'centroCulturalLolaFlores2023'),
		this.createCard('Mejora parque Scout', 'parqueScout2023', 'adjudicada'),
		this.createCard('Adaptación Parque Williams ', 'parqueWilliams2023', 'adjudicada'),
		this.createCard('Proyecto Smart City Jerez (fase 1 y fase 2)', 'smartCity2023', 'adjudicada'),
		this.createCard(
			'Obras reforma y mejora de la eficiencia energética del CEIP Tartessos',
			'rehabilitacionCEIPTartessos2023',
			'adjudicada'
		),
		this.createCard('Sistema información para la Policia Local', 'sistemaInformacionPoliciaLocal2023', 'adjudicada'),
		this.createCard(
			'Suministro equipos audio, vídeo y fotografía (Plataforma Smart City)',
			'audioVideoSmartCity2023',
			'adjudicada'
		),
		this.createCard(
			'Suministro de equipamiento informático (hardware y software).',
			'equiposInformaticos2023',
			'adjudicada'
		),
		this.createCard('Suministro de software BIM (Building Information Modeling) ', 'softwareBIM2023', 'adjudicada'),
		this.createCard('Suministro de un autobús eléctrico 7,50 metros', 'microbusElectrico2023', 'adjudicada'),
		this.createCard('Suministro de equipos de topografía', 'equiposTopografia2023', 'adjudicada'),
		this.createCard('Espacios de sombra en Plaza Belén', 'plazaBelen2023', 'adjudicada'),
		this.createCard('Reparación cubierta sala Pescaderia Vieja', 'salaPescaderia2023', 'adjudicada')
	];

	licitacionesESP = [];

	licitacionesDiputacionAll = [
		this.createCard('Mejoras instalaciones Complejo “Pedro Garrido”', 'pedroGarrido2023', 'adjudicada'),
		this.createCard('Conservación preventiva Palacio Riquelme', 'palacioRiquelme2023', 'adjudicada'),
		this.createCard('Reparación y conservación en la Torre de la Atalaya', 'torreAtalaya2023', 'adjudicada'),
		this.createCard('Mejoras Complejo Deportivo “Manuel Mestre”', 'piscinaManuelMestre2023', 'adjudicada'),
		this.createCard('Parque San Telmo', 'parqueSanTelmo2023', 'adjudicada'),
		this.createCard('Reordenación Puerta Sevilla-Puerta Santiago 2ª fase', 'puertaSevilla22023', 'adjudicada'),
		this.createCard('Reordenación calles Barranco y Doctor Lillo', 'callesBarrancoyDoctorLillo', 'adjudicada'),
		this.createCard(
			'Dotación de pasillo cubierto en el CEIP Las Granjas.',
			'pasilloCubiertoCEIPLasGranjas2023',
			'adjudicada'
		),
		this.createCard('Bulevar entre las calles Oro y Almargen', 'bulevarOroAlmargen', 'adjudicada'),
		this.createCard('Adecuación de parcela en Avda de las Acacias', 'acacias2023', 'adjudicada'),
		this.createCard('Perimetro del Complejo Deportivo y Estadio Chapín', 'perimetroChapin2022', 'adjudicada'),
		this.createCard('Restauración del templete municipal de la Alameda Vieja', 'templeteAlamedaVieja2023', 'pendiente'),
		this.createCard('Proyecto para albergue para mujeres solas o con responsabilidades', 'albergue2023', 'adjudicada')
	];

	licitacionesSolaresAll = [
		this.createCard('Calle Morla 1', 'subastaInmuebleMorla1', 'licitada'),
		this.createCard('Calle Porvenir 32', 'subastaInmueblePorvenir32', 'licitada'),
		this.createCard('Calle Tirso de Molina 16', 'subastaInmuebleTirsoDeMolina16', 'licitada')
	];

	ngOnInit(): void {
		this.licitacionesAyto = this.licitacionesAytoAll;
		this.licitacionesCEE = this.licitacionesCEEAll;
		this.licitacionesDiputacion = this.licitacionesDiputacionAll;
		this.licitacionesSolares = this.licitacionesSolaresAll;
	}

	createCard(title: string, tag: string, etapa?: string) {
		return {
			title,
			rutaImagen: environment.pathImgSupabase + tag + '.jpg',
			funcion: () => {
				this._pathStoreService.setPath('licitaciones');
				this._tagStoreService.setTag(tag);
				this._titleStoreService.setTitle(title);
				this._router.navigateByUrl('licitaciones/' + tag);
			},
			highlighted: false,
			etapa: etapa // Incluye 'etapa' en el objeto retornado
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
		// Establece todos los estados a falso inicialmente
		Object.keys(this.estados[tipo]).forEach((key) => {
			this[key] = false;
		});

		// Establece el estado especificado a verdadero
		Object.keys(this.estados[tipo]).forEach((key) => {
			this[key] = this.estados[tipo][key];
		});
	}

	todas(tipo: string) {
		switch (tipo) {
			case 'ayto':
				this.licitacionesAyto = this.licitacionesAytoAll;
				this.isTodasAyto = true;
				this.isLicitacionesAyto = false;
				this.isTerminadasAyto = false;
				this.isAdjudicadasAyto = false;
				this.isPendientesAyto = false;
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

	pendientes(tipo: string) {
		switch (tipo) {
			case 'ayto':
				this.isTodasAyto = false;
				this.licitacionesAyto = this.licitacionesAytoAll.filter((licitacion) => licitacion.etapa === 'pendiente');
				this.isLicitacionesAyto = false;
				this.isTerminadasAyto = false;
				this.isAdjudicadasAyto = false;
				this.isPendientesAyto = true;

				break;
			case 'cee':
				this.licitacionesCEE = this.licitacionesCEEAll.filter((licitacion) => licitacion.etapa === 'pendiente');
				break;
			case 'diputacion':
				this.licitacionesDiputacion = this.licitacionesDiputacionAll.filter(
					(licitacion) => licitacion.etapa === 'pendiente'
				);
				break;
		}
	}

	licitadas(tipo: string) {
		switch (tipo) {
			case 'ayto':
				this.licitacionesAyto = this.licitacionesAytoAll.filter((licitacion) => licitacion.etapa === 'licitada');
				this.isTodasAyto = false;
				this.isLicitacionesAyto = true;
				this.isTerminadasAyto = false;
				this.isAdjudicadasAyto = false;
				this.isPendientesAyto = false;
				break;
			case 'cee':
				this.licitacionesCEE = this.licitacionesCEEAll.filter((licitacion) => licitacion.etapa === 'licitada');
				break;
			case 'diputacion':
				this.licitacionesDiputacion = this.licitacionesDiputacionAll.filter(
					(licitacion) => licitacion.etapa === 'licitada'
				);
				break;
			case 'solares':
				this.licitacionesSolares = this.licitacionesSolaresAll.filter((licitacion) => licitacion.etapa === 'licitada');
				break;
		}
	}
	adjudicadas(tipo: string) {
		switch (tipo) {
			case 'ayto':
				this.licitacionesAyto = this.licitacionesAytoAll.filter((licitacion) => licitacion.etapa === 'adjudicada');
				this.isTodasAyto = false;
				this.isLicitacionesAyto = false;
				this.isTerminadasAyto = false;
				this.isAdjudicadasAyto = true;
				this.isPendientesAyto = false;
				break;
			case 'cee':
				this.licitacionesCEE = this.licitacionesCEEAll.filter((licitacion) => licitacion.etapa === 'adjudicada');
				break;
			case 'diputacion':
				this.licitacionesDiputacion = this.licitacionesDiputacionAll.filter(
					(licitacion) => licitacion.etapa === 'adjudicada'
				);
				break;
		}
	}

	terminadas(tipo: string) {
		switch (tipo) {
			case 'ayto':
				this.licitacionesAyto = this.licitacionesAytoAll.filter((licitacion) => licitacion.etapa === 'terminada');
				this.isTodasAyto = false;
				this.isLicitacionesAyto = false;
				this.isTerminadasAyto = true;
				this.isAdjudicadasAyto = false;
				this.isPendientesAyto = false;
				break;
			case 'cee':
				this.licitacionesCEE = this.licitacionesCEEAll.filter((licitacion) => licitacion.etapa === 'terminada');
				break;
			case 'diputacion':
				this.licitacionesDiputacion = this.licitacionesDiputacionAll.filter(
					(licitacion) => licitacion.etapa === 'terminada'
				);
				break;
			case 'solares':
				this.licitacionesSolares = this.licitacionesSolaresAll.filter((licitacion) => licitacion.etapa === 'terminada');
				break;
		}
	}
}
