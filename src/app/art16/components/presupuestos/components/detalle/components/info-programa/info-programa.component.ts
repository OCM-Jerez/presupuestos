import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import NoticiasComponent from '@app/commons/components/level/noticias/noticias.component';

import { DataStoreService } from '@services/dataStore.service';
import { SupabaseService } from '@services/supabase.service';

@Component({
	selector: 'app-info-programa',
	standalone: true,
	imports: [NoticiasComponent],
	templateUrl: './info-programa.component.html'
})
export default class InfoProgramaComponent implements OnInit {
	@Input() tag: string;
	private _supabaseService = inject(SupabaseService);
	private _dataStoreService = inject(DataStoreService);
	private _router = inject(Router);

	public title = this._dataStoreService.selectedCodeRowFirstLevel;
	public news: any[] = [];
	public codigoPrograma: string;

	async ngOnInit() {
		this.codigoPrograma = this.title.split('-')[0].trim();
		// const data1 = await this._supabaseService.fetchDataByCodigo('gastosProgramaProgramas', codigoPrograma);
		// console.log('data1', data1);

		this._supabaseService.fetchDataByTagOrder('news', this.codigoPrograma, false).then((data) => {
			this.news = data;
		});

		// console.log('InfoProgramaComponent', this.tag);
		// let data = null;
		// if (this.tag === 'economicosIngresos') {
		// 	data = await import('src/assets/data/ingresosEconomicaEconomicosInfo.json');
		// } else {
		// 	data = await import('src/assets/data/programasInfo.json');
		// }
		// const programas = data.default; // Asume que los datos están bajo la propiedad default

		// const codigoPrograma = +this.title.split('-')[0].trim();
		// const programaEspecifico = programas.find((programa) => programa.codigo === codigoPrograma);

		// if (programaEspecifico && programaEspecifico.news) {
		// 	this.news = programaEspecifico.news;
		// }
	}

	addNew(): void {
		this._router.navigateByUrl('addNew/' + this.codigoPrograma);
	}
}
