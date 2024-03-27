import { Location } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { SupabaseService } from '@services/supabase.service';

@Component({
	selector: 'app-add-card',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: './add-card.component.html'
})
export default class AddCardComponent implements OnInit {
	@Input() tag: string;
	private _formBuilder = inject(FormBuilder);
	private _supabaseService = inject(SupabaseService);
	private _location = inject(Location);
	public cardForm: FormGroup;

	ngOnInit(): void {
		this.cardForm = this._formBuilder.group({
			title: ['', Validators.required],
			tag: ['', Validators.required],
			level: ['', Validators.required],
			['level-up']: [''],
			isLastLevel: [true, Validators.required],
			order: ['']
		});
	}

	async guardar(): Promise<void> {
		if (this.cardForm?.valid) {
			const formData = {
				...this.cardForm.value,
				['level-up']: this.tag
			};

			try {
				await this._supabaseService.insertRow('tag_title', formData);
				this._location.back();
			} catch (error) {
				console.error('Error al insertar datos:', error);
			}
		}
	}
}
