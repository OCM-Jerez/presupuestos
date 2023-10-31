import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

import { ICom } from '@interfaces/com.interface';
import { IDoc } from '@interfaces/doc.interface';
import { INew } from '@interfaces/new.interface';
@Component({
	selector: 'app-plan-ajuste20230918',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './plan-ajuste20230918.component.html',
	styleUrls: ['./plan-ajuste20230918.component.scss']
})
export default class PlanAjuste20230918Component implements OnInit {
	private _location = inject(Location);

	public docs: IDoc[] = [];
	public coms: ICom[] = [];
	public news: INew[] = [];

	async ngOnInit() {
		try {
			const response = await fetch('/assets/deuda/planAjuste/planAjusteDocs.json');
			const data = await response.json();
			this.docs = data;
		} catch (error) {
			console.error('Error fetching news data:', error);
		}

		try {
			const response = await fetch('/assets/deuda/planAjuste/planAjusteComs.json');
			const data = await response.json();
			this.coms = data;
		} catch (error) {
			console.error('Error fetching news data:', error);
		}

		try {
			const response = await fetch('/assets/deuda/planAjuste/planAjusteNews.json');
			const data = await response.json();
			this.news = data;
		} catch (error) {
			console.error('Error fetching news data:', error);
		}
	}
}
