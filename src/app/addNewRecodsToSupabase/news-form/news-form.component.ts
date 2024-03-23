import { Location } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { SupabaseService } from '@services/supabase.service';

@Component({
	selector: 'app-news-form',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: './news-form.component.html',
	styleUrls: ['./news-form.component.scss']
})
export default class NewsFormComponent implements OnInit {
	@Input() tag: string;
	private _formBuilder = inject(FormBuilder);
	private _supabaseService = inject(SupabaseService);
	private _location = inject(Location);
	public userForm: FormGroup;

	ngOnInit(): void {
		this.userForm = this._formBuilder.group({
			date: ['', Validators.required],
			media: ['', Validators.required],
			title: ['', Validators.required],
			url_new: ['']
		});

		this.readClipboard();
	}

	async readClipboard1() {
		try {
			const clipboardContents = await navigator.clipboard.read();
			console.log('clipboardContents:', clipboardContents);

			for (const item of clipboardContents) {
				console.log('item:', item.types);

				if (item.types.includes('text/html')) {
					const text = await item.getType('text/html');
					console.log('text:', text);
					navigator.clipboard.readText().then((clipText) => {
						console.log('clipText:', clipText);

						this.userForm.patchValue({ url_new: clipText });
					});
				}

				if (item.types.includes('text/plain')) {
					const text = await item.getType('text/plain');
					console.log('text:', text);
					navigator.clipboard.readText().then((clipText) => {
						console.log('clipText:', clipText);
						this.userForm.patchValue({ title: clipText });
					});
				}
			}
		} catch (error) {
			console.log('error:', error);
		}
	}

	async readClipboard() {
		try {
			navigator.clipboard.readText().then((clipText) => {
				this.userForm.patchValue({ url_new: clipText });
			});
		} catch (error) {
			console.error('error:', error);
		}
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
