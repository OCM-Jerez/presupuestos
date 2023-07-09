import { Injectable, inject } from '@angular/core';

import gastosEconomicaArticulos from '@assets/data/gastosEconomicaArticulos.json';
import gastosEconomicaConceptos from '@assets/data/gastosEconomicaConceptos.json';
import gastosProgramaAreas from '@assets/data/gastosProgramaAreas.json';
import gastosProgramaGruposProgramas from '@assets/data/gastosProgramaGruposProgramas.json';
import gastosProgramaPoliticas from '@assets/data/gastosProgramaPoliticas.json';

import { AvalaibleYearsService } from '@services/avalaibleYears.service';
import { IDataGasto } from '@interfaces/dataGasto.interface';

@Injectable({
	providedIn: 'root'
})
export class PrepareDataGastosService {
	private _avalaibleYearsService = inject(AvalaibleYearsService);

	// Itera por cada uno de los años disponibles para gastos
	async getDataAllYear(): Promise<any[]> {
		// const startTime = performance.now();
		const rowData = [];
		const years = this._avalaibleYearsService.getYearsSelected();

		for (const year of years) {
			const dataGas = await this.getDataYear(year);
			rowData.push(...dataGas);
		}

		// const endTime = performance.now();
		// console.log(`Tiempo empleado para generar data: ${Math.round(endTime - startTime)} ms`);
		// console.log(rowData);
		return rowData;
	}

	// Selecciona datos gastos de un año
	async getDataYear(year: number) {
		const result = [];
		const dataGasto: IDataGasto = {
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
					[dataGasto.CodPro]: currentValue[1][dataGasto.CodPro],
					[dataGasto.DesPro]: currentValue[1][dataGasto.DesPro],
					[dataGasto.CodOrg]: currentValue[1][dataGasto.CodOrg],
					[dataGasto.DesOrg]: currentValue[1][dataGasto.DesOrg],
					[dataGasto.CodCap]: currentValue[1][dataGasto.CodCap],
					[dataGasto.DesCap]: currentValue[1][dataGasto.DesCap],
					[dataGasto.CodEco]: currentValue[1][dataGasto.CodEco],
					[dataGasto.DesEco]: currentValue[1][dataGasto.DesEco],
					[dataGasto.Iniciales]: currentValue[1]['Iniciales'],
					[dataGasto.Modificaciones]: currentValue[1]['Modificaciones'],
					[dataGasto.Definitivas]: currentValue[1]['Definitivas'],
					[dataGasto.GastosComprometidos]: currentValue[1]['GastosComprometidos'],
					[dataGasto.ObligacionesReconocidasNetas]: currentValue[1]['ObligacionesReconocidasNetas'],
					[dataGasto.Pagos]: currentValue[1]['Pagos'],
					[dataGasto.ObligacionesPendientePago]: currentValue[1]['ObligacionesPendientePago'],
					[dataGasto.RemanenteCredito]: currentValue[1]['RemanenteCredito']
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
