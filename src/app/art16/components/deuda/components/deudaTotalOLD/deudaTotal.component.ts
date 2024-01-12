import { Component, OnInit, inject } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

import { INew } from '@interfaces/new.interface';

import { environment } from '@environments/environment';
import { SupabaseService } from '@app/organigrama/supabase/supabase.service';

@Component({
	standalone: true,
	imports: [NgIf, NgFor],
	selector: 'app-deuda-total',
	templateUrl: './deudaTotal.component.html'
})
export default class DeudaTotalComponent implements OnInit {
	private _supabaseService = inject(SupabaseService);
	public news: INew[] = [];
	public deudaTotalURL = `${environment.pathImgSupabase}/2023.07.28.jpg`;

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
}
