import { ICellRendererParams } from 'ag-grid-community';

export function CellRendererOCM(params: ICellRendererParams) {
	if (params.value) {
		const valorFormateado: number = params.value.toLocaleString('de-DE');

		if (params.node.footer) {
			switch (params.node.level) {
				case 3: // Total cuarto nivel.
					return `<p style="text-align: right; color: red; font-size: 12px; margin: 0px;font-weight: bold">${valorFormateado}</p>`;
				case 2: // Total tercero nivel.
					return `<p style="text-align: right; color: red; font-size: 12px; margin: 0px;font-weight: bold">${valorFormateado}</p>`;
				case 1: // Total segundo nivel.
					return `<p style="text-align: right; color: red; font-size: 12px; margin: 0px;font-weight: bold">${valorFormateado}</p>`;
				case 0: // Total primer nivel.
					return `<p style="text-align: right; color: red; font-size: 16px; margin: 0px;font-weight: bold">${valorFormateado}</p>`;
				case -1: // Total general.
					return `<p style="text-align: right; color: red; font-size: 20px; font-family:var(--fuente-principal);margin: 0px;font-weight: bold">${valorFormateado}</p>`;
				default:
					return 'SIN FORMATO';
			}
		} else {
			return `<p style="font-size: 16px; font-family:var(--fuente-principal);text-align: right; margin: 0px;">${valorFormateado}</p>`;
		}
	} else {
		return '';
	}
}

export function CellRendererOCMtext(params: ICellRendererParams) {
	switch (params.node.level) {
		case 0:
			return params.value
				? `<p style="font-size: 18px;  color: black;font-family:var(--fuente-principal); text-align: left; margin: 0;">${params.value}</p>`
				: '';
		case 1:
			return params.value
				? `<p style="font-size: 28px; font-family:var(--fuente-principal); text-align: left; margin: 0;">${params.value}</p>`
				: '';
		case 2:
			return params.value
				? `<p style="font-size: 28px; font-family:var(--fuente-principal); text-align: left; margin: 0;">${params.value}</p>`
				: '';
		default:
			return params.value
				? `<p style="font-size: 18px; font-family:var(--fuente-principal); text-align: left; margin: 0;">${params.value}</p>`
				: '';
	}
}
