import { Injectable, inject } from '@angular/core';

import gastosEconomicaArticulos from '@assets/data/gastosEconomicaArticulos.json';
import gastosEconomicaConceptos from '@assets/data/gastosEconomicaConceptos.json';
import gastosProgramaAreas from '@assets/data/gastosProgramaAreas.json';
import gastosProgramaGruposProgramas from '@assets/data/gastosProgramaGruposProgramas.json';
import gastosProgramaPoliticas from '@assets/data/gastosProgramaPoliticas.json';

import { AvalaibleYearsService } from '@services/avalaibleYears.service';

import { IDataGasto } from '@interfaces/dataGasto.interface';

import { asynForEach } from '@utils/util';

@Injectable({
	providedIn: 'root'
})
export class PrepareDataGastosService {
	private _avalaibleYearsService = inject(AvalaibleYearsService);
	private dataGasto: IDataGasto = <IDataGasto>{};

	// Itera por cada uno de los años disponibles para gastos
	async getDataAllYear(): Promise<any[]> {
		// const startTime = performance.now();
		let rowData = [];
		const years = this._avalaibleYearsService.getYearsSelected();

		await asynForEach(years, async (year: number) => {
			const dataGas = await this.getDataYear(year);
			rowData = rowData.concat(...dataGas);
		});
		// const endTime = performance.now();
		// console.log(`Tiempo empleado para generar data: ${Math.round(endTime - startTime)} ms`);
		// console.log(rowData);
		return rowData;
	}

	// Selecciona datos gastos de un año
	async getDataYear(year: number) {
		const result = [];
		this.dataGasto = {
			CodPro: `CodPro`,
			DesPro: `DesPro`,
			CodOrg: `CodOrg`,
			DesOrg: `DesOrg`,
			CodCap: `CodCap`,
			DesCap: `DesCap`,
			CodEco: `CodEco`,
			DesEco: `DesEco`,
			Iniciales: `Iniciales${year}`,
			Modificaciones: `Modificaciones${year}`,
			Definitivas: `Definitivas${year}`,
			GastosComprometidos: `GastosComprometidos${year}`,
			ObligacionesReconocidasNetas: `ObligacionesReconocidasNetas${year}`,
			Pagos: `Pagos${year}`,
			ObligacionesPendientePago: `ObligacionesPendientePago${year}`,
			RemanenteCredito: `RemanenteCredito${year}`
		};

		await this.getYearDataJson(year).then((data) => {
			Object.entries(data).forEach((currentValue) => {
				result.push({
					[this.dataGasto.CodPro]: currentValue[1][this.dataGasto.CodPro],
					[this.dataGasto.DesPro]: currentValue[1][this.dataGasto.DesPro],
					[this.dataGasto.CodOrg]: currentValue[1][this.dataGasto.CodOrg],
					[this.dataGasto.DesOrg]: currentValue[1][this.dataGasto.DesOrg],
					[this.dataGasto.CodCap]: currentValue[1][this.dataGasto.CodCap],
					[this.dataGasto.DesCap]: currentValue[1][this.dataGasto.DesCap],
					[this.dataGasto.CodEco]: currentValue[1][this.dataGasto.CodEco],
					[this.dataGasto.DesEco]: currentValue[1][this.dataGasto.DesEco],
					[this.dataGasto.Iniciales]: currentValue[1]['Iniciales'],
					[this.dataGasto.Modificaciones]: currentValue[1]['Modificaciones'],
					[this.dataGasto.Definitivas]: currentValue[1]['Definitivas'],
					[this.dataGasto.GastosComprometidos]: currentValue[1]['GastosComprometidos'],
					[this.dataGasto.ObligacionesReconocidasNetas]: currentValue[1]['ObligacionesReconocidasNetas'],
					[this.dataGasto.Pagos]: currentValue[1]['Pagos'],
					[this.dataGasto.ObligacionesPendientePago]: currentValue[1]['ObligacionesPendientePago'],
					[this.dataGasto.RemanenteCredito]: currentValue[1]['RemanenteCredito']
				});
			});
		});
		result.map((item) => {
			item.CodAre = Math.floor(item.CodPro / 10000);
			item.DesAre = gastosProgramaAreas.find((area) => area.codigo === item.CodAre).descripcion;
			item.CodPol = Math.floor(item.CodPro / 1000);
			item.DesPol = gastosProgramaPoliticas.find((politica) => politica.codigo === item.CodPol).descripcion;
			item.CodGru = Math.floor(item.CodPro / 100);
			item.DesGru = gastosProgramaGruposProgramas.find((grupo) => grupo.codigo === item.CodGru).descripcion;
			item.CodCon = Math.floor(item.CodEco / 100);
			item.DesCon = gastosEconomicaConceptos.find((concepto) => concepto.codigo === item.CodCon).descripcion;
			item.CodArt = Math.floor(item.CodEco / 1000);
			item.DesArt = gastosEconomicaArticulos.find((articulo) => articulo.codigo === item.CodArt).descripcion;
		});

		return result;
	}

	// Seleciona datos del año que se pasa como parametro
	async getYearDataJson(year: number) {
		const data = await import(`../../assets/data/${year}LiqGas.json`);
		return data.default;
	}
}
