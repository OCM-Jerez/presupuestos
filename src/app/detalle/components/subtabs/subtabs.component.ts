import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

// import { getClasificacion } from '../../../data-table';
import { getClasificacion } from '@app/data-table';

import { ChangeSubTabService } from '@services/change-subtab.service';
import { DataStoreService } from '@services/dataStore.service';
import { HasRowClicked } from '@services/hasRowClicked.service';
import { SelectedTabService } from '@services/selectedTab.service';
import { TableService } from '@services/table.service';

import { IButtonAdicional } from '@interfaces/buttonAdicional.interface';
import { IButtonClasification } from '@interfaces/buttonClasification.interface';
import { IDataGraph } from '@interfaces/dataGraph.interface';
import { IDataTable } from '@interfaces/dataTable.interface';

import { CLASIFICATION_TYPE } from '@appTypes/clasification.type';
import { SelectedSubTab1Service } from '@services/selectedSubTab1.service';
import { SelectedSubTab2Service } from '@services/selectedSubTab2.service';
import { SelectedSubTab4Service } from '@services/selectedSubTab4.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
    selector: 'app-subtabs',
    templateUrl: './subtabs.component.html',
    styleUrls: ['./subtabs.component.scss'],
})
export class SubtabsComponent implements OnInit, OnDestroy {
    // @Input() clasificationType: CLASIFICATION_TYPE;
    @Output() clickButton = new EventEmitter<IDataTable>();
    public dataTable: IDataTable;

    public buttons: IButtonClasification[] = [];
    public buttonsAdditional: IButtonAdicional[] = [];
    public hasRowClicked$ = this._hasRowClicked.currentHasRowClicked;
    public isDisabled = true;
    private _clasificationType: CLASIFICATION_TYPE;
    private _dataGraph: IDataGraph = {} as IDataGraph;
    private _dataTable: IDataTable;
    private _row: string = '';
    private _tabSelected: number;
    private _unsubscribe$ = new Subject<void>();
    private _subTabSelectd1: string;
    private _subTabSelectd2: string;
    private _subTabSelectd4: string;

    constructor(
        private _router: Router,
        private _changeSubTabService: ChangeSubTabService,
        private _dataStoreService: DataStoreService,
        private _hasRowClicked: HasRowClicked,
        private _selectedTabService: SelectedTabService,
        private _tableService: TableService,
        private _selectedSubTab1Service: SelectedSubTab1Service,
        private _selectedSubTab2Service: SelectedSubTab2Service,
        private _selectedSubTab4Service: SelectedSubTab4Service
    ) {}

    async ngOnInit(): Promise<void> {
        this._clasificationType = 'ingresosEconomicaEconomicos';
        const clasification = getClasificacion(this._clasificationType);
        this.buttons = clasification.buttons;
        this.buttonsAdditional = clasification.buttonsAdditional;
        this.subscribeToServices();
    }

    ngOnDestroy() {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }

    async click(event: IButtonClasification): Promise<void> {
        const button: IButtonClasification = this.buttons.find(
            (button: IButtonClasification) => button.key === event.key
        );

        await this._existButton(button);
        this.clickButton.emit(this._dataTable);
        this._changeSubTabService.changeSubTab(button.codigo, button.descripcion);
        this._clasificationType = button.clasificationType;

        // this.dataTable = { ...dataTable };

        // Guardar el subtab seleccionado
        switch (this._tabSelected) {
            case 1:
                switch (this.dataTable.clasificationType) {
                    case 'ingresosEconomicaCapitulos':
                        this._selectedSubTab1Service.setSelectedSubTab1('ingresosEconomicaCapitulos');
                        break;
                    case 'ingresosEconomicaArticulos':
                        this._selectedSubTab1Service.setSelectedSubTab1('ingresosEconomicaArticulos');
                        break;
                    case 'ingresosEconomicaConceptos':
                        this._selectedSubTab1Service.setSelectedSubTab1('ingresosEconomicaConceptos');
                        break;
                    case 'ingresosEconomicaEconomicos':
                        this._selectedSubTab1Service.setSelectedSubTab1('ingresosEconomicaEconomicos');
                        break;
                }
                break;
            case 2:
                switch (this.dataTable.clasificationType) {
                    case 'gastosProgramaAreas':
                        this._selectedSubTab1Service.setSelectedSubTab1('gastosProgramaAreas');
                        break;
                    case 'gastosProgramaPoliticas':
                        this._selectedSubTab1Service.setSelectedSubTab1('gastosProgramaPoliticas');
                        break;
                    case 'gastosProgramaGrupos':
                        this._selectedSubTab1Service.setSelectedSubTab1('gastosProgramaGrupos');
                        break;
                    case 'gastosProgramaProgramas':
                        this._selectedSubTab1Service.setSelectedSubTab1('gastosProgramaProgramas');
                        break;
                }
                break;
            case 3:
                break;
            case 4:
                switch (this.dataTable.clasificationType) {
                    case 'gastosEconomicaCapitulos':
                        this._selectedSubTab1Service.setSelectedSubTab1('gastosEconomicaCapitulos');
                        break;
                    case 'gastosEconomicaArticulos':
                        this._selectedSubTab1Service.setSelectedSubTab1('gastosEconomicaArticulos');
                        break;
                    case 'gastosEconomicaConceptos':
                        this._selectedSubTab1Service.setSelectedSubTab1('gastosEconomicaConceptos');
                        break;
                    case 'gastosEconomicaEconomicos':
                        this._selectedSubTab1Service.setSelectedSubTab1('gastosEconomicaEconomicos');
                        break;
                }
                break;
        }
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

        button.selected = true;
        this._dataTable = await this._tableService.loadData(button.clasificationType);
    }

    subscribeToServices(): void {
        this._selectedSubTab1Service.source$.subscribe((data) => {
            this._subTabSelectd1 = data;
        });

        this._selectedSubTab2Service.source$.subscribe((data) => {
            this._subTabSelectd2 = data;
        });

        this._selectedSubTab4Service.source$.subscribe((data) => {
            this._subTabSelectd4 = data;
        });

        this._selectedTabService.source$
            .pipe(
                tap((data) => {
                    this._tabSelected = data;
                })
            )
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe();

        // this._changeSubTabService.source$
        //     .pipe(
        //         tap((data) => {
        //             this._codField = data.codField;
        //             this._desField = data.desField;
        //             this.setFields();
        //         })
        //     )
        //     .pipe(takeUntil(this._unsubscribe$))
        //     .subscribe();
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
