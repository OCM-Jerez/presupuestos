import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { CardLicitacionComponent } from './components/card-licitacion/card-licitacion.component';

const defaultBackground = 'linear-gradient(to bottom, #1C1F26 , #4D4E50)';

@Component({
	selector: 'app-licitaciones',
	standalone: true,
	imports: [CommonModule, CardLicitacionComponent],
	templateUrl: './licitaciones.component.html',
	styleUrls: ['./licitaciones.component.scss']
})
export default class LicitacionesComponent {
	private _router = inject(Router);

	cardMenus = [
		{
			titulo: 'APP OCM',
			rutaImagen: 'assets/licitaciones/appConOCM.jpg',
			funcion: () => window.open('https://con.ocmjerez.org/', '_blank'),
			background: defaultBackground
		},
		this.createCard('Mantenimiento señalización', 'manSeñal2020'),
		this.createCard('Reordenación Puerta Sevilla', 'puertaSevilla2023'),
		this.createCard('Parque La Canaleja', 'laCanaleja2023'),
		this.createCard('Plaza Venus', 'plazaVenus2023'),
		this.createCard('Las Calandrias', 'lasCalandrias2023'),
		this.createCard('Contenedores orgánica', 'contenedoresOrganica2023'),
		this.createCard('Rehabilitacion CEIP Nebrija', 'rehabilitacionCEIPNebrija2023'),
		this.createCard('Remodelación plaza del Mercado', 'plazaMercado2023'),
		this.createCard('Centro cultural Lola Flores', 'CentroCulturalLolaFlores2020'),
		this.createCard('Mejora parque Scout', 'parqueScout2023'),
		this.createCard('Adaptación Parque Williams ', 'parqueWilliams2023'),
		this.createCard('Parque San Telmo', 'parqueSanTelmo2023'),
		this.createCard('Bulevar entre las calles Oro y Almargen', 'bulevarOroAlmargen'),
		this.createCard(
			'Proyecto de reordenación de la Calle Barranco y espacio libre de la calle Doctor Lillo',
			'callesBarrancoyDoctorLillo'
		),
		this.createCard('Reforma integral de Plaza Madrid', 'plazaMadrid2023'),
		this.createCard('Restauración del templete municipal de la Alameda Vieja', 'templeteAlamedaVieja2023'),
		this.createCard('Reforma cubiertas Palacio Villapanés', 'palacioVillapanes2023'),
		this.createCard('Ordenación de equipamiento público en Villas del Este', 'villasDelEste2023'),
		this.createCard(
			'Intervención del área perimetral y anexas del Complejo Deportivo y Estadio Chapín',
			'perimetroChapin2022'
		),
		this.createCard('Adecuación de parcela en Avda de las Acacias', 'acacias2023'),
		this.createCard(
			'Mejoras de las instalaciones deportivas y adyacentes del Complejo de la Juventud “Pedro Garrido” en 1ª y 2ª Fase',
			'pedroGarrido2023'
		),
		this.createCard(
			'Mejoras y nuevas instalaciones deportivas y el desarrollo de zonas adyacentes, inclusivos, lúdicos, intergeneracionales y no federados, del Complejo Deportivo “Manuel Mestre”',
			'piscinaManuelMestre2023'
		)
	];

	createCard(titulo: string, route: string) {
		return {
			titulo,
			// Tamaño de la imagen 910x682
			rutaImagen: `assets/licitaciones/${route}/${route}.jpg`,
			funcion: () => this._router.navigateByUrl(`/licitacion/${route}`),
			background: defaultBackground
		};
	}
}
