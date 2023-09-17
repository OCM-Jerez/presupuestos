import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

interface INew {
	date: string;
	medio: string;
	title: string;
	URL?: string;
}

@Component({
	standalone: true,
	imports: [CommonModule],
	selector: 'app-deuda-total',
	templateUrl: './deudaTotal.component.html',
	styleUrls: ['./deudaTotal.component.scss']
})
export default class DeudaTotalComponent implements OnInit {
	private _location = inject(Location);

	public news: INew[] = [];

	async ngOnInit() {
		try {
			const response = await fetch('/assets/deuda/deudaTotal/deudaTotalNews.json');
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
