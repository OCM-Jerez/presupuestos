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
import { CLASIFICATION_TYPE } from '../../commons/util/util';
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
  // @Input() buttonsHide: string[] = [];
  @Input() hasTitle: boolean = true;
  // @Input() hasMenu: boolean = true;
  // @Input() hasGrafico: boolean = true;
  // @Input() hasDetalleOrganico: boolean = true;
  // @Input() hasDetalleEconomico: boolean = true;
  // public hasGraficoButton = true;
  // public hasGraphTree = true;
  // public hasMenuButton = true;
  private _gridApi: GridApi;
  private _columnApi: ColumnApi;
  private _dataTable: IDataTable;
  buttons = getClasificacion(this._dataStoreService.dataTable.clasificationType).buttons;
  buttonsAdditional = getClasificacion(this._dataStoreService.dataTable.clasificationType).buttonsAdditional;
  showTable = true;
  event: Event;
  // hasRowSelected: boolean = false;
  /* #endregion */

  constructor(
    private _dataStoreService: DataStoreService,
    private _tableService: TableService,
    private _prepareDataTreemapService: PrepareDataTreemapService
  ) { }

  onChange(event: Event) {
    this.event = event;
    this.detalle(event);
  }

  // onChangeRowSelected(hasRowSelected: boolean) {
  //   console.log('hasRowSelected', hasRowSelected);
  //   hasRowSelected = hasRowSelected;
  // }

  ngOnInit(): void {
    // this._hideButtons();
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
    this.clickDetalle.emit();
    const target = event.target as HTMLButtonElement;
    const button: IButtonClasification = this.buttons.find((button: IButtonClasification) => button.name === target.innerText);
    // console.log('  button.clasificationType', button);
    // debugger;
    if (button) {   // Unicamente si se ha pulsado un boton que necesita actualización de la data, 
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
        // this._hideButtons()
        this.showTable = true;
      }, 500);
    }
  }

  // private _hideButtons() {
  //   this.buttons.forEach(() => {
  //     for (const key in this.buttons) {
  //       if (this.buttonsHide.includes(this.buttons[key].name)) {
  //         this.buttons.splice(parseInt(key), 1);
  //       }
  //     }
  //   });
  // }

  // para usar esta opcion hay que descomentar la linea 48 de table-gastos.component.ts
  async detalle1(event: Event) {
    this.clickDetalle.emit();
    const target = event.target as HTMLButtonElement;

    if (target.textContent.trim() === 'Orgánico') {
      console.log('Orgánico');
      let tipoClasificacion: CLASIFICATION_TYPE = 'gastosProgramaProgramas';
      this._dataTable = (await this._tableService.loadData(tipoClasificacion))
      this._dataTable.rowDataGastos = this._dataTable.rowDataGastos.filter(x => x.CodOrg == this._dataStoreService.selectedCodeRowFirstLevel.split(" ")[0]);

      const sendDataTable: IDataTable = {
        dataPropertyTable: {
          headerName: '',
          subHeaderName: '',
          codField: 'CodPro',
          desField: 'DesPro',
          width: 500,
          graphTitle: '',
          attribute: '',
          useStarWitch: false
        },
        clasificationType: 'gastosProgramaProgramas',
        rowDataGastos: this._dataTable.rowDataGastos,
        rowDataIngresos: []
      }

      // console.log('this._dataTable= ', this._dataTable);
      console.log('sendDataTable= ', sendDataTable);
      this._dataStoreService.dataTable = sendDataTable;
    } else {
      const button: IButtonClasification = this.buttons.find((button: IButtonClasification) => button.name === target.innerText);

      if (button) {   // Unicamente si se ha pulsado un boton que necesita actualización de la data,
        // no grafico por ejemplo, que llaman a otros componentes.

        console.log('has pulsado el boton: ', target.innerText);
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
        this.buttonsAdditional = getClasificacion(this._dataStoreService.dataTable.clasificationType).buttonsAdditional;

        const sendDataTable: IDataTable = {
          dataPropertyTable: {
            headerName: '',
            subHeaderName: '',
            codField: dataPropertyTable.codField,
            desField: dataPropertyTable.desField,
            width: 500,
            graphTitle: '',
            attribute: dataPropertyTable.attribute,
            useStarWitch: dataPropertyTable.useStarWitch
          },
          clasificationType: this._dataTable.clasificationType,
          rowDataGastos: this._dataTable.rowDataGastos,
          rowDataIngresos: []
        }

        // console.log('this._dataTable= ', this._dataTable);
        console.log('sendDataTable= ', sendDataTable);
        this._dataStoreService.dataTable = sendDataTable;

      }

    }
    this.showTable = false;
    setTimeout(() => {
      // this._hideButtons()
      this.showTable = true;
    }, 500);
  }



}


