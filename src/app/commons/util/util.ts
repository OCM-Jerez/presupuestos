import { IYears } from "../interfaces/components.interface"

export const initYears = (): IYears => {
    return { 2015: 0, 2016: 0, 2017: 0, 2018: 0, 2019: 0, 2020: 0, 2021: 0, 2022: 0, }
}

// groupBy javascript
export const accumulate = (identity: string, datos: any[], years = initYears()): IYears => {
    Object.keys(years).forEach((key) => {
        const sum = datos.filter((item) => item[identity + key]).reduce((prev, current) => prev + current[identity + key], 0);
        years[key] = sum;
    })
    return years;
}

export async function asynForEach(array: Array<number>, callback: Function) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

export type CLASIFICATION_TYPE = 'ingresosEconomicaCapitulos' | 'ingresosEconomicaArticulos' | 'ingresosEconomicaConceptos' | 'ingresosEconomicaEconomicos' | 'gastosOrganicaOrganicos' | 'gastosProgramaAreas' | 'gastosProgramaPoliticas' | 'gastosProgramaGrupos' | 'gastosProgramaProgramas' | 'gastosEconomicaCapitulos' | 'gastosEconomicaArticulos' | 'gastosEconomicaConceptos' | 'gastosEconomicaEconomicos';