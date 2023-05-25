import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataStoreService } from '@services/dataStore.service';

import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSankey from 'highcharts/modules/sankey';
HighchartsMore(Highcharts);
HighchartsSankey(Highcharts);

@Component({
  selector: 'app-sankey-graph-ingresos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sankey-graph-ingresos.component.html',
  styleUrls: ['./sankey-graph-ingresos.component.scss']
})

export class SankeyGraphIngresosComponent implements OnInit {
  private _dataStoreService = inject(DataStoreService);

  private _dataIngresos: any;

  ngOnInit(): void {
    this._loadData();
  }

  private async _loadData() {
    await this.calcSumIngresos();
    this._showGraph();
  }

  async calcSumIngresos() {
    this._dataIngresos = this._dataStoreService.dataTable.rowDataIngresos;

    // Creo array de Capitulos de ingresos.
    let capitulos = [];
    for (const item of this._dataIngresos) {
      const value = {
        name: `${item.CodCap}-${item.DesCap}`,
        value: item.Definitivas2023,
        recaudado: item.DerechosReconocidosNetos2023
      };
      capitulos.push(value);
    }

    // Totalizo por capitulo de ingreso
    this._dataIngresos = capitulos.reduce((acc, curr) => {
      const index = acc.findIndex((item) => item.name === curr.name);
      index > -1
        ? ((acc[index].value += curr.value), (acc[index].recaudado += curr.recaudado))
        : acc.push({
          name: curr.name,
          value: curr.value,
          recaudado: curr.recaudado
        });
      return acc;
    }, []);
  }

  _showGraph() {
    Highcharts.chart('ingresos', {
      accessibility: {
        enabled: false
      },
      title: {
        text: "<span style= 'font-size: 25px'>Ingresos</span>"
      },
      subtitle: {
        text: ''
      },
      tooltip: {
        headerFormat: null,
        pointFormat: '{point.fromNode.name} \u2192 {point.toNode.name}: {point.weight} ',
        nodeFormat: '{point.name}: {point.sum} '
      },
      series: [
        {
          borderColor: '#1a1a1a',
          borderWidth: 1,
          colors: [
            '#1E90FF',
            '#1eff8d',
            '#ce9eff',
            '#1eff8d',
            '#1eff8d',
            '#1eff8d',
            '#1eff8d',
            '#ce9eff',
            '#ce9eff',
            '#ce9eff',
            '#ce9eff'
          ],
          keys: ['from', 'to', 'weight'],
          data: [
            [this._dataIngresos[0].name, 'Presupuesto', this._dataIngresos[0].value],
            [this._dataIngresos[1].name, 'Presupuesto', this._dataIngresos[1].value],
            [this._dataIngresos[2].name, 'Presupuesto', this._dataIngresos[2].value],
            [this._dataIngresos[3].name, 'Presupuesto', this._dataIngresos[3].value],
            [this._dataIngresos[4].name, 'Presupuesto', this._dataIngresos[4].value],
            [this._dataIngresos[5].name, 'Presupuesto', this._dataIngresos[5].value],
            [this._dataIngresos[6].name, 'Presupuesto', this._dataIngresos[6].value],
            [this._dataIngresos[7].name, 'Presupuesto', this._dataIngresos[7].value],
            [this._dataIngresos[8].name, 'Presupuesto', this._dataIngresos[8].value]
          ],
          type: 'sankey',
          name: 'Ingresos',
          dataLabels: {
            style: {
              color: '#1a1a1a',
              textOutline: false
            }
          }
        }
      ]
    } as any);

  }
}
