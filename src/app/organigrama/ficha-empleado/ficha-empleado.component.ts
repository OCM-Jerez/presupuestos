import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupabaseService } from '../../services/supabase.service';

@Component({
	selector: 'app-ficha-empleado',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './ficha-empleado.component.html',
	styleUrls: ['./ficha-empleado.component.scss']
})
export default class FichaEmpleadoComponent implements OnInit {
	@Input() id?: number;
	//TODO: - Add types
	private _supabaseService = inject(SupabaseService);
	public dataBasic: any[] = null;
	public dataTelefonos: any[] = null;
	public dataMoviles: any[] = null;
	public dataEmails: any[] = null;

	ngOnInit(): void {
		this.fetchData();
	}

	async fetchData() {
		try {
			this.dataBasic = await this._supabaseService.fetchDataById('empleados', this.id);
			console.log('dataBasic:', this.dataBasic);
		} catch (error) {
			console.error('Error fetching data:', error);
		}

		try {
			this.dataTelefonos = await this._supabaseService.fetchDataByIdEmpleado('empleado_telefono', this.id);
			console.log('dataTelefonos:', this.dataTelefonos);
		} catch (error) {
			console.error('Error fetching data:', error);
		}

		try {
			this.dataMoviles = await this._supabaseService.fetchDataByIdEmpleado('empleado_movil', this.id);
			console.log('dataMoviles:', this.dataMoviles);
		} catch (error) {
			console.error('Error fetching data:', error);
		}

		try {
			this.dataEmails = await this._supabaseService.fetchDataByIdEmpleado('empleado_email', this.id);
			console.log('dataEmails:', this.dataEmails);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}
}
