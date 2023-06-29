import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { CardInfoComponent } from '../../../../../commons/components/card-info/card-info.component';
import { DataStoreFichaProgramaService } from '@services/dataStoreFichaPrograma.service';
import { Subscription } from 'rxjs';
import { IGastos } from '@interfaces/gastos.interface';
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

	private _subscription: Subscription;
	private _datos: IGastos[] = [];
	public programa: string;
	private totalPresupuestado: number;
	private totalGastado: number;
	public cardsInfo: any[] = [];
	liqDate = environment.liqDate2023;

	ngOnInit(): void {
		this._subscription = this._dataStoreFichaProgramaService.getFichaProgramaData().subscribe((data: IGastos[]) => {
			this._datos = data;
		});
		this.programa = this._datos[0].DesPro;
		this.totalPresupuestado = this._datos.reduce((acc, item) => {
			acc += item.Definitivas2023;
			return acc;
		}, 0);

		this.totalGastado = this._datos.reduce((acc, item) => {
			acc += item.Pagos2023;
			return acc;
		}, 0);

		this.cardsInfo = [
			{
				rutaImagen: 'assets/img/home/menu1-400x250.webp',
				titulo: 'Presupuesto',
				subtitulo: 'Breve explicación del dato correspondiente ... ',
				funcion: () => this.fichaPresupuesto(),
				textButton: this.totalPresupuestado.toLocaleString('de-DE'),
				background: 'linear-gradient(to bottom,  #FCE1CB, white)'
			},
			{
				rutaImagen: 'assets/img/home/menu1-400x250.webp',
				titulo: 'Gastos',
				subtitulo: 'Breve explicación del dato correspondiente ... ',
				funcion: () => this.fichaGastos(),
				textButton: this.totalGastado.toLocaleString('de-DE'),
				background: 'linear-gradient(to bottom, #EEBE3E, white)'
			},
			{
				rutaImagen: 'assets/img/home/menu1-400x250.webp',
				titulo: 'Remanentes credito',
				subtitulo: 'Breve explicación del dato correspondiente ... ',
				funcion: () => this.fichaRemanentes(),
				textButton: (this.totalPresupuestado - this.totalGastado).toLocaleString('de-DE'),
				background: 'linear-gradient(to bottom, #EEBE3E, white)'
			},
			// {
			// 	rutaImagen: 'assets/img/home/menu4-400x250.webp',
			// 	titulo: 'Empleados',
			// 	subtitulo: '',
			// 	funcion: () => this.fichaEmpleados(),
			// 	textButton: '326',
			// 	background: 'linear-gradient(to bottom, #E0E0E0, white)'
			// },
			{
				rutaImagen: 'assets/img/home/menu2-400x250.webp',
				titulo: 'Carta de servicios',
				subtitulo: '',
				funcion: () => this.fichaEmpleados(),
				textButton: 'No',
				background: 'linear-gradient(to bottom, #CDE9FE, white)'
			},
			{
				rutaImagen: 'assets/img/home/menu3-400x250.webp',
				titulo: 'Indicadores',
				subtitulo: '',
				funcion: () => this.fichaEmpleados(),
				textButton: 'No',
				background: 'linear-gradient(to bottom,#DCEDC8, white)'
			},
			{
				rutaImagen: 'assets/img/home/menu1-400x250.webp',
				titulo: 'Hemeroteca',
				subtitulo: ' ',
				funcion: () => this.fichaPresupuesto(),
				textButton: ' 12 entradas',
				background: 'linear-gradient(to bottom, #FCE1CB, white)'
			},
			{
				rutaImagen: 'assets/img/home/menu4-400x250.webp',
				titulo: 'Documentos',
				subtitulo: '',
				funcion: () => this.fichaEmpleados(),
				textButton: 'No',
				background: 'linear-gradient(to bottom, #D3CCE3 , white)'
			},
			{
				rutaImagen: 'assets/img/home/menu2-400x250.webp',
				titulo: 'Licitaciones',
				subtitulo: '',
				funcion: () => this.fichaEmpleados(),
				textButton: '12',
				background: 'linear-gradient(to bottom,#5092A9 , #FCFDFE)'
			},
			{
				rutaImagen: 'assets/img/home/menu3-400x250.webp',
				titulo: 'Contratos menores',
				subtitulo: '',
				funcion: () => this.fichaEmpleados(),
				textButton: '14',
				background: 'linear-gradient(to bottom, #EEBE3E ,white)'
			},
			{
				rutaImagen: 'assets/img/home/menu4-400x250.webp',
				titulo: 'Acuerdos de Pleno',
				subtitulo: '',
				funcion: () => this.fichaEmpleados(),
				textButton: '2',
				background: 'linear-gradient(to bottom, #D2DAB9 , white)'
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
		this._router.navigateByUrl('/fichaEmpleados');
	}

	volver() {
		this._location.back();
	}
}
