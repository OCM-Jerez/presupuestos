import { Component, OnInit } from '@angular/core';
import { Subject, merge } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import * as Highcharts from 'highcharts';
import HighchartsTreemap from 'highcharts/modules/treemap';
HighchartsTreemap(Highcharts);

import { ChangeSubTabService } from '../../../services/change-subtab.service';
import { DataStoreService } from '../../../services/dataStore.service';
import { PrepareDataTreemapService } from '../../../services/prepareDataTreemap.service';
import { SelectedTabNewService } from '../../../services/selectedTabNew.service';

import { IDataTreemap } from '../../../commons/interfaces/dataTreemap.interface';
import { SelectedSubTab1Service } from '../../../services/selectedSubTab1.service';
import { SelectedSubTab2Service } from '../../../services/selectedSubTab2.service';
import { SelectedSubTab4Service } from '../../../services/selectedSubTab4.service';

@Component({
    selector: 'app-treemap',
    templateUrl: './treemap.component.html',
    styleUrls: ['./treemap.component.scss'],
})
export class TreemapComponent implements OnInit {
    // private _dataTreeMap: IIngresos | IGastos;
    private _dataTreeMap: IDataTreemap;
    private _tabSelected: number;
    private _subTabSelectd1: string;
    private _subTabSelectd2: string;
    private _subTabSelectd4: string;
    private _codField: string;
    private _desField: string;
    private _unsubscribe$ = new Subject<void>();
    private tabMapping = {
        11: { code: 'CodCap', description: 'DesCap' },
        12: { code: 'CodArt', description: 'DesArt' },
        13: { code: 'CodCon', description: 'DesCon' },
        14: { code: 'CodEco', description: 'DesEco' },
        1: { code: 'CodEco', description: 'DesEco' },
        2: { code: 'CodPro', description: 'DesPro' },
        3: { code: 'CodOrg', description: 'DesOrg' },
        4: { code: 'CodEco', description: 'DesEco' },
    };

    constructor(
        private _changeSubTabService: ChangeSubTabService,
        private _dataStoreService: DataStoreService,
        private _prepareDataTreemapService: PrepareDataTreemapService,
        private _selectedTabNewService: SelectedTabNewService,
        private _selectedSubTab1Service: SelectedSubTab1Service,
        private _selectedSubTab2Service: SelectedSubTab2Service,
        private _selectedSubTab4Service: SelectedSubTab4Service
    ) {}

    ngOnInit() {
        merge(
            this._selectedTabNewService.source$.pipe(
                tap((data) => {
                    this._tabSelected = data;
                    this.changeSubTabByTabSelected();
                })
            ),
            this._changeSubTabService.source$.pipe(
                tap((data) => {
                    this.loadData(data.codField, data.desField);
                })
            )
        )
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe();
    }

    ngOnDestroy() {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }

    private changeSubTabByTabSelected() {
        this._selectedSubTab1Service.source$.subscribe((data) => {
            this._subTabSelectd1 = data;
        });

        this._selectedSubTab2Service.source$.subscribe((data) => {
            this._subTabSelectd2 = data;
        });

        this._selectedSubTab4Service.source$.subscribe((data) => {
            this._subTabSelectd4 = data;
        });

        console.log('tabSelectd: ', this._tabSelected);
        console.log('subTabSelectd1: ', this._subTabSelectd1);
        console.log('subTabSelectd2: ', this._subTabSelectd2);
        console.log('subTabSelectd4: ', this._subTabSelectd4);

        switch (this._tabSelected) {
            case 1:
                switch (this._subTabSelectd1) {
                    case 'ingresosEconomicaCapitulos':
                        this._tabSelected = 11;
                        break;
                    case 'ingresosEconomicaArticulos':
                        this._tabSelected = 12;
                        break;
                    case 'ingresosEconomicaConceptos':
                        this._tabSelected = 13;
                        break;
                    case 'ingresosEconomicaEconomicos':
                        this._tabSelected = 14;
                        break;
                    default:
                        break;
                }
                break;

            default:
                break;
        }

        const tabInfo = this.tabMapping[this._tabSelected];
        if (tabInfo) {
            this._changeSubTabService.changeSubTab(tabInfo.code, tabInfo.description);
        }
    }

    loadData(codField: string, desField: string) {
        console.log('codField: ', codField, 'desField: ', desField);

        const loadData = this._dataStoreService.dataTable;
        this._dataTreeMap = this.dataTreemap(
            this._tabSelected > 10 ? loadData.rowDataIngresos : loadData.rowDataGastos,
            codField,
            desField
        );
        this.showTreemap();
    }

    dataTreemap(data: any, codField: string, desField: string) {
        return this._prepareDataTreemapService.calcSeries(data, codField, desField, 'Definitivas2023');
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
