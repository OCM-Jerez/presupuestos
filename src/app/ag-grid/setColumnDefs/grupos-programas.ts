import { CellRendererOCMtext } from '@ag-grid/CellRendererOCM';
import { AvalaibleYearsService } from '@services/avalaibleYears.service';
import { ColGroupDef } from 'ag-grid-community';

export function getColumnDefsGastan(avalaibleYearsService: AvalaibleYearsService, year: string): ColGroupDef[] {
	return [
		{
			headerName: '',
			children: [
				{
					headerName: 'Programa',
					field: 'DesPro',
					// rowGroup: true,
					showRowGroup: 'DesPro',
					filter: true,
					width: 700,
					pinned: 'left',
					columnGroupShow: 'closed',
					cellRenderer: CellRendererOCMtext,
					valueGetter: (params) => {
						return `${params.data.CodPro + ' - ' + params.data.DesPro}`;
					}
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
				},
				{
					headerName: 'Remanente Credito',
					field: `RemanenteCredito${year}`,
					columnGroupShow: 'closed'
				}
			]
		}
	];
}

// ...this.avalaibleYearsService.getYearsSelected().map((year) => {
// 	return {
// 		// headerName: year,
// 		// children: this.createColumnsChildren(year),
// 		children: this.createColumnsChildrenDetalle(year)
// 	};
// })
