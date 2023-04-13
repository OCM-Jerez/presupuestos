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
import { TabStateService } from '../../../../services/tabState.service';
import { TableService } from '../../../../services/table.service';

import { CLASIFICATION_TYPE } from '../../../../commons/util/util';
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
    private _clasificationType: CLASIFICATION_TYPE;

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
        private _hasDataChangeService: HasDataChangeService,
        private _selectedButtonService: SelectedButtonService,
        private _tabStateService: TabStateService,
        private _changeSubTabService: ChangeSubTabService
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
        button.selected = true;
        this._dataTable = await this._tableService.loadData(button.clasificationType);
        this._selectedButtonService.setSelectedButton({
            clasificationType: button.clasificationType,
            name: button.name,
            selected: true,
        });

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
        this._dataGraph.clasificationType = this._clasificationType;
        this._router.navigateByUrl('/graphGastos').then(() => {
            this._dataStoreService.setData({
                ...this._dataStoreService.dataGraph,
                graphSubTitle: this.row.split(' ')[0],
            });
        });
        this._dataStoreService.selectedCodeRowFirstLevel = '';
    }
}
