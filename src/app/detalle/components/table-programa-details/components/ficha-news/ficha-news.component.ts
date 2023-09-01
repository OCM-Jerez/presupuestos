import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { CardTableNewsComponent } from './components/card-table-news/card-table-news.component';

@Component({
	selector: 'app-ficha-news',
	standalone: true,
	imports: [CommonModule, CardTableNewsComponent],
	templateUrl: './ficha-news.component.html',
	styleUrls: ['./ficha-news.component.scss']
})
export default class FichaNewsComponent implements OnInit {
	private _route = inject(ActivatedRoute);
	public filteredNews = [];
	public programa: string;

	async ngOnInit(): Promise<void> {
		const codigo = this._route.snapshot.paramMap.get('codigo');
		this.filteredNews = await this.filterNewsByCode(+codigo);
	}

	async filterNewsByCode(codigo: number) {
		const data = await import(`@assets/data/programasInfo.json`);
		for (const key in data) {
			if (data[key].codigo === codigo) {
				this.programa = data[key].descripcion;
				return data[key].news || [];
			}
		}
		return [];
	}
}
