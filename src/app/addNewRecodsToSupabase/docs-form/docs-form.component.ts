import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SupabaseService } from '@app/organigrama/supabase/supabase.service';

@Component({
	selector: 'app-docs-form',
	standalone: true,
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	templateUrl: './docs-form.component.html',
	styleUrls: ['./docs-form.component.scss']
})
export default class DocsFormComponent implements OnInit {
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
			emisor: ['', Validators.required],
			title: ['', Validators.required],
			url_doc: ['', Validators.required]
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
				const insertedData = await this._supabaseService.insertRow('documents', formData);
				console.log('Datos insertados:', insertedData);
			} catch (error) {
				console.error('Error al insertar datos:', error);
			}
		}
	}

	addImg(event): void {
		const file = event.target.files[0];
		// console.log(file);
		// this._supabaseService.uploadFile(file);
		// this._supabaseService.uploadFileFromJSON();
	}
}
