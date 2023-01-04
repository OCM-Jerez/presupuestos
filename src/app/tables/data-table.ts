import { IDataProperty } from '../commons/interfaces/dataTable.interface';
import { CLASIFICATION_TYPE } from "../commons/util/util";
import { IButtonClasification } from "./gastos/model/components.interface";
export interface IClasification extends Omit<IDataProperty, | 'attribute' | 'useStarWitch'> {
    attribute?: string,
    useStarWitch?: boolean,
    buttons?: IButtonClasification[],
    buttonsAdditional?: string[],
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
        buttons: [
            // {
            //     name: 'Gráfico arbol',
            //     clasificationType: 'gastosOrganicaOrganicos'
            // },
            // {
            //     name: 'Detalle orgánico',
            //     clasificationType: 'gastosOrganicaOrganicos'
            // }
        ],
        buttonsAdditional: [
            'Gráfico detalladado',
            'Programas que componen orgánico seleccionado'
        ]
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
            // {
            //     name: 'Gráfico arbol',
            //     clasificationType: 'gastosProgramaAreas'
            // },
            {
                name: 'Por áreas',
                clasificationType: 'gastosProgramaAreas'
            },
            {
                name: 'Por política',
                clasificationType: 'gastosProgramaPoliticas'
            },
            {
                name: 'Por grupo programas',
                clasificationType: 'gastosProgramaGrupos'
            },
            {
                name: 'Por programa',
                clasificationType: 'gastosProgramaProgramas'
            }
        ]

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
            // {
            //     name: 'Gráfico arbol',
            //     clasificationType: 'gastosProgramaAreas'
            // },
            {
                name: 'Por áreas',
                clasificationType: 'gastosProgramaAreas'
            },
            {
                name: 'Por política',
                clasificationType: 'gastosProgramaPoliticas'
            },
            {
                name: 'Por grupo programas',
                clasificationType: 'gastosProgramaGrupos'
            },
            {
                name: 'Por programa',
                clasificationType: 'gastosProgramaProgramas'
            }
        ],
        buttonsAdditional: [
            'Gráfico detalladado',
        ]
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
            // {
            //     name: 'Gráfico arbol',
            //     clasificationType: 'gastosProgramaAreas'
            // },
            {
                name: 'Por áreas',
                clasificationType: 'gastosProgramaAreas'
            },
            {
                name: 'Por política',
                clasificationType: 'gastosProgramaPoliticas'
            },
            {
                name: 'Por grupo programas',
                clasificationType: 'gastosProgramaGrupos'
            },
            {
                name: 'Por programa',
                clasificationType: 'gastosProgramaProgramas'
            }
        ]
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
            // {
            //     name: 'Gráfico arbol',
            //     clasificationType: 'gastosProgramaAreas'
            // },
            {
                name: 'Por áreas',
                clasificationType: 'gastosProgramaAreas'
            },
            {
                name: 'Por política',
                clasificationType: 'gastosProgramaPoliticas'
            },
            {
                name: 'Por grupo programas',
                clasificationType: 'gastosProgramaGrupos'
            },
            {
                name: 'Por programa',
                clasificationType: 'gastosProgramaProgramas'
            }
        ],
        buttonsAdditional: [
            'Gráfico detalladado',
            'Detalle del programa seleecionado'
        ]
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
        buttons: [
            // {
            //     name: 'Gráfico arbol',
            //     clasificationType: 'gastosEconomicaCapitulos'
            // },
            {
                name: 'Por capítulo gasto',
                clasificationType: 'gastosEconomicaCapitulos'
            },
            {
                name: 'Por artículo',
                clasificationType: 'gastosEconomicaArticulos'
            },
            {
                name: 'Por concepto',
                clasificationType: 'gastosEconomicaConceptos'
            },
            {
                name: 'Por económico',
                clasificationType: 'gastosEconomicaEconomicos'
            }
        ],
        buttonsAdditional: [
            'Gráfico detalladado',
            'Programas que gastan del elemento seleccionado',]
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
        buttons: [
            // {
            //     name: 'Gráfico arbol',
            //     clasificationType: 'gastosEconomicaCapitulos'
            // },
            {
                name: 'Por capítulo gasto',
                clasificationType: 'gastosEconomicaCapitulos'
            },
            {
                name: 'Por artículo',
                clasificationType: 'gastosEconomicaArticulos'
            },
            {
                name: 'Por concepto',
                clasificationType: 'gastosEconomicaConceptos'
            },
            {
                name: 'Por económico',
                clasificationType: 'gastosEconomicaEconomicos'
            }
        ]

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
            // {
            //     name: 'Gráfico arbol',
            //     clasificationType: 'gastosEconomicaCapitulos'
            // },
            {
                name: 'Por capítulo gasto',
                clasificationType: 'gastosEconomicaCapitulos'
            },
            {
                name: 'Por artículo',
                clasificationType: 'gastosEconomicaArticulos'
            },
            {
                name: 'Por concepto',
                clasificationType: 'gastosEconomicaConceptos'
            },
            {
                name: 'Por económico',
                clasificationType: 'gastosEconomicaEconomicos'
            }
        ]
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
            // {
            //     name: 'Gráfico arbol',
            //     clasificationType: 'gastosEconomicaCapitulos'
            // },
            {
                name: 'Por capítulo gasto',
                clasificationType: 'gastosEconomicaCapitulos'
            },
            {
                name: 'Por artículo',
                clasificationType: 'gastosEconomicaArticulos'
            },
            {
                name: 'Por concepto',
                clasificationType: 'gastosEconomicaConceptos'
            },
            {
                name: 'Por económico',
                clasificationType: 'gastosEconomicaEconomicos'
            }
        ]
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
}

export const getClasificacion = (tipo: CLASIFICATION_TYPE): IClasification => {
    return CLASIFICATION[tipo.toString()];
}