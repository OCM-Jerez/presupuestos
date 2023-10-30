import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IDoc } from '@interfaces/doc.interface';
import { INew } from '@interfaces/new.interface';

@Component({
	selector: 'app-fondo-ordenacion',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './fondo-ordenacion.component.html',
	styleUrls: ['./fondo-ordenacion.component.scss']
})
export default class FondoOrdenacionComponent implements OnInit {
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
}
