import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TableService } from '../services/table.service';

import { CLASIFICATION_TYPE } from '../commons/util/util';
import { environment } from '../../environments/environment';

import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSankey from 'highcharts/modules/sankey';

HighchartsMore(Highcharts);
HighchartsSankey(Highcharts);

@Component({
  selector: 'app-indice-new',
  templateUrl: './indice.component.html',
  styleUrls: ['./indice.component.scss']
})
export class IndiceComponent implements OnInit {
  public liqDate = environment.liqDate;
  // https://stackoverflow.com/questions/69549927/how-to-pass-enum-value-in-angular-template-as-an-input
  constructor(
    private _router: Router,
    private _tableService: TableService
  ) {

  }
  ngOnInit(): void {
    this.showGraph()
  }

  async openTable(tipoClasificacion: CLASIFICATION_TYPE): Promise<void> {
    const isIncome = tipoClasificacion.startsWith('ingresos');
    await this._tableService.loadDataForTypeClasification(isIncome, tipoClasificacion,);

    if (isIncome) {
      this._router.navigateByUrl('/tableIngresos')
    } else {
      this._router.navigateByUrl('/tableGastos')
    }
  }

  showGraph() {
    // Gráfico chartSK
    Highcharts.chart("sankey", {
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
            ["Impuestos", "Current-Assets", 143.71],
            ["subvenciones", "Non-Current Assets", 180.17],

            ["Current-Assets", "Cash", 90.94],
            ["Current-Assets", "Receivables", 37.44],
            ["Current-Assets", "Inventory", 4.06],
            ["Current-Assets", "Other CA", 11.26],

            ["Non-Current Assets", "Net PPE ", 36.76],
            ["Non-Current Assets", "Investments ", 100.88],
            ["Non-Current Assets", "Other NCA", 42.52]
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

    // Gráfico chartSK
    Highcharts.chart("sankey1", {
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
          "{point.fromNode.name} \u2192 {point.toNode.name}: {point.weight} million USD",
        nodeFormat: "{point.name}: {point.sum} million USD"
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
            ["Total Assets", "Current-Assets", 143.71],
            ["Total Assets", "Non-Current Assets", 180.17],

            ["Current-Assets", "Cash", 90.94],
            ["Current-Assets", "Receivables", 37.44],
            ["Current-Assets", "Inventory", 4.06],
            ["Current-Assets", "Other CA", 11.26],

            ["Non-Current Assets", "Net PPE ", 36.76],
            ["Non-Current Assets", "Investments ", 100.88],
            ["Non-Current Assets", "Other NCA", 42.52]
          ],
          type: "sankey",
          name: "Appel Assets",
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
    await this._tableService.loadDataForTypeClasification(false, tipoClasificacion,);
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