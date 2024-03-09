import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import DocumentosComponent from '@app/commons/components/level/documentos/documentos.component';

import { DataStoreService } from '@services/dataStore.service';
import { SupabaseService } from '@services/supabase.service';

@Component({
	selector: 'app-info-programa',
	standalone: true,
	imports: [DocumentosComponent],
	templateUrl: './documentos.component.html'
})
export default class InfoProgramaComponent implements OnInit {
	@Input() tag: string;
	private _supabaseService = inject(SupabaseService);
	private _dataStoreService = inject(DataStoreService);
	private _router = inject(Router);
	public title = this._dataStoreService.selectedCodeRowFirstLevel;
	public docs: any[] = [];
	public codigo: string;

	async ngOnInit() {
		this.codigo = this.title.split('-')[0].trim();
		this._supabaseService.fetchDataByTagOrder('documents', this.codigo, false).then((data) => {
			this.docs = data;
		});
	}

	addNew(): void {
		this._router.navigateByUrl('addDoc/' + this.codigo);
	}
}
