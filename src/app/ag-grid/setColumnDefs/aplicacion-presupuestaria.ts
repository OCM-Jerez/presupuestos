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
								// params.data.CodOrg +
								// '-' +
								params.data.CodPro +
								'-' +
								params.data.CodEco +
								'  ' +
								// params.data.DesOrg +
								// ' - ' +
								params.data.DesPro +
								' - ' +
								params.data.DesEco
							);
						} else {
							return null;
						}
					}
				},
				// 	]
				// },
				// {
				// 	headerName: 'Créditos',
				// 	children: [
				// 		{
				// 			headerName: 'Previsiones Iniciales',
				// 			field: `Iniciales${year}`,
				// 			columnGroupShow: 'closed'
				// 		},
				// 		{
				// 			headerName: 'Total Modificaciones',
				// 			field: `Modificaciones${year}`,
				// 			width: 140,
				// 			columnGroupShow: 'closed'
				// 		},
				// 		{
				// 			headerName: 'Creditos definitivos',
				// 			field: `Definitivas${year}`,
				// 			width: 140,
				// 			columnGroupShow: 'closed'
				// 		}
				// 	]
				// },
				// {
				// 	headerName: 'Gastos',
				// 	children: [
				// 		{
				// 			headerName: 'Gastos Comprometidos',
				// 			field: `GastosComprometidos${year}`,
				// 			width: 140,
				// 			columnGroupShow: 'closed'
				// 		},
				// 		{
				// 			headerName: 'Obligaciones reconocidas netas',
				// 			field: `ObligacionesReconocidasNetas${year}`,
				// 			width: 135,
				// 			columnGroupShow: 'closed'
				// 		},
				// 		{
				// 			headerName: 'Pagos',
				// 			field: `Pagos${year}`,
				// 			columnGroupShow: 'closed'
				// 		},
				// 		{
				// 			headerName: 'Obligaciones pendientes de pago al final periodo',
				// 			field: `ObligacionesPendientePago${year}`,
				// 			width: 120,
				// 			columnGroupShow: 'closed'
				// 		},
				...avalaibleYearsService.getYearsSelected().map((year) => {
					return {
						headerName: year.toLocaleString(),
						children: createColumnsChildren(year)
					};
				})
			]
		}
		// {
		// 	headerName: 'Remanente Credito',
		// 	field: `RemanenteCredito${year}`
		// }
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
