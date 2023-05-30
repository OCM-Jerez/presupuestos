import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class PrepareDataTreemapService {
	calcSeries(data: any, codigo, descripcion, campoSumatorio, aRestar?) {
		let array = [];
		array = data.reduce((acc, curr) => {
			const item =
				aRestar === undefined
					? {
							name: curr[codigo] + '-' + curr[descripcion],
							//    +
							//   '  ' +
							//   curr[campoSumatorio].toLocaleString('de-DE') +
							//   ' €',
							value: curr[campoSumatorio]
					  }
					: {
							name: curr[codigo] + '-' + curr[descripcion],
							value: curr[campoSumatorio] - curr[aRestar]
					  };
			acc.push(item);
			return acc;
		}, []);

		// Totalizo
		data = array.reduce((acc, { name, value }) => {
			const item = acc.find((item) => item.name === name);
			item
				? (item.value += value)
				: acc.push({
						name,
						value
				  });
			return acc;
		}, []);
		data = data.sort((a, b) => b.value - a.value);
		data = data.slice(0, 25);

		const colors = [
			'#2f7ed8',
			'#097E17',
			'#8bbc21',
			'#910000',
			'#1aadce',
			'#492970',
			'#f28f43',
			'#77a1e5',
			'#c42525',
			'#a6c96a',
			'#7cb5ec',
			'#003DF6',
			'#90ed7d',
			'#f7a35c',
			'#8085e9',
			'#f15c80',
			'#e4d354',
			'#2b908f',
			'#f45b5b',
			'#91e8e1',
			'#f15c80',
			'#e4d354',
			'#2b908f',
			'#f45b5b',
			'#91e8e1'
		];
		let colorIndex = -1;

		data.map((item) => {
			colorIndex += 1;
			colorIndex > 25 ? (colorIndex = 0) : colorIndex;
			item.color = colors[colorIndex];
			item.euros = item.value.toLocaleString('de-DE') + ' €';
			item.name = item.name + '  ' + item.euros;
		});

		return data;
	}
}
