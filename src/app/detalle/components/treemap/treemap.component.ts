import { Component, OnChanges, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CLASIFICATION_TYPE } from '../../../commons/util/util';
import { PrepareDataTreemapService } from '../../../services/prepareDataTreemap.service';
import { TableService } from '../../../services/table.service';

@Component({
    selector: 'app-treemap',
    templateUrl: './treemap.component.html',
    styleUrls: ['./treemap.component.scss'],
})
export class TreemapComponent implements OnInit, OnChanges {
    // @Input() dataTreeMap: any;
    // @Input() idTab: number;
    idTab = 1;

    _dataTreeMap: any;
    private readonly _tabMappings: { [id: number]: { code: string; desc: string } } = {
        1: { code: 'CodEco', desc: 'DesEco' },
        2: { code: 'CodPro', desc: 'DesPro' },
        3: { code: 'CodOrg', desc: 'DesOrg' },
        4: { code: 'CodCap', desc: 'DesCap' },
    };

    constructor(private _prepareDataTreemapService: PrepareDataTreemapService, private _tableService: TableService) {}

    ngOnInit(): void {
        this.loadData();
    }

    ngOnChanges(): void {
        if (this._dataTreeMap) {
            setTimeout(() => {
                this.showTreemap();
            }, 0);
        }
    }

    async loadData() {
        const typeClasification = this.getTypeClasification(this.idTab);
        const loadData = this._tableService.loadData(typeClasification);

        if (this.idTab === 1) {
            this._dataTreeMap = await this.dataTreemap(this.idTab, (await loadData).rowDataIngresos);
        } else {
            this._dataTreeMap = await this.dataTreemap(this.idTab, (await loadData).rowDataGastos);
        }

        if (this._dataTreeMap) {
            setTimeout(() => {
                this.showTreemap();
            }, 0);
        }
    }

    getTypeClasification(idTab: number): CLASIFICATION_TYPE {
        const classificationTypes: {
            [key: number]: CLASIFICATION_TYPE;
        } = {
            1: 'ingresosEconomicaEconomicos',
            2: 'gastosProgramaPoliticas',
            3: 'gastosOrganicaOrganicos',
            4: 'gastosEconomicaConceptos',
        };
        return classificationTypes[idTab];
    }

    async dataTreemap(idTab: number, data: any) {
        const { code, desc } = this._tabMappings[idTab];
        return this._prepareDataTreemapService.calcSeries(data, code, desc, 'Definitivas2023');
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
