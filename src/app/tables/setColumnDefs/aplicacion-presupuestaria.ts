import { AvalaibleYearsService } from '@services/avalaibleYears.service';
import { ColGroupDef } from 'ag-grid-community';

export function getColumnDefs(avalaibleYearsService: AvalaibleYearsService, year): ColGroupDef[] {
	return [
		{
			headerName: 'Clasificado por aplicación presupuestaria',
			children: [
				{
					headerName: 'Aplicación presupuestaria',
					field: 'DesOrg',
					filter: false,
					width: 700,
					pinned: 'left',
					columnGroupShow: 'closed',
					cellRenderer: '',
					valueGetter: (params) => {
						if (params.data) {
							return (
								params.data.CodOrg +
								'-' +
								params.data.CodPro +
								'-' +
								params.data.CodEco +
								'  ' +
								params.data.DesOrg +
								' - ' +
								params.data.DesPro +
								' - ' +
								params.data.DesEco
							);
						} else {
							return null;
						}
					}
				}
			]
		},
		{
			headerName: 'Créditos',
			children: [
				{
					headerName: 'Previsiones Iniciales',
					field: `Iniciales${year}`,
					columnGroupShow: 'closed'
				},
				{
					headerName: 'Total Modificaciones',
					field: `Modificaciones${year}`,
					width: 140,
					columnGroupShow: 'closed'
				},
				{
					headerName: 'Creditos definitivos',
					field: `Definitivas${year}`,
					width: 140,
					columnGroupShow: 'closed'
				}
			]
		},
		{
			headerName: 'Gastos',
			children: [
				{
					headerName: 'Gastos Comprometidos',
					field: `GastosComprometidos${year}`,
					width: 140,
					columnGroupShow: 'closed'
				},
				{
					headerName: 'Obligaciones reconocidas netas',
					field: `ObligacionesReconocidasNetas${year}`,
					width: 135,
					columnGroupShow: 'closed'
				},
				{
					headerName: 'Pagos',
					field: `Pagos${year}`,
					columnGroupShow: 'closed'
				},
				{
					headerName: 'Obligaciones pendientes de pago al final periodo',
					field: `ObligacionesPendientePago${year}`,
					width: 120,
					columnGroupShow: 'closed'
				}
			]
		}
		// {
		// 	headerName: 'Remanente Credito',
		// 	field: `RemanenteCredito${year}`
		// }
	];
}
