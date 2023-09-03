import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
	private http = inject(HttpClient);

	public steps: IStep[] = [];
	public dataLicitacion: ILicitacion[] = [];
	public news: INew[] = [];

	public imgURL: string;
	public descripcion: string;

	ngOnInit() {
		const licitacion = this._route.snapshot.paramMap.get('licitacion');

		const assignDescripcion = (data: ILicitacion[]) => {
			this.dataLicitacion = data;
			const descripcionObj = this.dataLicitacion.find((obj) => obj.data === 'Descripción');
			if (descripcionObj) {
				this.descripcion = descripcionObj.value;
			}
		};

		switch (licitacion) {
			case 'laCanaleja2023':
				this.imgURL = '/assets/licitaciones/laCanaleja2023.jpg';

				this.http.get<IStep[]>('/assets/data/laCanaleja2023Steps.json').subscribe((data: IStep[]) => {
					this.steps = data;
				});

				this.http.get<ILicitacion[]>('/assets/data/laCanaleja2023.json').subscribe(assignDescripcion);

				this.http.get<INew[]>('/assets/data/laCanaleja2023News.json').subscribe((data: INew[]) => {
					this.news = data;
				});

				break;
			case 'sanBenito2023':
				this.imgURL = '/assets/licitaciones/laCanaleja2023.jpg';
				this.http.get<ILicitacion[]>('/assets/data/sanBenito2023.json').subscribe(assignDescripcion);

				this.http.get<INew[]>('/assets/data/sanBenito2023News.json').subscribe((data: INew[]) => {
					this.news = data;
				});

				break;
			case 'plazaVenus2023':
				this.imgURL = '/assets/licitaciones/plazaVenus2023.jpg';
				this.http.get<IStep[]>('/assets/data/plazaVenus2023Steps.json').subscribe((data: IStep[]) => {
					this.steps = data;
				});

				this.http.get<ILicitacion[]>('/assets/data/plazaVenus2023.json').subscribe(assignDescripcion);

				this.http.get<INew[]>('/assets/data/plazaVenusNews2023.json').subscribe((data: INew[]) => {
					this.news = data;
				});

				break;

			default:
				break;
		}

		console.log(this.dataLicitacion);

		const descripcionObj = this.dataLicitacion.find((obj) => obj.data === 'Descripción');
		console.log(descripcionObj);

		// Si encontramos el objeto, asignamos el valor de "value" a la variable pública "descripcion"
		if (descripcionObj) {
			this.descripcion = descripcionObj.value;
		}
	}
	hasKey(object: unknown, key: string): boolean {
		return object && Object.prototype.hasOwnProperty.call(object, key);
	}
}