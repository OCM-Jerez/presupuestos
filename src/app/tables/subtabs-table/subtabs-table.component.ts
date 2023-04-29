import { Component, Input, OnInit } from '@angular/core';

import { TableService } from '../../services/table.service';

import { IDataTable } from '@interfaces/dataTable.interface';
import { CLASIFICATION_TYPE } from '../../commons/util/util';

@Component({
    selector: 'app-gastos',
    templateUrl: './subtabs-table.component.html',
    styleUrls: ['./subtabs-table.component.scss'],
})
export class GastosComponent implements OnInit {
    @Input() clasification: CLASIFICATION_TYPE;
    dataTable: IDataTable;

    constructor(private _tableService: TableService) {}

    async ngOnInit(): Promise<void> {
        this.dataTable = await this._tableService.loadData(this.clasification);
    }
}
