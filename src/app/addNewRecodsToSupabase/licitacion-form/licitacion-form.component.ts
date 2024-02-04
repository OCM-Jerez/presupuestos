import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SupabaseService } from '@services/supabase.service';

@Component({
	selector: 'app-licitacion-form',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: './licitacion-form.component.html',
	styleUrls: ['./licitacion-form.component.scss']
})
export default class LicitacionFormComponent implements OnInit {
	userForm: FormGroup;

	constructor(private formBuilder: FormBuilder) {}
	private _route = inject(ActivatedRoute);
	private _supabaseService = inject(SupabaseService);
	public tag: string;

	ngOnInit(): void {
		this.userForm = this.formBuilder.group({
			tag: ['', Validators.required],
			expediente: ['', Validators.required],
			descripcion: ['', Validators.required],
			codigo_cpv: [''],
			url_plataforma: [''],
			tipo_financiacion: [''],
			tipo_contrato: [''],
			sistema_contratacion: [''],
			procedimiento_contratacion: [''],
			tipo_tramitación: [''],
			presupuesto_base_sin_impuestos: [''],
			valor_estimado_contrato: [null],
			presupuesto_base_licitación_con_impuestos: [null],
			plazo_ejecución: [''],
			licitadores_presentados: [null],
			adjudicatario: [''],
			cif_adjudicatario: [''],
			url_adjudicatario: [''],
			importe_adjudicación_sin_impuestos: [null],
			importe_adjudicación_con_impuestos: [null],
			credito_ampara: [''],
			organico: [''],
			programa: [''],
			economico: [''],
			distrito: [''],
			url_geolocalización: [''],
			duración_contrato: [''],
			canon_concesional: [null]
		});
	}

	async submitForm(): Promise<void> {
		// console.log('submitForm');

		if (this.userForm?.valid) {
			try {
				await this._supabaseService.insertRow('licitaciones', this.userForm.value);
				// console.log('Datos insertados:', this.userForm.value);
			} catch (error) {
				console.error('Error al insertar datos:', error);
			}
		}
	}
}
