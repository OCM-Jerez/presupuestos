import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';

import { SupabaseService } from '@services/supabase.service';

import { environment } from '@environments/environment';

@Component({
	selector: 'app-datos',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './datos.component.html',
	styleUrl: './datos.component.scss'
})
export default class DatosComponent implements OnInit {
	@Input() id?: number;
	//TODO: - Add type
	public positionData: any[] = [];
	private _supabaseService = inject(SupabaseService);
	public descripcion: string;
	public image_URL: string;

	ngOnInit(): void {
		this.fetchData();
	}

	async fetchData() {
		try {
			const data = await this._supabaseService.fetchDataById('entidades_organizativas', this.id);
			this.positionData = data;
			if (this.positionData[0].descripcion) {
				this.descripcion = this.positionData[0].descripcion;
				this.descripcion = this.descripcion.replace(/\n/g, '<br>');
			} else {
				this.descripcion = 'Sin datos';
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}

		console.log(this.id);

		if (this.id == 10) {
			this.image_URL = environment.pathImgFichas + 'delegacionParticipacion.jpg';
			console.log(this.image_URL);
		}

		if (this.id == 293) {
			this.image_URL = environment.pathImgFichas + 'servicioParticipacion.jpg';
		}
	}
}
