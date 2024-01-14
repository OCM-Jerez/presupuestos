import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ModalService } from '../modal/modal.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SupabaseService } from '@app/organigrama/supabase/supabase.service';

@Component({
	selector: 'app-modal-content',
	standalone: true,
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	templateUrl: './modal-content.component.html',
	styleUrls: ['./modal-content.component.css']
})
export class ModalContentComponent {
	private modalService = inject(ModalService);
	userForm: any;

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

	close() {
		console.log('ModalContentComponent.close()');

		this.modalService.close();
	}
}
