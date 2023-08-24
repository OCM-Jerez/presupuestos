import { IYears } from '@interfaces/components.interface';
import { IDataGasto } from '@interfaces/dataGasto.interface';
import { IDataIngreso } from '@interfaces/dataIngreso.interface';

export const initYears = (): IYears => {
	return { 2015: 0, 2016: 0, 2017: 0, 2018: 0, 2019: 0, 2020: 0, 2021: 0, 2022: 0, 2023: 0 };
};

// groupBy javascript
export const accumulate = (identity: string, datos: IDataGasto[] | IDataIngreso[], years = initYears()): IYears => {
	const value = (datos as IDataGasto[])[0].Pagos;

	if (value === undefined) {
		const a = datos as IDataIngreso[];
		Object.keys(years).forEach((key) => {
			const sum = a.filter((item) => item[identity + key]).reduce((prev, current) => prev + current[identity + key], 0);
			years[key] = sum;
		});
		return years;
	} else {
		const a = datos as IDataGasto[];
		Object.keys(years).forEach((key) => {
			const sum = a.filter((item) => item[identity + key]).reduce((prev, current) => prev + current[identity + key], 0);
			years[key] = sum;
		});
		return years;
	}
};
