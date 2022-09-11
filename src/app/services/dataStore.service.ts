import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IDataGraph } from '../commons/interfaces/dataGraph.interface';
import { IDataTable } from '../commons/interfaces/dataTable.interface';

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
  private _IsDetails: boolean;

  get getDataTable(): IDataTable {
    return this._data
  }

  set setDataTable(data: IDataTable) {
    this._data = data
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

  setData(data: IDataGraph) {
    this._dataSource.next(data)
  }
}
