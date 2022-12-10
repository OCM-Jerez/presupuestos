import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TableService } from '../services/table.service';

import { CLASIFICATION_TYPE } from '../commons/util/util';
import { environment } from '../../environments/environment';

import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSankey from 'highcharts/modules/sankey';

import { IDataTable } from '../commons/interfaces/dataTable.interface';
import { DataStoreService } from '../services/dataStore.service';
import { PrepareDataCapituloDetails } from '../services/prepareDataCapituloDetails.service';
import { IDataTotalesPresupuesto } from '../commons/interfaces/dataTotalesPresupuesto. interface';

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
  private _dataGraphIngresos: any;
  private _dataGraphGastos: any;

  private _dataTable: IDataTable;
  // private _typeClasification: CLASIFICATION_TYPE = 'ingresosEconomicaCapitulos'
  // https://stackoverflow.com/questions/69549927/how-to-pass-enum-value-in-angular-template-as-an-input
  constructor(
    private _router: Router,
    private _tableService: TableService,
    private _dataStoreService: DataStoreService,
    private _prepareDataCapituloDetails: PrepareDataCapituloDetails
  ) { }

  ngOnInit(): void {
    this._loadData();
  }

  /* #region  Esto es para el menu original */
  async openTable(tipoClasificacion: CLASIFICATION_TYPE): Promise<void> {
    const isIncome = tipoClasificacion.startsWith('ingresos');
    await this._tableService.loadDataForTypeClasification(tipoClasificacion,);

    if (isIncome) {
      this._router.navigateByUrl('/tableIngresos')
    } else {
      this._router.navigateByUrl('/tableGastos')
    }
  }
  /* #endregion */

  private async _loadData(): Promise<void> {
    /* #region  Capitulos de ingresos */
    await this._tableService.loadDataForTypeClasification('ingresosEconomicaCapitulos');
    this._dataTable = this._dataStoreService.getDataTable
    var data = this._dataTable.rowData;

    // Creo array de Capitulos de ingresos.
    let capitulos = []
    data.map(item => {
      const value = {
        "name": item.CodCap + '-' + item.DesCap,
        "value": item.Definitivas2022,
        "recaudado": item.DerechosReconocidosNetos2022,
        "colorValue": (item.Definitivas2022 / 100)
      }
      capitulos.push(value)
    });
    // console.log(capitulos);

    // Totalizo por capitulo de ingreso
    data = capitulos.reduce((acc, curr) => {
      const index = acc.findIndex(item => item.name === curr.name)
      index > -1 ? (acc[index].value += curr.value, acc[index].recaudado += curr.recaudado) : acc.push({
        name: curr.name,
        value: curr.value,
        recaudado: curr.recaudado,
        colorValue: (curr.value / 1000)
      })
      return acc
    }, [])
    this._dataGraphIngresos = data

    this.noFinancieroIngresos = (
      this._dataGraphIngresos[0].value +
      this._dataGraphIngresos[1].value +
      this._dataGraphIngresos[2].value +
      this._dataGraphIngresos[3].value +
      this._dataGraphIngresos[4].value +
      this._dataGraphIngresos[5].value +
      this._dataGraphIngresos[6].value
    ).toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    this.corrientesIngresos = (
      this._dataGraphIngresos[0].value +
      this._dataGraphIngresos[1].value +
      this._dataGraphIngresos[2].value +
      this._dataGraphIngresos[3].value +
      this._dataGraphIngresos[4].value
    );

    this.capitalIngresos = (
      this._dataGraphIngresos[5].value +
      this._dataGraphIngresos[6].value
    ).toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    this.financierosIngresos = (
      this._dataGraphIngresos[7].value +
      this._dataGraphIngresos[8].value
    );
    /* #endregion */

    /* #region  Total general ingresos para datos tabla */
    const totalPresupuestoIngresos = data.reduce((acc, curr) => {
      Object.keys(curr).forEach((key, index) => {
        if (!acc[key]) {
          acc[key] = 0
        }
        acc[key] += curr[key]
      })
      return acc
    }, {})

    this.totalPresupuestoIngresos = totalPresupuestoIngresos.value.toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    this.totalEjecutadoIngresos = totalPresupuestoIngresos.recaudado.toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    /* #endregion */

    /* #region politicas de gasto  */
    await this._tableService.loadDataForTypeClasification('gastosProgramaPoliticas');
    this._dataTable = this._dataStoreService.getDataTable
    var data = this._dataTable.rowData;
    // console.log(data);

    // Creo array de politicas de gasto
    let politicas = []
    data.map(item => {
      const value = {
        "name": item.CodPro + '-' + item.DesPro,
        "value": item.Definitivas2022,
        "recaudado": item.Pagos2022,
        "colorValue": (item.Pagos2022 / 100)
      }
      politicas.push(value)
    });
    // console.log(politicas);

    // Totalizo por politicas de gasto
    data = politicas.reduce((acc, curr) => {
      const index = acc.findIndex(item => item.name === curr.name)
      index > -1 ? (acc[index].value += curr.value, acc[index].recaudado += curr.recaudado) : acc.push({
        name: curr.name,
        value: curr.value,
        recaudado: curr.recaudado,
        colorValue: (curr.value / 1000)
      })
      return acc
    }, [])
    this._dataGraphGastos = data
    // console.log(this._dataGraphGastos);
    // console.log(this._dataGraphGastos[0]);
    // console.log(this._dataGraphGastos[0].name);
    /* #endregion */

    /* #region  gastosEconomicaCapitulos */
    const dataGastosEconomicaCapitulos = await this._prepareDataCapituloDetails.getDataAllYear();
    // console.log(dataGastosEconomicaCapitulos);

    // Creo array de capitulos de gasto
    let capitulosGastos = []
    dataGastosEconomicaCapitulos.map(item => {
      const value = {
        "name": item.CodCap + '-' + item.DesCap,
        "value": item.Definitivas2022,
      }
      capitulosGastos.push(value)
    });
    // console.log(capitulosGastos);

    // Totalizo por capitulo
    capitulosGastos = capitulosGastos.reduce((acc, curr) => {
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
    const totalPresupuestoGastos = data.reduce((acc, curr) => {
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
      this._dataGraphGastos[0].value +
      this._dataGraphGastos[1].value +
      this._dataGraphGastos[2].value +
      this._dataGraphGastos[3].value +
      this._dataGraphGastos[4].value +
      this._dataGraphGastos[5].value +
      this._dataGraphGastos[6].value
    ).toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    this.corrientesGastos = (
      this._dataGraphGastos[0].value +
      this._dataGraphGastos[1].value +
      this._dataGraphGastos[2].value +
      this._dataGraphGastos[3].value +
      this._dataGraphGastos[4].value
    );

    this.capitalGastos = (
      this._dataGraphGastos[5].value +
      this._dataGraphGastos[6].value
    ).toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    this.financierosGastos = (
      this._dataGraphGastos[7].value +
      this._dataGraphGastos[8].value
    );

    this.totalPresupuestoGastos = totalPresupuestoGastos.value.toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    this.totalEjecutadoGastos = totalPresupuestoGastos.recaudado.toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    this.ahorroBruto = (this.corrientesIngresos - this.corrientesGastos).toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    // Tengo que sumar capitulo 9 de gastos
    this.ahorroNeto = ((this.corrientesIngresos - this.corrientesGastos) - capitulosGastos[7].value).toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    this.corrientesIngresos = this.corrientesIngresos.toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    this.corrientesGastos = this.corrientesGastos.toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    this.capacidadFinanciacion = (this.financierosIngresos - this.financierosGastos).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    this.financierosIngresos = this.financierosIngresos.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    this.financierosGastos = this.financierosGastos.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

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
            [this._dataGraphIngresos[0].name, "Presupuesto", this._dataGraphIngresos[0].value],
            [this._dataGraphIngresos[1].name, "Presupuesto", this._dataGraphIngresos[1].value],
            [this._dataGraphIngresos[2].name, "Presupuesto", this._dataGraphIngresos[2].value],
            [this._dataGraphIngresos[3].name, "Presupuesto", this._dataGraphIngresos[3].value],
            [this._dataGraphIngresos[4].name, "Presupuesto", this._dataGraphIngresos[4].value],
            [this._dataGraphIngresos[5].name, "Presupuesto", this._dataGraphIngresos[5].value],
            [this._dataGraphIngresos[6].name, "Presupuesto", this._dataGraphIngresos[6].value],
            [this._dataGraphIngresos[7].name, "Presupuesto", this._dataGraphIngresos[7].value],
            [this._dataGraphIngresos[8].name, "Presupuesto", this._dataGraphIngresos[8].value]
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
            ["Presupuesto", this._dataGraphGastos[0].name, this._dataGraphGastos[0].value],
            ["Presupuesto", this._dataGraphGastos[1].name, this._dataGraphGastos[1].value],
            ["Presupuesto", this._dataGraphGastos[2].name, this._dataGraphGastos[2].value],
            ["Presupuesto", this._dataGraphGastos[3].name, this._dataGraphGastos[3].value],
            ["Presupuesto", this._dataGraphGastos[4].name, this._dataGraphGastos[4].value],
            ["Presupuesto", this._dataGraphGastos[5].name, this._dataGraphGastos[5].value],
            ["Presupuesto", this._dataGraphGastos[6].name, this._dataGraphGastos[6].value],
            ["Presupuesto", this._dataGraphGastos[7].name, this._dataGraphGastos[7].value],
            ["Presupuesto", this._dataGraphGastos[8].name, this._dataGraphGastos[8].value],
            ["Presupuesto", this._dataGraphGastos[9].name, this._dataGraphGastos[9].value],
            ["Presupuesto", this._dataGraphGastos[10].name, this._dataGraphGastos[10].value],
            ["Presupuesto", this._dataGraphGastos[11].name, this._dataGraphGastos[11].value],
            ["Presupuesto", this._dataGraphGastos[12].name, this._dataGraphGastos[12].value],
            ["Presupuesto", this._dataGraphGastos[13].name, this._dataGraphGastos[13].value],
            ["Presupuesto", this._dataGraphGastos[14].name, this._dataGraphGastos[14].value],
            ["Presupuesto", this._dataGraphGastos[15].name, this._dataGraphGastos[15].value],
            ["Presupuesto", this._dataGraphGastos[16].name, this._dataGraphGastos[16].value],
            ["Presupuesto", this._dataGraphGastos[17].name, this._dataGraphGastos[17].value],
            ["Presupuesto", this._dataGraphGastos[18].name, this._dataGraphGastos[18].value],
            ["Presupuesto", this._dataGraphGastos[19].name, this._dataGraphGastos[19].value]
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

  async newGastos(tipoClasificacion: CLASIFICATION_TYPE) {
    await this._tableService.loadDataForTypeClasification(tipoClasificacion);
    this._router.navigateByUrl('/newGastos')
  }

  HomeNew() {
    this._router.navigateByUrl('/homeNew')
  }

  explicamos() {
    this._router.navigateByUrl('/explicamos')
  }

  glosario() {
    this._router.navigateByUrl('/glosario')
  }

  visionGlobal() {
    this._router.navigateByUrl('/home')
  }

  detallePresupuesto() {
    this._router.navigateByUrl('/detallePresupuesto')
  }

  licitaciones() {
    window.open('https://con.ocmjerez.org/', '_blank');
  }

}