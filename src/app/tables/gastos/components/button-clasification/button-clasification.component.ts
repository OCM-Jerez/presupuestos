import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { IDataGraph } from '../../../../commons/interfaces/dataGraph.interface';
import { IDataTable } from '../../../../commons/interfaces/dataTable.interface';
import { IButtonClasification } from '../../model/components.interface';

import { DataStoreService } from '../../../../services/dataStore.service';
import { HasDataChangeService } from '../../../../services/hasDataChange.service';
import { HasRowClicked } from '../../../../services/hasRowClicked.service';
import { PrepareDataTreemapService } from '../../../../services/prepareDataTreemap.service';
import { SelectedButtonService } from '../../../../services/selectedButton.service';
import { TabStateService } from '../../../../services/tabState.service';
import { TableService } from '../../../../services/table.service';

import { CLASIFICATION_TYPE } from '../../../../commons/util/util';
import { ChangeSubTabService } from '../../../../services/change-subtab.service';
import { getClasificacion } from '../../../data-table';

@Component({
    selector: 'app-button-clasification',
    templateUrl: './button-clasification.component.html',
    styleUrls: ['./button-clasification.component.scss'],
})
export class ButtonClasificationComponent implements OnInit {
    @Input() clasificationType: CLASIFICATION_TYPE;
    @Output() clickButton = new EventEmitter<IDataTable>();

    private _dataTable: IDataTable;
    private _dataGraph: IDataGraph = {} as IDataGraph;
    private row: string = '';
    public showTable = true;
    public buttons: IButtonClasification[] = [];
    public buttonsAdditional: string[] = [];
    public hasRowClicked$ = this._hasRowClicked.currentHasRowClicked;
    isDisabled = true;

    constructor(
        private _router: Router,
        private _hasRowClicked: HasRowClicked,
        private _tableService: TableService,
        private _dataStoreService: DataStoreService,
        private _prepareDataTreemapService: PrepareDataTreemapService,
        private _hasDataChangeService: HasDataChangeService,
        private _selectedButtonService: SelectedButtonService,
        private _tabStateService: TabStateService,
        private _changeTabService: ChangeSubTabService
    ) {
        console.log(this._dataStoreService.dataTable);

        // const clasification = getClasificacion(this._dataStoreService.dataTable.clasificationType);
        // console.log('clasificationType', this._dataStoreService.dataTable.clasificationType);
        // console.log('clasification', clasification);

        // this.buttons = clasification.buttons;
        // console.log('this.buttons', this.buttons);

        // this.buttonsAdditional = clasification.buttonsAdditional;
        // this._loadDataFromTab();
    }
    async ngOnInit(): Promise<void> {
        const clasification = getClasificacion(this.clasificationType);
        this.buttons = clasification.buttons;
        this.buttonsAdditional = clasification.buttonsAdditional;
    }

    private async _loadDataFromTab() {
        // const tab = this._tabStateService.getTabState();
        // console.log('tab', tab);
        // if (tab.subTabSelected) {
        //     const button = this.buttons.find((button) => button.name === tab.subTabSelected);
        //     await this._existButton(button);
        // }
    }

    async click(event: Event): Promise<void> {
        const target = event.target as HTMLButtonElement;
        const button: IButtonClasification = this.buttons.find(
            (button: IButtonClasification) => button.name === target.innerText
        );

        if (button) {
            await this._existButton(button);
            this.clickButton.emit(this._dataTable);
            this._changeTabService.changeTab(button.codigo, button.descripcion);
        } else {
            switch (
                target.textContent.trim() // Si se pulsa un buttonsAdditional, se navega a la ruta correspondiente
            ) {
                case 'Gráfico detalladado':
                    this._dataTable = await this._tableService.loadData(
                        this._dataStoreService.dataTable.clasificationType
                    );
                    this.showGraph();
                    break;
                case 'Detalle del programa seleccionado':
                    this._router.navigate(['tableProgramaDetails']);
                    break;
                case 'Programas que componen orgánico seleccionado':
                    this._router.navigate(['/tableGrupoProgramaDetails', 'organico']);
                    break;
                case 'Programas que gastan del elemento seleccionado':
                    this._router.navigate(['/tableGrupoProgramaDetails', 'gastan']);
                    break;
            }
        }
    }

    private async _existButton(button: IButtonClasification) {
        this.buttons.forEach((b) => (b.selected = false));
        this._tabStateService.setTabState(button.name);
        button.selected = true;
        this._dataTable = await this._tableService.loadData(button.clasificationType);
        this._selectedButtonService.setSelectedButton({
            clasificationType: button.clasificationType,
            name: button.name,
            selected: true,
        });

        // await this._prepareDataTreemapService.calcSeries(
        //     // Actualizo datos treemap en función del boton pulsado
        //     this._dataTable.rowDataGastos,
        //     getClasificacion(this._dataTable.clasificationType).codField,
        //     getClasificacion(this._dataTable.clasificationType).desField,
        //     'Definitivas2023'
        // );

        this._hasDataChangeService.change(false);
        setTimeout(() => {
            this._hasDataChangeService.change(true);
        }, 5);
    }

    showGraph() {
        this.hasRowClicked$.subscribe((value) => {
            this.row = value;
        });

        this._dataGraph.rowDataGastos = this._dataTable.rowDataGastos;
        this._router.navigateByUrl('/graphGastos').then(() => {
            this._dataStoreService.setData({
                ...this._dataStoreService.dataGraph,
                graphSubTitle: this.row.split(' ')[0],
            });
        });
        this._dataStoreService.selectedCodeRowFirstLevel = '';
    }
}
