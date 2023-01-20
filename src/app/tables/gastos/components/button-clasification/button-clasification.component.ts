import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { IDataGraph } from '../../../../commons/interfaces/dataGraph.interface';
import { IDataTable } from '../../../../commons/interfaces/dataTable.interface';
import { IButtonClasification } from '../../model/components.interface';

import { DataStoreService } from '../../../../services/dataStore.service';
import { PrepareDataTreemapService } from '../../../../services/prepareDataTreemap.service';
import { TableService } from '../../../../services/table.service';
import { HasRowClicked } from '../../../../services/hasRowClicked.service';
import { HasDataChangeService } from '../../../../services/hasDataChange.service';

import { getClasificacion } from '../../../data-table';

@Component({
  selector: 'app-button-clasification',
  templateUrl: './button-clasification.component.html',
  styleUrls: ['./button-clasification.component.scss']
})

export class ButtonClasificationComponent {
  private _dataTable: IDataTable;
  private _dataGraph: IDataGraph = {} as IDataGraph;
  public showTable = true;
  public buttons: IButtonClasification[] = [];
  public buttonsAdditional: string[] = [];
  public hasRowClicked$ = this._hasRowClicked.currentHasRowClicked;
  private row: string = '';

  constructor(
    private _router: Router,
    private _hasRowClicked: HasRowClicked,
    private _tableService: TableService,
    private _dataStoreService: DataStoreService,
    private _prepareDataTreemapService: PrepareDataTreemapService,
    private _hasDataChangeService: HasDataChangeService
  ) {
    const clasification = getClasificacion(this._dataStoreService.dataTable.clasificationType)
    this.buttons = clasification.buttons;
    this.buttonsAdditional = clasification.buttonsAdditional;
  }

  async click(event: Event): Promise<void> {
    const target = event.target as HTMLButtonElement;
    const button: IButtonClasification = this.buttons.find((button: IButtonClasification) => button.name === target.innerText);

    if (button) {
      this._dataTable = await this._tableService.loadData(button.clasificationType);

      await this._prepareDataTreemapService.calcSeries(         // Actualizo datos treemap en función del boton pulsado
        this._dataTable.rowDataGastos,
        getClasificacion(this._dataTable.clasificationType).codField,
        getClasificacion(this._dataTable.clasificationType).desField,
        'Definitivas2022'
      );

      this._hasDataChangeService.change(false);
      setTimeout(() => {
        this._hasDataChangeService.change(true);
      }, 5);

    } else {
      switch (target.textContent.trim()) {    // Si se pulsa un buttonsAdditional, se navega a la ruta correspondiente
        case 'Gráfico detalladado':
          this._dataTable = await this._tableService.loadData(this._dataStoreService.dataTable.clasificationType);
          this.showGraph();
          break;
        case 'Detalle del programa seleccionado':
          this._router.navigate(['tableProgramaDetails']);
          break;
        case 'Programas que componen orgánico seleccionado':
          this._router.navigate(['/tableGrupoProgramaDetails', 'organico'])
          break;
        case 'Programas que gastan del elemento seleccionado':
          this._router.navigate(['/tableGrupoProgramaDetails', 'gastan'])
          break;
      }
    }

  }

  showGraph() {
    this.hasRowClicked$.subscribe(value => {
      this.row = value;
    });

    this._dataGraph.rowDataGastos = this._dataTable.rowDataGastos
    this._router.navigateByUrl("/graphGastos").then(() => {
      this._dataStoreService.setData(
        {
          ...this._dataStoreService.dataGraph, graphSubTitle: this.row.split(" ")[0]
        }
      );
    })
    this._dataStoreService.selectedCodeRowFirstLevel = '';
  }

}
