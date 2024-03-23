import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { SupabaseService } from '@services/supabase.service';

@Component({
	selector: 'app-step-form',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: './step-form.component.html'
})
export default class StepFormComponent implements OnInit {
	@Input() tag: string;
	userForm: FormGroup;
	private _formBuilder = inject(FormBuilder);
	private _supabaseService = inject(SupabaseService);

	ngOnInit(): void {
		this.userForm = this._formBuilder.group({
			date: ['', Validators.required],
			step: ['', Validators.required]
		});
	}

	async guardar(): Promise<void> {
		if (this.userForm?.valid) {
			const formData = {
				...this.userForm.value,
				tag: this.tag
			};

			try {
				await this._supabaseService.insertRow('steps', formData);
			} catch (error) {
				console.error('Error al insertar datos:', error);
			}
		}
	}
}
