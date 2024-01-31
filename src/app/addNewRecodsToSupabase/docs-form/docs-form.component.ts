import { Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { SupabaseService } from '@services/supabase.service';
import { TagStoreService } from '@services/tagStore.service';

@Component({
	selector: 'app-docs-form',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: './docs-form.component.html',
	styleUrls: ['./docs-form.component.scss']
})
export default class DocsFormComponent implements OnInit {
	userForm: any;
	private _formBuilder = inject(FormBuilder);
	private _route = inject(ActivatedRoute);
	private _supabaseService = inject(SupabaseService);
	private _location = inject(Location);
	private _tagStoreService = inject(TagStoreService);
	public tag = this._tagStoreService.getTag();

	ngOnInit(): void {
		this.userForm = this._formBuilder.group({
			date: ['', Validators.required],
			emisor: ['', Validators.required],
			title: ['', Validators.required],
			url_doc: ['', Validators.required]
		});
	}

	async guardar(): Promise<void> {
		console.log('submitForm');

		if (this.userForm?.valid) {
			const formData = {
				...this.userForm.value,
				tag: this.tag
			};

			console.log('Form data with param:', formData);

			try {
				const insertedData = await this._supabaseService.insertRow('documents', formData);
				console.log('Datos insertados:', insertedData);
				this._location.back();
			} catch (error) {
				console.error('Error al insertar datos:', error);
			}
		}
	}

	addDoc(event): void {
		const file = event.target.files[0];
		console.log(file);
		// this._supabaseService.uploadFile(file);
		// this._supabaseService.uploadFileFromJSON();
	}
}
