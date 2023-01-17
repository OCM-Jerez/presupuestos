import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Location } from "@angular/common";

import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions } from 'ag-grid-community';
import { AgChartOptions } from 'ag-charts-community';
import { CellRendererOCM } from '../../ag-grid/CellRendererOCM';

import { accumulate } from '../../commons/util/util';
import { DataStoreService } from '../../services/dataStore.service';
import { IDataGraph } from '../../commons/interfaces/dataGraph.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-graph-gastos',
  templateUrl: './graph-gastos.component.html',
  styleUrls: ['./graph-gastos.component.scss']
})
export class GraphGastosComponent implements OnDestroy {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  public data: any;
  public columnDefs;
  public defaultColDef;
  public localeText;
  public rowDataTable: any;
  public groupHeaderHeight = 25;
  public headerHeight = 25;
  public options: AgChartOptions;
  private datos: any[] = [];
  private _dataGraph: IDataGraph;
  private _subscription: Subscription;

  constructor(
    private location: Location,
    private _dataStoreService: DataStoreService,
  ) {
    this._subscription = this._dataStoreService.dataSource$.subscribe((data) => {
      this._dataGraph = data;
      this._createData();
      this._createColumns()
      this._showGraph()
    });
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe()
    }
  }

  private async _createData() {
    console.log(this._dataGraph);
    if (this._dataGraph.clasificationType != "aplicacion") {

      const codigo = this._dataStoreService.selectedCodeRowFirstLevel.split(" ")[0];
      console.log(this._dataStoreService);
      console.log(this._dataGraph);


      switch (this._dataGraph.clasificationType) {
        case 'gastosOrganicaOrganicos':
          this.datos = this._dataGraph.rowDataGastos.filter(x => x.CodOrg == codigo);
          break;
        case 'gastosProgramaAreas':
        case 'gastosProgramaPoliticas':
        case 'gastosProgramaGrupos':
        case 'gastosProgramaProgramas':
          this.datos = this._dataGraph.rowDataGastos.filter(x => x.CodPro == codigo);
          break;
        case 'gastosEconomicaCapitulos':
          this.datos = this._dataGraph.rowDataGastos.filter(x => x.CodCap == codigo);
          break;
        case 'gastosEconomicaArticulos':
        case 'gastosEconomicaConceptos':
        case 'gastosEconomicaEconomicos':
          this.datos = this._dataGraph.rowDataGastos.filter(x => x.CodEco == codigo);
          break;
      }
    } else {
      this.datos = this._dataGraph.rowDataGastos
    }

    const yearsIniciales = accumulate('Iniciales', this.datos);
    const yearsDefinitivas = accumulate('Definitivas', this.datos);
    const yearsObligacionesNetas = accumulate('ObligacionesReconocidasNetas', this.datos);
    const yearsObligacionesPendientes = accumulate('ObligacionesPendientePago', this.datos);

    this.data = [];
    for (let index = 2015; index <= 2022; index++) {
      const value = {
        "year": index,
        "Definitivas": yearsDefinitivas[index],
        "ObligacionesReconocidasNetas": yearsObligacionesNetas[index],
        "ObligacionesPendientes": yearsObligacionesPendientes[index]
      }
      if (index === 2022) {
        value.Definitivas = yearsIniciales[index]  // Se usan las iniciales ya que es el unico dato que existe.
      }
      this.data.push(value)
    }
    return this.data;
  }

  private _createColumns(): void {
    this.columnDefs = [
      {
        headerName: 'Año',
        field: 'year',
        width: 70,
      },
      {
        headerName: 'Previsiones definitivas',
        field: 'Definitivas',
        width: 180,
        aggFunc: 'sum',
        cellRenderer: CellRendererOCM,
      },
      {
        headerName: 'ObligacionesReconocidasNetas',
        field: 'ObligacionesReconocidasNetas',
        width: 200,
        aggFunc: 'sum',
        cellRenderer: CellRendererOCM,
      },
      {
        headerName: 'ObligacionesPendientes',
        field: 'ObligacionesPendientes',
        width: 180,
        aggFunc: 'sum',
        cellRenderer: CellRendererOCM,
      }
    ];

    this.defaultColDef = {
      sortable: true,
      resizable: true,
      filter: false,
    };

  }

  private _showGraph(): void {
    this.options = {
      autoSize: true,
      title: {
        text: this._dataGraph.graphTitle
      },
      subtitle: {
        text: `${this._dataGraph.graphSubTitle}`
      },
      data: [...this.data],
      series: [
        {
          xKey: 'year',
          yKey: 'Definitivas',
        },
        {
          xKey: 'year',
          yKey: 'ObligacionesReconocidasNetas',
        },
        {
          xKey: 'year',
          yKey: 'ObligacionesPendientes',
        },
      ],
      axes: [
        {
          type: 'category',
          position: 'bottom',
          title: {
            text: 'Años',
            enabled: true,
          },
        },
        {
          type: 'number',
          position: 'left',
          title: {
            text: 'en miles de Euros',
            enabled: true,
          },
          label: {
            formatter: function (params) {
              return params.value / 1000 + '';
            }
          },
        },
      ],
      legend: {
        enabled: true,
        position: 'bottom',
      },

    }
  }

  volver() {
    this.location.back();
  }

}

