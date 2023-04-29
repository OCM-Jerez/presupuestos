import { Injectable } from '@angular/core';

import ingresosEconomicaArticulos from '@assets/data/ingresosEconomicaArticulos.json';
import ingresosEconomicaCapitulos from '@assets/data/ingresosEconomicaCapitulos.json';
import ingresosEconomicaConceptos from '@assets/data/ingresosEconomicaConceptos.json';
import ingresosEconomicaEconomicos from '@assets/data/ingresosEconomicaEconomicos.json';

import { IDataIngreso } from '@interfaces/dataIngreso.interface';
import { AvalaibleYearsService } from '@services/avalaibleYears.service';
import { asynForEach } from '../commons/util/util';

@Injectable({
    providedIn: 'root',
})
export class PrepareDataIngresosService {
    private dataIngreso: IDataIngreso = <IDataIngreso>{};

    constructor(private _avalaibleYearsService: AvalaibleYearsService) {}

    // Itera por cada uno de los años disponibles para ingresos
    async getDataAllYear(tipoClasificacion: string): Promise<any[]> {
        let rowData = [];
        let years = this._avalaibleYearsService.getYearsSelected();

        await asynForEach(years, async (year: number) => {
            const dataIng = await this.getDataYear(year, tipoClasificacion);
            rowData = rowData.concat(...dataIng);
        });
        return rowData;
    }

    // Selecciona datos ingresos de un año
    async getDataYear(year: number, tipoClasificacion: string) {
        const result = [];
        this.dataIngreso = {
            CodEco: `CodEco`,
            Iniciales: `Iniciales${year}`,
            Modificaciones: `Modificaciones${year}`,
            Definitivas: `Definitivas${year}`,
            DerechosReconocidos: `DerechosReconocidos${year}`,
            DerechosAnulados: `DerechosAnulados${year}`,
            DerechosCancelados: `DerechosCancelados${year}`,
            DerechosReconocidosNetos: `DerechosReconocidosNetos${year}`,
            RecaudacionNeta: `RecaudacionNeta${year}`,
            DerechosPendienteCobro: `DerechosPendienteCobro${year}`,
            DiferenciaPrevision: `DiferenciaPrevision${year}`,
        };

        await this.getYearDataJson(year).then((data) => {
            Object.entries(data).forEach((currentValue) => {
                result.push({
                    [this.dataIngreso.CodEco]: currentValue[1][this.dataIngreso.CodEco],
                    [this.dataIngreso.Iniciales]: currentValue[1]['Iniciales'],
                    [this.dataIngreso.Modificaciones]: currentValue[1]['Modificaciones'],
                    [this.dataIngreso.Definitivas]: currentValue[1]['Definitivas'],
                    [this.dataIngreso.DerechosReconocidos]: currentValue[1]['DerechosReconocidos'],
                    [this.dataIngreso.DerechosAnulados]: currentValue[1]['DerechosAnulados'],
                    [this.dataIngreso.DerechosCancelados]: currentValue[1]['DerechosCancelados'],
                    [this.dataIngreso.DerechosReconocidosNetos]: currentValue[1]['DerechosReconocidosNetos'],
                    [this.dataIngreso.RecaudacionNeta]: currentValue[1]['RecaudacionNeta'],
                    [this.dataIngreso.DerechosPendienteCobro]: currentValue[1]['DerechosPendienteCobro'],
                    [this.dataIngreso.DiferenciaPrevision]: currentValue[1]['DiferenciaPrevision'],
                });
            });
        });

        // No puedo utilizarlo aqui porque en Indice envio los datos despues de llamar a esta function.
        // this._dataTableGraph = this._dataTableGraphService.getDataTable;
        // console.log(this._dataTableGraph.dataPropertyTable.sufijo);

        // Tengo que revisar si es mejor opcion tener un JSON con todos los datos en lugar de uno para cada clasificación.
        // result.map(item => {
        //   item.CodCap = Math.floor((item.CodEco / 10000));
        //   item.DesCap = ingresosEconomicaCapitulos.find((capitulo) => capitulo.codigo === item.CodCap).descripcion;
        //   item.CodArt = Math.floor((item.CodEco / 1000));
        //   item.DesArt = ingresosEconomicaArticulos.find((articulo) => articulo.codigo === item.CodArt).descripcion;
        //   item.CodCon = Math.floor((item.CodEco / 100));
        //   item.DesCon = ingresosEconomicaConceptos.find((concepto) => concepto.codigo === item.CodCon).descripcion;
        //   item.DesEco = ingresosEconomicaEconomicos.find((economico) => economico.codigo === item.CodEco).descripcion;
        // });
        // return result;

        switch (tipoClasificacion) {
            case 'ingresosEconomicaCapitulos':
                result.map((item) => {
                    item.CodCap = Math.floor(item.CodEco / 10000);
                    item.DesCap = ingresosEconomicaCapitulos.find(
                        (capitulo) => capitulo.codigo === item.CodCap
                    ).descripcion;
                });
                break;
            case 'ingresosEconomicaArticulos':
                result.map((item) => {
                    item.CodArt = Math.floor(item.CodEco / 1000);
                    item.DesArt = ingresosEconomicaArticulos.find(
                        (articulo) => articulo.codigo === item.CodArt
                    ).descripcion;
                    // item.CodEco;
                    // item.DesEco = ingresosEconomicaEconomicos.find((articulo) => articulo.codigo === item.CodEco).descripcion;
                });
                break;
            case 'ingresosEconomicaConceptos':
                result.map((item) => {
                    item.CodCon = Math.floor(item.CodEco / 100);
                    item.DesCon = ingresosEconomicaConceptos.find(
                        (concepto) => concepto.codigo === item.CodCon
                    ).descripcion;
                    // item.CodEco = Math.floor((item.CodEco / 100));
                    // item.DesEco = ingresosEconomicaConceptos.find((concepto) => concepto.codigo === item.CodEco).descripcion;
                });
                break;
            case 'ingresosEconomicaEconomicos':
                result.map((item) => {
                    // console.log(item.CodEco);
                    item.CodCap = Math.floor(item.CodEco / 10000);
                    item.DesCap = ingresosEconomicaCapitulos.find(
                        (capitulo) => capitulo.codigo === item.CodCap
                    ).descripcion;
                    item.DesEco = ingresosEconomicaEconomicos.find(
                        (economico) => economico.codigo === item.CodEco
                    ).descripcion;
                });
                break;
        }
        // console.log(result);
        return result;
    }

    // Selecciona datos del año que se pasa como parametro
    async getYearDataJson(year: number) {
        const data = await import(`../../assets/data/${year}LiqIng.json`);
        return data.default;
    }
}
