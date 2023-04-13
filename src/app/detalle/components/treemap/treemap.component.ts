import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsTreemap from 'highcharts/modules/treemap';
HighchartsTreemap(Highcharts);

import { ChangeSubTabService } from '../../../services/change-subtab.service';
import { DataStoreService } from '../../../services/dataStore.service';
import { PrepareDataTreemapService } from '../../../services/prepareDataTreemap.service';
import { SelectedTabNewService } from '../../../services/selectedTabNew.service';
@Component({
    selector: 'app-treemap',
    templateUrl: './treemap.component.html',
    styleUrls: ['./treemap.component.scss'],
})
export class TreemapComponent implements OnInit, OnChanges {
    @Input() idTabPrincipal: number;
    _dataTreeMap: any;
    private _tabSelected: number;

    constructor(
        private _prepareDataTreemapService: PrepareDataTreemapService,
        private _changeSubTabService: ChangeSubTabService,
        private _dataStoreService: DataStoreService,
        private _selectedTabNewService: SelectedTabNewService
    ) {}

    ngOnInit(): void {
        this._changeSubTabService.source$.subscribe((data) => {
            this.loadData(data.codField, data.desField);
            // console.log(data.codField, data.desField);
        });
        this._selectedTabNewService.source$.subscribe((data) => {
            // console.log(data);
            this._tabSelected = data;
        });
        // switch (this._tabSelected) {
        //     case 1:
        //         this._changeSubTabService.changeSubTab('CodEco', 'DesEco');
        //         break;
        //     case 2:
        //         this._changeSubTabService.changeSubTab('CodPro', 'DesPro');
        //         break;
        //     case 3:
        //         this._changeSubTabService.changeSubTab('CodOrg', 'DesOrg');
        //         break;
        //     case 4:
        //         this._changeSubTabService.changeSubTab('CodEco', 'DesEco');
        //         break;

        //     default:
        //         break;
        // }
    }

    ngOnChanges(): void {
        // console.log('ngOnChanges');
        // this.loadData(data.codField, data.desField);
        // this.loadData('CodEco"', 'desEco');
        this._changeSubTabService.source$.subscribe((data) => {
            this.loadData(data.codField, data.desField);
            // console.log(data.codField, data.desField);
        });

        this._selectedTabNewService.source$.subscribe((data) => {
            // console.log(data);
            this._tabSelected = data;
        });
        switch (this._tabSelected) {
            case 1:
                this._changeSubTabService.changeSubTab('CodEco', 'DesEco');
                break;
            case 2:
                this._changeSubTabService.changeSubTab('CodPro', 'DesPro');
                break;
            case 3:
                this._changeSubTabService.changeSubTab('CodOrg', 'DesOrg');
                break;
            case 4:
                this._changeSubTabService.changeSubTab('CodEco', 'DesEco');
                break;

            default:
                break;
        }

        this._changeSubTabService.source$.subscribe((data) => {
            this.loadData(data.codField, data.desField);
            // console.log(data.codField, data.desField);
            this.loadData(data.codField, data.desField);
        });

        this.showTreemap();

        // if (this._dataTreeMap) {
        //     setTimeout(() => {
        //         this.showTreemap();
        //     }, 0);
        // }
    }

    loadData(codField: string, desField: string) {
        // console.log(this._dataStoreService.dataTable);

        const loadData = this._dataStoreService.dataTable;
        this._dataTreeMap = this.dataTreemap(
            // this.idTabPrincipal === 1 ? loadData.rowDataIngresos : loadData.rowDataGastos,
            this._tabSelected === 1 ? loadData.rowDataIngresos : loadData.rowDataGastos,
            codField,
            desField
        );

        this.showTreemap();

        // if (this._dataTreeMap) {
        //     setTimeout(() => {
        //         this.showTreemap();
        //     }, 0);
        // }
    }

    dataTreemap(data: any, codField: string, desField: string) {
        // console.log(this.idTabPrincipal, data, codField, desField);
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
