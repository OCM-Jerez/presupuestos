import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import programasInfo from '@assets/data/programasInfo.json';
import organicosInfo from '@assets/data/gastosOrganicosInfo.json';

import { CardInfoComponent } from '@app/commons/components/card-info/card-info.component';

import { DataStoreFichaProgramaService } from '@services/dataStoreFichaPrograma.service';
import { DataStoreService } from '@services/dataStore.service';

import { IDataGasto } from '@interfaces/dataGasto.interface';
import { IDataTotalesPresupuesto } from '@interfaces/dataTotalesPresupuesto.interface';

import { environment } from '@environments/environment';

interface ICardsInfo {
	rutaImagen: string;
	titulo: string;
	subtitulo: string;
	funcion: () => void;
	textButton?: string;
	textButton1?: string;
	textButton2?: string;
	background: string;
	hover: boolean;
}

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
	private _datos: IDataGasto[] = [];
	public programa: string;
	// public organico: string;
	public codigo: string;
	public DataTotalesPresupuesto: IDataTotalesPresupuesto = {};

	private totalPresupuestadoTotal: number;
	private totalPresupuestado: number;
	private totalGastado: number;
	private cartaServiciosURL = '';
	private cartaServiciosUltimaActualizacion = '';
	private indicadores2017URL = '';
	private indicadoresYear = 'Sin datos';
	private _newsLength = 0;
	private _newsText = '';
	public cardsInfo: ICardsInfo[] = [];
	public filteredNews = [];
	liqDate = environment.liqDate2023;

	async ngOnInit(): Promise<void> {
		this._subscription = this._dataStoreFichaProgramaService.getFichaProgramaData().subscribe((data: IDataGasto[]) => {
			this._datos = data;

			if (this._datos?.[0]) {
				if (this._datos[0].hasOwnProperty('CodPro')) {
					this.programa = 'Programa ' + this._datos[0].CodPro + ' ' + this._datos[0].DesPro;
					this.codigo = this._datos[0].CodPro;
					const codigoBuscar = this._datos[0].CodPro;
					const programaData = programasInfo.find((element) => element.codigo === +codigoBuscar);

					if (programaData) {
						this.cartaServiciosURL = programaData.cartaServicios?.[1]?.URL;
						this.cartaServiciosUltimaActualizacion = programaData.cartaServicios?.[0]?.ultimaActualizacion;
						this.indicadores2017URL = programaData.indicadores?.[2]?.URL;
						this.indicadoresYear = programaData.indicadores?.[2]?.year;
					}
				} else {
					this.programa = 'Orgánico ' + this._datos[0].CodOrg + ' ' + this._datos[0].DesOrg;
					this.codigo = this._datos[0].CodOrg;
					const codigoBuscar = this._datos[0].CodOrg;
					// const programaData = programasInfo.find((element) => element.codigo === +codigoBuscar);
				}
			}
		});

		this.filteredNews = (await this.filterNewsByCode(+this.codigo)) as unknown[];
		this._newsLength = this.filteredNews.length - 1;
		this._newsText = this._newsLength <= 0 ? 'Sin entradas' : this._newsLength.toString() + ' entradas';
		console.log(this.filteredNews);

		this.DataTotalesPresupuesto = this._dataStoreService.dataTotalesPresupuesto;
		this.totalPresupuestadoTotal = this.DataTotalesPresupuesto.totalPresupuestoGastos;
		this.totalPresupuestado = this._datos.reduce((acc, item) => {
			acc += +item['Definitivas1'];
			return acc;
		}, 0);
		const porcentajePresupuesto = (this.totalPresupuestado / this.totalPresupuestadoTotal) * 100;
		this.totalGastado = this._datos.reduce((acc, item) => {
			acc += +item['Pagos1'];
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
				background: 'linear-gradient(to bottom, #1C1F26 , #4D4E50)',
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
				background: 'linear-gradient(to bottom, #1C1F26 , #4D4E50)',
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
				background: 'linear-gradient(to bottom, #1C1F26 , #4D4E50)',
				hover: true
			},
			{
				rutaImagen: 'assets/img/home/menu4-400x250.webp',
				titulo: 'Empleados',
				subtitulo: '',
				funcion: () => this.fichaEmpleados(),
				textButton1: 'Sin datos',
				background: 'linear-gradient(to bottom, #1C1F26 , #4D4E50)',
				hover: false
			},
			{
				rutaImagen: 'assets/img/home/menu2-400x250.webp',
				titulo: 'Carta servicios',
				subtitulo: '',
				funcion: () => this.cartaServicios(this.cartaServiciosURL),
				// textButton: 'Ultima actualización',
				textButton1: this.cartaServiciosUltimaActualizacion,
				background: 'linear-gradient(to bottom, #1C1F26 , #4D4E50)',
				hover: this.cartaServiciosURL ? true : false
			},
			{
				rutaImagen: 'assets/img/home/menu3-400x250.webp',
				titulo: 'Indicadores',
				subtitulo: '',
				funcion: () => this.indicadores(this.indicadores2017URL),
				textButton1: this.indicadoresYear,
				background: 'linear-gradient(to bottom, #1C1F26 , #4D4E50)',
				hover: this.indicadores2017URL ? true : false
			},
			{
				rutaImagen: 'assets/img/home/menu1-400x250.webp',
				titulo: 'Noticias',
				subtitulo: ' ',
				funcion: () => this.news(this.codigo),
				textButton1: this._newsText,
				background: 'linear-gradient(to bottom, #1C1F26 , #4D4E50)',
				hover: this._newsLength > 0
			},
			{
				rutaImagen: 'assets/img/home/menu4-400x250.webp',
				titulo: 'Documentos',
				subtitulo: '',
				funcion: () => this.fichaEmpleados(),
				textButton1: 'Sin datos',
				background: 'linear-gradient(to bottom, #1C1F26 , #4D4E50)',
				hover: false
			},
			{
				rutaImagen: 'assets/img/home/menu2-400x250.webp',
				titulo: 'Licitaciones y contratos menores',
				subtitulo: '',
				funcion: () => this.fichaEmpleados(),
				textButton1: 'Sin datos',
				background: 'linear-gradient(to bottom, #1C1F26 , #4D4E50)',
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
				background: 'linear-gradient(to bottom, #1C1F26 , #4D4E50)',
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

	async news(codigo) {
		this.filteredNews = await this.filterNewsByCode(+codigo);
		this._newsLength = this.filteredNews.length;
		this._newsLength = this.filteredNews.length - 1;
		this._newsText = this._newsLength <= 0 ? 'Sin entradas' : this._newsLength.toString() + ' entradas';

		console.log(this._location);

		this._location.go('/art16');
		// this._router.navigateByUrl(`/fichaNews`);
		this._router.navigateByUrl(`/fichaNews/${codigo}`);
	}

	async filterNewsByCode(codigo: number) {
		let data: any = [];
		if (this._datos[0].hasOwnProperty('CodPro')) {
			data = programasInfo;
		} else {
			data = organicosInfo;
		}

		for (const key in data) {
			if (data[key].codigo === codigo) {
				return data[key].news || [];
			}
		}
		return [];
	}

	volver() {
		this._location.back();
	}
}
