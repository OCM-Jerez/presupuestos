import { NgIf, Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { SupabaseService } from '@app/organigrama/supabase/supabase.service';

@Component({
	selector: 'app-news-form',
	standalone: true,
	imports: [NgIf, FormsModule, ReactiveFormsModule],
	templateUrl: './news-form.component.html',
	styleUrls: ['./news-form.component.scss']
})
export default class NewsFormComponent implements OnInit {
	// TODO: Typar
	userForm: any;

	// constructor(private formBuilder: FormBuilder) {}
	private _formBuilder = inject(FormBuilder);
	private _route = inject(ActivatedRoute);
	private _supabaseService = inject(SupabaseService);
	private _location = inject(Location);
	public tag: string;

	ngOnInit(): void {
		const { paramMap } = this._route.snapshot;
		this.tag = paramMap['params'].param;

		this.userForm = this._formBuilder.group({
			date: ['', Validators.required],
			media: ['', Validators.required],
			title: ['', Validators.required],
			url_new: ['', Validators.required]
		});
	}

	async submitForm(): Promise<void> {
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
