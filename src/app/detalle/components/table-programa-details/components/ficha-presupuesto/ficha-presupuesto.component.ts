import { AfterViewInit, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import gastosEconomicaCapituloss from '@assets/data/gastosEconomicaCapitulos.json';

import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import { Subscription } from 'rxjs';
import { DataStoreFichaProgramaService } from '@services/dataStoreFichaPrograma.service';
import { IGastos } from '@interfaces/gastos.interface';
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

	private _subscription: Subscription;
	private _datos: IGastos[] = [];
	public programa: string;
	public currentGraph = 1;
	// public cap1Selected = true;
	public capitulos = gastosEconomicaCapituloss;
	public activeButton = 1;
	private cap = [];

	ngOnInit(): void {
		this._subscription = this._dataStoreFichaProgramaService.getFichaProgramaData().subscribe((data: IGastos[]) => {
			this._datos = data;
			console.log(this._datos);
		});
		this.programa = this._datos[0].CodPro + ' - ' + this._datos[0].DesPro;

		this.cap = this._datos.filter((item) => item.CodCap === 1);
		console.log(this.cap);

		this.calcCapitulos();
	}

	ngOnDestroy() {
		this._subscription.unsubscribe();
	}

	ngAfterViewInit() {
		setTimeout(() => {
			this.graphCapituloGastos();
			this.graph('graph', 1);
			// this.graph2();
			// this.graph3();
		}, 50);
	}

	changeGraphOLD(capitulo: number) {
		this.activeButton = capitulo;
		this.currentGraph = capitulo;
		switch (capitulo) {
			case 1:
				setTimeout(() => {
					this.graph('graph', capitulo);
				}, 50);
				break;
			case 2:
				this.cap = this._datos.filter((item) => item.CodCap === 2);
				setTimeout(() => {
					this.graph('graph', capitulo);
				}, 50);
				break;
			case 3:
				this.cap = this._datos.filter((item) => item.CodCap === 3);
				setTimeout(() => {
					this.graph('graph', capitulo);
				}, 50);
				break;
			case 4:
				this.cap = this._datos.filter((item) => item.CodCap === 4);
				setTimeout(() => {
					this.graph('graph', capitulo);
				}, 50);
				break;
			case 5:
				this.cap = this._datos.filter((item) => item.CodCap === 5);
				setTimeout(() => {
					this.graph('graph', capitulo);
				}, 50);
				break;
			case 6:
				this.cap = this._datos.filter((item) => item.CodCap === 6);
				setTimeout(() => {
					this.graph('graph', capitulo);
				}, 50);
				break;
			case 7:
				this.cap = this._datos.filter((item) => item.CodCap === 7);
				setTimeout(() => {
					this.graph('graph', capitulo);
				}, 50);
				break;
			case 8:
				this.cap = this._datos.filter((item) => item.CodCap === 8);
				setTimeout(() => {
					this.graph('graph', capitulo);
				}, 50);
				break;
			case 9:
				this.cap = this._datos.filter((item) => item.CodCap === 9);
				setTimeout(() => {
					this.graph('graph', capitulo);
				}, 50);
				break;

			default:
				break;
		}
	}

	changeGraph(capitulo: number) {
		this.activeButton = capitulo;
		this.currentGraph = capitulo;

		if (capitulo >= 2 && capitulo <= 9) {
			this.cap = this._datos.filter((item) => item.CodCap === capitulo);
		}

		setTimeout(() => {
			this.graph('graph', capitulo);
		}, 50);
	}

	calcCapitulos() {
		const capitulos = this._datos.map((item) => ({
			name: `${item.CodCap}-${item.DesCap}`,
			value: item.Definitivas2023,
			recaudado: item.Pagos2023
		}));

		return capitulos.reduce((acc, curr) => {
			const index = acc.findIndex((item) => item.name === curr.name);
			index > -1
				? ((acc[index].value += curr.value), (acc[index].recaudado += curr.recaudado))
				: acc.push({
						name: curr.name,
						value: curr.value,
						recaudado: curr.recaudado
				  });
			return acc;
		}, []);
	}

	graphCapituloGastos() {
		const data = this.calcCapitulos().map((item) => {
			return [item.name, item.value];
		});
		console.log(data);

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

	graph(id: string, capitulo: number) {
		Highcharts.chart(id, {
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

	graph2() {
		Highcharts.chart('graph2', {
			chart: {
				type: 'pie',
				// renderTo: 'chart-containerLines',
				options3d: {
					enabled: true,
					alpha: 45
				}
			},
			title: {
				text: 'Beijing 2022 gold medals by country',
				align: 'left'
			},
			subtitle: {
				text: '3D donut in Highcharts',
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
					data: [
						['Norway', 36],
						['Germany', 21],
						['Austria', 7],
						['USA', 14]
					]
				}
			]
		});
	}

	graph3() {
		Highcharts.chart('graph3', {
			chart: {
				type: 'pie',
				// renderTo: 'chart-containerLines',
				options3d: {
					enabled: true,
					alpha: 45
				}
			},
			title: {
				text: 'Beijing 2022 gold medals by country',
				align: 'left'
			},
			subtitle: {
				text: '3D donut in Highcharts',
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
					data: [
						['Norway', 56],
						['Germany', 32],
						['USA', 28]
					]
				}
			]
		});
	}
}
