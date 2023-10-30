import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { INew } from '@interfaces/new.interface';

@Component({
	standalone: true,
	imports: [CommonModule],
	selector: 'app-deuda-total',
	templateUrl: './deudaTotal.component.html',
	styleUrls: ['./deudaTotal.component.scss']
})
export default class DeudaTotalComponent implements OnInit {
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
}
