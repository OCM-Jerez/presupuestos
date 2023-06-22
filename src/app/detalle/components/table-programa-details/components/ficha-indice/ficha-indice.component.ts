import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardInfoComponent } from '../../../../../commons/components/card-info/card-info.component';
import { DataStoreFichaProgramaService } from '@services/dataStoreFichaPrograma.service';
import { Subscription } from 'rxjs';
import { IGastos } from '@interfaces/gastos.interface';

@Component({
	selector: 'app-ficha-indice',
	standalone: true,
	imports: [CommonModule, CardInfoComponent],
	templateUrl: './ficha-indice.component.html',
	styleUrls: ['./ficha-indice.component.scss']
})
export default class FichaIndiceComponent implements OnInit, OnDestroy {
	private _router = inject(Router);
	private _dataStoreFichaProgramaService = inject(DataStoreFichaProgramaService);

	private _subscription: Subscription;
	private _datos: IGastos[] = [];
	public programa: string;

	cardsInfo = [
		{
			rutaImagen: 'assets/img/home/menu1-400x250.webp',
			titulo: 'Presupuesto',
			subtitulo: ' ',
			funcion: () => this.fichaPresupuesto(),
			textButton: 'Presupuesto',
			background: 'linear-gradient(to bottom, white , #FCE1CB)'
		},
		{
			rutaImagen: 'assets/img/home/menu4-400x250.webp',
			titulo: 'Empleados municipales',
			subtitulo: '',
			funcion: () => this.fichaEmpleados(),
			textButton: 'Empleados',
			background: 'linear-gradient(to bottom, white , #E0E0E0)'
		},
		{
			rutaImagen: 'assets/img/home/menu2-400x250.webp',
			titulo: 'Carta de servicios',
			subtitulo: '',
			funcion: () => this.fichaEmpleados(),
			textButton: 'Detalle',
			background: 'linear-gradient(to bottom, white , #CDE9FE)'
		},
		{
			rutaImagen: 'assets/img/home/menu3-400x250.webp',
			titulo: 'Indicadores',
			subtitulo: '',
			funcion: () => this.fichaEmpleados(),
			textButton: 'Licitaciones',
			background: 'linear-gradient(to bottom,white , #DCEDC8)'
		},
		{
			rutaImagen: 'assets/img/home/menu1-400x250.webp',
			titulo: 'Hemeroteca',
			subtitulo: ' ',
			funcion: () => this.fichaPresupuesto(),
			textButton: 'Visión global',
			background: 'linear-gradient(to bottom, white , #FCE1CB)'
		},
		{
			rutaImagen: 'assets/img/home/menu4-400x250.webp',
			titulo: 'Documentos',
			subtitulo: '',
			funcion: () => this.fichaEmpleados(),
			textButton: 'Empleados',
			background: 'linear-gradient(to bottom, #D3CCE3 , white)'
		},
		{
			rutaImagen: 'assets/img/home/menu2-400x250.webp',
			titulo: 'Licitaciones',
			subtitulo: '',
			funcion: () => this.fichaEmpleados(),
			textButton: 'Detalle',
			background: 'linear-gradient(to bottom,#5092A9 , #FCFDFE)'
		},
		{
			rutaImagen: 'assets/img/home/menu3-400x250.webp',
			titulo: 'Contratos menores',
			subtitulo: '',
			funcion: () => this.fichaEmpleados(),
			textButton: 'Licitaciones',
			background: 'linear-gradient(to bottom, #EEBE3E ,white)'
		},
		{
			rutaImagen: 'assets/img/home/menu4-400x250.webp',
			titulo: 'Acuerdos de Pleno',
			subtitulo: '',
			funcion: () => this.fichaEmpleados(),
			textButton: 'Empleados',
			background: 'linear-gradient(to bottom, #D2DAB9 , white)'
		},
		{
			rutaImagen: 'assets/img/home/menu2-400x250.webp',
			titulo: 'Acuerdos JGL',
			subtitulo: '',
			funcion: () => this.fichaEmpleados(),
			textButton: 'Detalle',
			background: 'linear-gradient(to bottom, #A28B7B , white)'
		}
	];

	fichaPresupuesto() {
		this._router.navigateByUrl('/fichaPresupuesto');
	}
	fichaEmpleados() {
		this._router.navigateByUrl('/fichaEmpleados');
	}

	ngOnInit(): void {
		this._subscription = this._dataStoreFichaProgramaService.getFichaProgramaData().subscribe((data: IGastos[]) => {
			this._datos = data;
			console.log(this._datos);
		});
		this.programa = this._datos[0].CodPro + ' - ' + this._datos[0].DesPro;
	}

	ngOnDestroy() {
		this._subscription.unsubscribe();
	}
}
