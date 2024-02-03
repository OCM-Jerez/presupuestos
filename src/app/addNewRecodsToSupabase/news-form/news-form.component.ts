import { Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { SupabaseService } from '@services/supabase.service';
import { TagStoreService } from '@services/tagStore.service';

@Component({
	selector: 'app-news-form',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: './news-form.component.html',
	styleUrls: ['./news-form.component.scss']
})
export default class NewsFormComponent implements OnInit {
	userForm: FormGroup;
	private _formBuilder = inject(FormBuilder);
	private _supabaseService = inject(SupabaseService);
	private _location = inject(Location);
	private _tagStoreService = inject(TagStoreService);
	public tag = this._tagStoreService.getTag();

	ngOnInit(): void {
		this.userForm = this._formBuilder.group({
			date: ['', Validators.required],
			media: ['', Validators.required],
			title: ['', Validators.required],
			url_new: ['', Validators.required]
		});
	}

	async guardar(): Promise<void> {
		if (this.userForm?.valid) {
			const formData = {
				...this.userForm.value,
				tag: this.tag
			};

			try {
				await this._supabaseService.insertRow('news', formData);
				this._location.back();
			} catch (error) {
				console.error('Error al insertar datos:', error);
			}
		}
	}
}
