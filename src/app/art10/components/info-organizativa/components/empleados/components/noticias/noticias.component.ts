import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import NoticiasComponent from '@commons/components/level/noticias/noticias.component';

import { forkJoin } from 'rxjs';

interface INew {
	date: string;
	medio: string;
	title: string;
	URL?: string;
}

@Component({
	selector: 'app-noticias-empleados',
	standalone: true,
	imports: [CommonModule, NoticiasComponent],
	templateUrl: './noticias.component.html',
	styleUrls: ['./noticias.component.scss']
})
export default class NoticiasEmpleadosComponent implements OnInit {
	private _http = inject(HttpClient);
	public news: INew[] = [];

	ngOnInit() {
		const fetchData = () => {
			const news$ = this._http.get<INew[]>(`/assets/empleados/empleadosNews.json`);

			forkJoin({ news$ }).subscribe(({ news$ }) => {
				this.news = news$;
			});
		};

		fetchData();
	}
}
