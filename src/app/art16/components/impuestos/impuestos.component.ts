import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

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
	selector: 'app-impuestos',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './impuestos.component.html',
	styleUrls: ['./impuestos.component.scss']
})
export default class ImpuestosComponent implements OnInit {
	private _location = inject(Location);

	public docs: IDoc[] = [];
	public coms: ICom[] = [];
	public news: INew[] = [];

	async ngOnInit() {
		const pathBase = '/assets/art16/impuestos/impuestos';

		try {
			const response = await fetch(`${pathBase}Docs.json`);
			const data = await response.json();
			this.docs = data;
		} catch (error) {
			console.error('Error fetching news data:', error);
		}

		try {
			const response = await fetch(`${pathBase}Coms.json`);
			const data = await response.json();
			this.coms = data;
		} catch (error) {
			console.error('Error fetching news data:', error);
		}

		try {
			const response = await fetch(`${pathBase}News.json`);
			const data = await response.json();
			this.news = data;
		} catch (error) {
			console.error('Error fetching news data:', error);
		}
	}
}
