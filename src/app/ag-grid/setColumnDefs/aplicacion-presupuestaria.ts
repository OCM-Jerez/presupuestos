import { AvalaibleYearsService } from '@services/avalaibleYears.service';
import { ColGroupDef } from 'ag-grid-community';

export function getColumnDefsAppPresupuestaria(
	avalaibleYearsService: AvalaibleYearsService,
	_subHeaderName
): ColGroupDef[] {
	return [
		{
			headerName: 'Clasificado por aplicación presupuestaria',
			children: [
				{
					headerName: _subHeaderName,
					field: 'DesPro',
					filter: false,
					width: 700,
					pinned: 'left',
					columnGroupShow: 'closed',
					cellRenderer: 'agGroupCellRenderer',
					valueGetter: (params) => {
						if (params.data) {
							return (
								params.data.CodPro + '-' + params.data.CodEco + '  ' + params.data.DesPro + ' - ' + params.data.DesEco
							);
						} else {
							return null;
						}
					}
				},

				...avalaibleYearsService.getYearsSelected().map((year) => {
					let _myYear: number;
					if (avalaibleYearsService.getYearsSelected().length === 1) {
						_myYear = 1;
					} else {
						_myYear = year;
					}

					return {
						headerName: year.toLocaleString(),
						children: createColumnsChildren(_myYear)
					};
				})
			]
		}
	];
}

function createColumnsChildren(year: number) {
	console.log(`Definitivas${year}`);

	return [
		{
			headerName: 'Creditos definitivos',
			field: `Definitivas${year}`,
			width: 120
		},
		{
			headerName: 'Pagos',
			field: `Pagos${year}`,
			width: 120
		}
	];
}
