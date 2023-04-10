import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsTreemap from 'highcharts/modules/treemap';
HighchartsTreemap(Highcharts);

import { ChangeSubTabService } from '../../../services/change-subtab.service';
import { DataStoreService } from '../../../services/dataStore.service';
import { PrepareDataTreemapService } from '../../../services/prepareDataTreemap.service';
@Component({
    selector: 'app-treemap',
    templateUrl: './treemap.component.html',
    styleUrls: ['./treemap.component.scss'],
})
export class TreemapComponent implements OnInit, OnChanges {
    @Input() idTabPrincipal = 1;
    _dataTreeMap: any;

    constructor(
        private _prepareDataTreemapService: PrepareDataTreemapService,
        private _changeSubTabService: ChangeSubTabService,
        private _dataStoreService: DataStoreService
    ) {}

    ngOnInit(): void {
        this._changeSubTabService.source$.subscribe((data) => {
            this.loadData(data.codField, data.desField);
        });
    }

    ngOnChanges(): void {
        if (this._dataTreeMap) {
            setTimeout(() => {
                this.showTreemap();
            }, 0);
        }
    }

    loadData(codField: string, desField: string) {
        const loadData = this._dataStoreService.dataTable;
        this._dataTreeMap = this.dataTreemap(
            this.idTabPrincipal === 1 ? loadData.rowDataIngresos : loadData.rowDataGastos,
            codField,
            desField
        );

        if (this._dataTreeMap) {
            setTimeout(() => {
                this.showTreemap();
            }, 0);
        }
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
                // pointFormat: '<span>Euros: {point.value}</span></br><span>Color: {point.colorValue}</span>',
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
