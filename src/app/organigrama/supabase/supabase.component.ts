import { Component, Input, OnInit, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { SupabaseService } from './supabase.service';

@Component({
	selector: 'app-supabase',
	standalone: true,
	imports: [NgIf],
	templateUrl: './supabase.component.html',
	styleUrls: ['./supabase.component.scss']
})
export default class SupabaseComponent implements OnInit {
	@Input() id?: number;
	//TODO: - Add types
	public positionData: any[] = null;
	public employeeName: string = null;
	public hasEmployeeLinkedin = false;
	public hasEmployeeWikipedia = false;
	public hasPositionExternal = false;
	public hasPositionExternal11 = true;
	public hasRecord = false;
	public hasRecordLinkedin = false;

	private _supabaseService = inject(SupabaseService);

	ngOnInit(): void {
		this.fetchDataFromView();
	}

	async fetchDataFromView() {
		try {
			this.positionData = await this._supabaseService.fetchDataFromView(this.id);
			// TODO:  Nombre completo en el server
			this.employeeName = `${this.positionData[0].name} ${this.positionData[0].firstname} ${this.positionData[0].lastname}`;
			this.hasPositionExternal = this.positionData[0].position_ext;
			this.hasRecord = this.positionData[0].record_name;
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}
}
