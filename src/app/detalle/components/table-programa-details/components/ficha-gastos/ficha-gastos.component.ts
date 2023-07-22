import { AfterViewInit, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

import { Subscription } from 'rxjs';

import { DataStoreFichaProgramaService } from '@services/dataStoreFichaPrograma.service';

import { IDataGasto } from '@interfaces/dataGasto.interface';

import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
HighchartsMore(Highcharts);

@Component({
	selector: 'app-ficha-gastos',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './ficha-gastos.component.html',
	styleUrls: ['./ficha-gastos.component.scss']
})
export default class FichaGastosComponent implements OnInit, AfterViewInit, OnDestroy {
	private _dataStoreFichaProgramaService = inject(DataStoreFichaProgramaService);
	private _location = inject(Location);
	private _subscription: Subscription;
	private _datos: IDataGasto[] = [];
	private cap = [];
	public programa: string;
	public currentGraph = 1;
	public capitulos = [];
	public activeButton = 1;

	ngOnInit(): void {
		this._subscription = this._dataStoreFichaProgramaService.getFichaProgramaData().subscribe((data: IDataGasto[]) => {
			this._datos = data;
		});

		this.programa = this._datos[0].DesPro;
		this.calcCapitulos();
		this.cap = this._datos.filter((item) => +item.CodCap === 1);
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

		if (capitulo >= 1 && capitulo <= 9) {
			this.cap = this._datos.filter((item) => +item.CodCap === capitulo);
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
			value: (item as any).Definitivas2023 as number,
			recaudado: (item as any).Pagos2023 as number
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
			return [item.name, item.recaudado];
		});

		Highcharts.setOptions({
			lang: {
				thousandsSep: '.'
			}
		});

		Highcharts.chart('chart-capitulosGastos', {
			chart: {
				type: 'pie',
				options3d: {
					enabled: true,
					alpha: 45
				}
			},
			title: {
				text: 'Gastado a la fecha por capitulo de gastos',
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
				options3d: {
					enabled: true,
					alpha: 45
				}
			},
			title: {
				text: ``,
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
					data: this.cap.map((item) => [item.DesEco, item.Pagos2023]),
					dataLabels: {
						enabled: true,
						format: '{point.name}<br>{point.y:,.0f} euros<br><span style="color: red">{point.percentage:.1f}%</span>',
						style: {
							fontSize: '12px'
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
