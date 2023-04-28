import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { IDataTable } from '../commons/interfaces/dataTable.interface';
import { CLASIFICATION_TYPE } from '../commons/util/util';
import { SelectedSubTab1Service } from '../services/selectedSubTab1.service';
import { SelectedSubTab2Service } from '../services/selectedSubTab2.service';
import { SelectedSubTab4Service } from '../services/selectedSubTab4.service';
import { SelectedTabService } from '../services/selectedTab.service';
import { TableService } from '../services/table.service';

@Component({
    selector: 'app-detalle-presupuesto',
    templateUrl: './detalle.component.html',
    styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
    public dataTable: IDataTable;
    private _unsubscribe$ = new Subject<void>();
    private _tabSelected: number;
    private _subTabSelectd1: string;
    private _subTabSelectd2: string;
    private _subTabSelectd4: string;

    constructor(
        private _tableService: TableService,
        private _selectedTabService: SelectedTabService,
        private _selectedSubTab1Service: SelectedSubTab1Service,
        private _selectedSubTab2Service: SelectedSubTab2Service,
        private _selectedSubTab4Service: SelectedSubTab4Service
    ) {}

    async ngOnInit(): Promise<void> {
        this.subscribeToServices();
        this.dataTable = await this._tableService.loadData('ingresosEconomicaEconomicos');
    }

    ngOnDestroy() {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }

    async hasChangeCheckbox() {
        // await this._tableService.loadData(this._typeClasification);
    }

    async clickTab(idTab: number) {
        const tabDataMap = {
            1: 'ingresosEconomicaEconomicos',
            2: 'gastosProgramaProgramas',
            3: 'gastosOrganicaOrganicos',
            4: 'gastosEconomicaEconomicos',
        };

        const clasificationType: CLASIFICATION_TYPE = tabDataMap[idTab];
        this.dataTable = await this._tableService.loadData(clasificationType);
        // Guardar el tab seleccionado
        this._selectedTabService.setSelectedTabNew(idTab);
    }

    clickSubTab(dataTable: IDataTable): void {
        this.dataTable = { ...dataTable };

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

        // console.log('this._tabSelected', this._tabSelected);
        // console.log('this._subTabSelected1', this._subTabSelectd1);
        // console.log('this._subTabSelected2', this._subTabSelectd2);
        // console.log('this._subTabSelected4', this._subTabSelectd4);
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
}
