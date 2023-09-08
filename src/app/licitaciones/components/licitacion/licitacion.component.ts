import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { forkJoin } from 'rxjs';

interface IStep {
	date: string;
	step: string;
	isFinish?: string;
}

interface ILicitacion {
	data: string;
	value: string;
	URL?: string;
}
interface INew {
	date: string;
	medio: string;
	title: string;
	URL?: string;
}

@Component({
	selector: 'app-la-canaleja2023',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './licitacion.component.html',
	styleUrls: ['./licitacion.component.scss']
})
export default class LaCanaleja2023Component implements OnInit {
	private _route = inject(ActivatedRoute);
	private _location = inject(Location);
	private http = inject(HttpClient);

	public steps: IStep[] = [];
	public dataLicitacion: ILicitacion[] = [];
	public news: INew[] = [];
	public imgURL: string;
	public descripcion: string;

	ngOnInit() {
		const licitacion = this._route.snapshot.paramMap.get('licitacion');

		// Función auxiliar para gestionar suscripciones HTTP
		const fetchData = (path: string) => {
			this.imgURL = `/assets/licitaciones/${licitacion}/${licitacion}.jpg`;
			const steps$ = this.http.get<IStep[]>(`/assets/licitaciones/${path}/${path}Steps.json`);
			const data$ = this.http.get<ILicitacion[]>(`/assets/licitaciones/${path}/${path}.json`);
			const news$ = this.http.get<INew[]>(`/assets/licitaciones/${path}/${path}News.json`);

			forkJoin({ steps$, data$, news$ }).subscribe(({ steps$, data$, news$ }) => {
				this.steps = steps$;
				this.dataLicitacion = data$;
				this.news = news$;

				const descripcionObj = data$.find((obj) => obj.data === 'Descripción');
				if (descripcionObj) {
					this.descripcion = descripcionObj.value;
				}
			});
		};

		fetchData(licitacion);
	}

	ngOnInitOLD() {
		const licitacion = this._route.snapshot.paramMap.get('licitacion');

		const assignDescripcion = (data: ILicitacion[]) => {
			this.dataLicitacion = data;
			const descripcionObj = this.dataLicitacion.find((obj) => obj.data === 'Descripción');
			if (descripcionObj) {
				this.descripcion = descripcionObj.value;
			}
		};

		switch (licitacion) {
			case 'puertaSevilla2023':
				(this.imgURL = '/assets/licitaciones/puertaSevilla2023/puertaSevilla2023.jpg'),
					this.http
						.get<IStep[]>('/assets/licitaciones/puertaSevilla2023/puertaSevilla2023Steps.json')
						.subscribe((data: IStep[]) => {
							this.steps = data;
						});

				this.http
					.get<ILicitacion[]>('/assets/licitaciones/puertaSevilla2023/puertaSevilla2023.json')
					.subscribe(assignDescripcion);

				this.http
					.get<INew[]>('/assets/licitaciones/puertaSevilla2023/puertaSevilla2023News.json')
					.subscribe((data: INew[]) => {
						this.news = data;
					});
				break;

			case 'laCanaleja2023':
				this.imgURL = '/assets/licitaciones/laCanaleja2023/laCanaleja2023.jpg';

				this.http
					.get<IStep[]>('/assets/licitaciones/laCanaleja2023/laCanaleja2023Steps.json')
					.subscribe((data: IStep[]) => {
						this.steps = data;
					});

				this.http
					.get<ILicitacion[]>('/assets/licitaciones/laCanaleja2023/laCanaleja2023.json')
					.subscribe(assignDescripcion);

				this.http
					.get<INew[]>('/assets/licitaciones/laCanaleja2023/laCanaleja2023News.json')
					.subscribe((data: INew[]) => {
						this.news = data;
					});
				break;

			case 'plazaVenus2023':
				this.imgURL = '/assets/licitaciones/plazaVenus2023/plazaVenus2023.jpg';
				this.http
					.get<IStep[]>('/assets/licitaciones/plazaVenus2023/plazaVenus2023Steps.json')
					.subscribe((data: IStep[]) => {
						this.steps = data;
					});

				this.http
					.get<ILicitacion[]>('/assets/licitaciones/plazaVenus2023/plazaVenus2023.json')
					.subscribe(assignDescripcion);

				this.http
					.get<INew[]>('/assets/licitaciones/plazaVenus2023/plazaVenusNews2023.json')
					.subscribe((data: INew[]) => {
						this.news = data;
					});
				break;

			case 'lasCalandrias2023':
				(this.imgURL = '/assets/licitaciones/lasCalandrias2023/lasCalandrias2023.jpg'),
					this.http
						.get<IStep[]>('/assets/licitaciones/lasCalandrias2023/lasCalandrias2023Steps.json')
						.subscribe((data: IStep[]) => {
							this.steps = data;
						});

				this.http
					.get<ILicitacion[]>('/assets/licitaciones/lasCalandrias2023/lasCalandrias2023.json')
					.subscribe(assignDescripcion);

				this.http
					.get<INew[]>('/assets/licitaciones/lasCalandrias2023/lasCalandrias2023News.json')
					.subscribe((data: INew[]) => {
						this.news = data;
					});
				break;

			case 'contenedoresOrganica2023':
				(this.imgURL = '/assets/licitaciones/contenedoresOrganica2023/contenedoresOrganica2023.jpg'),
					this.http
						.get<IStep[]>('/assets/licitaciones/contenedoresOrganica2023/contenedoresOrganica2023Steps.json')
						.subscribe((data: IStep[]) => {
							this.steps = data;
						});

				this.http
					.get<ILicitacion[]>('/assets/licitaciones/contenedoresOrganica2023/contenedoresOrganica2023.json')
					.subscribe(assignDescripcion);

				this.http
					.get<INew[]>('/assets/licitaciones/contenedoresOrganica2023/contenedoresOrganica2023News.json')
					.subscribe((data: INew[]) => {
						this.news = data;
					});
				break;

			case 'rehabilitacionCEIPNebrija2023':
				(this.imgURL = '/assets/licitaciones/rehabilitacionCEIPNebrija2023/Nebrija.jpg'),
					this.http
						.get<IStep[]>('/assets/licitaciones/rehabilitacionCEIPNebrija2023/rehabilitacionCEIPNebrija2023Steps.json')
						.subscribe((data: IStep[]) => {
							this.steps = data;
						});

				this.http
					.get<ILicitacion[]>('/assets/licitaciones/rehabilitacionCEIPNebrija2023/rehabilitacionCEIPNebrija2023.json')
					.subscribe(assignDescripcion);

				this.http
					.get<INew[]>('/assets/licitaciones/rehabilitacionCEIPNebrija2023/rehabilitacionCEIPNebrija2023News.json')
					.subscribe((data: INew[]) => {
						this.news = data;
					});
				break;

			case 'plazaMercado2023':
				(this.imgURL = '/assets/licitaciones/plazaMercado2023/plazaMercado2023.jpg'),
					this.http
						.get<IStep[]>('/assets/licitaciones/plazaMercado2023/plazaMercado2023Steps.json')
						.subscribe((data: IStep[]) => {
							this.steps = data;
						});

				this.http
					.get<ILicitacion[]>('/assets/licitaciones/plazaMercado2023/plazaMercado2023.json')
					.subscribe(assignDescripcion);

				this.http
					.get<INew[]>('/assets/licitaciones/plazaMercado2023/plazaMercado2023News.json')
					.subscribe((data: INew[]) => {
						this.news = data;
					});
				break;

			default:
				break;
			case 'sanBenito2023':
				this.imgURL = '/assets/licitaciones/sanBenito2023/laCanaleja2023.jpg';
				this.http
					.get<ILicitacion[]>('/assets/licitaciones/sanBenito2023/sanBenito2023.json')
					.subscribe(assignDescripcion);

				this.http.get<INew[]>('/assets/licitaciones/sanBenito2023/sanBenito2023News.json').subscribe((data: INew[]) => {
					this.news = data;
				});
				break;
		}

		// const descripcionObj = this.dataLicitacion.find((obj) => obj.data === 'Descripción');
		// // Si encontramos el objeto, asignamos el valor de "value" a la variable pública "descripcion"
		// if (descripcionObj) {
		// 	this.descripcion = descripcionObj.value;
		// }
	}

	hasKey(object: unknown, key: string): boolean {
		return object && Object.prototype.hasOwnProperty.call(object, key);
	}

	volver() {
		this._location.back();
	}
}
