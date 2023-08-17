import { CellRendererOCMDetails, CellRendererOCMtext } from '@ag-grid/CellRendererOCM';
import { ColGroupDef } from 'ag-grid-community';

import { AvalaibleYearsService } from '@services/avalaibleYears.service';

export function getColumnDefsDetails(avalaibleYearsService: AvalaibleYearsService, tipo?: string): ColGroupDef[] {
	switch (tipo) {
		case 'detalle':
			return [
				{
					children: [
						{
							headerName: 'Programa',
							field: 'DesCap',
							width: 450,
							pinned: 'left',
							rowGroup: true,
							hide: true,
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
							}
						},

						...avalaibleYearsService.getYearsSelected().map((year) => {
							const yearsSelected = avalaibleYearsService.getYearsSelected().length;
							const _myYear = yearsSelected === 1 ? 1 : year;

							return {
								headerName: year.toLocaleString(),
								children: createColumnsChildren(_myYear, CellRendererOCMDetails)
							};
						})
					]
				}
			];
			break;
		case 'gastanEconomico':
		case 'gastanOrganico':
		case 'appPresupuestaria':
			return [
				{
					children: [
						{
							headerName: 'Programa',
							field: 'DesPro',
							filter: true,
							width: 700,
							pinned: 'left',
							showRowGroup: 'DesPro',
							columnGroupShow: 'closed',
							cellRenderer: CellRendererOCMtext,
							valueGetter: (params) => {
								if (params.data) {
									return params.data.CodPro + ' - ' + params.data.DesPro;
									//
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
								children: createColumnsChildren(_myYear, CellRendererOCMDetails)
							};
						})
					]
				}
			];
			break;
		case 'detalleAppPresupuestaria':
			return [
				{
					children: [
						{
							headerName: '_subHeaderName',
							field: 'DesPro',
							filter: false,
							width: 700,
							pinned: 'left',
							rowGroup: true,
							hide: true,
							valueGetter: (params) => {
								if (params.data) {
									return (
										params.data.CodPro +
										'-' +
										params.data.CodEco +
										'  ' +
										params.data.DesPro +
										' - ' +
										params.data.DesEco
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
								children: createColumnsChildren(_myYear, CellRendererOCMtext)
							};
						})
					]
				}
			];
			break;
		default:
			return [];
			break;
	}
}

function createColumnsChildren(year: number, cellRenderer) {
	return [
		{
			headerName: 'Créditos',
			children: [
				{
					headerName: 'Previsiones Iniciales',
					field: `Iniciales${year}`,
					hide: true,
					cellRenderer: cellRenderer
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
