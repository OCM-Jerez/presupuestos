import { Component, OnInit, inject } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import NoticiasComponent from '@app/commons/components/level/noticias/noticias.component';

import { DataStoreFichaProgramaService } from '@services/dataStoreFichaPrograma.service';
import { DataStoreService } from '@services/dataStore.service';

import { IDataGasto } from '@interfaces/dataGasto.interface';

@Component({
	selector: 'app-ficha-news',
	standalone: true,
	imports: [NoticiasComponent],
	templateUrl: './ficha-news.component.html'
})
export default class FichaNewsComponent implements OnInit {
	private _route = inject(ActivatedRoute);
	private _location = inject(Location);
	private _dataStoreService = inject(DataStoreService);
	private _dataStoreFichaProgramaService = inject(DataStoreFichaProgramaService);
	private _subscription: Subscription;
	private _datos: IDataGasto[] = [];
	public filteredNews = [];
	public programa: string;
	public title = this._dataStoreService.selectedCodeRowFirstLevel;

	async ngOnInit(): Promise<void> {
		const codigo = this._route.snapshot.paramMap.get('codigo');
		this.filteredNews = await this.filterNewsByCode(+codigo);
	}

	async filterNewsByCode(codigo: number) {
		const data = await import('src/assets/data/programasInfo.json');
		const programas = data.default; // Asume que los datos están bajo la propiedad default
		const programaEspecifico = programas.find((programa) => programa.codigo === codigo);

		if (programaEspecifico && programaEspecifico.news) {
			return programaEspecifico.news;
		}
		return [];
	}

	async filterNewsByCode1(codigo: number) {
		this._subscription = this._dataStoreFichaProgramaService.getFichaProgramaData().subscribe((data: IDataGasto[]) => {
			this._datos = data;
		});

		let data: any = [];
		if (this._datos[0].hasOwnProperty('CodPro')) {
			data = await import(`@assets/data/programasInfo.json`);
			this.programa = 'Programa ' + this._datos[0].CodPro + ' ' + this._datos[0].DesPro;
		} else {
			data = await import(`@assets/data/gastosOrganicosInfo.json`);
			this.programa = 'Orgánico ' + this._datos[0].CodOrg + ' ' + this._datos[0].DesOrg;
		}

		for (const key in data) {
			if (data[key].codigo === codigo) {
				return data[key].news || [];
			}
		}
		return [];
	}

	volver() {
		this._location.back();
	}
}
