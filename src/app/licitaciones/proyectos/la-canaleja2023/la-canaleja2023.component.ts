import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface ILicitacion {
	data: string;
	value: string;
	URL?: string;
}
interface INews {
	date: string;
	medio: string;
	title: string;
	URL?: string;
}

@Component({
	selector: 'app-la-canaleja2023',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './la-canaleja2023.component.html',
	styleUrls: ['./la-canaleja2023.component.scss']
})
export default class LaCanaleja2023Component implements OnInit {
	private _route = inject(ActivatedRoute);
	private http = inject(HttpClient);

	public dataLicitacion: ILicitacion[] = [];
	public news: INews[] = [];

	public imgURL: string;

	ngOnInit() {
		const licitacion = this._route.snapshot.paramMap.get('licitacion');

		switch (licitacion) {
			case 'laCanaleja2023':
				this.imgURL = '/assets/licitaciones/laCanaleja2023.jpg';
				this.http.get<ILicitacion[]>('/assets/data/laCanaleja2023.json').subscribe((data: ILicitacion[]) => {
					this.dataLicitacion = data;
				});

				this.http.get<INews[]>('/assets/data/laCanaleja2023News.json').subscribe((data: INews[]) => {
					this.news = data;
				});

				break;
			case 'sanBenito2023':
				this.imgURL = '/assets/licitaciones/laCanaleja2023.jpg';
				this.http.get<ILicitacion[]>('/assets/data/sanBenito2023.json').subscribe((data: ILicitacion[]) => {
					this.dataLicitacion = data;
				});

				this.http.get<INews[]>('/assets/data/sanBenito2023News.json').subscribe((data: INews[]) => {
					this.news = data;
				});

				// console.log(JSON.stringify(this.news));

				break;

			default:
				break;
		}
	}
	hasKey(object: unknown, key: string): boolean {
		return object && Object.prototype.hasOwnProperty.call(object, key);
	}
}
