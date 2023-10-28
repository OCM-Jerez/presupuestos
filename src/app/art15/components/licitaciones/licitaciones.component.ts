import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

// const defaultBackground = 'linear-gradient(to bottom, #1C1F26 , #4D4E50)';

@Component({
	selector: 'app-licitaciones',
	standalone: true,
	imports: [CommonModule, CardMenuComponent],
	templateUrl: './licitaciones.component.html',
	styleUrls: ['./licitaciones.component.scss']
})
export default class LicitacionesComponent {
	private _router = inject(Router);

	cardMenus = [
		{
			titulo: 'APP OCM',
			rutaImagen: 'assets/licitaciones/appConOCM.jpg',
			funcion: () => window.open('https://con.ocmjerez.org/', '_blank')
			// background: defaultBackground
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
		this.createCard('Reordenación calles Barranco y Doctor Lillo', 'callesBarrancoyDoctorLillo'),
		this.createCard('Reforma integral de Plaza Madrid', 'plazaMadrid2023'),
		this.createCard('Restauración del templete municipal de la Alameda Vieja', 'templeteAlamedaVieja2023'),
		this.createCard('Reforma cubiertas Palacio Villapanés', 'palacioVillapanes2023'),
		this.createCard('Ordenación de equipamiento público en Villas del Este', 'villasDelEste2023'),
		this.createCard('Perimetro del Complejo Deportivo y Estadio Chapín', 'perimetroChapin2022'),
		this.createCard('Adecuación de parcela en Avda de las Acacias', 'acacias2023'),
		this.createCard('Mejoras instalaciones Complejo “Pedro Garrido”', 'pedroGarrido2023'),
		this.createCard('Mejoras Complejo Deportivo “Manuel Mestre”', 'piscinaManuelMestre2023'),
		this.createCard('Reparación y conservación en la Torre de la Atalaya', 'torreAtalaya2023'),
		this.createCard('Dotación de pasillo cubierto en el CEIP Las Granjas.', 'pasilloCubiertoCEIPLasGranjas2023'),
		this.createCard('Proyecto Smart City Jerez (fase 1 y fase 2)', 'smartCity2023'),
		this.createCard(
			'Obras reforma y mejora de la eficiencia energética del CEIP Tartessos',
			'rehabilitacionCEIPTartessos2023'
		)
	];

	createCard(titulo: string, route: string) {
		return {
			titulo,
			// Tamaño de la imagen 910x682
			rutaImagen: `assets/licitaciones/${route}/${route}.jpg`,
			funcion: () => this._router.navigateByUrl(`/licitacion/${route}`)
			// background: defaultBackground
		};
	}
}
