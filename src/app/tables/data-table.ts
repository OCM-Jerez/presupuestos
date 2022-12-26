import { IDataProperty } from '../commons/interfaces/dataTable.interface';
import { CLASIFICATION_TYPE } from "../commons/util/util";
import { IButtonClasification } from "./gastos/model/components.interface";
export interface IClasification extends Omit<IDataProperty, 'graphTitle' | 'attribute' | 'useStarWitch'> {
    attribute?: string,
    useStarWitch?: boolean,
    buttons?: IButtonClasification[]
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
    },
    ingresosEconomicaArticulos: {
        attribute: 'CodEco',
        codField: 'CodArt',
        desField: 'DesArt',
        headerName: 'Clasificado por articulo',
        subHeaderName: 'Articulo',
        useStarWitch: true,
        width: 550,
    },
    ingresosEconomicaConceptos: {
        attribute: 'CodEco',
        codField: 'CodCon',
        desField: 'DesCon',
        headerName: 'Clasificado por concepto',
        subHeaderName: 'Concepto',
        useStarWitch: true,
        width: 660,
    },
    ingresosEconomicaEconomicos: {
        attribute: 'CodEco',
        codField: 'CodEco',
        desField: 'DesEco',
        headerName: 'Clasificado por económico',
        subHeaderName: 'Económico',
        useStarWitch: true,
        width: 550,
    },
    gastosOrganicaOrganicos: {
        attribute: 'CodPro',
        codField: 'CodOrg',
        desField: 'DesOrg',
        headerName: 'Clasificado por orgánico',
        subHeaderName: 'Orgánico',
        useStarWitch: false,
        width: 250,
        buttons: [
            {
                name: 'Gráfico arbol',
                clasificationType: 'gastosOrganicaOrganicos'
            },
            // {
            //     name: 'Detalle orgánico',
            //     clasificationType: 'gastosOrganicaOrganicos'
            // }
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
        buttons: [
            {
                name: 'Gráfico arbol',
                clasificationType: 'gastosProgramaAreas'
            },
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
        buttons: [
            {
                name: 'Gráfico arbol',
                clasificationType: 'gastosProgramaAreas'
            },
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
    gastosProgramaGrupos: {
        attribute: 'CodPro',
        codField: 'CodPro',
        desField: 'DesPro',
        headerName: 'Clasificado grupos programas gasto',
        subHeaderName: 'Grupo programas de gasto',
        useStarWitch: true,
        width: 550,
        buttons: [
            {
                name: 'Gráfico arbol',
                clasificationType: 'gastosProgramaAreas'
            },
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
        buttons: [
            {
                name: 'Gráfico arbol',
                clasificationType: 'gastosProgramaAreas'
            },
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
    gastosEconomicaCapitulos: {
        attribute: 'CodEco',
        codField: 'CodCap',
        desField: 'DesCap',
        headerName: 'Clasificado por capítulo',
        subHeaderName: 'Capítulo',
        useStarWitch: true,
        width: 250,
        buttons: [
            {
                name: 'Gráfico arbol',
                clasificationType: 'gastosEconomicaCapitulos'
            },
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
    gastosEconomicaArticulos: {
        attribute: 'CodEco',
        codField: 'CodEco',
        desField: 'DesEco',
        headerName: 'Clasificado por articulo',
        subHeaderName: 'Articulo',
        useStarWitch: true,
        width: 550,
        buttons: [
            {
                name: 'Gráfico arbol',
                clasificationType: 'gastosEconomicaCapitulos'
            },
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
        buttons: [
            {
                name: 'Gráfico arbol',
                clasificationType: 'gastosEconomicaCapitulos'
            },
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
        buttons: [
            {
                name: 'Gráfico arbol',
                clasificationType: 'gastosEconomicaCapitulos'
            },
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
}

export const getClasificacion = (tipo: CLASIFICATION_TYPE): IClasification => {
    console.log('getClasificacion', CLASIFICATION[tipo.toString()]);

    return CLASIFICATION[tipo.toString()];
}