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

import { IGastos } from '../../../commons/interfaces/gastos.interface';
import { IIngresos } from '../../../commons/interfaces/ingresos.interface';

@Component({
    selector: 'app-treemap',
    templateUrl: './treemap.component.html',
    styleUrls: ['./treemap.component.scss'],
})
export class TreemapComponent implements OnInit {
    _dataTreeMap: IIngresos | IGastos;
    private _tabSelected: number;
    private _unsubscribe$ = new Subject<void>();
    private tabMapping = {
        1: { code: 'CodEco', description: 'DesEco' },
        2: { code: 'CodPro', description: 'DesPro' },
        3: { code: 'CodOrg', description: 'DesOrg' },
        4: { code: 'CodEco', description: 'DesEco' },
    };

    constructor(
        private _changeSubTabService: ChangeSubTabService,
        private _dataStoreService: DataStoreService,
        private _prepareDataTreemapService: PrepareDataTreemapService,
        private _selectedTabNewService: SelectedTabNewService
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
        const tabInfo = this.tabMapping[this._tabSelected];
        if (tabInfo) {
            this._changeSubTabService.changeSubTab(tabInfo.code, tabInfo.description);
        }
    }

    loadData(codField: string, desField: string) {
        const loadData = this._dataStoreService.dataTable;
        this._dataTreeMap = this.dataTreemap(
            this._tabSelected === 1 ? loadData.rowDataIngresos : loadData.rowDataGastos,
            codField,
            desField
        );
        this.showTreemap();
    }

    dataTreemap(data: any, codField: string, desField: string) {
        return this._prepareDataTreemapService.calcSeries(data, codField, desField, 'Definitivas2023');
    }

    showTreemap() {
        const data = this._dataTreeMap;
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
            // dataLabels: {
            //     enabled: true,
            //     formatter: function () {
            //         return this.point.key + ': ' + this.point.value;
            //     },
            // },
            tooltip: {
                enabled: true,
                headerFormat: `<span class="mb-2">{point.key}</span>`,
                pointFormat: `<span class="mb-2">{point.key}</span>`,
                // pointFormat: '<span>Euros: {point.euros}</span>',
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
