import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { Location } from '@angular/common';

import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { CellRendererOCM } from '@ag-grid/CellRendererOCM';

import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
HighchartsMore(Highcharts);

import { DataStoreService } from '@services/dataStore.service';

import { environment } from '@environments/environment';

import { IDataTable } from '@interfaces/dataTable.interface';
import { IDataIngreso } from '@interfaces/dataIngreso.interface';
import { IDataGasto } from '@interfaces/dataGasto.interface';
import { accumulate } from '@utils/util';
@Component({
	selector: 'app-graph-detalle',
	templateUrl: './graph-detalle.component.html',
	standalone: true,
	imports: [AgGridModule]
})
export default class GraphDetalleComponent implements OnInit, AfterViewInit {
	private _location = inject(Location);
	private _dataStoreService = inject(DataStoreService);

	@ViewChild('agGrid') agGrid: AgGridAngular;
	public columnDefs;
	public data: {
		year: number;
		Definitivas: number;
		Netas: number;
	}[] = [];

	public defaultColDef;
	public groupHeaderHeight = 25;
	public headerHeight = 25;
	public localeText;
	private _dataTable: IDataTable;
	private _datos: IDataIngreso[] | IDataGasto[] = [];
	private _nameSerie1: string;
	private _nameSerie2: string;
	private _nameSerie3: string;

	ngOnInit(): void {
		this._dataTable = this._dataStoreService.dataTable;
		this._createData();
		this._createColumns();
	}

	ngAfterViewInit() {
		this.renderChartLines();
	}

	private async _createData() {
		const codigo = this._dataStoreService.selectedCodeRowFirstLevel.split(' ')[0];

		switch (this._dataTable.clasificationType) {
			case 'ingresosEconomicaCapitulos':
				this._datos = this._dataTable.rowDataIngresos.filter((x) => x.CodCap == Number(codigo));
				break;
			case 'ingresosEconomicaArticulos':
			case 'ingresosEconomicaConceptos':
			case 'ingresosEconomicaEconomicos':
				this._datos = this._dataTable.rowDataIngresos.filter((x) => x.CodEco == +codigo);
				break;
			case 'gastosOrganicaOrganicos':
				this._datos = this._dataTable.rowDataGastos.filter((x) => x.CodOrg == codigo);
				break;
			case 'gastosProgramaAreas':
			case 'gastosProgramaPoliticas':
			case 'gastosProgramaGrupos':
			case 'gastosProgramaProgramas':
				this._datos = this._dataTable.rowDataGastos.filter((x) => x.CodPro == codigo);
				break;
			case 'gastosEconomicaCapitulos':
				this._datos = this._dataTable.rowDataGastos.filter((x) => x.CodCap == codigo);
				break;
			case 'gastosEconomicaArticulos':
			case 'gastosEconomicaConceptos':
			case 'gastosEconomicaEconomicos':
				this._datos = this._dataTable.rowDataGastos.filter((x) => x.CodEco == codigo);
				break;
		}

		if (this._dataTable.dataPropertyTable.isIngresos) {
			const yearsDefinitivas = accumulate('Definitivas', this._datos);
			const yearsIniciales = accumulate('Iniciales', this._datos);
			const yearsNetas = accumulate('RecaudacionNeta', this._datos);

			this._nameSerie1 = 'Definitivas';
			this._nameSerie2 = 'RecaudacionNeta';
			this._nameSerie3 = '';

			// Convierto los valores para que sirvan de data al grafico
			this.data = [];
			for (let index = 2015; index <= environment.currentYear; index++) {
				// Para mostrar solo años seleccionados
				if (yearsDefinitivas[index] > 0) {
					const value = {
						year: index,
						Definitivas: yearsDefinitivas[index],
						Netas: yearsNetas[index] //RecaudacionNeta
					};
					// if (index === 2023 || index === environment.currentYear) {
					// 	value.Definitivas = yearsIniciales[index];
					// 	value.Netas = yearsNetas[index - 1];
					// }
					this.data.push(value);
				}
			}
		} else {
			const yearsDefinitivas = accumulate('Definitivas', this._datos);
			const yearsObligacionesNetas = accumulate('Pagos', this._datos);
			const yearsObligacionesPendientes = accumulate('ObligacionesPendientePago', this._datos);

			this._nameSerie1 = 'Definitivas';
			this._nameSerie2 = 'ObligacionesReconocidasNetas';
			this._nameSerie3 = 'ObligacionesPendientePago';

			this.data = [];
			for (let index = 2015; index <= environment.currentYear; index++) {
				// Para mostrar solo años seleccionados
				if (yearsDefinitivas[index] > 0) {
					const value = {
						year: index,
						Definitivas: yearsDefinitivas[index],
						Netas: yearsObligacionesNetas[index], // ObligacionesReconocidasNetas
						ObligacionesPendientes: yearsObligacionesPendientes[index]
					};
					if (index === environment.currentYear) {
						// value.Definitivas = yearsIniciales[index]; // Se usan las iniciales ya que es el unico dato que existe.
					}
					this.data.push(value);
				}
			}
		}

		return this.data;
	}

	renderChartLines() {
		Highcharts.chart({
			title: {
				text: this._dataTable.dataPropertyTable.graphTitle,
				style: {
					fontSize: '24px'
				}
			},
			subtitle: {
				text: `${this._dataTable.dataPropertyTable.subHeaderName} ${this._dataStoreService.selectedCodeRowFirstLevel}`,
				style: {
					fontSize: '24px'
				}
			},
			legend: {
				itemStyle: {
					fontSize: '16px'
				}
			},
			chart: {
				type: 'line',
				renderTo: 'chart-containerLines'
			},
			xAxis: {
				title: {
					text: 'Años',
					style: {
						fontSize: '16px'
					}
				},
				labels: {
					style: {
						fontSize: '16px'
					}
				},
				categories: this.data.map((item) => item.year + '')
			},
			yAxis: {
				title: {
					text: 'Euros',
					style: {
						fontSize: '16px'
					}
				}
			},
			plotOptions: {
				line: {
					dataLabels: {
						enabled: true,
						style: {
							fontSize: '14px'
						}
					},
					enableMouseTracking: false
				}
			},
			series: [
				{
					type: 'line',
					marker: {
						symbol: 'circle',
						fillColor: 'green',
						radius: 8
					},
					name: 'Creditos definitivos',
					data: this.data.map((item) => item.Definitivas)
				},
				{
					type: 'line',
					marker: {
						symbol: 'square',
						fillColor: 'red',
						radius: 8
					},
					// name: this._nameSerie2,
					name: 'Pagos',
					data: this.data.map((item) => item.Netas)
				}
			]
		});
	}

	private _createColumns(): void {
		this.columnDefs = [
			{
				headerName: 'Año',
				field: 'year',
				width: 70
			},
			{
				headerName: 'Creditos definitivos',
				field: 'Definitivas',
				width: 140,
				aggFunc: 'sum',
				cellRenderer: CellRendererOCM
			},
			{
				// headerName: this._nameSerie2,
				headerName: 'Pagos',
				field: 'Netas',
				width: 120,
				aggFunc: 'sum',
				cellRenderer: CellRendererOCM
			}
		];

		this.defaultColDef = {
			suppressMovable: true,
			lockPosition: 'left',
			sortable: true,
			resizable: false,
			filter: false
		};
	}

	volver() {
		this._location.back();
	}
}
