import { Location } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';

import { SupabaseService } from '@services/supabase.service';
// import { TagStoreService } from '@services/tagStore.service';
// import { first } from 'rxjs';

@Component({
	selector: 'app-news-form',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: './news-form.component.html',
	styleUrls: ['./news-form.component.scss']
})
export default class NewsFormComponent implements OnInit {
	@Input() tag: string;
	userForm: FormGroup;
	// private _router = inject(Router);
	// private _activatedRoute = inject(ActivatedRoute);
	private _formBuilder = inject(FormBuilder);
	private _supabaseService = inject(SupabaseService);
	private _location = inject(Location);
	// private _tagStoreService = inject(TagStoreService);
	// public path: string;
	// public tag: string;

	ngOnInit(): void {
		// this.getTag();

		this.userForm = this._formBuilder.group({
			date: ['', Validators.required],
			media: ['', Validators.required],
			title: ['', Validators.required],
			url_new: ['', Validators.required]
		});
	}

	// getTag() {
	// 	const urlSegments = this._router.url.split('/');
	// 	console.log('urlSegments:', urlSegments);

	// 	// ¿Es ruta con parametro? Por ejemplo: path: 'licitaciones/:tag',
	// 	if (urlSegments.length > 2) {
	// 		this._activatedRoute.params.pipe(first()).subscribe(async ({ tag }) => {
	// 			this.path = urlSegments[1];
	// 			this.tag = tag;
	// 		});
	// 	}
	// }

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
