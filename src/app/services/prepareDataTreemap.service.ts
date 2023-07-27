import { Injectable } from '@angular/core';

import { colors } from '@app/commons/consts/colorsTreemap';
@Injectable({
	providedIn: 'root'
})
export class PrepareDataTreemapService {
	calcSeries(data, codigo, descripcion, campoSumatorio, aRestar?) {
		const array = data.reduce((acc, curr) => {
			const item =
				aRestar === undefined
					? {
							name: curr[codigo] + '-' + curr[descripcion],
							value: curr[campoSumatorio]
					  }
					: {
							name: curr[codigo] + '-' + curr[descripcion],
							value: curr[campoSumatorio] - curr[aRestar]
					  };
			return [...acc, item];
		}, []);

		// Totalizo
		let dataTotal = array.reduce((acc, { name, value }) => {
			const item = acc.find((item) => item.name === name);
			item
				? (item.value += value)
				: acc.push({
						name,
						value
				  });
			return acc;
		}, []);

		dataTotal = dataTotal.sort((a, b) => b.value - a.value);
		dataTotal = dataTotal.slice(0, 25);

		dataTotal.map((item, index) => {
			const colorIndex = index % 25;
			item.color = colors[colorIndex];
			item.euros = item.value.toLocaleString('de-DE') + ' €';
			item.name = item.name + '  ' + item.euros;
		});

		return dataTotal;
	}
}
