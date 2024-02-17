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
	public puestos1: any[] = [];
	public empleados: any[] = [];
	public empleados1: any[] = [];
	public puestosConEmpleados: any[] = [];
	public datosCombinados: any[] = [];
	public detallesCompletosDeEmpleados = [];
	public puesto: string;
	public empleado: string;
	public empleado1: string;
	public eoTelefonos: any[] = [];
	public eoDirecciones: any[] = [];
	public eoMails: any[] = [];
	public eoMoviles: any[] = [];
	public eoEmpleados: any[] = [];
	public eoPuestos: any[] = [];
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
			console.log('id', this.id);
			this.eoDirecciones = await this._supabaseService.fetchDataByIdeo('eo_direcciones', this.id);
			console.log(this.eoDirecciones);
		} catch (error) {
			console.error('Error fetching data:', error);
		}

		try {
			const eo = await this._supabaseService.fetchDataById('entidades_organizativas', this.id);
			this.entidad_organizativa = eo[0].nombre;
			console.log(this.eoTelefonos);
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
			this.eoPuestos = await this._supabaseService.fetchDataByIduo('puesto-eo', this.id);
			console.log(this.eoPuestos);

			// Creamos un array de promesas usando map() para iterar sobre eoPuestos
			const promesas = this.eoPuestos.map((eoPuesto) =>
				this._supabaseService.fetchDataById('puestos', eoPuesto.id_puesto)
			);

			// Esperamos a que todas las promesas se resuelvan
			const resultados = await Promise.all(promesas);

			// Como cada llamada a fetchDataById devuelve un array, usamos flat() para aplanar el array de resultados
			this.puestos = resultados.flat();

			// Ahora this.puestos contiene todos los items de eoPuestos
			console.log(this.puestos);
		} catch (error) {
			console.error('Error al cargar los puestos:', error);
		}

		try {
			// Aseguramos que this.puestos está lleno
			if (this.puestos.length === 0) {
				console.log('No hay puestos para procesar.');
				return;
			}

			// Iteramos sobre cada puesto para obtener los empleados asociados
			for (const puesto of this.puestos) {
				// Obtenemos la lista de empleados para el puesto actual
				const empleadosPorPuesto = await this._supabaseService.fetchDataByIdPuesto('empleado-puesto', puesto.id);

				// Si hay empleados asociados, recuperamos sus detalles
				if (empleadosPorPuesto.length > 0) {
					// Creamos un array de promesas para recuperar los detalles de cada empleado
					const detallesEmpleadosPromesas = empleadosPorPuesto.map((empleado) =>
						this._supabaseService.fetchDataById('empleados', empleado.id_empleado)
					);

					// Esperamos a que todas las promesas se resuelvan y agregamos los resultados
					const detallesEmpleados = await Promise.all(detallesEmpleadosPromesas);
					this.detallesCompletosDeEmpleados = this.detallesCompletosDeEmpleados.concat(detallesEmpleados.flat());
				}
			}

			console.log(this.detallesCompletosDeEmpleados);
		} catch (error) {
			console.error('Error fetching data:', error);
		}

		this.datosCombinados = this.puestos.map((puesto, index) => {
			const empleado = this.detallesCompletosDeEmpleados[index];

			// Combina los datos renombrando las propiedades para evitar sobreescrituras
			return {
				id_puesto: puesto.id,
				nombre_puesto: puesto.nombre,
				url_puesto: puesto.url,
				obs_puesto: puesto.obs,
				rpt_id_puesto: puesto.rpt_id,
				departamento_puesto: puesto.departamento,
				situacion_puesto: puesto.situacion,
				salario_total_puesto: puesto.salario_total,
				id_empleado: empleado.id,
				nombre_empleado: empleado.nombre,
				apellido1_empleado: empleado.apellido_1,
				apellido2_empleado: empleado.apellido_2,
				imagen_empleado: empleado.imagen,
				salario_empleado: empleado.salario,
				ayto_url_empleado: empleado.ayto_url,
				cv_empleado: empleado.cv,
				patrimonio_empleado: empleado.patrimonio,
				linkedin_url_empleado: empleado.linkedin_url,
				wikipedia_url_empleado: empleado.wikipedia_url,
				contacto_empleado: empleado.contacto,
				obs_empleado: empleado.obs
			};
		});

		console.log(this.datosCombinados);

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
