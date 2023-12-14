import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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
	public coms: ICom[] = [];
	public docs: IDoc[] = [];
	public news: INew[] = [];
	public data: IOption[] = [];
	public steps: IStep[] = [];

	ngOnInit(): void {
		this.data = [
			{ data: 'General', value: 'general', URL: 'general' },
			{ data: 'Seguimiento', value: 'seguimiento', URL: 'seguimiento' },
			{ data: 'Documentos', value: 'documentos', URL: 'documentos' }
		];
		console.log('this.data', this.data);
	}
}
