import { Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { SupabaseService } from '@services/supabase.service';
import { TagStoreService } from '@services/tagStore.service';

@Component({
	selector: 'app-news-form',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: './empleado.component.html',
	styleUrls: ['./empleado.component.scss']
})
export default class EmpleadoComponent implements OnInit {
	userForm: FormGroup;
	private _formBuilder = inject(FormBuilder);
	private _supabaseService = inject(SupabaseService);
	private _location = inject(Location);
	private _tagStoreService = inject(TagStoreService);
	public tag = this._tagStoreService.getTag();

	ngOnInit(): void {
		this.userForm = this._formBuilder.group({
			nombre: ['', Validators.required],
			apellido_1: ['', Validators.required],
			apellido_2: [''],
			obs: [''],
			id_puesto: ['']
		});
	}

	async guardar(): Promise<void> {
		if (this.userForm?.valid) {
			// const formData = {
			// 	...this.userForm.value,
			// 	tag: this.tag
			// };

			try {
				// console.log('formData:', this.userForm.value);
				console.log('formData:', this.userForm.value);

				const newEmpleado = await this._supabaseService.insertRow('empleados_duplicate', {
					nombre: this.userForm.value.nombre,
					apellido_1: this.userForm.value.apellido_1,
					apellido_2: this.userForm.value.apellido_2,
					obs: this.userForm.value.obs
				});
				console.log('newEmpleado:', newEmpleado);
				console.log('newEmpleado:', newEmpleado[0].id);

				const dataEmpleadoPuesto = { id_empleado: newEmpleado[0].id, id_puesto: this.userForm.value.id_puesto };
				console.log('dataEmpleadoPuesto:', dataEmpleadoPuesto);

				const newEmpleadoPuesto = await this._supabaseService.insertRow(
					'empleado-puesto_duplicate',
					dataEmpleadoPuesto
				);

				console.log('newEmpleadoPuesto:', newEmpleadoPuesto);

				this._location.back();
			} catch (error) {
				console.error('Error al insertar datos:', error);
			}
		}
	}
}
