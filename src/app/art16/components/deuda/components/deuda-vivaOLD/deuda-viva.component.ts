import { Component, OnInit, inject } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

import { INew } from '@interfaces/new.interface';

import { environment } from '@environments/environment';
import { SupabaseService } from '@app/organigrama/supabase/supabase.service';

@Component({
	selector: 'app-deuda-viva',
	standalone: true,
	imports: [NgIf, NgFor],
	templateUrl: './deuda-viva.component.html'
})
export default class DeudaVivaComponent implements OnInit {
	private _supabaseService = inject(SupabaseService);
	public news: INew[] = [];
	public deudaVivaURL = `${environment.pathImgSupabase}/2023.06.29.jpg`;

	async ngOnInit() {
		this.fetchDataFromSupabase('news', 'deudaViva');
	}

	async fetchDataFromSupabase(path: string, param: string) {
		try {
			this.news = await this._supabaseService.fetchDataByTagOrder('news', param, false);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}
}
