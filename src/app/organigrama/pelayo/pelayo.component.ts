import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import ComentariosComponent from '@commons/components/level/comentarios/comentarios.component';
import DataGeneralComponent from '@commons/components/level/data-general/data-general.component';
import DocumentosComponent from '@commons/components/level/documentos/documentos.component';
import NoticiasComponent from '@commons/components/level/noticias/noticias.component';
import SeguimientoSubvencionComponent from '@commons/components/level/seguimiento-subvencion/seguimiento-subvencion.component';

import { ICom } from '@interfaces/com.interface';
import { IDoc } from '@interfaces/doc.interface';
import { INew } from '@interfaces/new.interface';
import { IStep } from '@interfaces/step.interface';

interface IOption {
	data: string;
	value: string;
	URL?: string;
}

@Component({
	selector: 'app-pelayo',
	standalone: true,
	imports: [
		CommonModule,
		DataGeneralComponent,
		SeguimientoSubvencionComponent,
		DocumentosComponent,
		ComentariosComponent,
		NoticiasComponent
	],
	templateUrl: './pelayo.component.html',
	styleUrls: ['./pelayo.component.scss']
})
export default class PelayoComponent implements OnInit {
	@Input() id?: number;
	public coms: ICom[] = [];
	public docs: IDoc[] = [];
	public news: INew[] = [];
	public data: any = null;
	public steps: IStep[] = [];
	public name: string;

	private _http = inject(HttpClient);

	ngOnInit(): void {
		console.log('this.id', this.id);
		// const url = `/assets/puestos/${this.id}.json`;
		this._http.get(`/assets/puestos/${this.id}.json`).subscribe(
			(data: any) => {
				this.data = data;
				this.name = `${this.data.person.name} ${this.data.person.firstName} ${this.data.person.lastName}`;
				console.log(this.data);
			},
			(error) => {
				console.error('Error al obtener los datos:', error);
			}
		);
	}
}
