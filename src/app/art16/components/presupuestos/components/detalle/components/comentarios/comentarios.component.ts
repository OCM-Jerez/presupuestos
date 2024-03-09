import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import ComentariosComponent from '@app/commons/components/level/comentarios/comentarios.component';

import { DataStoreService } from '@services/dataStore.service';
import { SupabaseService } from '@services/supabase.service';

@Component({
	selector: 'app-info-programa',
	standalone: true,
	imports: [ComentariosComponent],
	templateUrl: './comentarios.component.html'
})
export default class InfoComentariosComponent implements OnInit {
	@Input() tag: string;
	private _supabaseService = inject(SupabaseService);
	private _dataStoreService = inject(DataStoreService);
	private _router = inject(Router);
	public title = this._dataStoreService.selectedCodeRowFirstLevel;
	public coms: any[] = [];
	public codigo: string;

	async ngOnInit() {
		this.codigo = this.title.split('-')[0].trim();
		this._supabaseService.fetchDataByTagOrder('comments', this.codigo, false).then((data) => {
			this.coms = data;
		});
	}

	addNew(): void {
		this._router.navigateByUrl('addCom/' + this.codigo);
	}
}
