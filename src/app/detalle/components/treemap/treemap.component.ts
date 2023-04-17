import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { ChangeSubTabService } from '../../../services/change-subtab.service';
import { DataStoreService } from '../../../services/dataStore.service';
import { PrepareDataTreemapService } from '../../../services/prepareDataTreemap.service';
import { SelectedSubTab1Service } from '../../../services/selectedSubTab1.service';
import { SelectedSubTab2Service } from '../../../services/selectedSubTab2.service';
import { SelectedSubTab4Service } from '../../../services/selectedSubTab4.service';
import { SelectedTabNewService } from '../../../services/selectedTabNew.service';

import { IDataTreemap } from '../../../commons/interfaces/dataTreemap.interface';

import * as Highcharts from 'highcharts';
import HighchartsTreemap from 'highcharts/modules/treemap';
import { IDataTable } from '../../../commons/interfaces/dataTable.interface';
import { TableService } from '../../../services/table.service';
HighchartsTreemap(Highcharts);
@Component({
    selector: 'app-treemap',
    templateUrl: './treemap.component.html',
    styleUrls: ['./treemap.component.scss'],
})
export class TreemapComponent implements OnInit {
    private _dataTable: IDataTable;
    private _dataTreeMap: IDataTreemap;
    private _tabSelected: number;
    private _subTabSelectd1: string;
    private _subTabSelectd2: string;
    private _subTabSelectd4: string;
    private _codField: string;
    private _desField: string;
    private _fields = { codigo: '', descripcion: '' };
    private _unsubscribe$ = new Subject<void>();

    constructor(
        private _changeSubTabService: ChangeSubTabService,
        private _dataStoreService: DataStoreService,
        private _prepareDataTreemapService: PrepareDataTreemapService,
        private _selectedSubTab1Service: SelectedSubTab1Service,
        private _selectedSubTab2Service: SelectedSubTab2Service,
        private _selectedSubTab4Service: SelectedSubTab4Service,
        private _selectedTabNewService: SelectedTabNewService,
        private _tableService: TableService
    ) {}

    ngOnInit() {
        this.subscribeToServices();
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

        this._selectedTabNewService.source$
            .pipe(
                tap((data) => {
                    this._tabSelected = data;
                    this.setFields();
                })
            )
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe();

        this._changeSubTabService.source$
            .pipe(
                tap((data) => {
                    this._codField = data.codField;
                    this._desField = data.desField;
                    this.setFields();
                })
            )
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe();
    }

    ngOnDestroy() {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }

    async setFields() {
        switch (this._tabSelected) {
            case 1:
                switch (this._subTabSelectd1) {
                    case 'ingresosEconomicaCapitulos':
                        this._fields = { codigo: 'CodCap', descripcion: 'DesCap' };
                        break;
                    case 'ingresosEconomicaArticulos':
                        this._fields = { codigo: 'CodArt', descripcion: 'DesArt' };
                        break;
                    case 'ingresosEconomicaConceptos':
                        this._fields = { codigo: 'CodCon', descripcion: 'DesCon' };
                        break;
                    case 'ingresosEconomicaEconomicos':
                        this._fields = { codigo: 'CodEco', descripcion: 'DesEco' };
                        break;
                    default:
                        break;
                }
                break;
            case 2:
                this._fields = { codigo: 'CodPro', descripcion: 'DesPro' };
                switch (this._subTabSelectd2) {
                    case 'Por áreas':
                        this._dataTable = await this._tableService.loadData('gastosProgramaAreas');
                        break;
                    case 'Por política':
                        this._dataTable = await this._tableService.loadData('gastosProgramaPoliticas');
                        break;
                    case 'Por grupo programas':
                        this._dataTable = await this._tableService.loadData('gastosProgramaGrupos');
                        break;
                    case 'Por programa':
                        // this._dataTable = await this._tableService.loadData('gastosProgramaAreas');
                        break;
                    default:
                        break;
                }
                break;
            case 3:
                this._fields = { codigo: 'CodOrg', descripcion: 'DesOrg' };
                break;
            case 4:
                switch (this._subTabSelectd4) {
                    case 'Por capítulo gasto':
                        this._fields = { codigo: 'CodCap', descripcion: 'DesCap' };
                        break;
                    default:
                        this._fields = { codigo: 'CodEco', descripcion: 'DesEco' };
                        break;
                }
                break;
            default:
                break;
        }

        this.calcSeries(this._fields.codigo, this._fields.descripcion);
    }

    async calcSeries(codField: string, desField: string) {
        const data =
            this._tabSelected === 1
                ? this._dataStoreService.dataTable.rowDataIngresos
                : this._dataStoreService.dataTable.rowDataGastos;
        this._dataTreeMap = this._prepareDataTreemapService.calcSeries(data, codField, desField, 'Definitivas2023');
        this.showTreemap();
    }

    showTreemap() {
        const data: IDataTreemap = this._dataTreeMap;
        Highcharts.chart('treemap', {
            accessibility: {
                enabled: false,
            },
            chart: {
                type: 'treemap',
            },
            title: {
                text: '',
            },
            credits: {
                enabled: false,
            },
            legend: {
                enabled: false,
            },
            tooltip: {
                enabled: true,
                headerFormat: `<span class="mb-2">{point.key}</span>`,
                pointFormat: `<span class="mb-2">{point.key}</span>`,
                useHTML: true,
            },
            series: [
                {
                    name: null,
                    innerSize: '50%',
                    data: data,
                },
            ],
        } as any);
    }
}
