import { Component, Input, OnInit, inject } from '@angular/core';

import NoticiasComponent from '@app/commons/components/level/noticias/noticias.component';

import { DataStoreService } from '@services/dataStore.service';

@Component({
	selector: 'app-info-programa',
	standalone: true,
	imports: [NoticiasComponent],
	templateUrl: './info-programa.component.html'
})
export default class InfoProgramaComponent implements OnInit {
	@Input() tag: string;
	private _dataStoreService = inject(DataStoreService);
	public title = this._dataStoreService.selectedCodeRowFirstLevel;
	public news: any[] = [];

	async ngOnInit() {
		console.log('InfoProgramaComponent', this.tag);
		let data = null;
		if (this.tag === 'economicosIngresos') {
			data = await import('src/assets/data/ingresosEconomicaEconomicosInfo.json');
		} else {
			data = await import('src/assets/data/programasInfo.json');
		}
		const programas = data.default; // Asume que los datos están bajo la propiedad default

		const codigoPrograma = +this.title.split('-')[0].trim();
		const programaEspecifico = programas.find((programa) => programa.codigo === codigoPrograma);

		if (programaEspecifico && programaEspecifico.news) {
			this.news = programaEspecifico.news;
		}
	}
}
