/* #region  import */
import { Component, ViewChild, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AgGridAngular } from 'ag-grid-angular';
import { ColumnApi, GridApi, GridReadyEvent } from "ag-grid-community";

import { DataStoreService } from '../../services/dataStore.service';
import { PrepareDataTreemapService } from '../../services/prepareDataTreemap.service';
import { TableService } from '../../services/table.service';

import { IButtonClasification } from './model/components.interface';
import { getClasificacion } from '../data-table';
import { IDataTable } from '../../commons/interfaces/dataTable.interface';
import { IDataGraph } from '../../commons/interfaces/dataGraph.interface';
import { Router } from '@angular/router';
/* #endregion */

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.scss']
})
export class GastosComponent implements OnInit {
  /* #region  definir variables */
  @Output() clickDetalle = new EventEmitter<void>();
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  @Input() buttonsHide: string[] = [];
  @Input() hasTitle: boolean = true;
  @Input() hasMenu: boolean = true;
  @Input() hasGrafico: boolean = true;
  public hasGraficoButton = true;
  public hasGraphTree = true;
  public hasMenuButton = true;
  private _gridApi: GridApi;
  private _columnApi: ColumnApi;
  private _dataTable: IDataTable;
  private _dataGraph: IDataGraph = {} as IDataGraph;
  buttons = getClasificacion(this._dataStoreService.getDataTable.clasificationType).buttons;
  showTable = true;
  event: Event;
  /* #endregion */

  constructor(
    private _router: Router,
    private _dataStoreService: DataStoreService,
    private _tableService: TableService,
    private _prepareDataTreemapService: PrepareDataTreemapService
  ) { }

  onChange(event: Event) {
    this.event = event;
  }

  ngOnInit(): void {
    this._hideButtons();
  }

  onGridReady = (params: GridReadyEvent) => {
    this._gridApi = params.api;
    this._columnApi = params.columnApi;
    // let defaultSortModel: ColumnState[] = [
    //   { colId: this._dataTable.dataPropertyTable.codField, sort: 'asc', sortIndex: 0 },
    // ];
    // params.columnApi.applyColumnState({ state: defaultSortModel });
  }

  async detalle(button: IButtonClasification) {
    this.clickDetalle.emit();
    const dataPropertyTable = getClasificacion(button.clasificationType);

    if (this._dataStoreService.selectedCodeRowFirstLevel) {
      const useStarWitch: boolean = dataPropertyTable.useStarWitch;
      const attribute: string = dataPropertyTable.attribute;
      this._dataTable = await this._tableService.loadDataForTypeClasification(
        button.clasificationType,
        { valueFilter: this._dataStoreService.selectedCodeRowFirstLevel.split(" ")[0], attribute, useStarWitch });
    } else {
      this._dataTable = await this._tableService.loadDataForTypeClasification(
        button.clasificationType);
    }

    // console.log('He pulsado un botón detalles, actualizo data', this._dataTable);
    this._dataStoreService.selectedCodeRowFirstLevel = '';

    // console.log('Actualizo datos treemap en función del boton pulsado');
    await this._prepareDataTreemapService.calcSeries(
      this._dataTable.rowData,
      getClasificacion(this._dataTable.clasificationType).codField,
      getClasificacion(this._dataTable.clasificationType).desField,
      'Definitivas2022'
    );
    // console.log('this._dataStoreService.getDataTreemap', this._dataStoreService.getDataTreemap);
    // await this.dataGraph(this._dataTable.clasificationType, this._dataTable.rowData);
    // console.log('dataTreemap', dataTreemap);
    // this._dataStoreService.setDataTreemap = dataTreemap;
    // console.log('this._dataStoreService.getDataTreemap', await this._dataStoreService.getDataTreemap);

    this.buttons = getClasificacion(this._dataStoreService.getDataTable.clasificationType).buttons;

    // Como en el HTML usamos *ngIf="showTable" cuando lo ponemos
    // a false se elimina el componente del DOM y cuando lo ponemos  
    // a true se vuelve a crear el componente y se ejecuta el ngOnInit
    // Si recargamos la app los datos de los services se pierden.
    this.showTable = false;
    setTimeout(() => {
      this._hideButtons()
      this.showTable = true;
    }, 500);
  }

  private _hideButtons() {
    // console.log('this.buttonsHide', this.buttonsHide);
    // console.log('this.buttons', this.buttons);
    this.buttons.forEach(() => {
      for (const key in this.buttons) {
        // console.log('Buscando', this.buttons[key].name);
        if (this.buttonsHide.includes(this.buttons[key].name)) {
          // console.log('Encontrado', this.buttons[key].name);
          // delete this.buttons[key]s.name;
          this.buttons.splice(parseInt(key), 1);
        }
      }
    });
  }

}
