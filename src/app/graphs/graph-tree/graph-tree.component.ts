import { Component } from '@angular/core';
import { AgChartOptions } from 'ag-charts-community';
import { AvalaibleYearsService } from '../../services/avalaibleYears.service';
import { DataStoreService } from '../../services/dataStore.service';
// import { IDataGraph } from '../../commons/interfaces/dataGraph.interface';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'app-graphtree',
  templateUrl: './graph-tree.component.html',
  styleUrls: ['./graph-tree.component.scss']
})
export class GraphTreeComponent {
  options: AgChartOptions = {} as AgChartOptions;
  // private _dataGraph: IDataGraph;
  // private _subscription: Subscription;
  constructor(
    private _avalaibleYearsService: AvalaibleYearsService,
    private _dataStoreService: DataStoreService,

  ) {

    // this._subscription = this._dataStoreService.dataSource$.subscribe((data) => {
    //   this._dataGraph = data;
    // });
    // console.log(this._dataGraph);

    const dataGraphTree = this._dataStoreService.dataGraphTree;
    const max = Math.max(...dataGraphTree.map(item => item.total));
    const tiles = [];
    for (let i = 0; i < dataGraphTree.length; i++) {
      tiles.push({
        children: [
          {
            label: dataGraphTree[i].codigo + " " + dataGraphTree[i].descripcion,
            size: dataGraphTree[i].total,
            color: this.calculaColor(dataGraphTree[i].total, max)
          }
        ],
      });
    }
    let data = {
      children: tiles
    }

    this.options = {
      type: 'treemap',
      data,
      title: {
        text: `Donde van mis impuestos año ${this._avalaibleYearsService.getYearsSelected()}`,
        fontSize: 30,
        fontWeight: 'bold',
      },
      subtitle: {
        text: this._dataStoreService.dataTable.dataPropertyTable.headerName,
        fontSize: 20,
        fontWeight: 'bold',
      },

      series: [

        {
          type: 'treemap',
          // The labelKey, sizeKey and colorKey configs can be omitted, if the node objects in your data happen to have the label,
          // size and color fields.
          // labelKey: 'label',
          // sizeKey: 'size',
          // colorKey: '',
          colorParents: true,
          colorRange: ['green', 'red'],
          nodePadding: 3,
          showInLegend: true,
          visible: true,
          labels: {
            large: {
              enabled: true,
              fontSize: 12,
            },
          },

          tooltip: {
            renderer: (params) => {
              return {
                content: `<b>Creditos</b>: ${params.datum.datum.size.toString()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`,
              };
            },
          },

        },
      ],
    };
  }

  // ngOnDestroy(): void {
  //   if (this._subscription) {
  //     this._subscription.unsubscribe()
  //   }
  // }

  calculaColor(valor: number, max: number) {
    // tenemos un rango de 0 a 100
    // desde -5 a +5 con pasos de 0.1
    // tenemos que conocer el maximo valor
    // El intervalo es max/100
    const interval = (max / 100);
    const cuantosIntervals = (valor / interval);
    const colorCalculado = -5 + (cuantosIntervals / 10);
    return colorCalculado;

  }

}
