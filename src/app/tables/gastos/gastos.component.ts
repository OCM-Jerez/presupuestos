import { Component, Injectable, ViewChild, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// import { TableGastosComponent } from './components/table-gastos/table-gastos.component';
import { TableService } from '../../services/table.service';
import { DataStoreService } from '../../services/dataStore.service';
import { IButtonClasification } from './model/components.interface';
import { getClasificacion } from '../data-table';

import { AgGridAngular } from 'ag-grid-angular';
import { ColumnState, ColumnApi, GridApi, GridReadyEvent } from "ag-grid-community";
import { PrepareDataTreemapService } from '../../services/prepareDataTreemap.service';
import { IDataTable } from '../../commons/interfaces/dataTable.interface';
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
    private _router: Router,
    private _prepareDataTreemapService: PrepareDataTreemapService
  ) { }

  ngOnInit(): void {
    // console.log('===============  entro en gastos.component.ts  ===========================');
    this._hideButtons();
  }

  buttons = getClasificacion(this._dataStoreService.getDataTable.clasificationType).buttons;
  showTable = true;

  onGridReady = (params: GridReadyEvent) => {
    this._gridApi = params.api;
    console.log('==========================================');
    console.log(this._gridApi);

    this._columnApi = params.columnApi;
    // let defaultSortModel: ColumnState[] = [
    //   { colId: this._dataTable.dataPropertyTable.codField, sort: 'asc', sortIndex: 0 },
    // ];
    // params.columnApi.applyColumnState({ state: defaultSortModel });

  }

  async detalle(button: IButtonClasification) {
    console.log('=================  =========================', button);
    const dataPropertyTable = getClasificacion(button.clasificationType);

    if (this._dataStoreService.selectedCodeRowFirstLevel) {
      const useStarWitch: boolean = dataPropertyTable.useStarWitch;
      const attribute: string = dataPropertyTable.attribute;
      await this._tableService.loadDataForTypeClasification(
        button.clasificationType,
        { valueFilter: this._dataStoreService.selectedCodeRowFirstLevel.split(" ")[0], attribute, useStarWitch });
    } else {
      await this._tableService.loadDataForTypeClasification(
        button.clasificationType);
    }

    this._dataStoreService.selectedCodeRowFirstLevel = '';

    console.log('this._dataStoreService.getDataTable', this._dataStoreService.getDataTable);


    // Actualizo datos treemap en función del boton pulsado
    // console.log('Actualizo datos treemap en función del boton pulsado');

    // console.log('dataTreemap', dataTreemap);
    // this._dataStoreService.setDataTreemap = dataTreemap;
    // console.log('this._dataStoreService.getDataTreemap', await this._dataStoreService.getDataTreemap);







    this.reloadCurrentRoute()
    //this.ngOnInit();
  }

  reloadCurrentRoute() {
    let currentUrl = this._router.url;
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate([currentUrl]);
    });
  }

  private _hideButtons() {
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
