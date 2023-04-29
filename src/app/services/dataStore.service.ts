import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { IDataGraph } from '@interfaces/dataGraph.interface';
import { IDataTable } from '@interfaces/dataTable.interface';
import { IDataTotalesPresupuesto } from '@interfaces/dataTotalesPresupuesto.interface';

@Injectable({
    providedIn: 'root',
})
export class DataStoreService {
    private _dataSource = new Subject<IDataGraph>();
    dataSource$ = this._dataSource.asObservable();

    private _data: IDataTable;
    private _dataGraph: IDataGraph;
    private _selectedCodeRow: string;
    private _dataGraphTree: any[];
    private _selectedCodeRowFirstLevel: string;
    private _IsDetails = false;
    private _dataTotalesPresupuesto: IDataTotalesPresupuesto;
    private _dataTreemap: any;

    set dataTable(data: IDataTable) {
        this._data = data;
    }

    get dataTable(): IDataTable {
        return this._data;
    }

    setData(data: IDataGraph) {
        this._dataSource.next(data);
    }

    set dataGraph(data: IDataGraph) {
        this._dataGraph = data;
    }

    get dataGraph(): IDataGraph {
        return this._dataGraph;
    }

    set selectedCodeRow(code: string) {
        this._selectedCodeRow = code;
    }

    get selectedCodeRow(): string {
        return this._selectedCodeRow;
    }

    set dataGraphTree(dateGraphTree: any[]) {
        this._dataGraphTree = dateGraphTree;
    }

    get dataGraphTree(): any[] {
        return this._dataGraphTree;
    }

    set selectedCodeRowFirstLevel(codeRow: string) {
        this._selectedCodeRowFirstLevel = codeRow;
    }

    get selectedCodeRowFirstLevel(): string {
        return this._selectedCodeRowFirstLevel;
    }

    set IsDetails(state: boolean) {
        this._IsDetails = state;
    }

    get IsDetails(): boolean {
        return this._IsDetails;
    }

    set dataTotalesPresupuesto(data: IDataTotalesPresupuesto) {
        this._dataTotalesPresupuesto = data;
    }

    get dataTotalesPresupuesto(): IDataTotalesPresupuesto {
        return this._dataTotalesPresupuesto;
    }

    set dataTreemap(data: any) {
        this._dataTreemap = data;
    }

    get dataTreemap(): any {
        return this._dataTreemap;
    }
}
