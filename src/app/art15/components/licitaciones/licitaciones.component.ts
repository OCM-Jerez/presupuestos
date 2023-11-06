import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

@Component({
	selector: 'app-licitaciones',
	standalone: true,
	imports: [NgFor, FormsModule, CardMenuComponent],
	templateUrl: './licitaciones.component.html',
	styleUrls: ['./licitaciones.component.scss']
})
export default class LicitacionesComponent {
	private _router = inject(Router);
	public searchText: string;

	OCM = [
		{
			titulo: 'APP OCM',
			rutaImagen: 'assets/licitaciones/appConOCM.jpg',
			funcion: () => window.open('https://con.ocmjerez.org/', '_blank')
		}
	];

	licitacionesCEE = [
		this.createCard('Reordenación Puerta Sevilla-Puerta Santiago 1ª fase', 'puertaSevilla2023'),
		this.createCard('Contenedores orgánica', 'contenedoresOrganica2023'),
		this.createCard('Rehabilitacion CEIP Nebrija', 'rehabilitacionCEIPNebrija2023'),
		this.createCard('Remodelación plaza del Mercado', 'plazaMercado2023'),
		this.createCard('Centro cultural Lola Flores', 'CentroCulturalLolaFlores2020'),
		this.createCard('Mejora parque Scout', 'parqueScout2023'),
		this.createCard('Adaptación Parque Williams ', 'parqueWilliams2023'),
		this.createCard('Proyecto Smart City Jerez (fase 1 y fase 2)', 'smartCity2023'),
		this.createCard(
			'Obras reforma y mejora de la eficiencia energética del CEIP Tartessos',
			'rehabilitacionCEIPTartessos2023'
		),
		this.createCard('Sistema información para la Policia Local', 'sistemaInformacionPoliciaLocal2023'),
		this.createCard('Suministro equipos audio, vídeo y fotografía (Plataforma Smart City)', 'audioVideoSmartCity2023'),
		this.createCard('Suministro de equipamiento informático (hardware y software).', 'equiposInformaticos2023'),
		this.createCard('Suministro de software BIM (Building Information Modeling) ', 'softwareBIM2023')
	];

	licitacionesESP = [];

	licitacionesDiputacion = [
		this.createCard('Mejoras instalaciones Complejo “Pedro Garrido”', 'pedroGarrido2023'),
		this.createCard('Conservación preventiva Palacio Riquelme', 'palacioRiquelme2023'),
		this.createCard('Reparación y conservación en la Torre de la Atalaya', 'torreAtalaya2023'),
		this.createCard('Mejoras Complejo Deportivo “Manuel Mestre”', 'piscinaManuelMestre2023'),
		this.createCard('Parque San Telmo', 'parqueSanTelmo2023'),
		this.createCard('Reordenación Puerta Sevilla-Puerta Santiago 2ª fase', 'puertaSevilla22023'),
		this.createCard('Reordenación calles Barranco y Doctor Lillo', 'callesBarrancoyDoctorLillo'),
		this.createCard('Dotación de pasillo cubierto en el CEIP Las Granjas.', 'pasilloCubiertoCEIPLasGranjas2023'),
		this.createCard('Bulevar entre las calles Oro y Almargen', 'bulevarOroAlmargen'),
		this.createCard('Adecuación de parcela en Avda de las Acacias', 'acacias2023'),
		this.createCard('Perimetro del Complejo Deportivo y Estadio Chapín', 'perimetroChapin2022'),
		this.createCard('Restauración del templete municipal de la Alameda Vieja', 'templeteAlamedaVieja2023')
	];

	licitacionesAyto = [
		this.createCard('Las Calandrias', 'lasCalandrias2023'),
		this.createCard('Mantenimiento señalización', 'manSeñal2020'),
		this.createCard('Parque La Canaleja', 'laCanaleja2023'),
		this.createCard('Ordenación de equipamiento público en Villas del Este', 'villasDelEste2023'),
		this.createCard('Plaza Venus', 'plazaVenus2023'),
		this.createCard('Reforma integral de Plaza Madrid', 'plazaMadrid2023'),
		this.createCard('Reforma cubiertas Palacio Villapanés', 'palacioVillapanes2023')
	];

	createCard(titulo: string, route: string) {
		return {
			titulo,
			rutaImagen: `assets/licitaciones/${route}/${route}.jpg`,
			funcion: () => this._router.navigateByUrl(`/licitaciones/${route}`),
			highlighted: false
		};
	}

	filterData() {
		const lowercasedFilter = this.searchText.toLowerCase();
		console.log('lowercasedFilter', lowercasedFilter);

		if (!this.searchText) {
			this.resetFilter();
		} else {
			this.applyFilter(lowercasedFilter);
		}
	}

	resetFilter() {
		[
			...this.licitacionesCEE,
			...this.licitacionesESP,
			...this.licitacionesDiputacion,
			...this.licitacionesAyto
		].forEach((licitacion) => {
			licitacion.highlighted = false;
		});
	}

	applyFilter(filterValue: string) {
		const allLicitaciones = [
			...this.licitacionesCEE,
			...this.licitacionesESP,
			...this.licitacionesDiputacion,
			...this.licitacionesAyto
		];

		allLicitaciones.forEach((licitacion) => {
			licitacion.highlighted = licitacion.titulo.toLowerCase().includes(filterValue);
			console.log('licitacion', licitacion);
		});
	}
}
