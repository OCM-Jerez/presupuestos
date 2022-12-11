import { Component, Injectable, ViewChild, OnInit, Input } from '@angular/core';
// import { Router } from '@angular/router';

// import { TableGastosComponent } from './components/table-gastos/table-gastos.component';
import { TableService } from '../../services/table.service';
import { DataStoreService } from '../../services/dataStore.service';
import { IButtonClasification } from './model/components.interface';
import { getClasificacion } from '../data-table';

import { AgGridAngular } from 'ag-grid-angular';
import { ColumnState, ColumnApi, GridApi, GridReadyEvent } from "ag-grid-community";
import { PrepareDataTreemapService } from '../../services/prepareDataTreemap.service';
import { IDataProperty, IDataTable } from '../../commons/interfaces/dataTable.interface';
import { CLASIFICATION_TYPE } from '../../commons/util/util';
// import { IDataTable } from '../../commons/interfaces/dataTable.interface';
// import { CLASIFICATION_TYPE } from './../../commons/util/util';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.scss']
})
export class GastosComponent implements OnInit {
  // @ViewChild('table') tableAg!: TableGastosComponent;
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  @Input() buttonsHide: string[] = [];
  @Input() hasTitle: boolean = true;
  public hasGraficoButton = true;
  public hasGraphTree = true;
  public hasMenuButton = true;
  private _gridApi: GridApi;
  private _columnApi: ColumnApi;
  private _dataTable: IDataTable;

  constructor(
    private _dataStoreService: DataStoreService,
    private _tableService: TableService,
    // private _router: Router,
    private _prepareDataTreemapService: PrepareDataTreemapService
  ) { }

  ngOnInit(): void {
    this._hideButtons();
  }

  buttons = getClasificacion(this._dataStoreService.getDataTable.clasificationType).buttons;

  showTable = true;

  onGridReady = (params: GridReadyEvent) => {
    this._gridApi = params.api;
    this._columnApi = params.columnApi;
    // let defaultSortModel: ColumnState[] = [
    //   { colId: this._dataTable.dataPropertyTable.codField, sort: 'asc', sortIndex: 0 },
    // ];
    // params.columnApi.applyColumnState({ state: defaultSortModel });

  }

  async detalle(button: IButtonClasification) {
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
    console.log('data', this._dataTable);
    this._dataStoreService.selectedCodeRowFirstLevel = '';

    // Actualizo datos treemap en función del boton pulsado
    console.log('Actualizo datos treemap en función del boton pulsado');
    await this.dataGraph(this._dataTable.clasificationType, this._dataTable.rowData);

    // console.log('dataTreemap', dataTreemap);
    // this._dataStoreService.setDataTreemap = dataTreemap;
    // console.log('this._dataStoreService.getDataTreemap', await this._dataStoreService.getDataTreemap);

    this.buttons = getClasificacion(this._dataStoreService.getDataTable.clasificationType).buttons;

    // Como en el HTML usamos *ngIf="showTable" cuando lo ponemos
    // a false se elimina el componente del DOM y cuando lo ponemos  
    // a true se vuelve a crear el componente y se ejecuta el ngOnInit
    this.showTable = false;
    setTimeout(() => {
      this.showTable = true;
    }, 500);
  }

  async dataGraph(clasificationType: CLASIFICATION_TYPE, data: any) {
    console.log('data', clasificationType);
    await this._prepareDataTreemapService.calcSeries(data, getClasificacion(clasificationType).codField, getClasificacion(clasificationType).desField, 'Definitivas2022');
  }

  private _hideButtons() {
    console.log('this.buttonsHide', this.buttonsHide);

    if (this.buttonsHide.length > 0) {
      if (this.buttonsHide.includes('menu')) {
        this.hasMenuButton = false
      };
      if (this.buttonsHide.includes('grafico')) {
        this.hasGraficoButton = false
      };
      if (this.buttonsHide.includes('graphTree')) {
        this.hasGraphTree = false
      };
    }
  }

}
