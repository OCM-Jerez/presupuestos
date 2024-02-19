import { ICellRendererParams } from 'ag-grid-community';

export function CellRendererOCM(params: ICellRendererParams) {
	if (params.value) {
		const valorFormateado: number = params.value.toLocaleString('de-DE');

		if (params.node.footer) {
			switch (params.node.level) {
				case 3: // Total cuarto nivel.
					return `<p style="text-align: right; color: red; font-size: 12px; font-family:var(--fuente-principal);margin: 0px;font-weight: bold">${valorFormateado}</p>`;
				case 2: // Total tercer nivel.
					return `<p style="text-align: right; color: red; font-size: 12px; font-family:var(--fuente-principal);margin: 0px;font-weight: bold">${valorFormateado}</p>`;
				case 1: // Total segundo nivel.
					return `<p style="text-align: right; color: red; font-size: 12px; font-family:var(--fuente-principal);margin: 0px;font-weight: bold">${valorFormateado}</p>`;
				case 0: // Total primer nivel.
					return `<p style="text-align: right; color: red; font-size: 14px; font-family:var(--fuente-principal);margin: 0px;font-weight: bold">${valorFormateado}</p>`;
				case -1: // Total general.
					return `<p style="text-align: right; color: red; font-size: 14px; font-family:var(--fuente-principal);font-family:var(--fuente-principal);margin: 0px;font-weight: bold">${valorFormateado}</p>`;
				default:
					return 'SIN FORMATO';
			}
		} else {
			// cambia todas las cells
			return `<p style="font-size: 12px; font-family:var(--fuente-principal);text-align: right; margin: 0px;">${valorFormateado}</p>`;
		}
	} else {
		return '';
	}
}

export function CellRendererOCMtext(params: ICellRendererParams) {
	switch (params.node.level) {
		case 0:
			return params.value
				? // cambia todas las cells
					`<p style="font-size: 12px; color: black;font-family:var(--fuente-principal); text-align: left; margin: 0;">${params.value}</p>`
				: '';
		case 1:
			return params.value
				? `<p style="font-size: 12px; font-family:var(--fuente-principal); text-align: left; margin: 0;">${params.value}</p>`
				: '';
		case 2:
			return params.value
				? `<p style="font-size: 28px; font-family:var(--fuente-principal); text-align: left; margin: 0;">${params.value}</p>`
				: '';
		default:
			return params.value
				? `<p style="font-size: 10px; font-family:var(--fuente-principal); text-align: left; margin: 0;">${params.value}</p>`
				: '';
	}
}

export function CellRendererOCMDetails(params: ICellRendererParams) {
	if (params.value) {
		const valorFormateado: number = params.value.toLocaleString('de-DE');
		switch (params.node.level) {
			case -1: // TOTAL GENERAL
				return `<p style="color: red; font-size: 14px; font-family:var(--fuente-principal); font-weight: bold; text-align: right; margin: 0px">${valorFormateado}
								</p>`;
			case 0: // TOTAL CAPITULO
				return `<p style="color: red; font-size: 12px; font-family:var(--fuente-principal);font-weight: bold;text-align: right; margin: 0px">${valorFormateado}
								</p>`;
			case 1: // Económico
				return `<p style="font-size: 10px; color: black; font-family:var(--fuente-principal);text-align: right; margin: 0px;">${valorFormateado}</p>`;
			default:
				return `<p style="color: blue; font-size: 14px; font-weight: bold; text-align: right; margin: 0px">SIN FORMATO
								</p>`;
		}
	} else {
		return '';
	}
}

export function CellRendererOCM2Levels(params: ICellRendererParams) {
	if (params.value) {
		const valorFormateado: number = params.value.toLocaleString('de-DE');

		switch (params.node.level) {
			case -1: // TOTAL GENERAL
				return `<p style="color: red; font-size: 14px; font-family:var(--fuente-principal); font-weight: bold; text-align: right; margin: 0px">${valorFormateado}
								</p>`;
			case 0: // Total row
				return `<p style="color: black; font-size: 12px; font-family:var(--fuente-principal);text-align: right; margin: 0px">${valorFormateado}
								</p>`;
			default:
				return `<p style="color: blue; font-size: 10px; font-weight: bold; text-align: right; margin: 0px">SIN FORMATO
								</p>`;
		}
	} else {
		return '';
	}
}

export function CellRendererOCM1Level(params: ICellRendererParams) {
	if (params.value) {
		const valorFormateado: number = params.value.toLocaleString('de-DE');

		switch (params.node.level) {
			case -1: // TOTAL GENERAL
				return '';
			case 0: // Total row
				return `<p style="color: black; font-size: 18px; font-family:var(--fuente-principal);text-align: right; margin: 0px">${valorFormateado}
		</p>`;
			case 1:
				return '';

			default:
				return `<p style="color: blue; font-size: 14px; font-weight: bold; text-align: right; margin: 0px">SIN FORMATO
								</p>`;
		}
	} else {
		return '';
	}
}
