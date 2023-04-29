import { Injectable } from '@angular/core';

import { AvalaibleYearsService } from './avalaibleYears.service';

import { IDataGasto } from '@interfaces/dataGasto.interface';

import { asynForEach } from '@utils/util';
@Injectable({
    providedIn: 'root',
})
export class PrepareDataProgramaDetailsService {
    private dataGasto: IDataGasto = <IDataGasto>{};

    constructor(private _avalaibleYearsService: AvalaibleYearsService) {}

    // Itera por cada uno de los años disponibles para gastos
    async getDataAllYear(): Promise<any[]> {
        let rowData = [];
        const years = this._avalaibleYearsService.getYearsSelected();

        await asynForEach(years, async (year: number) => {
            const dataGas = await this.getDataYear(year);
            rowData = rowData.concat(...dataGas);
        });
        return rowData;
    }

    async getDataYear(year: number) {
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

        return result;
    }

    async getYearDataJson(year: number) {
        const data = await import(`../../assets/data/${year}LiqGas.json`);
        return data.default;
    }
}
