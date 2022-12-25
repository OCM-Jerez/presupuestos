import { IDataProperty } from '../commons/interfaces/dataTable.interface';
import { CLASIFICATION_TYPE } from "../commons/util/util";
import { IButtonClasification } from "./gastos/model/components.interface";
// import { TIPO_CLASIFICACION } from "../commons/enums/tiposClasificacion.enum";
export interface IClasification extends Omit<IDataProperty, 'graphTitle' | 'attribute' | 'useStarWitch'> {
    attribute?: string,
    useStarWitch?: boolean,
    buttons?: IButtonClasification[]
}

const CLASIFICATION: { [key: string]: IClasification } = {
    ingresosEconomicaCapitulos: {
        headerName: 'Clasificado por capítulo',
        subHeaderName: 'Capítulo',
        codField: 'CodCap',
        desField: 'DesCap',
        width: 250,
        attribute: 'CodCap',
        useStarWitch: true,
    },
    ingresosEconomicaArticulos: {
        headerName: 'Clasificado por articulo',
        subHeaderName: 'Articulo',
        codField: 'CodArt',
        desField: 'DesArt',
        width: 550,
        attribute: 'CodEco',
        useStarWitch: true,
    },
    ingresosEconomicaConceptos: {
        headerName: 'Clasificado por concepto',
        subHeaderName: 'Concepto',
        codField: 'CodCon',
        desField: 'DesCon',
        width: 660,
        attribute: 'CodEco',
        useStarWitch: true,
    },
    ingresosEconomicaEconomicos: {
        headerName: 'Clasificado por económico',
        subHeaderName: 'Económico',
        codField: 'CodEco',
        desField: 'DesEco',
        width: 550,
        attribute: 'CodEco',
        useStarWitch: true,
    },
    gastosOrganicaOrganicos: {
        headerName: 'Clasificado por orgánico',
        subHeaderName: 'Orgánico',
        codField: 'CodOrg',
        desField: 'DesOrg',
        width: 250,
        attribute: 'CodPro',
        useStarWitch: false,
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
        headerName: 'Clasificado areas programas de gasto',
        subHeaderName: 'Area de gasto',
        codField: 'CodPro',
        desField: 'DesPro',
        width: 550,
        attribute: 'CodPro',
        useStarWitch: true,
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
        headerName: 'Clasificado políticas gasto',
        subHeaderName: 'Política de gasto',
        codField: 'CodPro',
        desField: 'DesPro',
        width: 550,
        attribute: 'CodPro',
        useStarWitch: true,
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
        headerName: 'Clasificado grupos programas gasto',
        subHeaderName: 'Grupo programas de gasto',
        codField: 'CodPro',
        desField: 'DesPro',
        width: 550,
        attribute: 'CodPro',
        useStarWitch: true,
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
        headerName: 'Clasificado por programa',
        subHeaderName: 'Programa',
        codField: 'CodPro',
        desField: 'DesPro',
        width: 550,
        attribute: 'CodPro',
        useStarWitch: true,
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
        headerName: 'Clasificado por capítulo',
        subHeaderName: 'Capítulo',
        codField: 'CodCap',
        desField: 'DesCap',
        width: 250,
        attribute: 'CodEco',
        useStarWitch: true,
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
        headerName: 'Clasificado por articulo',
        subHeaderName: 'Articulo',
        codField: 'CodEco',
        desField: 'DesEco',
        width: 550,
        attribute: 'CodEco',
        useStarWitch: true,
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
        headerName: 'Clasificado por concepto',
        subHeaderName: 'Concepto',
        codField: 'CodEco',
        desField: 'DesEco',
        width: 550,
        attribute: 'CodEco',
        useStarWitch: true,
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
        headerName: 'Clasificado por económico',
        subHeaderName: 'Económico',
        codField: 'CodEco',
        desField: 'DesEco',
        width: 550,
        attribute: 'CodEco',
        useStarWitch: true,
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
    return CLASIFICATION[tipo.toString()];
}