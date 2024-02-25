import { Component, OnInit, inject } from '@angular/core';

import NoticiasComponent from '@app/commons/components/level/noticias/noticias.component';

import { DataStoreService } from '@services/dataStore.service';

@Component({
	selector: 'app-info-programa',
	standalone: true,
	imports: [NoticiasComponent],
	templateUrl: './info-programa.component.html'
})
export default class InfoProgramaComponent implements OnInit {
	private _dataStoreService = inject(DataStoreService);
	public title = this._dataStoreService.selectedCodeRowFirstLevel;
	public news: any[] = [];

	async ngOnInit() {
		const data = await import('src/assets/data/programasInfo.json');
		const programas = data.default; // Asume que los datos están bajo la propiedad default
		const codigoPrograma = +this.title.split('-')[0].trim();
		const programaEspecifico = programas.find((programa) => programa.codigo === codigoPrograma);

		if (programaEspecifico && programaEspecifico.news) {
			this.news = programaEspecifico.news;
		}
	}
}
