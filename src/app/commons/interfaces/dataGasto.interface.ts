export interface IDataGasto {
	CodPro: string;
	DesPro: string;
	CodOrg: string;
	DesOrg: string;
	CodCap: string;
	DesCap: string;
	CodEco: string;
	DesEco: string;
	Iniciales: string;
	Modificaciones: string;
	Definitivas: string;
	GastosComprometidos: string;
	ObligacionesReconocidasNetas: string;
	Pagos: string;
	ObligacionesPendientePago: string;
	RemanenteCredito: string;
	CodAre?: number;
	DesAre?: string;
	CodPol?: number;
	DesPol?: string;
	CodGru?: number;
	DesGru?: string;
	CodCon?: number;
	DesCon?: string;
	CodArt?: number;
	DesArt?: string;
}
