import { Injectable } from '@angular/core';
import { AvalaibleYearsService } from './avalaibleYears.service';
import { asynForEach } from '../commons/util/util';

import gastosProgramaAreas from '../../assets/data/gastosProgramaAreas.json';
import gastosProgramaPoliticas from '../../assets/data/gastosProgramaPoliticas.json';
import gastosProgramaGrupos from '../../assets/data/gastosProgramaGruposProgramas.json';

import gastosEconomicaArticulos from '../../assets/data/gastosEconomicaArticulos.json';
import gastosEconomicaConceptos from '../../assets/data/gastosEconomicaConceptos.json';

@Injectable({
  providedIn: 'root'
})
export class PrepareDataGastosDetailsService {
  private dataGasto: any = <any>{};

  constructor(
    private _avalaibleYearsService: AvalaibleYearsService,
  ) { }

  // Itera por cada uno de los años disponibles para gastos
  async getDataAllYear(tipoClasificacion: string): Promise<any[]> {
    let rowData = [];
    const years = this._avalaibleYearsService.getYearsSelected();

    await asynForEach(years, async (year: number) => {
      const dataGas = await this.getDataYear(year, tipoClasificacion);
      rowData = rowData.concat(...dataGas);
    });
    return rowData;
  }

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
      // CodArt: `CodArt`,
      // DesArt: `DesArt`,
      Iniciales: `Iniciales${year}`,
      Modificaciones: `Modificaciones${year}`,
      Definitivas: `Definitivas${year}`,
      GastosComprometidos: `GastosComprometidos${year}`,
      ObligacionesReconocidasNetas: `ObligacionesReconocidasNetas${year}`,
      Pagos: `Pagos${year}`,
      ObligacionesPendientePago: `ObligacionesPendientePago${year}`,
      RemanenteCredito: `RemanenteCredito${year}`,
    }

    await this.getYearDataJson(year).then(data => {
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
          // [this.dataGasto.CodArt]: currentValue[1][Math.floor((this.dataGasto.CodEco / 1000))],
          // [this.dataGasto.DesArt]: currentValue[1][gastosEconomicaArticulos.find((articulo) => articulo.codigo === currentValue[1][Math.floor((this.dataGasto.CodEco / 1000))]).descripcion],
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
    })

    switch (tipoClasificacion) {
      case 'gastosProgramaAreas':
        console.log('gastosProgramaAreas');
        result.map(item => {
          item.CodAre = Math.floor((item.CodPro / 10000));
          item.DesAre = gastosProgramaAreas.find((area) => area.codigo === item.CodAre).descripcion;
        });
        break;
      case 'gastosProgramaPoliticas':
        console.log('gastosProgramaPoliticas');
        result.map(item => {
          item.CodPol = Math.floor((item.CodPro / 1000));
          item.DesPol = gastosProgramaPoliticas.find((politica) => politica.codigo === item.CodPol).descripcion;
        });
        break;
      case 'gastosProgramaGrupos':
        console.log('gastosProgramaGrupos');
        result.map(item => {
          item.CodGru = Math.floor((item.CodPro / 100));
          item.DesGru = gastosProgramaGrupos.find((grupo) => grupo.codigo === item.CodGru).descripcion;
        });
        break;

      case 'gastosEconomicaArticulos':
        console.log('gastosEconomicaArticulos');
        result.map(item => {
          item.CodArt = Math.floor((item.CodEco / 1000));
          item.DesArt = gastosEconomicaArticulos.find((articulo) => articulo.codigo === item.CodArt).descripcion;
        });
        break;
      case 'gastosEconomicaConceptos':
        console.log('gastosEconomicaConceptos');
        result.map(item => {
          item.CodCon = Math.floor((item.CodEco / 100));
          item.DesCon = gastosEconomicaConceptos.find((concepto) => concepto.codigo === item.CodCon).descripcion;
        });
        break;
    }

    console.log(result);
    return result;
  }

  // Seleciona datos del año que se pasa como parametro
  async getYearDataJson(year: number) {
    const data = await import(`../../assets/data/${year}LiqGas.json`);
    return data.default;
  }

}
