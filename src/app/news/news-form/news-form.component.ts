import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SupabaseService } from '@app/organigrama/supabase/supabase.service';

@Component({
	selector: 'app-news-form',
	standalone: true,
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	templateUrl: './news-form.component.html',
	styleUrls: ['./news-form.component.scss']
})
export default class NewsFormComponent implements OnInit {
	userForm: any;

	constructor(private formBuilder: FormBuilder) {}
	private _route = inject(ActivatedRoute);
	private _supabaseService = inject(SupabaseService);
	public tag: string;

	ngOnInit(): void {
		const { paramMap } = this._route.snapshot;
		this.tag = paramMap['params'].param;
		// console.log('paramMap', paramMap);

		console.log('param', this.tag);

		this.userForm = this.formBuilder.group({
			date: ['', Validators.required],
			media: ['', Validators.required],
			title: ['', Validators.required],
			url_new: ['', Validators.required]
			// gender: ['', Validators.required]
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
				const insertedData = await this._supabaseService.insertRow('news', formData);
				console.log('Datos insertados:', insertedData);
			} catch (error) {
				console.error('Error al insertar datos:', error);
			}
		}
	}

	addImg(event): void {
		const file = event.target.files[0];

		// console.log(file);
		this._supabaseService.uploadFile(file);
		// this._supabaseService.uploadFileFromJSON();
	}
}
