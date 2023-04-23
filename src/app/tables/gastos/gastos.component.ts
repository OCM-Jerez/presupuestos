import { Component, Input, OnInit } from '@angular/core';

import { HasDataChangeService } from '../../services/hasDataChange.service';
import { TableService } from '../../services/table.service';

import { IDataTable } from '../../commons/interfaces/dataTable.interface';
import { CLASIFICATION_TYPE } from '../../commons/util/util';

@Component({
    selector: 'app-gastos',
    templateUrl: './gastos.component.html',
    styleUrls: ['./gastos.component.scss'],
})
export class GastosComponent implements OnInit {
    @Input() clasification: CLASIFICATION_TYPE;
    hasDataChange$ = this._hasDataChangeService.currentHasDataChange;
    dataTable: IDataTable;

    constructor(private _hasDataChangeService: HasDataChangeService, private _tableService: TableService) {}

    async ngOnInit(): Promise<void> {
        this.dataTable = await this._tableService.loadData(this.clasification);
    }

    clickSubTab(dataTable: IDataTable): void {
        this.dataTable = { ...dataTable };
    }
}
