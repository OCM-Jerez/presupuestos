import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';

import { AgGridAngular } from 'ag-grid-angular';
import { ColumnApi, GridApi, GridReadyEvent } from "ag-grid-community";

import { DataStoreService } from '../../services/dataStore.service';
import { PrepareDataTreemapService } from '../../services/prepareDataTreemap.service';
import { TableService } from '../../services/table.service';

import { IButtonClasification } from './model/components.interface';
import { getClasificacion } from '../data-table';
import { IDataTable } from '../../commons/interfaces/dataTable.interface';
import { CLASIFICATION_TYPE } from '../../commons/util/util';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.scss']
})
export class GastosComponent {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  @Input() hasTitle: boolean = true;
  @Output() clickDetalle = new EventEmitter<void>();
  private _gridApi: GridApi;
  private _columnApi: ColumnApi;
  private _dataTable: IDataTable;
  private _tabselected = 'Por capítulo gasto';
  buttons = getClasificacion(this._dataStoreService.dataTable.clasificationType).buttons;
  buttonsAdditional = getClasificacion(this._dataStoreService.dataTable.clasificationType).buttonsAdditional;
  showTable = true;
  event: Event;

  constructor(
    private _dataStoreService: DataStoreService,
    private _tableService: TableService,
    private _prepareDataTreemapService: PrepareDataTreemapService
  ) { }

  onChange(event: Event) {
    this.event = event;
    this.detalle(event);
  }

  onGridReady = (params: GridReadyEvent) => {
    this._gridApi = params.api;
    this._columnApi = params.columnApi;
    // let defaultSortModel: ColumnState[] = [
    //   { colId: this._dataTable.dataPropertyTable.codField, sort: 'asc', sortIndex: 0 },
    // ];
    // params.columnApi.applyColumnState({ state: defaultSortModel });
  }

  async detalle(event: Event) {
    let tipoClasificacion: CLASIFICATION_TYPE = 'gastosEconomicaCapitulos'
    this.clickDetalle.emit();
    const target = event.target as HTMLButtonElement;
    // console.log('target =>', target.textContent.trim());
    if (target.textContent.trim() === 'Programas que gastan del elemento seleccionado') {
      console.log('Programas que gastan del elemento seleccionado');
      console.log('tabselected =>', this._tabselected);

      // tengo que saber de que pestaña viene el evento para cargar una tipoClasificacion u otro.
      switch (this._tabselected) {
        case 'Por capítulo gasto':
          tipoClasificacion = 'gastosEconomicaCapitulos';
          break;
        case 'Por artículo':
          tipoClasificacion = 'gastosEconomicaArticulos';
          break;
        case 'Por concepto':
          tipoClasificacion = 'gastosEconomicaConceptos';
          break;
        case 'Por económico':
          tipoClasificacion = 'gastosEconomicaEconomicos';
          break;
      }

      console.log('tipoClasificacion =>', tipoClasificacion);

      this._dataTable = await this._tableService.loadData(tipoClasificacion);
      console.log('this._dataTable =>', this._dataTable);
      console.log('codField =>', this._dataTable.dataPropertyTable.codField);

      // // let tipoClasificacion: CLASIFICATION_TYPE = 'gastosEconomicaCapitulos';
      // this._dataTable = await this._tableService.loadData(
      //   'gastosEconomicaCapitulos');
    } else {
      console.log('target =>', target.textContent.trim());
      this._tabselected = target.textContent.trim();
      console.log('tabselected =>', this._tabselected);
    }

    const button: IButtonClasification = this.buttons.find((button: IButtonClasification) => button.name === target.innerText);
    console.log('button.clasificationType', button);

    if (button) {
      // Unicamente si se ha pulsado un boton que necesita actualización de la data, 
      // no grafico por ejemplo, que llaman a otros componentes.
      const dataPropertyTable = getClasificacion(button.clasificationType);

      if (this._dataStoreService.selectedCodeRowFirstLevel) {
        const useStarWitch: boolean = dataPropertyTable.useStarWitch;
        const attribute: string = dataPropertyTable.attribute;
        this._dataTable = await this._tableService.loadData(
          button.clasificationType,
          { valueFilter: this._dataStoreService.selectedCodeRowFirstLevel.split(" ")[0], attribute, useStarWitch });
      } else {
        this._dataTable = await this._tableService.loadData(
          button.clasificationType);
      }

      this._dataStoreService.selectedCodeRowFirstLevel = '';

      // console.log('Actualizo datos treemap en función del boton pulsado');
      await this._prepareDataTreemapService.calcSeries(
        this._dataTable.rowDataGastos,
        getClasificacion(this._dataTable.clasificationType).codField,
        getClasificacion(this._dataTable.clasificationType).desField,
        'Definitivas2022'
      );

      this.buttons = getClasificacion(this._dataStoreService.dataTable.clasificationType).buttons;

      this.showTable = false;
      setTimeout(() => {
        this.showTable = true;
      }, 500);
    }
  }

}


