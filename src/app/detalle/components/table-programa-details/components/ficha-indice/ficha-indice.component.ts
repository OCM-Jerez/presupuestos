import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import programasInfo from '@assets/data/programasInfo.json';

import { CardInfoComponent } from '../../../../../commons/components/card-info/card-info.component';

import { DataStoreFichaProgramaService } from '@services/dataStoreFichaPrograma.service';
import { DataStoreService } from '@services/dataStore.service';

import { IGastos } from '@interfaces/gastos.interface';
import { IDataTotalesPresupuesto } from '@interfaces/dataTotalesPresupuesto.interface';
import { environment } from '@environments/environment';

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
	private _location = inject(Location);
	private _dataStoreService = inject(DataStoreService);

	private _subscription: Subscription;
	private _datos: IGastos[] = [];
	public programa: string;
	public DataTotalesPresupuesto: IDataTotalesPresupuesto = {};

	private totalPresupuestadoTotal: number;
	private totalPresupuestado: number;
	private totalGastado: number;
	private cartaServiciosURL = '';
	private cartaServiciosUltimaActualizacion = '';
	private indicadores2017URL = '';
	private indicadoresYear = 'Sin datos';
	public cardsInfo: any[] = [];
	liqDate = environment.liqDate2023;

	ngOnInit(): void {
		// this._subscription = this._dataStoreFichaProgramaService.getFichaProgramaData().subscribe((data: IGastos[]) => {
		// 	this._datos = data;
		// });
		// this.programa = this._datos[0].DesPro;

		// const codigoBuscar = this._datos[0].CodPro;
		// const programa = programasInfo.find((element) => element.codigo === codigoBuscar);
		// console.log(programa);
		// if (programa) {
		// 	if (programa.cartaServicios[1].URL) {
		// 		this.cartaServiciosURL = programa.cartaServicios[1].URL;
		// 	}
		// 	if (programa.cartaServicios[0].ultimaActualizacion) {
		// 		this.cartaServiciosUltimaActualizacion = programa.cartaServicios[0].ultimaActualizacion;
		// 	}
		// 	if (programa.indicadores[2].URL) {
		// 		this.indicadores2017URL = programa.indicadores[2].URL;
		// 	}
		// 	if (programa.indicadores[2].year) {
		// 		this.indicadoresYear = programa.indicadores[2].year;
		// 	}
		// }

		this._subscription = this._dataStoreFichaProgramaService.getFichaProgramaData().subscribe((data: IGastos[]) => {
			this._datos = data;

			if (this._datos?.[0]) {
				this.programa = this._datos[0].DesPro;
				const codigoBuscar = this._datos[0].CodPro;
				const programaData = programasInfo.find((element) => element.codigo === codigoBuscar);

				if (programaData) {
					this.cartaServiciosURL = programaData.cartaServicios?.[1]?.URL;
					this.cartaServiciosUltimaActualizacion = programaData.cartaServicios?.[0]?.ultimaActualizacion;
					this.indicadores2017URL = programaData.indicadores?.[2]?.URL;
					this.indicadoresYear = programaData.indicadores?.[2]?.year;
				}
			}
		});

		console.log('this.cartaServiciosUltimaActualizacion', this.cartaServiciosUltimaActualizacion);

		this.DataTotalesPresupuesto = this._dataStoreService.dataTotalesPresupuesto;
		console.log('this._datos', this.DataTotalesPresupuesto);

		this.totalPresupuestadoTotal = this.DataTotalesPresupuesto.totalPresupuestoGastos;
		this.totalPresupuestado = this._datos.reduce((acc, item) => {
			acc += item.Definitivas2023;
			return acc;
		}, 0);
		const porcentajePresupuesto = (this.totalPresupuestado / this.totalPresupuestadoTotal) * 100;
		// const porcentajePresupuesto = this.totalPresupuestadoTotal / this.totalPresupuestado;

		this.totalGastado = this._datos.reduce((acc, item) => {
			acc += item.Pagos2023;
			return acc;
		}, 0);
		const porcentajeGasto = (this.totalGastado / this.totalPresupuestado) * 100;
		const porcentajeRemanente = ((this.totalPresupuestado - this.totalGastado) / this.totalPresupuestado) * 100;

		this.cardsInfo = [
			{
				rutaImagen: 'assets/img/home/menu1-400x250.webp',
				titulo: 'Presupuesto',
				subtitulo: 'Breve explicación del dato correspondiente ... ',
				funcion: () => this.fichaPresupuesto(),
				textButton: this.totalPresupuestado.toLocaleString('de-DE'),
				textButton1: (porcentajePresupuesto.toFixed(2) + '%').replace('.', ','),
				textButton2: 'del presupuesto total',
				background: 'linear-gradient(to bottom,  #FCE1CB, white)',
				hover: true
			},
			{
				rutaImagen: 'assets/img/home/menu1-400x250.webp',
				titulo: 'Gastos',
				subtitulo: 'Breve explicación del dato correspondiente ... ',
				funcion: () => this.fichaGastos(),
				textButton: this.totalGastado.toLocaleString('de-DE'),
				textButton1: (porcentajeGasto.toFixed(2) + '%').replace('.', ','),
				textButton2: 'de su presupuesto',
				background: 'linear-gradient(to bottom, #EEBE3E, white)',
				hover: true
			},
			{
				rutaImagen: 'assets/img/home/menu1-400x250.webp',
				titulo: 'Remanentes',
				subtitulo: 'Breve explicación del dato correspondiente ... ',
				funcion: () => this.fichaRemanentes(),
				textButton: (this.totalPresupuestado - this.totalGastado).toLocaleString('de-DE'),
				textButton1: (porcentajeRemanente.toFixed(2) + '%').replace('.', ','),
				textButton2: 'de su presupuesto',
				background: 'linear-gradient(to bottom, #D2DAB9 , white)',
				hover: true
			},
			{
				rutaImagen: 'assets/img/home/menu4-400x250.webp',
				titulo: 'Empleados',
				subtitulo: '',
				funcion: () => this.fichaEmpleados(),
				textButton1: 'Sin datos',
				background: 'linear-gradient(to bottom, #E0E0E0, white)',
				hover: false
			},
			{
				rutaImagen: 'assets/img/home/menu2-400x250.webp',
				titulo: 'Carta servicios',
				subtitulo: '',
				funcion: () => this.cartaServicios(this.cartaServiciosURL),
				// textButton: 'Ultima actualización',
				textButton1: this.cartaServiciosUltimaActualizacion,
				background: 'linear-gradient(to bottom, #CDE9FE, white)',
				hover: this.cartaServiciosURL ? true : false
			},
			{
				rutaImagen: 'assets/img/home/menu3-400x250.webp',
				titulo: 'Indicadores',
				subtitulo: '',
				funcion: () => this.indicadores(this.indicadores2017URL),
				textButton1: this.indicadoresYear,
				background: 'linear-gradient(to bottom,#DCEDC8, white)',
				hover: this.indicadores2017URL ? true : false
			},
			{
				rutaImagen: 'assets/img/home/menu1-400x250.webp',
				titulo: 'Hemeroteca',
				subtitulo: ' ',
				funcion: () => this.fichaPresupuesto(),
				textButton1: 'Sin datos',
				background: 'linear-gradient(to bottom, #FCE1CB, white)',
				hover: false
			},
			{
				rutaImagen: 'assets/img/home/menu4-400x250.webp',
				titulo: 'Documentos',
				subtitulo: '',
				funcion: () => this.fichaEmpleados(),
				textButton1: 'Sin datos',
				background: 'linear-gradient(to bottom, #D3CCE3 , white)',
				hover: false
			},
			{
				rutaImagen: 'assets/img/home/menu2-400x250.webp',
				titulo: 'Licitaciones y contratos menores',
				subtitulo: '',
				funcion: () => this.fichaEmpleados(),
				textButton1: 'Sin datos',
				background: 'linear-gradient(to bottom,#5092A9 , #FCFDFE)',
				hover: false
			},
			// {
			// 	rutaImagen: 'assets/img/home/menu3-400x250.webp',
			// 	titulo: 'Contratos menores',
			// 	subtitulo: '',
			// 	funcion: () => this.fichaEmpleados(),
			// 	textButton: '14',
			// 	background: 'linear-gradient(to bottom, #EEBE3E ,white)'
			// },
			{
				rutaImagen: 'assets/img/home/menu4-400x250.webp',
				titulo: 'Acuerdos de Pleno y JGL',
				subtitulo: '',
				funcion: () => this.fichaEmpleados(),
				textButton1: 'Sin datos',
				background: 'linear-gradient(to bottom, #D2DAB9 , white)',
				hover: false
			}
			// {
			// 	rutaImagen: 'assets/img/home/menu2-400x250.webp',
			// 	titulo: 'Acuerdos JGL',
			// 	subtitulo: '',
			// 	funcion: () => this.fichaEmpleados(),
			// 	textButton: '8',
			// 	background: 'linear-gradient(to bottom, #A28B7B , white)'
			// }
		];
	}

	ngOnDestroy() {
		this._subscription.unsubscribe();
	}

	fichaPresupuesto() {
		this._router.navigateByUrl('/fichaPresupuesto');
	}

	fichaGastos() {
		this._router.navigateByUrl('/fichaGastos');
	}

	fichaRemanentes() {
		this._router.navigateByUrl('/fichaRemanentes');
	}

	fichaEmpleados() {
		// this._router.navigateByUrl('/fichaEmpleados');
	}

	cartaServicios(URL) {
		console.log(URL);

		if (URL != '') {
			window.open(URL, '_blank');
		} else {
			console.log('Sin datos');
		}
	}

	indicadores(URL) {
		console.log(URL);

		if (URL != '') {
			window.open(URL, '_blank');
		} else {
			console.log('Sin datos');
		}
	}

	volver() {
		this._location.back();
	}
}
