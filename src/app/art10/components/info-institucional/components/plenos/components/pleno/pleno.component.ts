import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Subscription, forkJoin } from 'rxjs';

import { ICom } from '@interfaces/com.interface';
import { IDoc } from '@interfaces/doc.interface';
import { INew } from '@interfaces/new.interface';

interface IPleno {
	data: string;
	value: string;
	URL?: string;
}

@Component({
	selector: 'app-pleno',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './pleno.component.html',
	styleUrls: ['./pleno.component.scss']
})
export default class PlenoComponent implements OnInit, OnDestroy {
	private _route = inject(ActivatedRoute);
	private _http = inject(HttpClient);
	private _subscriptions = new Subscription();

	public data: IPleno[] = [];
	public docs: IDoc[] = [];
	public coms: ICom[] = [];
	public news: INew[] = [];
	public descripcion: string;

	ngOnInit() {
		this._subscriptions.add(this.fetchData(this._route.snapshot.paramMap.get('pleno')));
	}

	ngOnDestroy() {
		this._subscriptions.unsubscribe();
	}

	private fetchData(path: string): void {
		const pathBase = `/assets/art10/infoInstitucional/plenos/${path}/${path}`;
		const data$ = this._http.get<IPleno[]>(`${pathBase}.json`);
		const coms$ = this._http.get<ICom[]>(`${pathBase}Coms.json`);
		const docs$ = this._http.get<IDoc[]>(`${pathBase}Docs.json`);
		const news$ = this._http.get<INew[]>(`${pathBase}News.json`);

		forkJoin({ data$, coms$, docs$, news$ }).subscribe({
			next: (results) => {
				this.coms = results.coms$;
				this.data = results.data$;
				this.docs = results.docs$;
				this.news = results.news$;
				this.descripcion = this.data.find((obj) => obj.data === 'Descripción')?.value ?? null;
			},
			error: (error) => {
				console.error('Error al cargar los datos:', error);
			},
			complete: () => {
				console.log('Carga de datos completada');
			}
		});
	}

	hasKey(object: unknown, key: string): boolean {
		return object && Object.prototype.hasOwnProperty.call(object, key);
	}
}
