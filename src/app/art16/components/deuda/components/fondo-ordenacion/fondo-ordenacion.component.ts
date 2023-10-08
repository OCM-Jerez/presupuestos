import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

interface IDoc {
	date: string;
	emisor: string;
	title: string;
	URL?: string;
}

interface INew {
	date: string;
	medio: string;
	title: string;
	URL?: string;
}

@Component({
	selector: 'app-fondo-ordenacion',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './fondo-ordenacion.component.html',
	styleUrls: ['./fondo-ordenacion.component.scss']
})
export default class FondoOrdenacionComponent implements OnInit {
	private _location = inject(Location);

	public docs: IDoc[] = [];
	public news: INew[] = [];

	async ngOnInit() {
		try {
			const response = await fetch('/assets/deuda/fondoOrdenacion/fondoOrdenacionDocs.json');
			const data = await response.json();
			this.docs = data;
		} catch (error) {
			console.error('Error fetching news data:', error);
		}

		try {
			const response = await fetch('/assets/deuda/fondoOrdenacion/fondoOrdenacionNews.json');
			const data = await response.json();
			this.news = data;
		} catch (error) {
			console.error('Error fetching news data:', error);
		}
	}

	// volver() {
	// 	this._location.back();
	// }
}
