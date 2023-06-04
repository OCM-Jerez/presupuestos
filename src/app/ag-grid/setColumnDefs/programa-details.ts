import { AvalaibleYearsService } from '@services/avalaibleYears.service';
import { ColGroupDef } from 'ag-grid-community';

export function getColumnDefsDetails(avalaibleYearsService: AvalaibleYearsService, _subHeaderName): ColGroupDef[] {
	return [
		{
			children: [
				{
					headerName: _subHeaderName,
					field: 'DesPro',
					rowGroup: true,
					showRowGroup: 'DesPro',
					filter: true,
					width: 500,
					pinned: 'left',
					columnGroupShow: 'closed',
					cellRenderer: 'agGroupCellRenderer',
					// cellRenderer: CellRendererOCMtext,
					valueGetter: (params) => {
						if (params?.data) {
							return params.data.CodPro + ' - ' + params.data.DesPro;
						} else {
							return '';
						}
					},
					cellRendererParams: {
						suppressCount: true,
						innerRenderer: (params) => {
							// console.log('params-1--->', params);
							return params?.node?.group && params?.value
								? `<span style="color: black; font-size: 18px; margin-left: 0px;">${params.value}</span>`
								: '';
						},

						footerValueGetter(params) {
							// console.log('params -2--->', params);
							if (!params?.value) {
								return '';
							}

							switch (params.node.level) {
								case 0: // Total programa.
									return `<span style="color: red; font-size: 18px; font-weight: bold; margin-left: 0px;"> Total ${params.value}</span>`;
								// case -1: // Total general.
								//   return '<span style="color: red; font-size: 18px; font-weight: bold; margin-right: 0px;"> Total general' + '</span>';
								default:
									return 'SIN FORMATO';
							}
						}
					}
				},
				{
					headerName: 'Capítulo',
					field: 'DesCap',
					rowGroup: true,
					showRowGroup: 'DesCap',
					filter: false,
					width: 300,
					pinned: 'left',
					columnGroupShow: 'closed',
					cellRenderer: 'agGroupCellRenderer',
					valueGetter: (params) => {
						// console.log('params -3--->', params);
						if (params?.data) {
							const valCap = params.data.CodCap + ' - ' + params.data.DesCap;
							return `<span style="color: black; font-size: 16px; margin-left: 0px;">${valCap}</span>`;
						} else {
							return '';
						}
					},
					cellRendererParams: {
						suppressCount: true,
						innerRenderer: (params) => {
							// console.log('params -4--->', params);
							if (!params?.value) {
								return '';
							}

							if (params.node.group) {
								return params.value;
							} else {
								return '';
							}
						},
						footerValueGetter(params) {
							// console.log('params -5--->', params);
							if (!params?.value) return '';

							const val = params.value.split(' - ')[1];
							switch (params.node.level) {
								case 2: // Total capítulo.
									return `<span style="color: red; font-size: 18px;  font-weight: bold; margin-left: 0px;"> Total ${val}</span>`;
								case -1: // Total general.
									return '';
								default:
									return 'SIN FORMATO';
							}
						}
					}
				},
				{
					headerName: 'Económico',
					field: 'DesEco',
					width: 500,
					pinned: 'left',
					filter: true,
					cellRenderer: 'agGroupCellRenderer',
					valueGetter: (params) => {
						// console.log('params -6--->', params);
						if (params?.data) {
							return params.data.CodEco + ' - ' + params.data.DesEco;
						} else {
							return '';
						}
					}
				},

				...avalaibleYearsService.getYearsSelected().map((year) => {
					return {
						headerName: year.toLocaleString(),
						children: createColumnsChildren(year)
					};
				})

				// {
				// 	headerName: 'Creditos definitivos',
				// 	field: `Definitivas2023`,
				// 	width: 120
				// },
				// {
				// 	headerName: 'Pagos',
				// 	field: `Pagos2023`,
				// 	width: 120
				// }
			]
		}
	];
}

function createColumnsChildren(year: number) {
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
