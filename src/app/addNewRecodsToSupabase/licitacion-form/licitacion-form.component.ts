import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SupabaseService } from '@app/organigrama/supabase/supabase.service';

import { environment } from '@environments/environment';

@Component({
	selector: 'app-licitacion-form',
	standalone: true,
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	templateUrl: './licitacion-form.component.html',
	styleUrls: ['./licitacion-form.component.scss']
})
export default class LicitacionFormComponent implements OnInit {
	userForm: any;

	constructor(private formBuilder: FormBuilder) {}
	private _route = inject(ActivatedRoute);
	private _supabaseService = inject(SupabaseService);
	public tag: string;

	ngOnInit(): void {
		const { paramMap } = this._route.snapshot;
		console.log('this._route.snapshot', this._route.snapshot);

		this.tag = paramMap['params'].param;
		// console.log('paramMap', paramMap);

		console.log('param', this.tag);

		this.userForm = this.formBuilder.group({
			tag: ['', Validators.required],
			expediente: ['', Validators.required],
			descripcion: ['', Validators.required],
			codigo_cpv: ['', Validators.required],
			url_plataforma: ['', Validators.required]
		});
	}

	async submitForm(): Promise<void> {
		console.log('submitForm');

		if (this.userForm?.valid) {
			const formData = {
				...this.userForm.value,
				tag: this.tag
			};

			console.log('Form data with param:', formData);

			try {
				const insertedData = await this._supabaseService.insertRow('licitaciones', formData);
				console.log('Datos insertados:', insertedData);
			} catch (error) {
				console.error('Error al insertar datos:', error);
			}
		}
	}
}
