import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { IDataGraph } from '../../../../commons/interfaces/dataGraph.interface';
import { IDataTable } from '../../../../commons/interfaces/dataTable.interface';
import { IButtonClasification } from '../../model/components.interface';

import { ChangeSubTabService } from '../../../../services/change-subtab.service';
import { DataStoreService } from '../../../../services/dataStore.service';
import { HasDataChangeService } from '../../../../services/hasDataChange.service';
import { HasRowClicked } from '../../../../services/hasRowClicked.service';
import { SelectedButtonService } from '../../../../services/selectedButton.service';
import { TableService } from '../../../../services/table.service';
import { TabStateService } from '../../../../services/tabState.service';

import { CLASIFICATION_TYPE } from '../../../../commons/util/util';
import { SelectedSubTab4Service } from '../../../../services/selectedSubTab4.service';
import { SelectedTabNewService } from '../../../../services/selectedTabNew.service';
import { getClasificacion } from '../../../data-table';

@Component({
    selector: 'app-button-clasification',
    templateUrl: './button-clasification.component.html',
    styleUrls: ['./button-clasification.component.scss'],
})
export class ButtonClasificationComponent implements OnInit {
    @Input() clasificationType: CLASIFICATION_TYPE;
    @Output() clickButton = new EventEmitter<IDataTable>();

    public buttons: IButtonClasification[] = [];
    public buttonsAdditional: string[] = [];
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
        private _hasDataChangeService: HasDataChangeService,
        private _hasRowClicked: HasRowClicked,
        private _selectedButtonService: SelectedButtonService,
        private _tableService: TableService,
        private _tabStateService: TabStateService,
        // private _selectedSubTab1Service: SelectedSubTab1Service,
        // private _selectedSubTab2Service: SelectedSubTab2Service,
        private _selectedSubTab4Service: SelectedSubTab4Service,
        private _selectedTabNewService: SelectedTabNewService
    ) {}

    async ngOnInit(): Promise<void> {
        const clasification = getClasificacion(this.clasificationType);
        this.buttons = clasification.buttons;
        this.buttonsAdditional = clasification.buttonsAdditional;
    }

    async click(event: Event): Promise<void> {
        const target = event.target as HTMLButtonElement;
        const button: IButtonClasification = this.buttons.find(
            (button: IButtonClasification) => button.name === target.innerText
        );

        if (button) {
            // console.log('button', button);

            await this._existButton(button);
            this.clickButton.emit(this._dataTable);
            this._changeSubTabService.changeSubTab(button.codigo, button.descripcion);

            this._clasificationType = button.clasificationType;
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
        this._selectedTabNewService.source$.subscribe((value) => {
            this._tabSelected = value;
        });
        // console.log(button.name);

        switch (this._tabSelected) {
            // case 1:
            //     this._selectedSubTab1Service.setSelectedSubTab1(button.name);
            //     break;
            // case 2:
            //     this._selectedSubTab2Service.setSelectedSubTab2(button.name);
            //     break;
            case 4:
                this._selectedSubTab4Service.setSelectedSubTab4(button.name);
                break;
            default:
                break;
        }

        button.selected = true;
        this._dataTable = await this._tableService.loadData(button.clasificationType);
        this._selectedButtonService.setSelectedButton({
            clasificationType: button.clasificationType,
            name: button.name,
            selected: true,
        });

        // console.log('this._dataTable', this._dataTable);

        this._hasDataChangeService.change(false);
        setTimeout(() => {
            this._hasDataChangeService.change(true);
        }, 5);
    }

    showGraph() {
        this.hasRowClicked$.subscribe((value) => {
            this._row = value;
        });

        this._dataGraph.rowDataGastos = this._dataTable.rowDataGastos;
        this._dataGraph.clasificationType = this._clasificationType;
        this._router.navigateByUrl('/graphGastos').then(() => {
            this._dataStoreService.setData({
                ...this._dataStoreService.dataGraph,
                graphSubTitle: this._row.split(' ')[0],
            });
        });
        this._dataStoreService.selectedCodeRowFirstLevel = '';
    }
}
