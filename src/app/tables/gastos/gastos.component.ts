import { Component, ViewChild, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

import { AgGridAngular } from 'ag-grid-angular';
import { ColumnApi, GridApi, GridReadyEvent, ColumnState } from "ag-grid-community";

import { DataStoreService } from '../../services/dataStore.service';
import { PrepareDataTreemapService } from '../../services/prepareDataTreemap.service';
import { TableService } from '../../services/table.service';

import { IButtonClasification } from './model/components.interface';
import { getClasificacion } from '../data-table';
import { IDataTable } from '../../commons/interfaces/dataTable.interface';
import { CLASIFICATION_TYPE } from '../../commons/util/util';
import { Router } from '@angular/router';
import { IDataGraph } from '../../commons/interfaces/dataGraph.interface';
import { HasDataChangeService } from '../../services/hasDataChange.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.scss']
})
export class GastosComponent implements OnDestroy {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  @Input() hasTitle: boolean = true;
  @Output() clickDetalle = new EventEmitter<void>();
  private _gridApi: GridApi;
  private _columnApi: ColumnApi;
  private _dataTable: IDataTable;
  private _tabselected = 'Por capítulo gasto';
  private _dataGraph: IDataGraph = {} as IDataGraph;
  buttons = getClasificacion(this._dataStoreService.dataTable.clasificationType).buttons;
  buttonsAdditional = getClasificacion(this._dataStoreService.dataTable.clasificationType).buttonsAdditional;
  showTable = true;
  event: Event;
  private subscription: Subscription;
  public hasDataChange: boolean;

  constructor(
    private _dataStoreService: DataStoreService,
    private _tableService: TableService,
    private _prepareDataTreemapService: PrepareDataTreemapService,
    private _router: Router,
    private hasDataChangeService: HasDataChangeService
  ) {
    this.subscription = this.hasDataChangeService.currentHasDataChange.subscribe(hasDataChange => this.hasDataChange = hasDataChange);
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onChange(event: Event) {
    // console.log('event =>', event);
    this.event = event;
    this.detalle(event);
  }

  onGridReady = (params: GridReadyEvent) => {
    console.clear();
    console.log('onGridReady');

    this._gridApi = params.api;
    this._columnApi = params.columnApi;
    let defaultSortModel: ColumnState[] = [
      { colId: this._dataTable.dataPropertyTable.codField, sort: 'asc', sortIndex: 0 },
    ];
    params.columnApi.applyColumnState({ state: defaultSortModel });
  }

  async detalle(event: Event) {
    let tipoClasificacion: CLASIFICATION_TYPE = 'gastosEconomicaCapitulos'
    this.clickDetalle.emit();
    const target = event.target as HTMLButtonElement;
    // console.log('target =>', target.textContent.trim());


    // tengo que saber de que pestaña viene el evento para cargar una tipoClasificacion u otro.
    // switch (this._tabselected) {
    //   case 'Por capítulo gasto':
    //     tipoClasificacion = 'gastosEconomicaCapitulos';
    //     break;
    //   case 'Por artículo':
    //     tipoClasificacion = 'gastosEconomicaArticulos';
    //     break;
    //   case 'Por concepto':
    //     tipoClasificacion = 'gastosEconomicaConceptos';
    //     break;
    //   case 'Por económico':
    //     tipoClasificacion = 'gastosEconomicaEconomicos';
    //     break;
    // }

    // console.log('tipoClasificacion =>', tipoClasificacion);
    // this._dataTable = await this._tableService.loadData(tipoClasificacion);

    // switch (target.textContent.trim()) {
    //   case 'Gráfico detalladado':
    //     this.showGraph();
    //     break;
    //   case 'Detalle del programa seleccionado':
    //     this._router.navigate(['tableProgramaDetails']);
    //     break;
    //   case 'Programas que componen orgánico seleccionado':
    //     this._router.navigate(['/tableGrupoProgramaDetails', 'organico'])
    //     break;
    //   case 'Programas que gastan del elemento seleccionado':
    //     this._router.navigate(['/tableGrupoProgramaDetails', 'gastan'])
    //     break;
    // }




    // if (target.textContent.trim() === 'Programas que gastan del elemento seleccionado') {
    //   // console.log('Programas que gastan del elemento seleccionado');
    //   // console.log('tabselected =>', this._tabselected);

    //   // tengo que saber de que pestaña viene el evento para cargar una tipoClasificacion u otro.
    //   switch (this._tabselected) {
    //     case 'Por capítulo gasto':
    //       tipoClasificacion = 'gastosEconomicaCapitulos';
    //       break;
    //     case 'Por artículo':
    //       tipoClasificacion = 'gastosEconomicaArticulos';
    //       break;
    //     case 'Por concepto':
    //       tipoClasificacion = 'gastosEconomicaConceptos';
    //       break;
    //     case 'Por económico':
    //       tipoClasificacion = 'gastosEconomicaEconomicos';
    //       break;
    //   }

    //   console.log('tipoClasificacion =>', tipoClasificacion);

    //   this._dataTable = await this._tableService.loadData(tipoClasificacion);


    //   // console.log('this._dataTable =>', this._dataTable);
    //   // console.log('codField =>', this._dataTable.dataPropertyTable.codField);

    //   // // let tipoClasificacion: CLASIFICATION_TYPE = 'gastosEconomicaCapitulos';
    //   // this._dataTable = await this._tableService.loadData(
    //   //   'gastosEconomicaCapitulos');
    // } else {

    //   if (target.textContent.trim() === 'Programas que componen orgánico seleccionado') {
    //     this._router.navigate(['/tableGrupoProgramaDetails', 'organico'])

    //   }






    //   // console.log('target =>', target.textContent.trim());
    //   this._tabselected = target.textContent.trim();
    //   // console.log('tabselected =>', this._tabselected);
    // }










    // const button: IButtonClasification = this.buttons.find((button: IButtonClasification) => button.name === target.innerText);
    // // console.log('button.clasificationType', button);

    // if (button) {
    //   // Unicamente si se ha pulsado un boton que necesita actualización de la data, 
    //   // no grafico por ejemplo, que llaman a otros componentes.
    //   const dataPropertyTable = getClasificacion(button.clasificationType);

    //   if (this._dataStoreService.selectedCodeRowFirstLevel) {
    //     const useStarWitch: boolean = dataPropertyTable.useStarWitch;
    //     const attribute: string = dataPropertyTable.attribute;
    //     this._dataTable = await this._tableService.loadData(
    //       button.clasificationType,
    //       { valueFilter: this._dataStoreService.selectedCodeRowFirstLevel.split(" ")[0], attribute, useStarWitch });
    //   } else {
    //     this._dataTable = await this._tableService.loadData(
    //       button.clasificationType);
    //   }

    //   this._dataStoreService.selectedCodeRowFirstLevel = '';

    //   // console.log('Actualizo datos treemap en función del boton pulsado');
    //   await this._prepareDataTreemapService.calcSeries(
    //     this._dataTable.rowDataGastos,
    //     getClasificacion(this._dataTable.clasificationType).codField,
    //     getClasificacion(this._dataTable.clasificationType).desField,
    //     'Definitivas2022'
    //   );

    //   this.buttons = getClasificacion(this._dataStoreService.dataTable.clasificationType).buttons;

    //   this.showTable = false;
    //   setTimeout(() => {
    //     this.showTable = true;
    //   }, 500);
    // }
  }

  showGraph() {
    // const selectedRows = this.agGrid.api.getSelectedNodes();
    // this._dataStoreService.selectedCodeRow = selectedRows[0].key;
    // const codigoSearch = this.dataStoreService.selectedCodeRowFirstLevel.split(" ")[0];
    this._dataGraph.rowDataGastos = this._dataTable.rowDataGastos
    this._router.navigateByUrl("/graphGastos").then(() => {
      this._dataStoreService.setData(
        {
          ...this._dataStoreService.dataGraph, graphSubTitle: this._dataStoreService.selectedCodeRowFirstLevel.split(" ")[0]
        }
      );
    })
    this._dataStoreService.selectedCodeRowFirstLevel = '';
  }
}


