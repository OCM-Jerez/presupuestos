import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

// import { TableGastosComponent } from './components/table-gastos/table-gastos.component';
import { TableService } from '../../services/table.service';
import { DataStoreService } from '../../services/dataStore.service';
import { IButtonClasification } from './model/components.interface';
import { getClasificacion } from '../data-table';

import { AgGridAngular } from 'ag-grid-angular';
import { ColumnState, ColumnApi, GridApi, GridReadyEvent } from "ag-grid-community/main";
// import { CLASIFICATION_TYPE } from './../../commons/util/util';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.scss']
})
export class GastosComponent {
  // @ViewChild('table') tableAg!: TableGastosComponent;
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  private _gridApi: GridApi;
  private _columnApi: ColumnApi;

  constructor(
    private _dataStoreService: DataStoreService,
    private _tableService: TableService,
    private _router: Router,
  ) { }

  buttons = getClasificacion(this._dataStoreService.getDataTable.clasificationType).buttons;
  showTable = true;

  onGridReady = (params: GridReadyEvent) => {
    this._gridApi = params.api;
    console.log(this._gridApi);

    this._columnApi = params.columnApi;
    // var defaultSortModel: ColumnState[] = [
    //   { colId: this._dataTable.dataPropertyTable.codField, sort: 'asc', sortIndex: 0 },
    // ];
    // params.columnApi.applyColumnState({ state: defaultSortModel });
  }

  // clickButton(button: IButtonClasification): void {
  //   // const selectedCodeRowFirstLevel = this.tableAg.selectedCodeRowFirstLevel;
  //   const selectedRows = this.agGrid.api.getSelectedNodes();

  //   console.log(button);

  //   // if (selectedCodeRowFirstLevel) {
  //   if (selectedRows) {
  //     this.showTable = false;
  //     // this._dataStoreService.selectedCodeRowFirstLevel = selectedCodeRowFirstLevel;
  //     // this._dataStoreService.selectedCodeRowFirstLevel = selectedRows;

  //     const dataPropertyTable = getClasificacion('gastosProgramaProgramas');
  //     const useStarWitch: boolean = dataPropertyTable.useStarWitch;
  //     const attribute: string = dataPropertyTable.attribute;
  //     this._tableService.loadDataForTypeClasification(
  //       false,
  //       'gastosProgramaProgramas',
  //       { valueFilter: this._dataStoreService.selectedCodeRowFirstLevel.split(" ")[0], attribute, useStarWitch })
  //       .then(() => {
  //         setTimeout(() => {
  //           this.buttons = dataPropertyTable.buttons;
  //           this.showTable = true;
  //         }, 100);

  //       });
  //   }
  // }

  async detalle(button: IButtonClasification) {
    await this._tableService.loadDataForTypeClasification(
      false,
      button.clasificationType);
    this.reloadCurrentRoute()
  }

  reloadCurrentRoute() {
    let currentUrl = this._router.url;
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate([currentUrl]);
    });
  }

}
