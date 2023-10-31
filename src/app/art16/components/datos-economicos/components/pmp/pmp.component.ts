import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { INew } from '@interfaces/new.interface';
@Component({
	selector: 'app-pmp',
	standalone: true,
	imports: [NgFor, NgIf],
	templateUrl: './pmp.component.html',
	styleUrls: ['./pmp.component.scss']
})
export default class PmpComponent implements OnInit {
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
}
