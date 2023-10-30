import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

import { INew } from '@interfaces/new.interface';
@Component({
	selector: 'app-deuda-viva',
	standalone: true,
	imports: [NgFor],
	templateUrl: './deuda-viva.component.html',
	styleUrls: ['./deuda-viva.component.scss']
})
export default class DeudaVivaComponent implements OnInit {
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
}
