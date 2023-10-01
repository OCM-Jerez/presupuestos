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
	selector: 'app-pleno',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './plenoOrdinario20230929.component.html',
	styleUrls: ['./plenoOrdinario20230929.component.scss']
})
export default class PlenoComponent implements OnInit {
	private _location = inject(Location);

	public docs: IDoc[] = [];
	public coms: ICom[] = [];
	public news: INew[] = [];

	async ngOnInit() {
		try {
			const response = await fetch(
				'/assets/art10/infoInstitucional/plenos/plenoOrdinario20230929/plenoOrdinario20230929Docs.json'
			);
			const data = await response.json();
			this.docs = data;
		} catch (error) {
			console.error('Error fetching news data:', error);
		}

		try {
			const response = await fetch(
				'/assets/art10/infoInstitucional/plenos/plenoOrdinario20230929/plenoOrdinario20230929Coms.json'
			);
			const data = await response.json();
			this.coms = data;
		} catch (error) {
			console.error('Error fetching news data:', error);
		}

		try {
			const response = await fetch(
				'/assets/art10/infoInstitucional/plenos/plenoOrdinario20230929/plenoOrdinario20230929News.json'
			);
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
