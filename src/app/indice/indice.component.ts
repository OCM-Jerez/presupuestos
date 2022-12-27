import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// import { TableService } from '../services/table.service';

import { CLASIFICATION_TYPE } from '../commons/util/util';
import { environment } from '../../environments/environment';

import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSankey from 'highcharts/modules/sankey';

import { IDataTable } from '../commons/interfaces/dataTable.interface';
import { DataStoreService } from '../services/dataStore.service';
// import { IDataTotalesPresupuesto } from '../commons/interfaces/dataTotalesPresupuesto. interface';

HighchartsMore(Highcharts);
HighchartsSankey(Highcharts);

@Component({
  selector: 'app-indice-new',
  templateUrl: './indice.component.html',
  styleUrls: ['./indice.component.scss']
})
export class IndiceComponent implements OnInit {
  public liqDate = environment.liqDate;
  public totalPresupuestoIngresos: number;
  public totalPresupuestoGastos: number;
  public totalEjecutadoIngresos: number;
  public totalEjecutadoGastos: number;
  public noFinancieroIngresos: number;
  public noFinancieroGastos: number;
  public corrientesIngresos: any;
  public corrientesGastos: any;
  public capitalIngresos: number;
  public capitalGastos: number;
  public financierosIngresos: any;
  public financierosGastos: any;
  public ahorroBruto: string;
  public ahorroNeto: string;
  public capacidadFinanciacion: any;
  // private _dataGrap: [{ name: string, va: number }] = [{ name: "", value: 0 }]
  private _dataTable: IDataTable;
  private _dataIngreso: any;
  private _dataGasto: any;
  // private _typeClasification: CLASIFICATION_TYPE = 'ingresosEconomicaCapitulos'
  // https://stackoverflow.com/questions/69549927/how-to-pass-enum-value-in-angular-template-as-an-input

  constructor(
    private _dataStoreService: DataStoreService,
    private _router: Router,
    // private _tableService: TableService,
  ) { }

  ngOnInit(): void {
    this._loadData();
  }

  /* #region  Esto es para el menu original */
  async openTable(tipoClasificacion: CLASIFICATION_TYPE): Promise<void> {
    // await this._tableService.loadData(tipoClasificacion);

    if (tipoClasificacion.startsWith('ingresos')) {
      this._router.navigateByUrl('/tableIngresos')
    } else {
      this._router.navigateByUrl('/tableGastos')
    }
  }

  async newGastos(tipoClasificacion: CLASIFICATION_TYPE) {
    // await this._tableService.loadData(tipoClasificacion);
    this._router.navigateByUrl('/newGastos')
  }
  /* #endregion */

  private async _loadData(): Promise<void> {
    /* #region  Capitulos de ingresos */
    // this._dataTable = await this._tableService.loadData('ingresosEconomicaCapitulos');
    // this._dataIngreso = this._dataTable.rowDataIngresos;
    this._dataIngreso = this._dataStoreService.getDataTable.rowDataIngresos;

    // Creo array de Capitulos de ingresos.
    // let capitulos = []
    // data.map(item => {
    //   const value = {
    //     "name": item.CodCap + '-' + item.DesCap,
    //     "value": item.Definitivas2022,
    //     "recaudado": item.DerechosReconocidosNetos2022,
    //     "colorValue": (item.Definitivas2022 / 100)
    //   }
    //   capitulos.push(value)
    // });
    // console.log(capitulos);

    // alternativa chatGPT
    let capitulos = []
    for (const item of this._dataIngreso) {
      const value = {
        name: `${item.CodCap}-${item.DesCap}`,
        value: item.Definitivas2022,
        recaudado: item.DerechosReconocidosNetos2022
      };
      capitulos.push(value);
    }

    // Totalizo por capitulo de ingreso
    this._dataIngreso = capitulos.reduce((acc, curr) => {
      const index = acc.findIndex(item => item.name === curr.name)
      index > -1 ? (acc[index].value += curr.value, acc[index].recaudado += curr.recaudado) : acc.push({
        name: curr.name,
        value: curr.value,
        recaudado: curr.recaudado
      })
      return acc
    }, [])

    this.noFinancieroIngresos = (
      this._dataIngreso[0].value +
      this._dataIngreso[1].value +
      this._dataIngreso[2].value +
      this._dataIngreso[3].value +
      this._dataIngreso[4].value +
      this._dataIngreso[5].value +
      this._dataIngreso[6].value
    ).toLocaleString();

    this.corrientesIngresos = (
      this._dataIngreso[0].value +
      this._dataIngreso[1].value +
      this._dataIngreso[2].value +
      this._dataIngreso[3].value +
      this._dataIngreso[4].value
    );

    this.capitalIngresos = (
      this._dataIngreso[5].value +
      this._dataIngreso[6].value
    ).toLocaleString();

    this.financierosIngresos = (
      this._dataIngreso[7].value +
      this._dataIngreso[8].value
    );
    /* #endregion */

    /* #region  Total general ingresos para datos tabla */
    const totalPresupuestoIngresos = this._dataIngreso.reduce((acc, curr) => {
      Object.keys(curr).forEach((key, index) => {
        if (!acc[key]) {
          acc[key] = 0
        }
        acc[key] += curr[key]
      })
      return acc
    }, {})

    this.totalPresupuestoIngresos = totalPresupuestoIngresos.value.toLocaleString();
    this.totalEjecutadoIngresos = totalPresupuestoIngresos.recaudado.toLocaleString();
    /* #endregion */

    /* #region politicas de gasto  */
    // this._dataTable = await this._tableService.loadData('gastosProgramaPoliticas');
    // this._dataGasto = this._dataTable.rowDataGastos;
    this._dataGasto = this._dataStoreService.getDataTable.rowDataGastos;

    let politicas = []
    for (const item of this._dataGasto) {
      const value = {
        name: `${item.CodPro}-${item.DesPro}`,
        value: item.Definitivas2022,
        recaudado: item.Pagos2022
      };
      politicas.push(value);
    }

    // Totalizo por politicas de gasto
    this._dataGasto = politicas.reduce((acc, curr) => {
      const index = acc.findIndex(item => item.name === curr.name)
      index > -1 ? (acc[index].value += curr.value, acc[index].recaudado += curr.recaudado) : acc.push({
        name: curr.name,
        value: curr.value,
        recaudado: curr.recaudado
      })
      return acc
    }, [])
    /* #endregion */

    /* #region  gastosEconomicaCapitulos */
    // Creo array de capitulos de gasto
    let capitulosGastos = [];
    for (const item of this._dataGasto) {
      const value = {
        name: `${item.CodCap}-${item.DesCap}`,
        value: item.Definitivas2022
      };
      capitulosGastos.push(value);
    }

    // Totalizo por capitulo
    capitulosGastos = this._dataGasto.reduce((acc, curr) => {
      const index = acc.findIndex(item => item.name === curr.name)
      index > -1 ? (acc[index].value += curr.value) : acc.push({
        name: curr.name,
        value: curr.value,
      })
      return acc
    }, [])
    // console.log(capitulosGastos);
    /* #endregion */

    /* #region  Total general gastos para datos tabla */
    const totalPresupuestoGastos = this._dataGasto.reduce((acc, curr) => {
      Object.keys(curr).forEach((key, index) => {
        if (!acc[key]) {
          acc[key] = 0
        }
        acc[key] += curr[key]
      })
      return acc
    }, {})
    /* #endregion */

    /* #region  Calculos valores para mostrar en tabla */
    this.noFinancieroGastos = (
      this._dataGasto[0].value +
      this._dataGasto[1].value +
      this._dataGasto[2].value +
      this._dataGasto[3].value +
      this._dataGasto[4].value +
      this._dataGasto[5].value +
      this._dataGasto[6].value
    ).toLocaleString();

    this.corrientesGastos = (
      this._dataGasto[0].value +
      this._dataGasto[1].value +
      this._dataGasto[2].value +
      this._dataGasto[3].value +
      this._dataGasto[4].value
    );

    this.capitalGastos = (
      this._dataGasto[5].value +
      this._dataGasto[6].value
    ).toLocaleString();

    this.financierosGastos = (
      this._dataGasto[7].value +
      this._dataGasto[8].value
    );

    this.totalPresupuestoGastos = totalPresupuestoGastos.value.toLocaleString();
    this.totalEjecutadoGastos = totalPresupuestoGastos.recaudado.toLocaleString();

    this.ahorroBruto = (this.corrientesIngresos - this.corrientesGastos).toLocaleString();

    // Tengo que sumar capitulo 9 de gastos
    this.ahorroNeto = ((this.corrientesIngresos - this.corrientesGastos) - capitulosGastos[7].value).toLocaleString();
    this.corrientesIngresos = this.corrientesIngresos.toLocaleString();
    this.corrientesGastos = this.corrientesGastos.toLocaleString();
    this.capacidadFinanciacion = (this.financierosIngresos - this.financierosGastos).toLocaleString();
    this.financierosIngresos = this.financierosIngresos.toLocaleString();
    this.financierosGastos = this.financierosGastos.toLocaleString();
    /* #endregion */

    this.showGraph()
  }

  showGraph() {
    // Gráfico ingresos
    Highcharts.chart("sankey", {
      accessibility: {
        enabled: false
      },
      title: {
        text: "<span style= 'font-size: 32px'>Ingresos</span>"
      },
      subtitle: {
        text:
          ""
      },
      tooltip: {
        headerFormat: null,
        pointFormat:
          "{point.fromNode.name} \u2192 {point.toNode.name}: {point.weight} ",
        nodeFormat: "{point.name}: {point.sum} "
      },
      series: [
        {
          borderColor: "#1a1a1a",
          borderWidth: 1,
          colors: [
            "#1E90FF",
            "#1eff8d",
            "#ce9eff",
            "#1eff8d",
            "#1eff8d",
            "#1eff8d",
            "#1eff8d",
            "#ce9eff",
            "#ce9eff",
            "#ce9eff",
            "#ce9eff"
          ],
          keys: ["from", "to", "weight"],
          data: [
            [this._dataIngreso[0].name, "Presupuesto", this._dataIngreso[0].value],
            [this._dataIngreso[1].name, "Presupuesto", this._dataIngreso[1].value],
            [this._dataIngreso[2].name, "Presupuesto", this._dataIngreso[2].value],
            [this._dataIngreso[3].name, "Presupuesto", this._dataIngreso[3].value],
            [this._dataIngreso[4].name, "Presupuesto", this._dataIngreso[4].value],
            [this._dataIngreso[5].name, "Presupuesto", this._dataIngreso[5].value],
            [this._dataIngreso[6].name, "Presupuesto", this._dataIngreso[6].value],
            [this._dataIngreso[7].name, "Presupuesto", this._dataIngreso[7].value],
            [this._dataIngreso[8].name, "Presupuesto", this._dataIngreso[8].value]
          ],
          type: "sankey",
          name: "Ingresos",
          dataLabels: {
            style: {
              color: "#1a1a1a",
              textOutline: false
            }
          }
        }
      ]
    } as any);

    // Gráfico gastos
    Highcharts.chart("sankey1", {
      accessibility: {
        enabled: false
      },
      title: {
        text: "<span style= 'font-size: 32px'>Gastos</span>"
      },
      subtitle: {
        text:
          // "Source: <a href='https://finance.yahoo.com/quote/AAPL/balance-sheet/'> Yahoo Finance</a>"
          ""
      },
      tooltip: {
        headerFormat: null,
        pointFormat:
          "{point.fromNode.name} \u2192 {point.toNode.name}: {point.weight}",
        nodeFormat: "{point.name}: {point.sum}"
      },
      series: [
        {
          borderColor: "#1a1a1a",
          borderWidth: 1,
          colors: [
            "#1E90FF",
            "#1eff8d",
            "#ce9eff",
            "#1eff8d",
            "#1eff8d",
            "#1eff8d",
            "#1eff8d",
            "#ce9eff",
            "#ce9eff",
            "#ce9eff",
            "#ce9eff"
          ],
          keys: ["from", "to", "weight"],
          data: [
            ["Presupuesto", this._dataGasto[0].name, this._dataGasto[0].value],
            ["Presupuesto", this._dataGasto[1].name, this._dataGasto[1].value],
            ["Presupuesto", this._dataGasto[2].name, this._dataGasto[2].value],
            ["Presupuesto", this._dataGasto[3].name, this._dataGasto[3].value],
            ["Presupuesto", this._dataGasto[4].name, this._dataGasto[4].value],
            ["Presupuesto", this._dataGasto[5].name, this._dataGasto[5].value],
            ["Presupuesto", this._dataGasto[6].name, this._dataGasto[6].value],
            ["Presupuesto", this._dataGasto[7].name, this._dataGasto[7].value],
            ["Presupuesto", this._dataGasto[8].name, this._dataGasto[8].value],
            ["Presupuesto", this._dataGasto[9].name, this._dataGasto[9].value],
            ["Presupuesto", this._dataGasto[10].name, this._dataGasto[10].value],
            ["Presupuesto", this._dataGasto[11].name, this._dataGasto[11].value],
            ["Presupuesto", this._dataGasto[12].name, this._dataGasto[12].value],
            ["Presupuesto", this._dataGasto[13].name, this._dataGasto[13].value],
            ["Presupuesto", this._dataGasto[14].name, this._dataGasto[14].value],
            ["Presupuesto", this._dataGasto[15].name, this._dataGasto[15].value],
            ["Presupuesto", this._dataGasto[16].name, this._dataGasto[16].value],
            ["Presupuesto", this._dataGasto[17].name, this._dataGasto[17].value],
            ["Presupuesto", this._dataGasto[18].name, this._dataGasto[18].value],
            ["Presupuesto", this._dataGasto[19].name, this._dataGasto[19].value]
          ],
          type: "sankey",
          name: "",
          dataLabels: {
            style: {
              color: "#1a1a1a",
              textOutline: false
            }
          }
        }
      ]
    } as any);
  }

}