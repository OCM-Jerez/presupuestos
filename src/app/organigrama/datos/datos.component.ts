import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';

import { SupabaseService } from '@services/supabase.service';

@Component({
	selector: 'app-datos',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './datos.component.html',
	styleUrl: './datos.component.scss'
})
export default class DatosComponent implements OnInit {
	@Input() id?: number;
	private _supabaseService = inject(SupabaseService);

	//TODO: - Add type
	public entidad_organizativa: string;
	public puestos: any[] = [];
	public puestosConEmpleados: any[] = [];
	public datosCombinados: any[] = [];
	public detallesCompletosDeEmpleados = [];
	public eoTelefonos: any[] = [];
	public eoDirecciones: any[] = [];
	public eoMails: any[] = [];
	public eoWebs: any[] = [];
	public eoMoviles: any[] = [];
	public eoEmpleados: any[] = [];
	public eoPuestos: any[] = [];
	public puestosDirectos: number;

	ngOnInit(): void {
		this.fetchData();
	}

	async fetchData() {
		try {
			this.eoDirecciones = await this._supabaseService.fetchDataByIdeo('eo_direcciones', this.id);
			const eo = await this._supabaseService.fetchDataById('entidades_organizativas', this.id);
			this.entidad_organizativa = eo[0].nombre;
			this.eoTelefonos = await this._supabaseService.fetchDataByIdeo('eo_telefonos', this.id);
			this.eoMails = await this._supabaseService.fetchDataByIdeo('eo_emails', this.id);
			this.eoMoviles = await this._supabaseService.fetchDataByIdeo('eo_moviles', this.id);
			this.eoWebs = await this._supabaseService.fetchDataByIdeo('eo_webs', this.id);
			this.eoPuestos = await this._supabaseService.fetchDataByIduo('puesto-eo', this.id);
			console.log('eoPuestos:', this.eoPuestos);

			// Creamos un array de promesas usando map() para iterar sobre eoPuestos
			const promesas = this.eoPuestos.map((eoPuesto) =>
				this._supabaseService.fetchDataById('puestos', eoPuesto.id_puesto)
			);

			// Esperamos a que todas las promesas se resuelvan
			const resultados = await Promise.all(promesas);
			console.log('resultados:', resultados);

			// Como cada llamada a fetchDataById devuelve un array, usamos flat() para aplanar el array de resultados
			this.puestos = resultados.flat();
			console.log('puestos:', this.puestos);

			// Ahora this.puestos contiene todos los items de eoPuestos
		} catch (error) {
			console.error('Error al recuperar datos:', error);
		}

		try {
			// Aseguramos que this.puestos está lleno
			this.puestosDirectos = this.puestos.length;

			if (this.puestos.length == 0) {
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
			console.log('detallesCompletosDeEmpleados:', this.detallesCompletosDeEmpleados);
		} catch (error) {
			console.error('Error fetching data:', error);
		}

		this.datosCombinados = this.puestos.map((puesto, index) => {
			const empleado = this.detallesCompletosDeEmpleados[index];
			// Combina los datos renombrando las propiedades para evitar sobreescrituras
			return {
				id_puesto: puesto.id,
				nombre_puesto: puesto.nombre.toLowerCase(),
				url_puesto: puesto.url,
				obs_puesto: puesto.obs,
				rpt_id_puesto: puesto.rpt_id,
				id_empleado: empleado.id,
				nombre_empleado: empleado.nombre,
				apellido1_empleado: empleado.apellido_1,
				apellido2_empleado: empleado.apellido_2,
				obs_empleado: empleado.obs
			};
		});
	}

	async fetchData1() {
		try {
			// Realiza todas las solicitudes iniciales en paralelo
			const [eoDirecciones, eo, eoTelefonos, eoMails, eoMoviles, eoWebs, eoPuestos] = await Promise.all([
				this._supabaseService.fetchDataByIdeo('eo_direcciones', this.id),
				this._supabaseService.fetchDataById('entidades_organizativas', this.id),
				this._supabaseService.fetchDataByIdeo('eo_telefonos', this.id),
				this._supabaseService.fetchDataByIdeo('eo_emails', this.id),
				this._supabaseService.fetchDataByIdeo('eo_moviles', this.id),
				this._supabaseService.fetchDataByIdeo('eo_webs', this.id),
				this._supabaseService.fetchDataByIduo('puesto-eo', this.id)
			]);

			// Asigna los resultados a las propiedades correspondientes
			this.eoDirecciones = eoDirecciones;
			this.entidad_organizativa = eo[0]?.nombre;
			this.eoTelefonos = eoTelefonos;
			this.eoMails = eoMails;
			this.eoMoviles = eoMoviles;
			this.eoWebs = eoWebs;
			this.eoPuestos = eoPuestos;

			// Procesa los puestos en paralelo
			const puestosResultados = await Promise.all(
				eoPuestos.map((eoPuesto) => this._supabaseService.fetchDataById('puestos', eoPuesto.id_puesto))
			);
			this.puestos = puestosResultados.flat();

			// Prepara las solicitudes para obtener los detalles de los empleados de cada puesto
			const detallesEmpleadosPromesas = this.puestos.map((puesto) =>
				this._supabaseService.fetchDataByIdPuesto('empleado-puesto', puesto.id)
			);

			// Ejecuta las solicitudes de los detalles de los empleados en paralelo
			const empleadosResultados = await Promise.all(detallesEmpleadosPromesas);

			// Aquí asumimos que cada respuesta ya es un array de empleados, no necesitas aplanar de nuevo
			this.detallesCompletosDeEmpleados = empleadosResultados;

			// Combina los datos de puestos y empleados
			this.datosCombinados = this.puestos.map((puesto, index) => {
				// Corrección: Asegura que el acceso al array de empleados es correcto
				const empleados = this.detallesCompletosDeEmpleados[index] || [];
				// Asume que quieres combinar datos del primer empleado como ejemplo
				const empleado = empleados[index] || {}; // Asume el primer empleado para simplificar
				return {
					id_puesto: puesto.id,
					nombre_puesto: puesto.nombre.toLowerCase(),
					url_puesto: puesto.url,
					obs_puesto: puesto.obs,
					rpt_id_puesto: puesto.rpt_id,
					id_empleado: empleado.id_empleado,
					nombre_empleado: empleado.nombre,
					apellido1_empleado: empleado.apellido_1,
					apellido2_empleado: empleado.apellido_2,
					imagen_empleado: empleado.imagen,
					obs_empleado: empleado.obs
				};
			});
		} catch (error) {
			console.error('Error al recuperar datos:', error);
		}
	}

	async fetchData2() {
		try {
			this.eoDirecciones = await this._supabaseService.fetchDataByIdeo('eo_direcciones', this.id);
			const eo = await this._supabaseService.fetchDataById('entidades_organizativas', this.id);
			this.entidad_organizativa = eo[0]?.nombre;
			this.eoTelefonos = await this._supabaseService.fetchDataByIdeo('eo_telefonos', this.id);
			this.eoMails = await this._supabaseService.fetchDataByIdeo('eo_emails', this.id);
			this.eoMoviles = await this._supabaseService.fetchDataByIdeo('eo_moviles', this.id);
			this.eoWebs = await this._supabaseService.fetchDataByIdeo('eo_webs', this.id);
			this.eoPuestos = await this._supabaseService.fetchDataByIduo('puesto-eo', this.id);

			const puestosPromises = this.eoPuestos.map((eoPuesto) =>
				this._supabaseService.fetchDataById('puestos', eoPuesto.id_puesto)
			);

			const resultadosPuestos = await Promise.all(puestosPromises);
			this.puestos = resultadosPuestos.flat();

			const detallesEmpleadosPromesas = this.puestos.map(async (puesto) => {
				await this._supabaseService.fetchDataByIdPuesto('empleado-puesto', puesto.id);
			});

			this.detallesCompletosDeEmpleados = (await Promise.all(detallesEmpleadosPromesas)).flat();

			this.datosCombinados = this.puestos.map((puesto, index) => {
				const empleado = this.detallesCompletosDeEmpleados[index]; // Asumiendo un empleado por puesto para simplificar
				return {
					id_puesto: puesto.id,
					nombre_puesto: puesto.nombre.toLowerCase(),
					url_puesto: puesto.url,
					obs_puesto: puesto.obs,
					rpt_id_puesto: puesto.rpt_id,
					id_empleado: empleado?.id_empleado,
					nombre_empleado: empleado?.nombre,
					apellido1_empleado: empleado?.apellido_1,
					apellido2_empleado: empleado?.apellido_2,
					imagen_empleado: empleado?.imagen,
					obs_empleado: empleado?.obs
				};
			});
		} catch (error) {
			console.error('Error al recuperar datos:', error);
		}
	}
}
