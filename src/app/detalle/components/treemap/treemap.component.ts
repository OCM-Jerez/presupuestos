import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
// import { CLASIFICATION_TYPE } from '../../../commons/util/util';
import { ChangeSubTabService } from '../../../services/change-subtab.service';
import { DataStoreService } from '../../../services/dataStore.service';
import { PrepareDataTreemapService } from '../../../services/prepareDataTreemap.service';
// import { TableService } from '../../../services/table.service';
interface ITabMapping {
    [id: number]: { code: string; desc: string };
}
@Component({
    selector: 'app-treemap',
    templateUrl: './treemap.component.html',
    styleUrls: ['./treemap.component.scss'],
    // providers: [PrepareDataTreemapService],
})
export class TreemapComponent implements OnInit, OnChanges {
    // @Input() dataTreeMap: any;
    @Input() idTabPrincipal = 1;

    _dataTreeMap: any;
    // private readonly _tabMappings: ITabMapping = {
    //     1: { code: 'CodEco', desc: 'DesEco' },
    //     2: { code: 'CodCon', desc: 'DesCon' },
    //     3: { code: 'CodArt', desc: 'DesArt' },
    //     4: { code: 'CodCap', desc: 'DesCap' },
    // };

    constructor(
        private _prepareDataTreemapService: PrepareDataTreemapService,
        // private _tableService: TableService,
        private _changeTabService: ChangeSubTabService,
        private _dataStoreService: DataStoreService
    ) {}

    ngOnInit(): void {
        //this.loadData();
        this._changeTabService.source$.subscribe((data) => {
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
        // const typeClasification = this.getTypeClasification(this.idTab);
        // const loadData = this._tableService.loadData(typeClasification);
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

    // getTypeClasification(idTab: number): CLASIFICATION_TYPE {
    //     const classificationTypes: {
    //         [key: number]: CLASIFICATION_TYPE;
    //     } = {
    //         1: 'ingresosEconomicaEconomicos',
    //         2: 'gastosProgramaPoliticas',
    //         3: 'gastosOrganicaOrganicos',
    //         4: 'gastosEconomicaConceptos',
    //     };
    //     return classificationTypes[idTab];
    // }

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
            tooltip: {
                tooltip: {
                    enabled: false,
                },
                headerFormat: `<span class="mb-2">{point.key}</span><br>`,
                // pointFormat: '<span>Euros: {point.value}</span></br><span>Color: {point.colorValue}</span>',
                pointFormat: '<span>Euros: {point.value}</span>',
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
