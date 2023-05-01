import { CLASIFICATION_TYPE } from '@appTypes/clasification.type';
import { IDataProperty } from '@interfaces/dataTable.interface';

import { IButtonAdicional } from '@interfaces/buttonAdicional.interface';
import { IButtonClasification } from '@interfaces/buttonClasification.interface';

export interface IClasification extends Omit<IDataProperty, 'attribute' | 'useStarWitch'> {
    attribute?: string;
    useStarWitch?: boolean;
    buttons?: IButtonClasification[];
    buttonsAdditional?: IButtonAdicional[];
}
const buttonsCommonIngresos = (clasificationType: CLASIFICATION_TYPE) => [
    {
        name: 'Por capítulo',
        key: 'capitulos',
        clasificationType: 'ingresosEconomicaCapitulos' as CLASIFICATION_TYPE,
        selected: clasificationType === 'ingresosEconomicaCapitulos',
        codigo: 'CodCap',
        descripcion: 'DesCap',
    },
    {
        name: 'Por artículo',
        key: 'articulos',
        clasificationType: 'ingresosEconomicaArticulos' as CLASIFICATION_TYPE,
        selected: clasificationType === 'ingresosEconomicaArticulos',
        codigo: 'CodArt',
        descripcion: 'DesArt',
    },
    {
        name: 'Por concepto',
        key: 'conceptos',
        clasificationType: 'ingresosEconomicaConceptos' as CLASIFICATION_TYPE,
        selected: clasificationType === 'ingresosEconomicaConceptos',
        codigo: 'CodCon',
        descripcion: 'DesCon',
    },
    {
        name: 'Por económico',
        key: 'economicos',
        clasificationType: 'ingresosEconomicaEconomicos' as CLASIFICATION_TYPE,
        selected: clasificationType === 'ingresosEconomicaEconomicos',
        codigo: 'CodEco',
        descripcion: 'DesEco',
    },
];

const buttonsAdditionalCommonIngresos = [{ name: 'Gráfico detallado', path: '/graphIngresos' }];

const buttonsCommonGastosProgramas = (clasificationType: CLASIFICATION_TYPE) => [
    {
        name: 'Por áreas',
        key: 'areas',
        clasificationType: 'gastosProgramaAreas' as CLASIFICATION_TYPE,
        selected: false,
        codigo: 'CodPro',
        descripcion: 'DesPro',
    },
    {
        name: 'Por política',
        key: 'politicas',
        clasificationType: 'gastosProgramaPoliticas' as CLASIFICATION_TYPE,
        selected: false,
        codigo: 'CodPro',
        descripcion: 'DesPro',
    },
    {
        name: 'Por grupo programas',
        key: 'grupos',
        clasificationType: 'gastosProgramaGrupos' as CLASIFICATION_TYPE,
        selected: false,
        codigo: 'CodPro',
        descripcion: 'DesPro',
    },
    {
        name: 'Por programa',
        key: 'programas',
        clasificationType: 'gastosProgramaProgramas' as CLASIFICATION_TYPE,
        selected: true,
        codigo: 'CodPro',
        descripcion: 'DesPro',
    },
];

const buttonsAdditionalCommonGastosProgramas = [
    { name: 'Gráfico detallado', path: '/graphGastos' },
    { name: 'Detalle del programa seleccionado', path: '/tableGrupoProgramaDetails', param: 'gastan' },
];

const buttonsCommonGastosEconomica = (clasificationType: CLASIFICATION_TYPE) => [
    {
        name: 'Por capítulo gasto',
        key: 'capitulos',
        clasificationType: 'gastosEconomicaCapitulos' as CLASIFICATION_TYPE,
        selected: false,
    },
    {
        name: 'Por artículo',
        key: 'articulos',
        clasificationType: 'gastosEconomicaArticulos' as CLASIFICATION_TYPE,
        selected: false,
    },
    {
        name: 'Por concepto',
        key: 'conceptos',
        clasificationType: 'gastosEconomicaConceptos' as CLASIFICATION_TYPE,
        selected: false,
    },
    {
        name: 'Por económico',
        key: 'economicos',
        clasificationType: 'gastosEconomicaEconomicos' as CLASIFICATION_TYPE,
        selected: true,
    },
];

const buttonsAdditionalCommonGastosEconomica = [
    { name: 'Gráfico detallado', path: '/graphGastos' },
    {
        name: 'Programas que gastan del elemento seleccionado',
        path: '/tableGrupoProgramaDetails',
        param: 'gastan',
    },
];

const CLASIFICATION: { [key: string]: IClasification } = {
    ingresosEconomicaCapitulos: {
        isIngresos: true,
        attribute: 'CodCap',
        codField: 'CodCap',
        desField: 'DesCap',
        headerName: 'Clasificado por capítulo',
        subHeaderName: 'Capítulo',
        useStarWitch: true,
        width: 250,
        graphTitle: 'Ingresos por capítulo',
        buttons: buttonsCommonIngresos('ingresosEconomicaCapitulos'),
        buttonsAdditional: buttonsAdditionalCommonIngresos,
    },
    ingresosEconomicaArticulos: {
        isIngresos: true,
        attribute: 'CodEco',
        codField: 'CodArt',
        desField: 'DesArt',
        headerName: 'Clasificado por articulo',
        subHeaderName: 'Articulo',
        useStarWitch: true,
        width: 550,
        graphTitle: 'Ingresos por artículo',
        buttons: buttonsCommonIngresos('ingresosEconomicaArticulos'),
        buttonsAdditional: buttonsAdditionalCommonIngresos,
    },
    ingresosEconomicaConceptos: {
        isIngresos: true,
        attribute: 'CodEco',
        codField: 'CodCon',
        desField: 'DesCon',
        headerName: 'Clasificado por concepto',
        subHeaderName: 'Concepto',
        useStarWitch: true,
        width: 660,
        graphTitle: 'Ingresos por concepto',
        buttons: buttonsCommonIngresos('ingresosEconomicaConceptos'),
        buttonsAdditional: buttonsAdditionalCommonIngresos,
    },
    ingresosEconomicaEconomicos: {
        isIngresos: true,
        attribute: 'CodEco',
        codField: 'CodEco',
        desField: 'DesEco',
        headerName: 'Clasificado por económico',
        subHeaderName: 'Económico',
        useStarWitch: true,
        width: 550,
        graphTitle: 'Ingresos por económico',
        buttons: buttonsCommonIngresos('ingresosEconomicaEconomicos'),
        buttonsAdditional: buttonsAdditionalCommonIngresos,
    },
    gastosOrganicaOrganicos: {
        isIngresos: false,
        attribute: 'CodPro',
        codField: 'CodOrg',
        desField: 'DesOrg',
        headerName: 'Clasificado por orgánico',
        subHeaderName: 'Orgánico',
        useStarWitch: false,
        width: 250,
        graphTitle: 'Gastos por orgánico',
        buttons: [],
        buttonsAdditional: [
            { name: 'Gráfico detallado', path: '/graphGastos' },
            {
                name: 'Programas que componen orgánico seleccionado',
                path: '/tableGrupoProgramaDetails',
                param: 'organico',
            },
        ],
    },
    gastosProgramaAreas: {
        isIngresos: false,
        attribute: 'CodPro',
        codField: 'CodPro',
        desField: 'DesPro',
        headerName: 'Clasificado areas programas de gasto',
        subHeaderName: 'Area de gasto',
        useStarWitch: true,
        width: 550,
        graphTitle: 'Gastos por área de programa',
        buttons: buttonsCommonGastosProgramas('gastosProgramaAreas'),
        buttonsAdditional: buttonsAdditionalCommonGastosProgramas,
    },
    gastosProgramaPoliticas: {
        isIngresos: false,
        attribute: 'CodPro',
        codField: 'CodPro',
        desField: 'DesPro',
        headerName: 'Clasificado políticas gasto',
        subHeaderName: 'Política de gasto',
        useStarWitch: true,
        width: 550,
        graphTitle: 'Gastos por política de gasto',
        buttons: buttonsCommonGastosProgramas('gastosProgramaPoliticas'),
        buttonsAdditional: buttonsAdditionalCommonGastosProgramas,
    },
    gastosProgramaGrupos: {
        isIngresos: false,
        attribute: 'CodPro',
        codField: 'CodPro',
        desField: 'DesPro',
        headerName: 'Clasificado grupos programas gasto',
        subHeaderName: 'Grupo programas de gasto',
        useStarWitch: true,
        width: 550,
        graphTitle: 'Gastos por grupo de programa',
        buttons: buttonsCommonGastosProgramas('gastosProgramaGrupos'),
        buttonsAdditional: buttonsAdditionalCommonGastosProgramas,
    },
    gastosProgramaProgramas: {
        isIngresos: false,
        attribute: 'CodPro',
        codField: 'CodPro',
        desField: 'DesPro',
        headerName: 'Clasificado por programa',
        subHeaderName: 'Programa',
        useStarWitch: true,
        width: 550,
        graphTitle: 'Gastos por programa',
        buttons: buttonsCommonGastosProgramas('gastosProgramaProgramas'),
        buttonsAdditional: buttonsAdditionalCommonGastosProgramas,
    },
    gastosEconomicaCapitulos: {
        isIngresos: false,
        attribute: 'CodEco',
        codField: 'CodCap',
        desField: 'DesCap',
        headerName: 'Clasificado por capítulo',
        subHeaderName: 'Capítulo',
        useStarWitch: true,
        width: 250,
        graphTitle: 'Gastos por capítulo',
        buttons: buttonsCommonGastosEconomica('gastosEconomicaCapitulos'),
        buttonsAdditional: buttonsAdditionalCommonGastosEconomica,
    },
    gastosEconomicaArticulos: {
        isIngresos: false,
        attribute: 'CodEco',
        codField: 'CodEco',
        desField: 'DesEco',
        headerName: 'Clasificado por articulo',
        subHeaderName: 'Articulo',
        useStarWitch: true,
        width: 550,
        graphTitle: 'Gastos por artículo',
        buttons: buttonsCommonGastosEconomica('gastosEconomicaArticulos'),
        buttonsAdditional: buttonsAdditionalCommonGastosEconomica,
    },
    gastosEconomicaConceptos: {
        isIngresos: false,
        attribute: 'CodEco',
        codField: 'CodEco',
        desField: 'DesEco',
        headerName: 'Clasificado por concepto',
        subHeaderName: 'Concepto',
        useStarWitch: true,
        width: 550,
        graphTitle: 'Gastos por concepto',
        buttons: buttonsCommonGastosEconomica('gastosEconomicaConceptos'),
        buttonsAdditional: buttonsAdditionalCommonGastosEconomica,
    },
    gastosEconomicaEconomicos: {
        isIngresos: false,
        attribute: 'CodEco',
        codField: 'CodEco',
        desField: 'DesEco',
        headerName: 'Clasificado por económico',
        subHeaderName: 'Económico',
        useStarWitch: true,
        width: 550,
        graphTitle: 'Gastos por económico',
        buttons: buttonsCommonGastosEconomica('gastosEconomicaEconomicos'),
        buttonsAdditional: buttonsAdditionalCommonGastosEconomica,
    },
    aplicacion: {
        isIngresos: false,
        attribute: 'CodEco',
        codField: 'CodEco',
        desField: 'DesEco',
        headerName: 'Clasificado por económico',
        subHeaderName: 'Económico',
        useStarWitch: true,
        width: 550,
        graphTitle: 'Gastos por económico',
    },
};

export const getClasificacion = (tipo: CLASIFICATION_TYPE): IClasification => {
    return CLASIFICATION[tipo.toString()];
};
