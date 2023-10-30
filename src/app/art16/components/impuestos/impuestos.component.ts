import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { ICom } from '@interfaces/com.interface';
import { IDoc } from '@interfaces/doc.interface';
import { INew } from '@interfaces/new.interface';

@Component({
	selector: 'app-impuestos',
	standalone: true,
	imports: [NgIf, NgFor],
	templateUrl: './impuestos.component.html',
	styleUrls: ['./impuestos.component.scss']
})
export default class ImpuestosComponent implements OnInit {
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
