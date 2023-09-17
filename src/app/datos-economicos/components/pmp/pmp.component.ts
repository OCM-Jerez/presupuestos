import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

interface INew {
	date: string;
	medio: string;
	title: string;
	URL?: string;
}

@Component({
	selector: 'app-pmp',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './pmp.component.html',
	styleUrls: ['./pmp.component.scss']
})
export default class PmpComponent implements OnInit {
	private _location = inject(Location);

	public news: INew[] = [];

	async ngOnInit() {
		try {
			const response = await fetch('/assets/datosEconomicos/pmp/pmpNews.json');
			const data = await response.json();
			this.news = data;
		} catch (error) {
			console.error('Error fetching news data:', error);
		}
	}

	volver() {
		this._location.back();
	}
}
