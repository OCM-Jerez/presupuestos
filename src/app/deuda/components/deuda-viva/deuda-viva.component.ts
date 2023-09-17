import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

interface INew {
	date: string;
	medio: string;
	title: string;
	URL?: string;
}

@Component({
	selector: 'app-deuda-viva',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './deuda-viva.component.html',
	styleUrls: ['./deuda-viva.component.scss']
})
export default class DeudaVivaComponent implements OnInit {
	private _location = inject(Location);

	public news: INew[] = [];

	async ngOnInit() {
		try {
			const response = await fetch('/assets/deuda/deudaViva/deudaVivaNews.json');
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
