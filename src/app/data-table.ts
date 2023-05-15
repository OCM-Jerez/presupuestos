import { CLASIFICATION_TYPE } from '@appTypes/clasification.type';
import { IButtonAdicional } from '@interfaces/buttonAdicional.interface';
import { IButtonClasification } from '@interfaces/buttonClasification.interface';
import { IDataProperty } from '@interfaces/dataTable.interface';

export interface IClasification extends Omit<IDataProperty, 'attribute' | 'useStarWitch'> {
  attribute?: string;
  useStarWitch?: boolean;
  buttons?: IButtonClasification[];
  buttonsAdditional?: IButtonAdicional[];
}

const createSubtabs = (clasificationType: CLASIFICATION_TYPE, buttonsData: any[]) => {
  return buttonsData.map((data) => ({
    ...data,
    clasificationType: clasificationType as CLASIFICATION_TYPE
  }));
};

const subtabsIngresos = (clasificationType: CLASIFICATION_TYPE) =>
  createSubtabs(clasificationType, [
    { name: 'Por capítulo ingresos', key: 'Capitulos', codField: 'CodCap', desField: 'DesCap', selected: false },
    { name: 'Por artículo', key: 'Articulos', codField: 'CodArt', desField: 'DesArt', selected: false },
    { name: 'Por concepto', key: 'Conceptos', codField: 'CodCon', desField: 'DesCon', selected: false },
    { name: 'Por económico', key: 'Economicos', codField: 'CodEco', desField: 'DesEco', selected: true }
  ]);

const buttonsAdditionalCommonIngresos = [{ name: 'Gráfico detallado', path: '/graphIngresos' }];

const subtabsGastosProgramas = (clasificationType: CLASIFICATION_TYPE) =>
  createSubtabs(clasificationType, [
    { name: 'Por áreas', key: 'Areas', codField: 'CodAre', desField: 'DesAre', selected: false },
    { name: 'Por política', key: 'Politicas', codField: 'CodPol', desField: 'DesPol', selected: false },
    { name: 'Por grupo programas', key: 'Grupos', codField: 'CodGru', desField: 'DesGru', selected: false },
    { name: 'Por programa', key: 'Programas', codField: 'CodPro', desField: 'DesPro', selected: true }
  ]);

const buttonsAdditionalCommonGastosProgramas = [
  { name: 'Gráfico detallado', path: '/graphGastos' },
  { name: 'Detalle del programa seleccionado', path: '/tableProgramaDetails' }
];

const subtabsGastosEconomica = (clasificationType: CLASIFICATION_TYPE) =>
  createSubtabs(clasificationType, [
    { name: 'Por capítulo gasto', key: 'Capitulos', codField: 'CodCap', desField: 'DesCap', selected: false },
    { name: 'Por artículo', key: 'Articulos', codField: 'CodArt', desField: 'DesArt', selected: false },
    { name: 'Por concepto', key: 'Conceptos', codField: 'CodCon', desField: 'DesCon', selected: false },
    { name: 'Por económico', key: 'Economicos', codField: 'CodEco', desField: 'DesEco', selected: true }
  ]);

const buttonsAdditionalCommonGastosEconomica = [
  { name: 'Gráfico detallado', path: '/graphGastos' },
  {
    name: 'Programas que gastan del elemento seleccionado',
    path: '/tableGrupoProgramaDetails',
    param: 'gastan'
  }
];

const CLASIFICATION: { [key: string]: IClasification } = {
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
    buttons: subtabsIngresos('ingresosEconomicaCapitulos'),
    buttonsAdditional: buttonsAdditionalCommonIngresos
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
    buttons: subtabsIngresos('ingresosEconomicaArticulos'),
    buttonsAdditional: buttonsAdditionalCommonIngresos
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
    buttons: subtabsIngresos('ingresosEconomicaConceptos'),
    buttonsAdditional: buttonsAdditionalCommonIngresos
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
    buttons: subtabsIngresos('ingresosEconomicaEconomicos'),
    buttonsAdditional: buttonsAdditionalCommonIngresos
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
    buttons: [],
    buttonsAdditional: [
      { name: 'Gráfico detallado', path: '/graphGastos' },
      {
        name: 'Programas que componen orgánico seleccionado',
        path: '/tableGrupoProgramaDetails',
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
    buttons: subtabsGastosProgramas('gastosProgramaAreas'),
    buttonsAdditional: buttonsAdditionalCommonGastosProgramas
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
    buttons: subtabsGastosProgramas('gastosProgramaPoliticas'),
    buttonsAdditional: buttonsAdditionalCommonGastosProgramas
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
    buttons: subtabsGastosProgramas('gastosProgramaGrupos'),
    buttonsAdditional: buttonsAdditionalCommonGastosProgramas
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
    buttons: subtabsGastosProgramas('gastosProgramaProgramas'),
    buttonsAdditional: buttonsAdditionalCommonGastosProgramas
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
    buttons: subtabsGastosEconomica('gastosEconomicaCapitulos'),
    buttonsAdditional: buttonsAdditionalCommonGastosEconomica
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
    buttons: subtabsGastosEconomica('gastosEconomicaArticulos'),
    buttonsAdditional: buttonsAdditionalCommonGastosEconomica
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
    buttons: subtabsGastosEconomica('gastosEconomicaConceptos'),
    buttonsAdditional: buttonsAdditionalCommonGastosEconomica
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
    buttons: subtabsGastosEconomica('gastosEconomicaEconomicos'),
    buttonsAdditional: buttonsAdditionalCommonGastosEconomica
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
