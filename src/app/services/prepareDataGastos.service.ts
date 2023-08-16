import { Injectable, inject } from '@angular/core';

// import gastosEconomicaArticulos from '@assets/data/gastosEconomicaArticulos.json';
// import gastosEconomicaConceptos from '@assets/data/gastosEconomicaConceptos.json';
// import gastosProgramaAreas from '@assets/data/gastosProgramaAreas.json';
// import gastosProgramaGruposProgramas from '@assets/data/gastosProgramaGruposProgramas.json';
// import gastosProgramaPoliticas from '@assets/data/gastosProgramaPoliticas.json';

import { AvalaibleYearsService } from '@services/avalaibleYears.service';
import { IDataGasto } from '@interfaces/dataGasto.interface';

@Injectable({
	providedIn: 'root'
})
export class PrepareDataGastosService {
	private _avalaibleYearsService = inject(AvalaibleYearsService);

	// Itera por cada uno de los años disponibles para gastos
	async getDataAllYear(): Promise<IDataGasto[]> {
		// const startTime = performance.now();
		const rowData: IDataGasto[] = [];
		const years = this._avalaibleYearsService.getYearsSelected();

		const targetYears = years.length === 1 ? [1] : years;

		for (const year of targetYears) {
			const dataGas = await this.getDataYear(year);
			rowData.push(...dataGas);
		}

		// const endTime = performance.now();
		// console.log(`Tiempo empleado para generar data: ${Math.round(endTime - startTime)} ms`);
		// console.log(rowData);
		return rowData;
	}

	// Selecciona datos gastos de un año

	async getDataYear(year: number): Promise<IDataGasto[]> {
		const yearDataJSON = await this.getYearDataJson(year);
		return yearDataJSON.map((item) => ({
			CodAre: item.CodAre,
			CodArt: item.CodArt,
			CodCap: item.CodCap,
			CodCon: item.CodCon,
			CodEco: item.CodEco,
			CodGru: item.CodGru,
			CodOrg: item.CodOrg,
			CodPol: item.CodPol,
			CodPro: item.CodPro,
			DesAre: item.DesAre,
			DesArt: item.DesArt,
			DesCap: item.DesCap,
			DesCon: item.DesCon,
			DesEco: item.DesEco,
			DesGru: item.DesGru,
			DesOrg: item.DesOrg,
			DesPol: item.DesPol,
			DesPro: item.DesPro,
			[`Definitivas${year}`]: item.Definitivas,
			[`GastosComprometidos${year}`]: item.GastosComprometidos,
			[`Iniciales${year}`]: item.Iniciales,
			[`Modificaciones${year}`]: item.Modificaciones,
			[`ObligacionesPendientePago${year}`]: item.ObligacionesPendientePago,
			[`ObligacionesReconocidasNetas${year}`]: item.ObligacionesReconocidasNetas,
			[`Pagos${year}`]: item.Pagos,
			[`RemanenteCredito${year}`]: item.RemanenteCredito
		}));
	}

	// async getDataYearOLd(year: number) {
	// 	const result = [];
	// 	const dataGasto: IDataGasto = {
	// 		CodPro: `CodPro`,
	// 		DesPro: `DesPro`,
	// 		CodOrg: `CodOrg`,
	// 		DesOrg: `DesOrg`,
	// 		CodCap: `CodCap`,
	// 		DesCap: `DesCap`,
	// 		CodEco: `CodEco`,
	// 		DesEco: `DesEco`,
	// 		Iniciales1: `Iniciales${year}`,
	// 		Modificaciones1: `Modificaciones${year}`,
	// 		Definitivas1: `Definitivas${year}`,
	// 		GastosComprometidos1: `GastosComprometidos${year}`,
	// 		ObligacionesReconocidasNetas1: `ObligacionesReconocidasNetas${year}`,
	// 		Pagos1: `Pagos${year}`,
	// 		ObligacionesPendientePago1: `ObligacionesPendientePago${year}`,
	// 		RemanenteCredito1: `RemanenteCredito${year}`
	// 	};

	// 	await this.getYearDataJson(year).then((data) => {
	// 		Object.entries(data).forEach((currentValue) => {
	// 			result.push({
	// 				[dataGasto.CodPro]: currentValue[1][dataGasto.CodPro],
	// 				[dataGasto.DesPro]: currentValue[1][dataGasto.DesPro],
	// 				[dataGasto.CodOrg]: currentValue[1][dataGasto.CodOrg],
	// 				[dataGasto.DesOrg]: currentValue[1][dataGasto.DesOrg],
	// 				[dataGasto.CodCap]: currentValue[1][dataGasto.CodCap],
	// 				[dataGasto.DesCap]: currentValue[1][dataGasto.DesCap],
	// 				[dataGasto.CodEco]: currentValue[1][dataGasto.CodEco],
	// 				[dataGasto.DesEco]: currentValue[1][dataGasto.DesEco],
	// 				[dataGasto.Definitivas1]: currentValue[1]['Definitivas'],
	// 				[dataGasto.GastosComprometidos1]: currentValue[1]['GastosComprometidos'],
	// 				[dataGasto.Iniciales1]: currentValue[1]['Iniciales'],
	// 				[dataGasto.Modificaciones1]: currentValue[1]['Modificaciones'],
	// 				[dataGasto.ObligacionesPendientePago1]: currentValue[1]['ObligacionesPendientePago'],
	// 				[dataGasto.ObligacionesReconocidasNetas1]: currentValue[1]['ObligacionesReconocidasNetas'],
	// 				[dataGasto.Pagos1]: currentValue[1]['Pagos'],
	// 				[dataGasto.RemanenteCredito1]: currentValue[1]['RemanenteCredito']
	// 			});
	// 		});
	// 	});
	// 	result.map((item) => {
	// 		item.CodAre = Math.floor(item.CodPro / 10000);
	// 		item.DesAre = gastosProgramaAreas.find((area) => area.codigo === item.CodAre).descripcion;
	// 		item.CodPol = Math.floor(item.CodPro / 1000);
	// 		item.DesPol = gastosProgramaPoliticas.find((politica) => politica.codigo === item.CodPol).descripcion;
	// 		item.CodGru = Math.floor(item.CodPro / 100);
	// 		item.DesGru = gastosProgramaGruposProgramas.find((grupo) => grupo.codigo === item.CodGru).descripcion;
	// 		item.CodCon = Math.floor(item.CodEco / 100);
	// 		item.DesCon = gastosEconomicaConceptos.find((concepto) => concepto.codigo === item.CodCon).descripcion;
	// 		item.CodArt = Math.floor(item.CodEco / 1000);
	// 		item.DesArt = gastosEconomicaArticulos.find((articulo) => articulo.codigo === item.CodArt).descripcion;
	// 	});

	// 	return result;
	// }

	// Seleciona datos del año que se pasa como parametro
	async getYearDataJson(year: number) {
		const years = this._avalaibleYearsService.getYearsSelected();
		const yearToLoad = year === 1 ? years[0] : year;
		const data = await import(`../../assets/data/${yearToLoad}LiqGas.json`);
		return data.default as IDataGasto[];
	}
}
