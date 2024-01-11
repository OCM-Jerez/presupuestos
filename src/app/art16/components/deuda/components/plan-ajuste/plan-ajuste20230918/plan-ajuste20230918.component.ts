import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

import { ICom } from '@interfaces/com.interface';
import { IDoc } from '@interfaces/doc.interface';
import { INew } from '@interfaces/new.interface';
import { SupabaseService } from '@app/organigrama/supabase/supabase.service';
@Component({
	selector: 'app-plan-ajuste20230918',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './plan-ajuste20230918.component.html'
})
export default class PlanAjuste20230918Component implements OnInit {
	private _supabaseService = inject(SupabaseService);

	private _location = inject(Location);

	public docs: IDoc[] = [];
	public coms: ICom[] = [];
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
	}
}
