import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';

import { CardDeudaComponent } from '../../components/card-deuda/card-deuda.component';

const defaultBackground = 'linear-gradient(to bottom, #1C1F26 , #4D4E50)';

interface IDoc {
	date: string;
	emisor: string;
	title: string;
	URL?: string;
}

interface ICom {
	date: string;
	emisor: string;
	texto: string;
}

interface INew {
	date: string;
	medio: string;
	title: string;
	URL?: string;
}

@Component({
	selector: 'app-plan-ajuste',
	standalone: true,
	imports: [CommonModule, CardDeudaComponent],
	templateUrl: './plan-ajuste.component.html',
	styleUrls: ['./plan-ajuste.component.scss']
})
export default class PlanAjusteComponent implements OnInit {
	private _location = inject(Location);
	private _router = inject(Router);

	public docs: IDoc[] = [];
	public coms: ICom[] = [];
	public news: INew[] = [];

	async ngOnInit() {
		try {
			const response = await fetch('/assets/deuda/planAjuste/planAjusteDocs.json');
			const data = await response.json();
			this.docs = data;
		} catch (error) {
			console.error('Error fetching news data:', error);
		}

		try {
			const response = await fetch('/assets/deuda/planAjuste/planAjusteComs.json');
			const data = await response.json();
			this.coms = data;
		} catch (error) {
			console.error('Error fetching news data:', error);
		}

		try {
			const response = await fetch('/assets/deuda/planAjuste/planAjusteNews.json');
			const data = await response.json();
			this.news = data;
		} catch (error) {
			console.error('Error fetching news data:', error);
		}
	}

	cardMenus = [
		this.createCard('Revisión 18/09/2023', 'planAjuste20230918'),
		this.createCard('Revisión 18/09/2023', 'planAjuste20230918')
	];

	createCard(titulo: string, route: string) {
		this._location.go('/deuda');
		return {
			titulo,
			// Tamaño de la imagen 910x682
			rutaImagen: `assets/deuda/planAjuste/${route}/${route}.jpg`,
			funcion: () => this._router.navigateByUrl(`/deuda/${route}`),
			background: defaultBackground
		};
	}

	volver() {
		this._location.back();
	}
}
