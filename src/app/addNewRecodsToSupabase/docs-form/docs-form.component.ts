import { Location } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { SupabaseService } from '@services/supabase.service';

@Component({
	selector: 'app-docs-form',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: './docs-form.component.html'
})
export default class DocsFormComponent implements OnInit {
	@Input() tag: string;
	userForm: FormGroup;
	private _formBuilder = inject(FormBuilder);
	private _supabaseService = inject(SupabaseService);
	private _location = inject(Location);

	ngOnInit(): void {
		this.userForm = this._formBuilder.group({
			date: ['', Validators.required],
			emisor: ['', Validators.required],
			title: ['', Validators.required],
			url_doc: ['', Validators.required]
		});
	}

	async guardar(): Promise<void> {
		if (this.userForm?.valid) {
			const formData = {
				...this.userForm.value,
				tag: this.tag
			};

			try {
				await this._supabaseService.insertRow('documents', formData);
				this._location.back();
			} catch (error) {
				console.error('Error al insertar datos:', error);
			}
		}
	}
}
