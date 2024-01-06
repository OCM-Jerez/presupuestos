import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SupabaseService } from '@app/organigrama/supabase/supabase.service';

@Component({
	selector: 'app-step-form',
	standalone: true,
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	templateUrl: './step-form.component.html',
	styleUrls: ['./step-form.component.scss']
})
export default class StepFormComponent implements OnInit {
	userForm: any;

	private _formBuilder = inject(FormBuilder);
	private _route = inject(ActivatedRoute);
	private _supabaseService = inject(SupabaseService);
	public tag: string;

	ngOnInit(): void {
		const { paramMap } = this._route.snapshot;
		this.tag = paramMap['params'].param;

		console.log('param', this.tag);

		this.userForm = this._formBuilder.group({
			date: ['', Validators.required],
			step: ['', Validators.required]
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
				const insertedData = await this._supabaseService.insertRow('steps', formData);
				console.log('Datos insertados:', insertedData);
			} catch (error) {
				console.error('Error al insertar datos:', error);
			}
		}
	}
}
