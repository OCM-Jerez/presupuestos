import { AfterViewInit, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

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
export class FichaPresupuestoComponent implements OnInit, AfterViewInit, OnDestroy {
	private _dataStoreFichaProgramaService = inject(DataStoreFichaProgramaService);

	private _subscription: Subscription;
	private _datos: IGastos[] = [];
	public programa: string;

	ngOnInit(): void {
		this._subscription = this._dataStoreFichaProgramaService.getFichaProgramaData().subscribe((data: IGastos[]) => {
			this._datos = data;
			console.log(this._datos);
		});
		this.programa = this._datos[0].CodPro + ' - ' + this._datos[0].DesPro;
		this.calcCapitulos();
	}

	ngOnDestroy() {
		this._subscription.unsubscribe();
	}

	ngAfterViewInit() {
		setTimeout(() => {
			this.graphCapituloGastos();
			this.graph1();
			this.graph2();
			this.graph3();
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

	graph1() {
		Highcharts.chart('graph1', {
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
						['Norway', 16],
						['Germany', 12],
						['USA', 8]
					]
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
