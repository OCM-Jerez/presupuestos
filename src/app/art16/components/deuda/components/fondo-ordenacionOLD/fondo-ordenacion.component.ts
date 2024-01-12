import { Component, OnInit, inject } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

import { IDoc } from '@interfaces/doc.interface';
import { INew } from '@interfaces/new.interface';

import { SupabaseService } from '@app/organigrama/supabase/supabase.service';

@Component({
	selector: 'app-fondo-ordenacion',
	standalone: true,
	imports: [NgIf, NgFor],
	templateUrl: './fondo-ordenacion.component.html'
})
export default class FondoOrdenacionComponent implements OnInit {
	private _supabaseService = inject(SupabaseService);
	public docs: IDoc[] = [];
	public news: INew[] = [];

	async ngOnInit() {
		this.fetchDataFromSupabase('news', 'deudaTotal');
	}

	async fetchDataFromSupabase(path: string, param: string) {
		try {
			this.news = await this._supabaseService.fetchDataByTagOrder('news', param, false);
		} catch (error) {
			console.error('Error fetching data:', error);
		}

		try {
			this.docs = await this._supabaseService.fetchDataByTagOrder('documents', param, false);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}
}
