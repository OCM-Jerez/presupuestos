import { Injectable, inject } from '@angular/core';

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

	// Seleciona datos del año que se pasa como parametro
	async getYearDataJson(year: number) {
		const years = this._avalaibleYearsService.getYearsSelected();
		const yearToLoad = year === 1 ? years[0] : year;
		const data = await import(`../../assets/data/${yearToLoad}LiqGas.json`);
		return data.default as IDataGasto[];
	}
}
