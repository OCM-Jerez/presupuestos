import { AfterViewInit, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

import { Subscription } from 'rxjs';

import { DataStoreFichaProgramaService } from '@services/dataStoreFichaPrograma.service';

import { IGastos } from '@interfaces/gastos.interface';

import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
HighchartsMore(Highcharts);

@Component({
	selector: 'app-ficha-presupuesto',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './ficha-presupuesto.component.html',
	styleUrls: ['./ficha-presupuesto.component.scss']
})
export default class FichaPresupuestoComponent implements OnInit, AfterViewInit, OnDestroy {
	private _dataStoreFichaProgramaService = inject(DataStoreFichaProgramaService);
	private _location = inject(Location);

	private _subscription: Subscription;
	private _datos: IGastos[] = [];
	public programa: string;
	public currentGraph = 1;
	public capitulos = [];
	public activeButton = 1;
	private cap = [];

	ngOnInit(): void {
		this._subscription = this._dataStoreFichaProgramaService.getFichaProgramaData().subscribe((data: IGastos[]) => {
			this._datos = data;
		});

		this.programa = this._datos[0].CodPro + ' - ' + this._datos[0].DesPro;
		this.calcCapitulos();
		this.cap = this._datos.filter((item) => item.CodCap === 1);
	}

	ngOnDestroy() {
		this._subscription.unsubscribe();
	}

	ngAfterViewInit() {
		setTimeout(() => {
			this.graphCapituloGastos();
			this.graph();
		}, 50);
	}

	changeGraph(capitulo: number) {
		this.activeButton = capitulo;
		this.currentGraph = capitulo;

		if (capitulo >= 2 && capitulo <= 9) {
			this.cap = this._datos.filter((item) => item.CodCap === capitulo);
		}

		setTimeout(() => {
			this.graph();
		}, 50);
	}

	calcCapitulos() {
		this.capitulos = this._datos.map((item) => ({
			codigo: item.CodCap,
			descripcion: item.DesCap,
			name: `${item.CodCap}-${item.DesCap}`,
			value: item.Definitivas2023,
			recaudado: item.Pagos2023
		}));

		this.capitulos = this.capitulos.reduce((acc, curr) => {
			const index = acc.findIndex((item) => item.name === curr.name);
			index > -1
				? ((acc[index].value += curr.value), (acc[index].recaudado += curr.recaudado))
				: acc.push({
						codigo: curr.codigo,
						name: curr.name,
						value: curr.value,
						recaudado: curr.recaudado
				  });
			return acc;
		}, []);
	}

	graphCapituloGastos() {
		const data = this.capitulos.map((item) => {
			return [item.name, item.value];
		});

		Highcharts.setOptions({
			lang: {
				thousandsSep: '.'
			}
		});

		Highcharts.chart('chart-capitulosGastos', {
			chart: {
				type: 'pie',
				// renderTo: 'chart-containerLines',
				options3d: {
					enabled: true,
					alpha: 45
				}
			},
			title: {
				text: 'Gastos por capítulo',
				align: 'center',
				style: {
					fontSize: '3.5rem'
				}
			},
			subtitle: {
				text: '',
				align: 'left'
			},
			plotOptions: {
				pie: {
					innerSize: 100,
					depth: 45
				}
			},
			series: [
				{
					type: 'pie',
					name: 'Medals',
					data: data,
					dataLabels: {
						enabled: true,
						format: '{point.name}<br>{point.y:,.0f} euros<br><span style="color: red">{point.percentage:.1f}%</span>',
						style: {
							fontSize: '16px'
						}
					}
				}
			]
		});
	}

	graph() {
		Highcharts.chart('graph', {
			chart: {
				type: 'pie',
				// renderTo: 'chart-containerLines',
				options3d: {
					enabled: true,
					alpha: 45
				}
			},
			title: {
				text: ``,
				// text: `Capítulo ${capitulo} `,
				align: 'center'
			},
			subtitle: {
				text: '',
				align: 'center'
			},
			plotOptions: {
				pie: {
					innerSize: 100,
					depth: 45
				}
			},
			series: [
				{
					type: 'pie',
					name: 'Medals',
					data: this.cap.map((item) => [item.DesEco, item.Definitivas2023]),
					dataLabels: {
						enabled: true,
						format: '{point.name}<br>{point.y:,.0f} euros<br><span style="color: red">{point.percentage:.1f}%</span>',
						style: {
							fontSize: '16px'
						}
					}
				}
			]
		});
	}

	volver() {
		this._location.back();
	}
}
