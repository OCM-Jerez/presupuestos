import { CLASIFICATION_TYPE } from '@appTypes/clasification.type';
import { IDataProperty } from '@interfaces/dataTable.interface';
import { ISubtabAdicional } from '@interfaces/subtabAdicional.interface';
import { ISubtabClasification } from '@interfaces/subtabClasification.interface';

export interface IClasification extends Omit<IDataProperty, 'attribute' | 'useStarWitch'> {
	attribute?: string;
	useStarWitch?: boolean;
	subtabs?: ISubtabClasification[];
	subtabsAdditional?: ISubtabAdicional[];
}

interface ISubtabsData {
	name: string;
	key: string;
	codField: string;
	desField: string;
	selected: boolean;
}

interface IClasificationObject {
	ingresosEconomicaCapitulos: IClasification;
	ingresosEconomicaArticulos: IClasification;
	ingresosEconomicaConceptos: IClasification;
	ingresosEconomicaEconomicos: IClasification;
	gastosOrganicaOrganicos: IClasification;
	gastosProgramaAreas: IClasification;
	gastosProgramaPoliticas: IClasification;
	gastosProgramaGrupos: IClasification;
	gastosProgramaProgramas: IClasification;
	gastosEconomicaCapitulos: IClasification;
	gastosEconomicaArticulos: IClasification;
	gastosEconomicaConceptos: IClasification;
	gastosEconomicaEconomicos: IClasification;
	aplicacion: IClasification;
}

const createSubtabs = (clasificationType: CLASIFICATION_TYPE, subtabsData: ISubtabsData[]) => {
	return subtabsData.map((data) => ({
		...data,
		clasificationType: clasificationType as CLASIFICATION_TYPE
	}));
};

const subtabsIngresos = (clasificationType: CLASIFICATION_TYPE) =>
	createSubtabs(clasificationType, [
		{
			name: 'Por capítulo ingresos',
			key: 'ingresosEconomicaCapitulos',
			codField: 'CodCap',
			desField: 'DesCap',
			selected: false
		},
		{
			name: 'Por artículo',
			key: 'ingresosEconomicaArticulos',
			codField: 'CodArt',
			desField: 'DesArt',
			selected: false
		},
		{
			name: 'Por concepto',
			key: 'ingresosEconomicaConceptos',
			codField: 'CodCon',
			desField: 'DesCon',
			selected: false
		},
		{
			name: 'Por económico',
			key: 'ingresosEconomicaEconomicos',
			codField: 'CodEco',
			desField: 'DesEco',
			selected: true
		}
	]);

const subtabsAdditionalIngresos = [{ name: 'Gráfico detallado', path: '/graphDetalle' }];

const subtabsGastosProgramas = (clasificationType: CLASIFICATION_TYPE) =>
	createSubtabs(clasificationType, [
		{ name: 'Por áreas', key: 'gastosProgramaAreas', codField: 'CodAre', desField: 'DesAre', selected: false },
		{ name: 'Por política', key: 'gastosProgramaPoliticas', codField: 'CodPol', desField: 'DesPol', selected: false },
		{
			name: 'Por grupo programas',
			key: 'gastosProgramaGrupos',
			codField: 'CodGru',
			desField: 'DesGru',
			selected: false
		},
		{ name: 'Por programa', key: 'gastosProgramaProgramas', codField: 'CodPro', desField: 'DesPro', selected: true }
	]);

const subtabsAdditionalGastosProgramas = [
	{ name: 'Gráfico detallado', path: '/graphDetalle' },
	{ name: 'Detalle del programa seleccionado', path: '/tableProgramaDetails', param: 'details' }
];

const subtabsGastosEconomica = (clasificationType: CLASIFICATION_TYPE) =>
	createSubtabs(clasificationType, [
		{
			name: 'Por capítulo gasto',
			key: 'gastosEconomicaCapitulos',
			codField: 'CodCap',
			desField: 'DesCap',
			selected: false
		},
		{ name: 'Por artículo', key: 'gastosEconomicaArticulos', codField: 'CodArt', desField: 'DesArt', selected: false },
		{ name: 'Por concepto', key: 'gastosEconomicaConceptos', codField: 'CodCon', desField: 'DesCon', selected: false },
		{ name: 'Por económico', key: 'gastosEconomicaEconomicos', codField: 'CodEco', desField: 'DesEco', selected: true }
	]);

const subtabsAdditionalGastosEconomica = [
	{ name: 'Gráfico detallado', path: '/graphDetalle' },
	{
		name: 'Programas que gastan del elemento seleccionado',
		// path: '/tableGrupoProgramaDetails',
		path: '/tableProgramaDetails',
		param: 'gastan'
	}
];

const CLASIFICATION: IClasificationObject = {
	ingresosEconomicaCapitulos: {
		attribute: 'CodCap',
		codField: 'CodCap',
		desField: 'DesCap',
		graphTitle: 'Ingresos por capítulo',
		headerName: 'Clasificado por capítulo',
		isIngresos: true,
		subHeaderName: 'Capítulo',
		useStarWitch: true,
		width: 250,
		subtabs: subtabsIngresos('ingresosEconomicaCapitulos'),
		subtabsAdditional: subtabsAdditionalIngresos
	},
	ingresosEconomicaArticulos: {
		attribute: 'CodEco',
		codField: 'CodArt',
		desField: 'DesArt',
		graphTitle: 'Ingresos por artículo',
		headerName: 'Clasificado por articulo',
		isIngresos: true,
		subHeaderName: 'Articulo',
		useStarWitch: true,
		width: 550,
		subtabs: subtabsIngresos('ingresosEconomicaArticulos'),
		subtabsAdditional: subtabsAdditionalIngresos
	},
	ingresosEconomicaConceptos: {
		attribute: 'CodEco',
		codField: 'CodCon',
		desField: 'DesCon',
		graphTitle: 'Ingresos por concepto',
		headerName: 'Clasificado por concepto',
		isIngresos: true,
		subHeaderName: 'Concepto',
		useStarWitch: true,
		width: 660,
		subtabs: subtabsIngresos('ingresosEconomicaConceptos'),
		subtabsAdditional: subtabsAdditionalIngresos
	},
	ingresosEconomicaEconomicos: {
		attribute: 'CodEco',
		codField: 'CodEco',
		desField: 'DesEco',
		graphTitle: 'Ingresos por económico',
		headerName: 'Clasificado por económico',
		isIngresos: true,
		subHeaderName: 'Económico',
		useStarWitch: true,
		width: 550,
		subtabs: subtabsIngresos('ingresosEconomicaEconomicos'),
		subtabsAdditional: subtabsAdditionalIngresos
	},
	gastosOrganicaOrganicos: {
		attribute: 'CodPro',
		codField: 'CodOrg',
		desField: 'DesOrg',
		graphTitle: 'Gastos por orgánico',
		headerName: 'Clasificado por orgánico',
		isIngresos: false,
		subHeaderName: 'Orgánico',
		useStarWitch: false,
		width: 250,
		subtabs: [],
		subtabsAdditional: [
			{ name: 'Gráfico detallado', path: '/graphDetalle' },
			{
				name: 'Programas que componen orgánico seleccionado',
				// path: '/tableGrupoProgramaDetails',
				path: '/tableProgramaDetails',
				param: 'organico'
			}
		]
	},
	gastosProgramaAreas: {
		attribute: 'CodPro',
		codField: 'CodAre',
		desField: 'DesAre',
		graphTitle: 'Gastos por área de programa',
		headerName: 'Clasificado areas programas de gasto',
		isIngresos: false,
		subHeaderName: 'Area de gasto',
		useStarWitch: true,
		width: 550,
		subtabs: subtabsGastosProgramas('gastosProgramaAreas'),
		subtabsAdditional: subtabsAdditionalGastosProgramas
	},
	gastosProgramaPoliticas: {
		attribute: 'CodPro',
		codField: 'CodPol',
		desField: 'DesPol',
		graphTitle: 'Gastos por política de gasto',
		headerName: 'Clasificado políticas gasto',
		isIngresos: false,
		subHeaderName: 'Política de gasto',
		useStarWitch: true,
		width: 550,
		subtabs: subtabsGastosProgramas('gastosProgramaPoliticas'),
		subtabsAdditional: subtabsAdditionalGastosProgramas
	},
	gastosProgramaGrupos: {
		attribute: 'CodPro',
		codField: 'CodGru',
		desField: 'DesGru',
		graphTitle: 'Gastos por grupo de programa',
		headerName: 'Clasificado grupos programas gasto',
		isIngresos: false,
		subHeaderName: 'Grupo programas de gasto',
		useStarWitch: true,
		width: 550,
		subtabs: subtabsGastosProgramas('gastosProgramaGrupos'),
		subtabsAdditional: subtabsAdditionalGastosProgramas
	},
	gastosProgramaProgramas: {
		attribute: 'CodPro',
		codField: 'CodPro',
		desField: 'DesPro',
		graphTitle: 'Gastos por programa',
		headerName: 'Clasificado por programa',
		isIngresos: false,
		subHeaderName: 'Programa',
		useStarWitch: true,
		width: 550,
		subtabs: subtabsGastosProgramas('gastosProgramaProgramas'),
		subtabsAdditional: subtabsAdditionalGastosProgramas
	},
	gastosEconomicaCapitulos: {
		attribute: 'CodEco',
		codField: 'CodCap',
		desField: 'DesCap',
		graphTitle: 'Gastos por capítulo',
		headerName: 'Clasificado por capítulo',
		isIngresos: false,
		subHeaderName: 'Capítulo',
		useStarWitch: true,
		width: 250,
		subtabs: subtabsGastosEconomica('gastosEconomicaCapitulos'),
		subtabsAdditional: subtabsAdditionalGastosEconomica
	},
	gastosEconomicaArticulos: {
		attribute: 'CodEco',
		codField: 'CodArt',
		desField: 'DesArt',
		graphTitle: 'Gastos por artículo',
		headerName: 'Clasificado por articulo',
		isIngresos: false,
		subHeaderName: 'Articulo',
		useStarWitch: true,
		width: 550,
		subtabs: subtabsGastosEconomica('gastosEconomicaArticulos'),
		subtabsAdditional: subtabsAdditionalGastosEconomica
	},
	gastosEconomicaConceptos: {
		attribute: 'CodEco',
		codField: 'CodCon',
		desField: 'DesCon',
		graphTitle: 'Gastos por concepto',
		headerName: 'Clasificado por concepto',
		isIngresos: false,
		subHeaderName: 'Concepto',
		useStarWitch: true,
		width: 550,
		subtabs: subtabsGastosEconomica('gastosEconomicaConceptos'),
		subtabsAdditional: subtabsAdditionalGastosEconomica
	},
	gastosEconomicaEconomicos: {
		attribute: 'CodEco',
		codField: 'CodEco',
		desField: 'DesEco',
		graphTitle: 'Gastos por económico',
		headerName: 'Clasificado por económico',
		isIngresos: false,
		subHeaderName: 'Económico',
		useStarWitch: true,
		width: 550,
		subtabs: subtabsGastosEconomica('gastosEconomicaEconomicos'),
		subtabsAdditional: subtabsAdditionalGastosEconomica
	},
	aplicacion: {
		attribute: 'CodEco',
		codField: 'CodEco',
		desField: 'DesEco',
		graphTitle: 'Gastos por económico',
		headerName: 'Clasificado por económico',
		isIngresos: false,
		subHeaderName: 'Económico',
		useStarWitch: true,
		width: 550
	}
};

export const getClasificacion = (tipo: CLASIFICATION_TYPE): IClasification => {
	return CLASIFICATION[tipo.toString()];
};
