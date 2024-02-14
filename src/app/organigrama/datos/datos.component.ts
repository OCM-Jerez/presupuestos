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
	public entidad_organizativa: string;
	public puestos: any[] = [];
	public empleados: any[] = [];
	public empleados1: any[] = [];
	public puesto: string;
	public empleado: string;
	public empleado1: string;
	public eoTelefonos: any[] = [];
	public eoDirecciones: any[] = [];
	public eoMails: any[] = [];
	public eoMoviles: any[] = [];
	public eoEmpleados: any[] = [];
	private _supabaseService = inject(SupabaseService);
	public descripcion: string;
	public image_URL: string;

	ngOnInit(): void {
		this.fetchData();
	}

	async fetchData() {
		// await this._supabaseService.fetchData1();

		// try {
		// 	this.eoTelefonos = await this._supabaseService.fetchData('view_entidades_organizativas_telefonos');
		// 	console.log(this.eoTelefonos);
		// } catch (error) {
		// 	console.error('Error fetching data:', error);
		// }

		try {
			const eo = await this._supabaseService.fetchDataById('entidades_organizativas', this.id);
			this.entidad_organizativa = eo[0].nombre;
			console.log(this.eoTelefonos);
		} catch (error) {
			console.error('Error fetching data:', error);
		}

		try {
			this.eoDirecciones = await this._supabaseService.fetchData('view_entidades_organizativas_direcciones');
			console.log(this.eoDirecciones);
		} catch (error) {
			console.error('Error fetching data:', error);
		}

		try {
			this.eoTelefonos = await this._supabaseService.fetchDataByIdeo('eo_telefonos', this.id);
			console.log(this.eoTelefonos);
		} catch (error) {
			console.error('Error fetching data:', error);
		}

		try {
			this.eoMails = await this._supabaseService.fetchDataByIdeo('eo_emails', this.id);
			console.log(this.eoMails);
		} catch (error) {
			console.error('Error fetching data:', error);
		}

		try {
			this.eoMoviles = await this._supabaseService.fetchDataByIdeo('eo_moviles', this.id);
			console.log(this.eoMoviles);
		} catch (error) {
			console.error('Error fetching data:', error);
		}

		try {
			this.eoEmpleados = await this._supabaseService.fetchDataByIduo('puesto-eo', this.id);
			console.log(this.eoEmpleados);
			this.puestos = await this._supabaseService.fetchDataById('puestos', this.eoEmpleados[0].id_puesto);
			console.log(this.puestos);

			this.puesto = this.puestos[0].nombre;
			console.log(this.puesto);
			console.log(this.eoEmpleados[0].id_puesto);

			this.empleados = await this._supabaseService.fetchDataByIdPuesto(
				'empleado-puesto',
				this.eoEmpleados[0].id_puesto
			);
			console.log(this.empleados);
			this.empleados = await this._supabaseService.fetchDataById('empleados', this.empleados[0].id_empleado);
			console.log(this.empleados);
			this.empleados1 = await this._supabaseService.fetchDataById('empleados', this.empleados[1].id_empleado);
			console.log(this.empleados1);
		} catch (error) {
			console.error('Error fetching data:', error);
		}

		console.log(this.id);
		switch (this.id.toString()) {
			case '10':
				this.image_URL = environment.pathImgFichas + 'delegacionParticipacion.jpg';
				break;
			case '293':
				this.image_URL = environment.pathImgFichas + 'servicioParticipacion.jpg';
				break;
			case '157':
				this.image_URL = environment.pathImgFichas + '157.jpg';
				break;

			default:
				break;
		}
	}
}
