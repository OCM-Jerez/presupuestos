import { Injectable, inject } from '@angular/core';

import ingresosEconomicaArticulos from '@assets/data/ingresosEconomicaArticulos.json';
import ingresosEconomicaCapitulos from '@assets/data/ingresosEconomicaCapitulos.json';
import ingresosEconomicaConceptos from '@assets/data/ingresosEconomicaConceptos.json';
import ingresosEconomicaEconomicos from '@assets/data/ingresosEconomicaEconomicos.json';

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

		if (years.length === 1) {
			const dataIng = await this.getDataYear(1);
			rowData.push(...dataIng);
		} else {
			for (const year of years) {
				const dataIng = await this.getDataYear(year);
				rowData.push(...dataIng);
			}
		}

		return rowData;
	}

	// Selecciona datos ingresos de un año
	async getDataYear(year: number) {
		const result = [];
		const dataIngreso: IDataIngreso = {
			CodEco: `CodEco`,
			Definitivas1: `Definitivas${year}`,
			DerechosAnulados1: `DerechosAnulados${year}`,
			DerechosCancelados1: `DerechosCancelados${year}`,
			DerechosPendienteCobro1: `DerechosPendienteCobro${year}`,
			DerechosReconocidos1: `DerechosReconocidos${year}`,
			DerechosReconocidosNetos1: `DerechosReconocidosNetos${year}`,
			DiferenciaPrevision1: `DiferenciaPrevision${year}`,
			Iniciales1: `Iniciales${year}`,
			Modificaciones1: `Modificaciones${year}`,
			RecaudacionNeta1: `RecaudacionNeta${year}`
		};

		await this.getYearDataJson(year).then((data) => {
			Object.entries(data).forEach((currentValue) => {
				result.push({
					[dataIngreso.CodEco]: currentValue[1][dataIngreso.CodEco],
					[dataIngreso.Definitivas1]: currentValue[1]['Definitivas'],
					[dataIngreso.DerechosAnulados1]: currentValue[1]['DerechosAnulados'],
					[dataIngreso.DerechosCancelados1]: currentValue[1]['DerechosCancelados'],
					[dataIngreso.DerechosPendienteCobro1]: currentValue[1]['DerechosPendienteCobro'],
					[dataIngreso.DerechosReconocidos1]: currentValue[1]['DerechosReconocidos'],
					[dataIngreso.DerechosReconocidosNetos1]: currentValue[1]['DerechosReconocidosNetos'],
					[dataIngreso.DiferenciaPrevision1]: currentValue[1]['DiferenciaPrevision'],
					[dataIngreso.Iniciales1]: currentValue[1]['Iniciales'],
					[dataIngreso.Modificaciones1]: currentValue[1]['Modificaciones'],
					[dataIngreso.RecaudacionNeta1]: currentValue[1]['RecaudacionNeta']
				});
			});
		});

		result.map((item) => {
			// console.log(item.CodEco);
			item.DesEco = ingresosEconomicaEconomicos.find((economico) => economico.codigo === item.CodEco).descripcion;
			item.CodCap = Math.floor(item.CodEco / 10000);
			item.DesCap = ingresosEconomicaCapitulos.find((capitulo) => capitulo.codigo === item.CodCap).descripcion;
			item.CodArt = Math.floor(item.CodEco / 1000);
			item.DesArt = ingresosEconomicaArticulos.find((articulo) => articulo.codigo === item.CodArt).descripcion;
			item.CodCon = Math.floor(item.CodEco / 100);
			item.DesCon = ingresosEconomicaConceptos.find((concepto) => concepto.codigo === item.CodCon).descripcion;
		});

		return result;
	}

	// Selecciona datos del año que se pasa como parametro
	async getYearDataJson(year: number) {
		const years = this._avalaibleYearsService.getYearsSelected();
		const yearToLoad = year === 1 ? years[0] : year;
		const data = await import(`../../assets/data/${yearToLoad}LiqIng.json`);
		return data.default;
	}
}
