import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IDataGraph } from '../commons/interfaces/dataGraph.interface';
import { IDataTable } from '../commons/interfaces/dataTable.interface';
import { IDataTotalesPresupuesto } from '../commons/interfaces/dataTotalesPresupuesto. interface';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  private _dataSource = new Subject<IDataGraph>();
  dataSource$ = this._dataSource.asObservable();

  private _data: IDataTable;
  private _dataGraph: IDataGraph;
  private _selectedCodeRow: string;
  private _dataGraphTree: any[];
  private _graphTitle: string;
  private _selectedCodeRowFirstLevel: string;
  private _IsDetails = false;
  private _dataTotalesPresupuesto: IDataTotalesPresupuesto

  private _dataTreemap: any;

  get getDataTable(): IDataTable {
    return this._data
  }

  set setDataTable(data: IDataTable) {
    this._data = data
    // console.log('DataStoreServic data que entra como parametro', data);
    // console.log('DataStoreServic._dataSource', this._dataSource);
    // console.log('DataStoreServic._dataSource', this._data);
  }

  set setDataGraph(data: IDataGraph) {
    this._dataGraph = data
  }

  get dataGraph(): IDataGraph {
    return this._dataGraph
  }

  set dataGraph(data: IDataGraph) {
    this._dataGraph = data
  }

  set graphTitle(graphTitle: string) {
    this._graphTitle = graphTitle
  }

  get graphTitle(): string {
    return this._graphTitle
  }

  get selectedCodeRow(): string {
    return this._selectedCodeRow
  }

  set selectedCodeRow(code: string) {
    this._selectedCodeRow = code
  }

  get dataGraphTree(): any[] {
    return this._dataGraphTree
  }

  set dataGraphTree(dateGraphTree: any[]) {
    this._dataGraphTree = dateGraphTree
  }

  set selectedCodeRowFirstLevel(codeRow: string) {
    this._selectedCodeRowFirstLevel = codeRow;
  }

  get selectedCodeRowFirstLevel(): string {
    return this._selectedCodeRowFirstLevel
  }

  set IsDetails(state: boolean) {
    this._IsDetails = state;
  }

  get IsDetails(): boolean {
    return this._IsDetails
  }

  set setDataTotalesPresupuesto(data: IDataTotalesPresupuesto) {
    this._dataTotalesPresupuesto = data
  }

  get getDataTotalesPresupuesto(): IDataTotalesPresupuesto {
    return this._dataTotalesPresupuesto
  }

  set setDataTreemap(data: any) {
    this._dataTreemap = data
  }

  get getDataTreemap(): any {
    return this._dataTreemap
  }

  setData(data: IDataGraph) {
    this._dataSource.next(data)
  }
}
