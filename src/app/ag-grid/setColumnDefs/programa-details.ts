import { CellRendererOCMDetails, CellRendererOCMtext } from '@ag-grid/CellRendererOCM';
import { AvalaibleYearsService } from '@services/avalaibleYears.service';
import { ColGroupDef } from 'ag-grid-community';

export function getColumnDefsDetails(avalaibleYearsService: AvalaibleYearsService): ColGroupDef[] {
	return [
		{
			children: [
				{
					headerName: 'Capítulo',
					field: 'DesCap',
					width: 450,
					pinned: 'left',
					rowGroup: true,
					showRowGroup: 'DesCap',
					cellRenderer: 'agGroupCellRenderer',
					valueGetter: (params) => {
						if (params?.data) {
							return `<span style="color: red; font-size: 18px;font-family:var(--fuente-principal); font-weight: bold;margin-left: 0px;">${
								params.data.CodCap + ' - ' + params.data.DesCap
							}</span>`;
						} else {
							return '';
						}
					},
					cellRendererParams: {
						suppressCount: true,
						innerRenderer: (params) => {
							switch (params.node.level) {
								case 0:
									return params.value;
								case 1:
									return '';
								default:
									return `<span style="color: red; font-size: 18px; font-family:var(--fuente-principal);font-weight: bold;text-align: right">TOTAL PROGRAMA
									</span>`;
							}
						}
					}
				},
				{
					headerName: 'Económico',
					field: 'DesEco',
					width: 625,
					pinned: 'left',
					cellRenderer: CellRendererOCMtext,
					valueGetter: (params) => {
						if (params?.data) {
							return `<span style="color: black; font-family:var(--fuente-principal);font-size: 16px; margin-left: 0px">${
								params.data.CodEco + ' - ' + params.data.DesEco
							}</span>`;
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
					cellRenderer: CellRendererOCMDetails
				},
				{
					headerName: 'Total Modificaciones',
					field: `Modificaciones${year}`,
					width: 120,
					hide: true,
					cellRenderer: CellRendererOCMDetails
				},
				{
					headerName: 'Creditos definitivos',
					field: `Definitivas${year}`,
					width: 150,
					hide: false,
					cellRenderer: CellRendererOCMDetails
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
					cellRenderer: CellRendererOCMDetails
				},
				{
					headerName: 'Obligaciones reconocidas netas',
					field: `ObligacionesReconocidasNetas${year}`,
					width: 135,
					hide: true,
					cellRenderer: CellRendererOCMDetails
				},
				{
					headerName: 'Pagos',
					field: `Pagos${year}`,
					hide: false,
					cellRenderer: CellRendererOCMDetails
				},
				{
					headerName: 'Obligaciones pendientes de pago al final periodo',
					field: `ObligacionesPendientePago${year}`,
					width: 120,
					hide: true,
					cellRenderer: CellRendererOCMDetails
				}
			]
		},
		{
			headerName: 'Remanente Credito',
			field: `RemanenteCredito${year}`,
			hide: true,
			cellRenderer: CellRendererOCMDetails
		}
	];
}
