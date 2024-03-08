import { Location } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { SupabaseService } from '@services/supabase.service';
// import { TagStoreService } from '@services/tagStore.service';
import { ModalService } from '@app/layouts/modal/modal.service';

@Component({
	selector: 'app-coms-form',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: './coms-form.component.html',
	styleUrls: ['./coms-form.component.scss']
})
export default class ComsFormComponent implements OnInit {
	@Input() tag: string;
	userForm: FormGroup;
	private _formBuilder = inject(FormBuilder);
	private _supabaseService = inject(SupabaseService);
	private _location = inject(Location);
	// private _tagStoreService = inject(TagStoreService);
	private _modalService = inject(ModalService);
	// public tag = this._tagStoreService.getTag();

	ngOnInit(): void {
		this.userForm = this._formBuilder.group({
			date: ['', Validators.required],
			sender: ['', Validators.required],
			text: ['', Validators.required]
		});
	}

	async guardar(): Promise<void> {
		if (this.userForm?.valid) {
			const formData = {
				...this.userForm.value,
				tag: this.tag
			};

			try {
				await this._supabaseService.insertRow('comments', formData);
				// this._modalService.close(); // NO FUNCIONA
				this._location.back();
			} catch (error) {
				console.error('Error al insertar datos:', error);
			}
		}
	}
}
