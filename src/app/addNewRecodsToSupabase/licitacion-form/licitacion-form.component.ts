import { Location } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { SupabaseService } from '@services/supabase.service';

@Component({
	selector: 'app-licitacion-form',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: './licitacion-form.component.html',
	styleUrls: ['./licitacion-form.component.scss']
})
export default class LicitacionFormComponent implements OnInit, AfterViewInit {
	@ViewChild('tagElem') tagElem: ElementRef;
	licitacionForm: FormGroup;
	stepForm: FormGroup;
	cardForm: FormGroup;
	private _formBuilder = inject(FormBuilder);
	private _supabaseService = inject(SupabaseService);
	private _location = inject(Location);

	public tag: string;

	ngOnInit(): void {
		this.licitacionForm = this._formBuilder.group({
			tag: ['', Validators.required],
			expediente: ['', Validators.required],
			descripcion: ['', Validators.required],
			url_plataforma: ['', Validators.required],
			tipo_financiacion: ['', Validators.required],
			presupuesto_base_sin_impuestos: ['', Validators.required],
			presupuesto_base_licitación_con_impuestos: [null],
			valor_estimado_contrato: [null, Validators.required],
			tipo_contrato: ['', Validators.required],
			codigo_cpv: ['', Validators.required],
			sistema_contratacion: ['', Validators.required],
			procedimiento_contratacion: ['Abierto', Validators.required],
			tipo_tramitación: ['Ordinaria', Validators.required],

			credito_ampara: [''],
			organico: [''],
			programa: [''],
			economico: [''],
			distrito: [''],
			url_geolocalización: [''],

			adjudicatario: [''],
			cif_adjudicatario: [''],
			url_adjudicatario: [''],

			licitadores_presentados: [null],
			plazo_ejecución: [''],
			duración_contrato: [''],
			importe_adjudicación_sin_impuestos: [null],
			importe_adjudicación_con_impuestos: [null],
			canon_concesional: [null]
		});

		this.stepForm = this._formBuilder.group({
			date: ['', Validators.required],
			step: ['', Validators.required],
			tag: ['']
		});

		this.cardForm = this._formBuilder.group({
			title: ['', Validators.required],
			estado: ['', Validators.required],
			financiacion: ['', Validators.required],
			order: ['', Validators.required],
			tag: [''],
			highlighted: [false]
		});
	}

	ngAfterViewInit() {
		// Aplica el foco al elemento input después de que la vista se haya inicializado
		this.tagElem.nativeElement.focus();
	}

	async submitForm(): Promise<void> {
		if (this.licitacionForm?.valid) {
			console.log('this.userForm.value:', this.licitacionForm.value);

			try {
				// await this._supabaseService.insertRow('licitaciones', this.licitacionForm.value);
				// this._location.back();
			} catch (error) {
				console.error('Error al insertar datos:', error);
			}
		}

		if (this.stepForm?.valid) {
			this.stepForm.patchValue({
				tag: this.licitacionForm.get('tag').value
			});
			console.log('this.stepForm.value:', this.stepForm.value);

			try {
				// await this._supabaseService.insertRow('steps', this.stepForm.value);
				// this._location.back();
			} catch (error) {
				console.error('Error al insertar datos:', error);
			}
		}

		if (this.cardForm?.valid) {
			this.cardForm.patchValue({
				tag: this.licitacionForm.get('tag').value,
				title: this.licitacionForm.get('descripcion').value
			});
			console.log('this.cardForm.value:', this.cardForm.value);

			try {
				// await this._supabaseService.insertRow('licitaciones-cards', this.cardForm.value);
				// this._location.back();
			} catch (error) {
				console.error('Error al insertar datos:', error);
			}
		}
	}
}
