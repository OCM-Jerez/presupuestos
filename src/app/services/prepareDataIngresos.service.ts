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

		for (const year of years) {
			const dataIng = await this.getDataYear(year);
			rowData.push(...dataIng);
		}

		return rowData;
	}

	// Selecciona datos ingresos de un año
	async getDataYear(year: number) {
		const result = [];
		const dataIngreso: IDataIngreso = {
			CodEco: `CodEco`,
			Iniciales: `Iniciales${year}`,
			Modificaciones: `Modificaciones${year}`,
			Definitivas: `Definitivas${year}`,
			DerechosReconocidos: `DerechosReconocidos${year}`,
			DerechosAnulados: `DerechosAnulados${year}`,
			DerechosCancelados: `DerechosCancelados${year}`,
			DerechosReconocidosNetos: `DerechosReconocidosNetos${year}`,
			RecaudacionNeta: `RecaudacionNeta${year}`,
			DerechosPendienteCobro: `DerechosPendienteCobro${year}`,
			DiferenciaPrevision: `DiferenciaPrevision${year}`
		};

		await this.getYearDataJson(year).then((data) => {
			Object.entries(data).forEach((currentValue) => {
				result.push({
					[dataIngreso.CodEco]: currentValue[1][dataIngreso.CodEco],
					[dataIngreso.Iniciales]: currentValue[1]['Iniciales'],
					[dataIngreso.Modificaciones]: currentValue[1]['Modificaciones'],
					[dataIngreso.Definitivas]: currentValue[1]['Definitivas'],
					[dataIngreso.DerechosReconocidos]: currentValue[1]['DerechosReconocidos'],
					[dataIngreso.DerechosAnulados]: currentValue[1]['DerechosAnulados'],
					[dataIngreso.DerechosCancelados]: currentValue[1]['DerechosCancelados'],
					[dataIngreso.DerechosReconocidosNetos]: currentValue[1]['DerechosReconocidosNetos'],
					[dataIngreso.RecaudacionNeta]: currentValue[1]['RecaudacionNeta'],
					[dataIngreso.DerechosPendienteCobro]: currentValue[1]['DerechosPendienteCobro'],
					[dataIngreso.DiferenciaPrevision]: currentValue[1]['DiferenciaPrevision']
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
		const data = await import(`../../assets/data/${year}LiqIng.json`);

		return data.default;
	}
}
