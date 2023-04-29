import { IDataProperty } from '@interfaces/dataTable.interface';

const CLASIFICATION_GRAPH = {
    ingresosEconomicaCapitulos: {
        graphTitle: 'Ingresos por capítulo',
    },
    ingresosEconomicaArticulos: {
        graphTitle: 'Ingresos por artículo',
    },
    ingresosEconomicaConceptos: {
        graphTitle: 'Ingresos por concepto',
    },
    ingresosEconomicaEconomicos: {
        graphTitle: 'Ingresos por económico',
    },
    gastosOrganicaOrganicos: {
        graphTitle: 'Gastos por orgánico',
    },
    gastosProgramaAreas: {
        graphTitle: 'Gastos por área de programa',
    },
    gastosProgramaPoliticas: {
        graphTitle: 'Gastos por política de gasto',
    },
    gastosProgramaGrupos: {
        graphTitle: 'Gastos por grupo de programa',
    },
    gastosProgramaProgramas: {
        graphTitle: 'Gastos por programa',
    },
    gastosEconomicaCapitulos: {
        graphTitle: 'Gastos por capítulo',
    },
    gastosEconomicaArticulos: {
        graphTitle: 'Gastos por artículo',
    },
    gastosEconomicaConceptos: {
        graphTitle: 'Gastos por concepto',
    },
    gastosEconomicaEconomicos: {
        graphTitle: 'Gastos por económico',
    },
};

export const getClasificacionGraph = (tipo: string): IDataProperty => {
    return CLASIFICATION_GRAPH[tipo];
};
