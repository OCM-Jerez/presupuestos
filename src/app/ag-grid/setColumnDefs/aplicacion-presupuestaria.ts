import { CellRendererOCMtext } from '@ag-grid/CellRendererOCM';
import { ColGroupDef } from 'ag-grid-community';

import { AvalaibleYearsService } from '@services/avalaibleYears.service';

export function getColumnDefsAppPresupuestaria(
	avalaibleYearsService: AvalaibleYearsService,
	_subHeaderName
): ColGroupDef[] {
	return [
		{
			children: [
				{
					headerName: _subHeaderName,
					field: 'DesPro',
					filter: false,
					width: 700,
					pinned: 'left',
					rowGroup: true,
					// hide: true,
					// columnGroupShow: 'closed',
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
					const yearsSelected = avalaibleYearsService.getYearsSelected().length;
					const _myYear = yearsSelected === 1 ? 1 : year;

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
	return [
		{
			headerName: 'Créditos',
			children: [
				{
					headerName: 'Previsiones Iniciales',
					field: `Iniciales${year}`,
					hide: true,
					cellRenderer: CellRendererOCMtext
				},
				{
					headerName: 'Total Modificaciones',
					field: `Modificaciones${year}`,
					width: 120,
					hide: true,
					cellRenderer: CellRendererOCMtext
				},
				{
					headerName: 'Creditosnnnnn definitivos',
					field: `Definitivas${year}`,
					width: 150,
					hide: false,
					cellRenderer: CellRendererOCMtext
				}
			]
		},
		{
			headerName: 'Gastos',
			children: [
				{
					headerName: 'Gastos Comprometidos',
					field: `GastosComprometidos${year}`,
					width: 120,
					hide: true,
					cellRenderer: CellRendererOCMtext
				},
				{
					headerName: 'Obligaciones reconocidas netas',
					field: `ObligacionesReconocidasNetas${year}`,
					width: 135,
					hide: true,
					cellRenderer: CellRendererOCMtext
				},
				{
					headerName: 'Pagos',
					field: `Pagos${year}`,
					hide: false,
					cellRenderer: CellRendererOCMtext
				},
				{
					headerName: 'Obligaciones pendientes de pago al final periodo',
					field: `ObligacionesPendientePago${year}`,
					width: 120,
					hide: true,
					cellRenderer: CellRendererOCMtext
				}
			]
		},
		{
			headerName: 'Remanente Credito',
			field: `RemanenteCredito${year}`,
			hide: true,
			cellRenderer: CellRendererOCMtext
		}
	];
}
