import { IDataProperty } from '../commons/interfaces/dataTable.interface';
import { CLASIFICATION_TYPE } from '../commons/util/util';
import { IButtonAdicional, IButtonClasification } from './gastos/model/components.interface';
export interface IClasification extends Omit<IDataProperty, 'attribute' | 'useStarWitch'> {
    attribute?: string;
    useStarWitch?: boolean;
    buttons?: IButtonClasification[];
    buttonsAdditional?: IButtonAdicional[];
}

const CLASIFICATION: { [key: string]: IClasification } = {
    ingresosEconomicaCapitulos: {
        attribute: 'CodCap',
        codField: 'CodCap',
        desField: 'DesCap',
        headerName: 'Clasificado por capítulo',
        subHeaderName: 'Capítulo',
        useStarWitch: true,
        width: 250,
        graphTitle: 'Ingresos por capítulo',
        buttons: [
            {
                name: 'Por capítulo',
                key: 'capitulos',
                clasificationType: 'ingresosEconomicaEconomicos',
                selected: false,
                codigo: 'CodCap',
                descripcion: 'DesCap',
            },
            {
                name: 'Por artículo',
                key: 'articulos',
                clasificationType: 'ingresosEconomicaEconomicos',
                selected: false,
                codigo: 'CodArt',
                descripcion: 'DesArt',
            },
            {
                name: 'Por concepto',
                key: 'conceptos',
                clasificationType: 'ingresosEconomicaEconomicos',
                selected: false,
                codigo: 'CodCon',
                descripcion: 'DesCon',
            },
            {
                name: 'Por económico',
                key: 'economicos',
                clasificationType: 'ingresosEconomicaEconomicos',
                selected: true,
                codigo: 'CodEco',
                descripcion: 'DesEco',
            },
        ],
        buttonsAdditional: [{ name: 'Gráfico detallado', path: '/graphIngresos' }],
    },
    ingresosEconomicaArticulos: {
        attribute: 'CodEco',
        codField: 'CodArt',
        desField: 'DesArt',
        headerName: 'Clasificado por articulo',
        subHeaderName: 'Articulo',
        useStarWitch: true,
        width: 550,
        graphTitle: 'Ingresos por artículo',
        buttons: [
            {
                name: 'Por capítulo',
                key: 'capitulos',
                clasificationType: 'ingresosEconomicaEconomicos',
                selected: false,
                codigo: 'CodCap',
                descripcion: 'DesCap',
            },
            {
                name: 'Por artículo',
                key: 'articulos',
                clasificationType: 'ingresosEconomicaEconomicos',
                selected: false,
                codigo: 'CodArt',
                descripcion: 'DesArt',
            },
            {
                name: 'Por concepto',
                key: 'conceptos',
                clasificationType: 'ingresosEconomicaEconomicos',
                selected: false,
                codigo: 'CodCon',
                descripcion: 'DesCon',
            },
            {
                name: 'Por económico',
                key: 'economicos',
                clasificationType: 'ingresosEconomicaEconomicos',
                selected: true,
                codigo: 'CodEco',
                descripcion: 'DesEco',
            },
        ],
        buttonsAdditional: [{ name: 'Gráfico detallado', path: '/graphIngresos' }],
    },
    ingresosEconomicaConceptos: {
        attribute: 'CodEco',
        codField: 'CodCon',
        desField: 'DesCon',
        headerName: 'Clasificado por concepto',
        subHeaderName: 'Concepto',
        useStarWitch: true,
        width: 660,
        graphTitle: 'Ingresos por concepto',
        buttons: [
            {
                name: 'Por capítulo',
                key: 'capitulos',
                clasificationType: 'ingresosEconomicaEconomicos',
                selected: false,
                codigo: 'CodCap',
                descripcion: 'DesCap',
            },
            {
                name: 'Por artículo',
                key: 'articulos',
                clasificationType: 'ingresosEconomicaEconomicos',
                selected: false,
                codigo: 'CodArt',
                descripcion: 'DesArt',
            },
            {
                name: 'Por concepto',
                key: 'conceptos',
                clasificationType: 'ingresosEconomicaEconomicos',
                selected: false,
                codigo: 'CodCon',
                descripcion: 'DesCon',
            },
            {
                name: 'Por económico',
                key: 'economicos',
                clasificationType: 'ingresosEconomicaEconomicos',
                selected: true,
                codigo: 'CodEco',
                descripcion: 'DesEco',
            },
        ],
        buttonsAdditional: [{ name: 'Gráfico detallado', path: '/graphIngresos' }],
    },
    ingresosEconomicaEconomicos: {
        attribute: 'CodEco',
        codField: 'CodEco',
        desField: 'DesEco',
        headerName: 'Clasificado por económico',
        subHeaderName: 'Económico',
        useStarWitch: true,
        width: 550,
        graphTitle: 'Ingresos por económico',
        buttons: [
            {
                name: 'Por capítulo',
                key: 'capitulos',
                clasificationType: 'ingresosEconomicaEconomicos',
                selected: false,
                codigo: 'CodCap',
                descripcion: 'DesCap',
            },
            {
                name: 'Por artículo',
                key: 'articulos',
                clasificationType: 'ingresosEconomicaEconomicos',
                selected: false,
                codigo: 'CodArt',
                descripcion: 'DesArt',
            },
            {
                name: 'Por concepto',
                key: 'conceptos',
                clasificationType: 'ingresosEconomicaEconomicos',
                selected: false,
                codigo: 'CodCon',
                descripcion: 'DesCon',
            },
            {
                name: 'Por económico',
                key: 'economicos',
                clasificationType: 'ingresosEconomicaEconomicos',
                selected: true,
                codigo: 'CodEco',
                descripcion: 'DesEco',
            },
        ],
        buttonsAdditional: [{ name: 'Gráfico detallado', path: '/graphIngresos' }],
    },
    gastosOrganicaOrganicos: {
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
        attribute: 'CodPro',
        codField: 'CodPro',
        desField: 'DesPro',
        headerName: 'Clasificado areas programas de gasto',
        subHeaderName: 'Area de gasto',
        useStarWitch: true,
        width: 550,
        graphTitle: 'Gastos por área de programa',
        buttons: [
            {
                name: 'Por áreas',
                key: 'areas',
                clasificationType: 'gastosProgramaAreas',
                selected: false,
                codigo: 'CodPro',
                descripcion: 'DesPro',
            },
            {
                name: 'Por política',
                key: 'politicas',
                clasificationType: 'gastosProgramaPoliticas',
                selected: false,
                codigo: 'CodPro',
                descripcion: 'DesPro',
            },
            {
                name: 'Por grupo programas',
                key: 'grupos',
                clasificationType: 'gastosProgramaGrupos',
                selected: false,
                codigo: 'CodPro',
                descripcion: 'DesPro',
            },
            {
                name: 'Por programa',
                key: 'programas',
                clasificationType: 'gastosProgramaProgramas',
                selected: true,
                codigo: 'CodPro',
                descripcion: 'DesPro',
            },
        ],
        buttonsAdditional: [
            { name: 'Gráfico detallado', path: '/graphGastos' },
            { name: 'Detalle del programa seleccionado', path: '/tableGrupoProgramaDetails', param: 'gastan' },
        ],
    },
    gastosProgramaPoliticas: {
        attribute: 'CodPro',
        codField: 'CodPro',
        desField: 'DesPro',
        headerName: 'Clasificado políticas gasto',
        subHeaderName: 'Política de gasto',
        useStarWitch: true,
        width: 550,
        graphTitle: 'Gastos por política de gasto',
        buttons: [
            {
                name: 'Por áreas',
                key: 'areas',
                clasificationType: 'gastosProgramaAreas',
                selected: false,
                codigo: 'CodPro',
                descripcion: 'DesPro',
            },
            {
                name: 'Por política',
                key: 'politicas',
                clasificationType: 'gastosProgramaPoliticas',
                selected: false,
                codigo: 'CodPro',
                descripcion: 'DesPro',
            },
            {
                name: 'Por grupo programas',
                key: 'grupos',
                clasificationType: 'gastosProgramaGrupos',
                selected: false,
                codigo: 'CodPro',
                descripcion: 'DesPro',
            },
            {
                name: 'Por programa',
                key: 'programas',
                clasificationType: 'gastosProgramaProgramas',
                selected: true,
                codigo: 'CodPro',
                descripcion: 'DesPro',
            },
        ],
        buttonsAdditional: [
            { name: 'Gráfico detallado', path: '/graphGastos' },
            { name: 'Detalle del programa seleccionado', path: '/tableGrupoProgramaDetails', param: 'gastan' },
        ],
    },
    gastosProgramaGrupos: {
        attribute: 'CodPro',
        codField: 'CodPro',
        desField: 'DesPro',
        headerName: 'Clasificado grupos programas gasto',
        subHeaderName: 'Grupo programas de gasto',
        useStarWitch: true,
        width: 550,
        graphTitle: 'Gastos por grupo de programa',
        buttons: [
            {
                name: 'Por áreas',
                key: 'areas',
                clasificationType: 'gastosProgramaAreas',
                selected: false,
                codigo: 'CodPro',
                descripcion: 'DesPro',
            },
            {
                name: 'Por política',
                key: 'politicas',
                clasificationType: 'gastosProgramaPoliticas',
                selected: false,
                codigo: 'CodPro',
                descripcion: 'DesPro',
            },
            {
                name: 'Por grupo programas',
                key: 'grupos',
                clasificationType: 'gastosProgramaGrupos',
                selected: false,
                codigo: 'CodPro',
                descripcion: 'DesPro',
            },
            {
                name: 'Por programa',
                key: 'programas',
                clasificationType: 'gastosProgramaProgramas',
                selected: true,
                codigo: 'CodPro',
                descripcion: 'DesPro',
            },
        ],
        buttonsAdditional: [
            { name: 'Gráfico detallado', path: '/graphGastos' },
            { name: 'Detalle del programa seleccionado', path: '/tableGrupoProgramaDetails', param: 'gastan' },
        ],
    },
    gastosProgramaProgramas: {
        attribute: 'CodPro',
        codField: 'CodPro',
        desField: 'DesPro',
        headerName: 'Clasificado por programa',
        subHeaderName: 'Programa',
        useStarWitch: true,
        width: 550,
        graphTitle: 'Gastos por programa',
        buttons: [
            {
                name: 'Por áreas',
                key: 'areas',
                clasificationType: 'gastosProgramaAreas',
                selected: false,
                codigo: 'CodPro',
                descripcion: 'DesPro',
            },
            {
                name: 'Por política',
                key: 'politicas',
                clasificationType: 'gastosProgramaPoliticas',
                selected: false,
                codigo: 'CodPro',
                descripcion: 'DesPro',
            },
            {
                name: 'Por grupo programas',
                key: 'grupos',
                clasificationType: 'gastosProgramaGrupos',
                selected: false,
                codigo: 'CodPro',
                descripcion: 'DesPro',
            },
            {
                name: 'Por programa',
                key: 'programas',
                clasificationType: 'gastosProgramaProgramas',
                selected: true,
                codigo: 'CodPro',
                descripcion: 'DesPro',
            },
        ],
        buttonsAdditional: [
            { name: 'Gráfico detallado', path: '/graphGastos' },
            { name: 'Detalle del programa seleccionado', path: '/tableGrupoProgramaDetails', param: 'gastan' },
        ],
    },
    gastosEconomicaCapitulos: {
        attribute: 'CodEco',
        codField: 'CodCap',
        desField: 'DesCap',
        headerName: 'Clasificado por capítulo',
        subHeaderName: 'Capítulo',
        useStarWitch: true,
        width: 250,
        graphTitle: 'Gastos por capítulo',
    },
    gastosEconomicaArticulos: {
        attribute: 'CodEco',
        codField: 'CodEco',
        desField: 'DesEco',
        headerName: 'Clasificado por articulo',
        subHeaderName: 'Articulo',
        useStarWitch: true,
        width: 550,
        graphTitle: 'Gastos por artículo',
    },
    gastosEconomicaConceptos: {
        attribute: 'CodEco',
        codField: 'CodEco',
        desField: 'DesEco',
        headerName: 'Clasificado por concepto',
        subHeaderName: 'Concepto',
        useStarWitch: true,
        width: 550,
        graphTitle: 'Gastos por concepto',
        buttons: [
            {
                name: 'Por capítulo gasto',
                key: 'capitulos',
                clasificationType: 'gastosEconomicaCapitulos',
                selected: false,
            },
            {
                name: 'Por artículo',
                key: 'articulos',
                clasificationType: 'gastosEconomicaArticulos',
                selected: false,
            },
            {
                name: 'Por concepto',
                key: 'conceptos',
                clasificationType: 'gastosEconomicaConceptos',
                selected: false,
            },
            {
                name: 'Por económico',
                key: 'economicos',
                clasificationType: 'gastosEconomicaEconomicos',
                selected: true,
            },
        ],
        buttonsAdditional: [
            { name: 'Gráfico detallado', path: '/graphGastos' },
            {
                name: 'Programas que gastan del elemento seleccionado',
                path: '/tableGrupoProgramaDetails',
                param: 'gastan',
            },
        ],
    },
    gastosEconomicaEconomicos: {
        attribute: 'CodEco',
        codField: 'CodEco',
        desField: 'DesEco',
        headerName: 'Clasificado por económico',
        subHeaderName: 'Económico',
        useStarWitch: true,
        width: 550,
        graphTitle: 'Gastos por económico',
        buttons: [
            {
                name: 'Por capítulo gasto',
                key: 'gastosEconomicaCapitulos',
                clasificationType: 'gastosEconomicaCapitulos',
                selected: false,
                codigo: 'CodCap',
                descripcion: 'DesCap',
            },
            {
                name: 'Por artículo',
                key: 'gastosEconomicaArticulos',
                clasificationType: 'gastosEconomicaArticulos',
                selected: false,
                codigo: 'CodEco',
                descripcion: 'DesEco',
            },
            {
                name: 'Por concepto',
                key: 'gastosEconomicaConceptos',
                clasificationType: 'gastosEconomicaConceptos',
                selected: false,
                codigo: 'CodEco',
                descripcion: 'DesEco',
            },
            {
                name: 'Por económico',
                key: 'gastosEconomicaEconomicos',
                clasificationType: 'gastosEconomicaEconomicos',
                selected: true,
                codigo: 'CodPro',
                descripcion: 'DesPro',
            },
        ],
        buttonsAdditional: [
            { name: 'Gráfico detallado', path: '/graphGastos' },
            {
                name: 'Programas que gastan del elemento seleccionado',
                path: '/tableGrupoProgramaDetails',
                param: 'gastan',
            },
        ],
    },
    aplicacion: {
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
