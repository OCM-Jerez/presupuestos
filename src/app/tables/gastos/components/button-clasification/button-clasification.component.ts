import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { IDataGraph } from '../../../../commons/interfaces/dataGraph.interface';
import { IDataTable } from '../../../../commons/interfaces/dataTable.interface';
import { CLASIFICATION_TYPE } from '../../../../commons/util/util';

import { DataStoreService } from '../../../../services/dataStore.service';
import { PrepareDataTreemapService } from '../../../../services/prepareDataTreemap.service';
import { TableService } from '../../../../services/table.service';
import { HasRowClicked } from '../../../../services/hasRowClicked.service';
import { HasDataChangeService } from '../../../../services/hasDataChange.service';

import { getClasificacion } from '../../../data-table';
import { IButtonClasification } from '../../model/components.interface';

@Component({
  selector: 'app-button-clasification',
  templateUrl: './button-clasification.component.html',
  styleUrls: ['./button-clasification.component.scss']
})

export class ButtonClasificationComponent implements OnDestroy {
  private subscription: Subscription;
  private _dataTable: IDataTable;
  private _dataGraph: IDataGraph = {} as IDataGraph;
  public currentHasRowClicked;
  public showTable = true;
  buttons = getClasificacion(this._dataStoreService.dataTable.clasificationType).buttons;
  buttonsAdditional = getClasificacion(this._dataStoreService.dataTable.clasificationType).buttonsAdditional;

  constructor(
    private _hasRowClicked: HasRowClicked,
    private _tableService: TableService,
    private _dataStoreService: DataStoreService,
    private _prepareDataTreemapService: PrepareDataTreemapService,
    private _router: Router,
    private _hasDataChangeService: HasDataChangeService
  ) {
    this.subscription = this._hasRowClicked.currentHasRowClicked.subscribe(currentHasRowClicked => this.currentHasRowClicked = currentHasRowClicked);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async click(event: Event): Promise<void> {
    const target = event.target as HTMLButtonElement;
    console.log('target =>', target.textContent.trim());

    // let tipoClasificacion: CLASIFICATION_TYPE = 'gastosEconomicaCapitulos'



    // console.log('tipoClasificacion =>', tipoClasificacion);
    // this._dataTable = await this._tableService.loadData(tipoClasificacion);


    const button: IButtonClasification = this.buttons.find((button: IButtonClasification) => button.name === target.innerText);
    console.log('button', button);


    if (button) {
      // Unicamente si se ha pulsado un boton que necesita actualización de la data, 
      // no grafico por ejemplo, que llaman a otros componentes.
      const dataPropertyTable = getClasificacion(button.clasificationType);

      if (this._dataStoreService.selectedCodeRowFirstLevel) {
        const useStarWitch: boolean = dataPropertyTable.useStarWitch;
        const attribute: string = dataPropertyTable.attribute;
        this._dataTable = await this._tableService.loadData(
          button.clasificationType,
          { valueFilter: this._dataStoreService.selectedCodeRowFirstLevel.split(" ")[0], attribute, useStarWitch }
        );
      } else {
        this._dataTable = await this._tableService.loadData(button.clasificationType);
      }

      this._dataStoreService.selectedCodeRowFirstLevel = '';

      // console.log('Actualizo datos treemap en función del boton pulsado');
      await this._prepareDataTreemapService.calcSeries(
        this._dataTable.rowDataGastos,
        getClasificacion(this._dataTable.clasificationType).codField,
        getClasificacion(this._dataTable.clasificationType).desField,
        'Definitivas2022'
      );

      // this.buttons = getClasificacion(this._dataStoreService.dataTable.clasificationType).buttons;
      // console.log('this.buttons', this.buttons);

      this._hasDataChangeService.change(false);
      setTimeout(() => {
        this._hasDataChangeService.change(true);
      }, 5);
    }

    // tengo que saber de que pestaña viene el evento para cargar una tipoClasificacion u otro.
    switch (target.textContent.trim()) {
      case 'Gráfico detalladado':
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

  showGraph() {
    // const selectedRows = this.agGrid.api.getSelectedNodes();
    // this._dataStoreService.selectedCodeRow = selectedRows[0].key;
    // const codigoSearch = this.dataStoreService.selectedCodeRowFirstLevel.split(" ")[0];
    this._dataGraph.rowDataGastos = this._dataTable.rowDataGastos
    // this._router.navigateByUrl("/graphGastos");

    this._router.navigateByUrl("/graphGastos").then(() => {

      const a = { ...this._dataStoreService.dataGraph, graphSubTitle: this._dataStoreService.selectedCodeRowFirstLevel.split(" ")[0] }
      console.log(a);
      this._dataStoreService.setData(
        {
          ...this._dataStoreService.dataGraph, graphSubTitle: this._dataStoreService.selectedCodeRowFirstLevel.split(" ")[0]
        }
      );
    })
    this._dataStoreService.selectedCodeRowFirstLevel = '';
  }


}
