export interface IDataIngreso {
	CodArt: number;
	CodCap: number;
	CodCon: number;
	CodEco: number;
	DesArt: string;
	DesCap: string;
	DesCon: string;
	DesEco: string;
	Definitivas?: number;
	DerechosAnulados?: number;
	DerechosCancelados?: number;
	DerechosPendienteCobro?: number;
	DerechosReconocidos?: number;
	DerechosReconocidosNetos?: number;
	DiferenciaPrevision?: number;
	Iniciales?: number;
	Modificaciones?: number;
	RecaudacionNeta?: number;
}
