import { Injectable, inject } from '@angular/core';

import { AvalaibleYearsService } from '@services/avalaibleYears.service';
import { IDataIngreso } from '@interfaces/dataIngreso.interface';

@Injectable({
	providedIn: 'root'
})
export class PrepareDataIngresosService {
	private _avalaibleYearsService = inject(AvalaibleYearsService);

	// Itera por cada uno de los años disponibles para ingresos
	async getDataAllYear(): Promise<IDataIngreso[]> {
		const rowData: IDataIngreso[] = [];
		const years = this._avalaibleYearsService.getYearsSelected();
		const targetYears = years.length === 1 ? [1] : years;

		for (const year of targetYears) {
			const dataIng = await this.getDataYear(year);
			rowData.push(...dataIng);
		}

		return rowData;
	}

	// Selecciona datos ingresos de un año
	async getDataYear(year: number): Promise<IDataIngreso[]> {
		const yearDataJSON = await this.getYearDataJson(year);
		return yearDataJSON.map((item) => ({
			CodArt: item.CodArt,
			CodCap: item.CodCap,
			CodCon: item.CodCon,
			CodEco: item.CodEco,
			DesArt: item.DesArt,
			DesCap: item.DesCap,
			DesCon: item.DesCon,
			DesEco: item.DesEco,
			[`Definitivas${year}`]: item.Definitivas,
			[`DerechosCancelados${year}`]: item.DerechosCancelados,
			[`DerechosPendienteCobro${year}`]: item.DerechosPendienteCobro,
			[`DerechosReconocidos${year}`]: item.DerechosReconocidos,
			[`DerechosReconocidosNetos${year}`]: item.DerechosReconocidosNetos,
			[`DiferenciaPrevision${year}`]: item.DiferenciaPrevision,
			[`Iniciales${year}`]: item.Iniciales,
			[`Modificaciones${year}`]: item.Modificaciones,
			[`RecaudacionNeta${year}`]: item.RecaudacionNeta
		}));
	}

	// Selecciona datos del año que se pasa como parametro
	async getYearDataJson(year: number) {
		const years = this._avalaibleYearsService.getYearsSelected();
		const yearToLoad = year === 1 ? years[0] : year;
		try {
			const data = await import(`../../assets/data/${yearToLoad}LiqIng.json`);
			return data.default as IDataIngreso[];
		} catch (error) {
			console.log(error);
			return null;
		}
	}
}
