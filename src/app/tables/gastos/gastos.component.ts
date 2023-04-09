import { Component, Input, OnInit } from '@angular/core';
import { IDataTable } from '../../commons/interfaces/dataTable.interface';
import { CLASIFICATION_TYPE } from '../../commons/util/util';
import { HasDataChangeService } from '../../services/hasDataChange.service';
import { TableService } from '../../services/table.service';

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
}
