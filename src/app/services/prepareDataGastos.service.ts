import { Injectable } from '@angular/core';

import gastosEconomicaArticulos from '@assets/data/gastosEconomicaArticulos.json';
import gastosEconomicaConceptos from '@assets/data/gastosEconomicaConceptos.json';
import gastosProgramaAreas from '@assets/data/gastosProgramaAreas.json';
import gastosProgramaGruposProgramas from '@assets/data/gastosProgramaGruposProgramas.json';
import gastosProgramaPoliticas from '@assets/data/gastosProgramaPoliticas.json';

import { AvalaibleYearsService } from '../services/avalaibleYears.service';

import { IDataGasto } from '../commons/interfaces/dataGasto.interface';

import { asynForEach } from '../commons/util/util';

@Injectable({
    providedIn: 'root',
})
export class PrepareDataGastosService {
    private dataGasto: IDataGasto = <IDataGasto>{};

    constructor(private _avalaibleYearsService: AvalaibleYearsService) {}

    // Itera por cada uno de los años disponibles para gastos
    async getDataAllYear(tipoClasificacion?: string): Promise<any[]> {
        // const startTime = performance.now();
        let rowData = [];
        const years = this._avalaibleYearsService.getYearsSelected();

        await asynForEach(years, async (year: number) => {
            const dataGas = await this.getDataYear(year, tipoClasificacion);
            rowData = rowData.concat(...dataGas);
        });
        // const endTime = performance.now();
        // console.log(`Tiempo empleado para generar data: ${Math.round(endTime - startTime)} ms`);
        // console.log(rowData);
        return rowData;
    }

    // Selecciona datos gastos de un año
    async getDataYear(year: number, tipoClasificacion: string) {
        const result = [];
        this.dataGasto = {
            CodPro: `CodPro`,
            DesPro: `DesPro`,
            CodOrg: `CodOrg`,
            DesOrg: `DesOrg`,
            CodCap: `CodCap`,
            DesCap: `DesCap`,
            CodEco: `CodEco`,
            DesEco: `DesEco`,
            Iniciales: `Iniciales${year}`,
            Modificaciones: `Modificaciones${year}`,
            Definitivas: `Definitivas${year}`,
            GastosComprometidos: `GastosComprometidos${year}`,
            ObligacionesReconocidasNetas: `ObligacionesReconocidasNetas${year}`,
            Pagos: `Pagos${year}`,
            ObligacionesPendientePago: `ObligacionesPendientePago${year}`,
            RemanenteCredito: `RemanenteCredito${year}`,
        };

        await this.getYearDataJson(year).then((data) => {
            Object.entries(data).forEach((currentValue) => {
                result.push({
                    [this.dataGasto.CodPro]: currentValue[1][this.dataGasto.CodPro],
                    [this.dataGasto.DesPro]: currentValue[1][this.dataGasto.DesPro],
                    [this.dataGasto.CodOrg]: currentValue[1][this.dataGasto.CodOrg],
                    [this.dataGasto.DesOrg]: currentValue[1][this.dataGasto.DesOrg],
                    [this.dataGasto.CodCap]: currentValue[1][this.dataGasto.CodCap],
                    [this.dataGasto.DesCap]: currentValue[1][this.dataGasto.DesCap],
                    [this.dataGasto.CodEco]: currentValue[1][this.dataGasto.CodEco],
                    [this.dataGasto.DesEco]: currentValue[1][this.dataGasto.DesEco],
                    [this.dataGasto.Iniciales]: currentValue[1]['Iniciales'],
                    [this.dataGasto.Modificaciones]: currentValue[1]['Modificaciones'],
                    [this.dataGasto.Definitivas]: currentValue[1]['Definitivas'],
                    [this.dataGasto.GastosComprometidos]: currentValue[1]['GastosComprometidos'],
                    [this.dataGasto.ObligacionesReconocidasNetas]: currentValue[1]['ObligacionesReconocidasNetas'],
                    [this.dataGasto.Pagos]: currentValue[1]['Pagos'],
                    [this.dataGasto.ObligacionesPendientePago]: currentValue[1]['ObligacionesPendientePago'],
                    [this.dataGasto.RemanenteCredito]: currentValue[1]['RemanenteCredito'],
                });
            });
        });

        if (tipoClasificacion) {
            // console.log(tipoClasificacion);
            switch (tipoClasificacion) {
                case 'gastosProgramaAreas':
                    result.map((item) => {
                        item.CodPro = Math.floor(item.CodPro / 10000);
                        item.DesPro = gastosProgramaAreas.find((area) => area.codigo === item.CodPro).descripcion;
                    });
                    break;
                case 'gastosProgramaPoliticas':
                    result.map((item) => {
                        if (item.CodPro > 0) {
                            item.CodPro = Math.floor(item.CodPro / 1000);
                            item.DesPro = gastosProgramaPoliticas.find(
                                (politica) => politica.codigo === item.CodPro
                            ).descripcion;
                        } else {
                            // console.log(item);
                        }
                    });
                    break;
                case 'gastosProgramaGrupos':
                    result.map((item) => {
                        if (item.CodPro > 0) {
                            item.CodPro = Math.floor(item.CodPro / 100);
                            item.DesPro = gastosProgramaGruposProgramas.find(
                                (grupo) => grupo.codigo === item.CodPro
                            ).descripcion;
                        } else {
                            // console.log(item);
                        }
                    });
                    break;
                case 'gastosEconomicaArticulos':
                    result.map((item) => {
                        if (item.CodEco > 0) {
                            item.CodEco = Math.floor(item.CodEco / 1000);
                            item.DesEco = gastosEconomicaArticulos.find(
                                (articulo) => articulo.codigo === item.CodEco
                            ).descripcion;
                        } else {
                            console.log(item);
                        }
                    });
                    break;
                case 'gastosEconomicaConceptos':
                    result.map((item) => {
                        if (item.CodEco > 0) {
                            item.CodEco = Math.floor(item.CodEco / 100);
                            item.DesEco = gastosEconomicaConceptos.find(
                                (concepto) => concepto.codigo === item.CodEco
                            ).descripcion;
                        } else {
                            console.log(item);
                        }
                    });
                    break;
            }
        }
        return result;
    }

    // Seleciona datos del año que se pasa como parametro
    async getYearDataJson(year: number) {
        const data = await import(`../../assets/data/${year}LiqGas.json`);
        return data.default;
    }
}
