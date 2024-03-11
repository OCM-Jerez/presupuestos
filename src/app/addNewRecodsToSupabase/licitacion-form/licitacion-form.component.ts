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
	userForm: FormGroup;
	private _formBuilder = inject(FormBuilder);
	private _supabaseService = inject(SupabaseService);
	private _location = inject(Location);

	public tag: string;

	ngOnInit(): void {
		this.userForm = this._formBuilder.group({
			tag: ['', Validators.required],
			expediente: ['', Validators.required],
			descripcion: ['', Validators.required],
			codigo_cpv: ['', Validators.required],
			url_plataforma: ['', Validators.required],
			tipo_financiacion: ['', Validators.required],
			tipo_contrato: ['', Validators.required],
			sistema_contratacion: ['', Validators.required],
			procedimiento_contratacion: ['Abierto', Validators.required],
			tipo_tramitación: ['Ordinaria', Validators.required],
			presupuesto_base_sin_impuestos: ['', Validators.required],
			valor_estimado_contrato: [null, Validators.required],
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

	ngAfterViewInit() {
		// Aplica el foco al elemento input después de que la vista se haya inicializado
		this.tagElem.nativeElement.focus();
	}

	async submitForm(): Promise<void> {
		if (this.userForm?.valid) {
			console.log('this.userForm.value:', this.userForm.value);

			try {
				await this._supabaseService.insertRow('licitaciones', this.userForm.value);
				this._location.back();
			} catch (error) {
				console.error('Error al insertar datos:', error);
			}
		}
	}
}
