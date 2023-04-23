import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { getClasificacion } from '../../../data-table';

import { IDataGraph } from '../../../../commons/interfaces/dataGraph.interface';
import { IDataTable } from '../../../../commons/interfaces/dataTable.interface';
import { IButtonAdicional, IButtonClasification } from '../../model/components.interface';

import { ChangeSubTabService } from '../../../../services/change-subtab.service';
import { DataStoreService } from '../../../../services/dataStore.service';
import { HasRowClicked } from '../../../../services/hasRowClicked.service';
import { SelectedTabService } from '../../../../services/selectedTab.service';
import { TableService } from '../../../../services/table.service';

import { CLASIFICATION_TYPE } from '../../../../commons/util/util';

@Component({
    selector: 'app-subtabs',
    templateUrl: './subtabs.component.html',
    styleUrls: ['./subtabs.component.scss'],
})
export class SubtabsComponent implements OnInit {
    @Input() clasificationType: CLASIFICATION_TYPE;
    @Output() clickButton = new EventEmitter<IDataTable>();

    public buttons: IButtonClasification[] = [];
    public buttonsAdditional: IButtonAdicional[] = [];
    public hasRowClicked$ = this._hasRowClicked.currentHasRowClicked;
    public isDisabled = true;
    // public showTable = true;

    private _clasificationType: CLASIFICATION_TYPE;
    private _dataGraph: IDataGraph = {} as IDataGraph;
    private _dataTable: IDataTable;
    private _row: string = '';
    private _tabSelected: number;

    constructor(
        private _router: Router,
        private _changeSubTabService: ChangeSubTabService,
        private _dataStoreService: DataStoreService,
        private _hasRowClicked: HasRowClicked,
        private _tableService: TableService,
        private _selectedTabService: SelectedTabService
    ) {}

    async ngOnInit(): Promise<void> {
        const clasification = getClasificacion(this.clasificationType);
        this.buttons = clasification.buttons;
        this.buttonsAdditional = clasification.buttonsAdditional;
    }

    async click(event: IButtonClasification): Promise<void> {
        const button: IButtonClasification = this.buttons.find(
            (button: IButtonClasification) => button.key === event.key
        );

        await this._existButton(button);
        this.clickButton.emit(this._dataTable);
        this._changeSubTabService.changeSubTab(button.codigo, button.descripcion);
        this._clasificationType = button.clasificationType;
    }

    clickButtonAditional(event: IButtonAdicional) {
        // agregar logica para cargar el frafico "showGraph()"
        const path = event.param ? event.path + '/' + event.param : event.path;
        this._router.navigateByUrl(path);
    }

    private async _existButton(button: IButtonClasification) {
        this.buttons.forEach((b) => (b.selected = false));
        this._selectedTabService.source$.subscribe((value) => {
            this._tabSelected = value;
        });
        // console.log(button.name);

        // switch (this._tabSelected) {
        //     // case 1:
        //     //     this._selectedSubTab1Service.setSelectedSubTab1(button.name);
        //     //     break;
        //     case 2:
        //         this._selectedSubTab2Service.setSelectedSubTab2(button.name);
        //         break;
        //     case 4:
        //         this._selectedSubTab4Service.setSelectedSubTab4(button.name);
        //         break;
        //     default:
        //         break;
        // }

        button.selected = true;
        this._dataTable = await this._tableService.loadData(button.clasificationType);
    }

    async showGraph(path: string) {
        const dataTable = await this._tableService.loadData(this._dataStoreService.dataTable.clasificationType);
        this.hasRowClicked$.subscribe((value) => {
            this._row = value;
        });

        // this._dataGraph.rowDataGastos = dataTable.rowDataGastos;
        // this._dataGraph.clasificationType = this._clasificationType;
        this._router.navigateByUrl('/graphGastos').then(() => {
            this._dataStoreService.setData({
                ...this._dataStoreService.dataGraph,
                graphSubTitle: this._row.split(' ')[0],
            });
        });
        this._dataStoreService.selectedCodeRowFirstLevel = '';
    }
}
