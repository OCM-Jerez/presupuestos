import { Component, OnInit, inject } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { Router } from '@angular/router';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

import { ICom } from '@interfaces/com.interface';
import { IDoc } from '@interfaces/doc.interface';
import { INew } from '@interfaces/new.interface';

import { environment } from '@environments/environment';
import { SupabaseService } from '@app/organigrama/supabase/supabase.service';

@Component({
	selector: 'app-plan-ajuste',
	standalone: true,
	imports: [NgIf, NgFor, CardMenuComponent],
	templateUrl: './plan-ajuste.component.html'
})
export default class PlanAjusteComponent implements OnInit {
	private _supabaseService = inject(SupabaseService);
	private _router = inject(Router);

	public docs: IDoc[] = [];
	public coms: ICom[] = [];
	public news: INew[] = [];

	// async ngOnInit() {
	// 	try {
	// 		const response = await fetch('/assets/deuda/planAjuste/planAjusteDocs.json');
	// 		const data = await response.json();
	// 		this.docs = data;
	// 	} catch (error) {
	// 		console.error('Error fetching news data:', error);
	// 	}

	// 	try {
	// 		const response = await fetch('/assets/deuda/planAjuste/planAjusteComs.json');
	// 		const data = await response.json();
	// 		this.coms = data;
	// 	} catch (error) {
	// 		console.error('Error fetching news data:', error);
	// 	}

	// 	try {
	// 		const response = await fetch('/assets/deuda/planAjuste/planAjusteNews.json');
	// 		const data = await response.json();
	// 		this.news = data;
	// 	} catch (error) {
	// 		console.error('Error fetching news data:', error);
	// 	}
	// }

	async ngOnInit() {
		this.fetchDataFromSupabase('news', 'deudaTotal');
	}

	async fetchDataFromSupabase(path: string, param: string) {
		try {
			this.news = await this._supabaseService.fetchDataByTagOrder('news', param, false);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	cardMenus = [
		this.createCard('Revisión 18/09/2023', 'planAjuste20230918'),
		this.createCard('Revisión 18/09/2023', 'planAjuste20230918')
	];

	createCard(titulo: string, route: string) {
		return {
			titulo,
			rutaImagen: `${environment.pathImgSupabase}/${route}.jpg`,
			funcion: () => this._router.navigateByUrl(`/deuda/${route}`)
		};
	}
}
