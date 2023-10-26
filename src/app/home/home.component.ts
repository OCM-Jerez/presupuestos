import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';

import { CardMenuComponent } from '../commons/components/card-menu/card-menu.component';

const defaultBackground = 'linear-gradient(to bottom, #1C1F26 , #4D4E50)';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	standalone: true,
	imports: [NgFor, CardMenuComponent]
})
export default class HomeComponent {
	private _router = inject(Router);

	cardMenus = [
		this.createCardMenu(
			'Artículo 10. Información institucional y organizativa.',
			// '/art10',
			'/level1',
			'assets/art10/ayto.webp',
			''
		),
		this.createCardMenu(
			'Artículo 11. Información sobre altos cargos y personas que ejerzan la máxima responsabilidad de las entidades incluidas en el ámbito de aplicación de la Ley.',
			'/art11',
			'assets/art11/art11.jpg',
			''
		),
		this.createCardMenu(
			'Artículo 12. Información sobre planificación y evaluación.',
			'/art12',
			'assets/art12/art12.jpg',
			''
		),
		this.createCardMenu('Artículo 13. Información de relevancia jurídica.', '/art13', 'assets/art13/art13.jpg', ''),
		this.createCardMenu(
			'Artículo 14. Información sobre procedimientos, cartas de servicio y participación ciudadana.',
			'/art14',
			'assets/art14/art14.jpg',
			''
		),
		this.createCardMenu(
			'Artículo 15. Información sobre contratos, convenios y subvenciones.',
			'/art15',
			'assets/art15/art15.jpg',
			''
		),
		this.createCardMenu(
			'Artículo 16. Información económica, financiera y presupuestaria.',
			'/art16',
			'assets/art16/art16.jpg',
			''
		),
		this.createCardMenu(
			'Medioambiental, urbanística y vivienda',
			'/medioambiental',
			'assets/medioambiental/medioambiental.jpg',
			''
		),
		this.createCardMenu('Eventos culturales', '/eventos', 'assets/eventos/feria/feria.jpg', 'Navidad, feria, etc   .'),

		this.createCardMenu(
			'Temas generales',
			'/temas',
			'assets/temas/ifeca/ifeca.jpg',
			'Temas no incluidos en otros apartados'
		),

		this.createCardMenu(
			'Distritos y barrios',
			'/distritos',
			'assets/distritos/distritos.jpg',
			'Información georeferenciada sobre distritos y barrios'
		)
	];

	// createCardMenu(titulo: string, ruta: string, rutaImagen: string, subtitulo: string) {
	// 	return {
	// 		rutaImagen,
	// 		titulo,
	// 		subtitulo,
	// 		textButton: titulo,
	// 		background: defaultBackground,
	// 		funcion: () => this.navigate(ruta)
	// 	};
	// }

	createCardMenu(titulo: string, route: string, rutaImagen: string, subtitulo: string) {
		let cardMenus;
		switch (titulo) {
			case 'Artículo 10. Información institucional y organizativa.':
				cardMenus = [
					{
						titulo: 'Información institucional',
						route: '/infoIntitucional',
						rutaImagen: `assets/art10/infoInstitucional/plenos/plenos.png`
					},
					{
						titulo: 'Información organizativa',
						route: '/infoOrganizativa',
						rutaImagen: 'assets/art10/infoOrganizativa/infoOrganizativa.jpg'
					}
				];
				break;
			case 'Artículo 15. Información sobre contratos, convenios y subvenciones.':
				cardMenus = [
					{
						titulo: 'Licitaciones',
						route: '/licitaciones',
						rutaImagen: 'assets/img/home/menu3-400x250.webp'
					},
					{
						titulo: 'Subvenciones',
						route: '/subvenciones',
						rutaImagen: 'assets/subvenciones/subvenciones.jpg'
					}
				];
				break;
			case 'Artículo 16. Información económica, financiera y presupuestaria.':
				cardMenus = [
					{
						titulo: 'Presupuestos',
						route: '/presupuestos',
						rutaImagen: 'assets/img/home/menu1-400x250.webp'
					},
					{
						titulo: 'Deuda',
						route: '/deuda',
						rutaImagen: 'assets/deuda/deuda.jpg'
					},
					{
						titulo: 'PMP',
						route: '/pmp',
						rutaImagen: 'assets/datosEconomicos/pmp/pmp.jpg'
					},
					{
						titulo: 'Impuestos',
						route: '/impuestos',
						rutaImagen: 'assets/art16/impuestos/impuestos.jpg'
					}
				];
				break;
			case 'Medioambiental, urbanística y vivienda':
				cardMenus = [
					{
						titulo: 'Edificios singulares',
						route: '/edificiosSingulares',
						rutaImagen: 'assets/edificiosSingulares/palacioRiquelme/palacioRiquelme.jpg'
					},
					{
						titulo: 'Apartamentos turísticos',
						route: '/apartamentosTuristicos',
						rutaImagen: 'assets/medioambiental/apartamentosTuristicos/apartamentosTuristicos.jpg'
					},
					{
						titulo: 'Proyectos construcción de viviendas',
						route: '/proyectosViviendas',
						rutaImagen: 'assets/medioambiental/proyectosViviendas/proyectosViviendas.jpg'
					}
				];
				break;
			case 'Eventos culturales':
				cardMenus = [
					{
						titulo: 'Festival de Jerez',
						route: '/eventos/festivalJerez',
						rutaImagen: 'assets/eventos/festivalJerez/festivalJerez.jpg'
					},
					{
						titulo: 'Feria',
						route: '/eventos/feria',
						rutaImagen: 'assets/eventos/feria/feria.jpg'
					},
					{
						titulo: 'Festival Internacional de titeres',
						route: '/eventos/titeres',
						rutaImagen: 'assets/eventos/titeres/titeres.jpg'
					},
					{
						titulo: 'Feria del libro',
						route: '/eventos/feriaLibro',
						rutaImagen: 'assets/eventos/feriaLibro/feriaLibro.jpg'
					},
					{
						titulo: 'Navidad',
						route: '/eventos/Navidad',
						rutaImagen: 'assets/eventos/Navidad/Navidad.jpg'
					}
				];
				break;
			case 'Temas generales':
				cardMenus = [
					{
						titulo: 'Museo del Flamenco',
						route: '/temas/museoFlamenco',
						rutaImagen: 'assets/temas/museoFlamenco/museoFlamenco.jpg'
					},
					{
						titulo: 'Museo del belén',
						route: '/temas/museoBelen',
						rutaImagen: 'assets/temas/museoBelen/museoBelen.jpg'
					},
					{
						titulo: 'Mesa del Caballo',
						route: '/temas/mesaCaballo',
						rutaImagen: 'assets/temas/mesaCaballo/mesaCaballo.jpg'
					},
					{
						titulo: 'Asesores',
						route: '/temas/asesores',
						rutaImagen: 'assets/temas/asesores/asesores.jpg'
					},
					{
						titulo: 'Asta Regia',
						route: '/temas/astaRegia',
						rutaImagen: 'assets/temas/astaRegia/astaRegia.jpg'
					},
					{
						titulo: 'Ifeca',
						route: '/temas/ifeca',
						rutaImagen: 'assets/temas/ifeca/ifeca.jpg'
					},
					{
						titulo: 'Arboles',
						route: '/temas/arboles',
						rutaImagen: 'assets/temas/arboles/arboles.jpg'
					},
					{
						titulo: 'Oficina de memoria democrática',
						route: '/temas/oficinaMemoriaDemocratica',
						rutaImagen: 'assets/temas/oficinaMemoriaDemocratica/oficinaMemoriaDemocratica.jpg'
					},
					{
						titulo: 'Declaraciones políticos',
						route: '/temas/declaracionesPoliticos',
						rutaImagen: 'assets/temas/declaracionesPoliticos/declaracionesPoliticos.jpg'
					},
					{
						titulo: 'Plantas fotovoltaicas y parques eólicos',
						route: '/temas/parquesEolicosFotovoltaicos',
						rutaImagen: 'assets/temas/parquesEolicosFotoVoltaicos/parquesEolicosFotoVoltaicos.jpg'
					},
					{
						titulo: 'Aeropuerto',
						route: '/temas/aeropuerto',
						rutaImagen: 'assets/temas/aeropuerto/aeropuerto.jpg'
					}
				];
				break;
			case 'Distritos y barrios':
				cardMenus = [
					{
						titulo: 'Distrito Centro',
						route: '/distritos/distritoCentro',
						rutaImagen: 'assets/distritos/distritoCentro/distritoCentro.jpg'
					},
					{
						titulo: 'Distrito Norte',
						route: '/distritos/distritoNorte',
						rutaImagen: 'assets/distritos/distritoNorte/distritoNorte.jpg'
					},
					{
						titulo: 'Distrito Sur',
						route: '/distritos/distritoSur',
						rutaImagen: 'assets/distritos/distritoSur/distritoSur.jpg'
					},
					{
						titulo: 'Distrito Este',
						route: '/distritos/distritoEste',
						rutaImagen: 'assets/distritos/distritoEste/distritoEste.jpg'
					},
					{
						titulo: 'Distrito Oeste',
						route: '/distritos/distritoOeste',
						rutaImagen: 'assets/distritos/distritoOeste/distritoOeste.jpg'
					},
					{
						titulo: 'Distrito Noreste',
						route: '/distritos/distritoNoreste',
						rutaImagen: 'assets/distritos/distritoNoreste/distritoNoreste.jpg'
					},
					{
						titulo: 'Distrito Rural',
						route: '/distritos/distritoRural',
						rutaImagen: 'assets/distritos/distritoRural/distritoRural.jpg'
					}
				];
				break;

			default:
				break;
		}

		return {
			rutaImagen,
			titulo,
			subtitulo,
			textButton: titulo,
			background: defaultBackground, // Assuming defaultBackground is an instance variable
			funcion: () => {
				// Use NavigationExtras to pass cardMenus as queryParams
				const navigationExtras = {
					queryParams: { cardMenus: JSON.stringify(cardMenus), titulo: titulo }
				};
				this._router.navigate(['/level1'], navigationExtras);
			}
		};
	}

	// navigate(ruta: string) {
	// 	this._router.navigateByUrl(ruta);
	// }
}
