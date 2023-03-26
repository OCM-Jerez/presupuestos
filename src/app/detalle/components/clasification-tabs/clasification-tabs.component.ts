import { Component, OnInit } from '@angular/core';

import HighchartsTreemap from 'highcharts/modules/treemap';
import { AvalaibleYearsService } from '../../../services/avalaibleYears.service';
import { DataStoreService } from '../../../services/dataStore.service';
import { HasDataChangeService } from '../../../services/hasDataChange.service';
import { PrepareDataTreemapService } from '../../../services/prepareDataTreemap.service';
import { TableService } from '../../../services/table.service';
import { TabStateService } from '../../../services/tabState.service';

import { TYPE_TAB } from '../../../commons/types/tabs.type';
import { CLASIFICATION_TYPE } from '../../../commons/util/util';

import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import heatmap from 'highcharts/modules/heatmap';
import { IDataTable } from '../../../commons/interfaces/dataTable.interface';
HighchartsMore(Highcharts);
HighchartsTreemap(Highcharts);
heatmap(Highcharts);

@Component({
    selector: 'app-clasification-tabs',
    templateUrl: './clasification-tabs.component.html',
    styleUrls: ['./clasification-tabs.component.scss'],
})
export class ClasificationTabsComponent implements OnInit {
    private _dataTable: IDataTable;
    showGraphInTab = true;
    showIngresos = false;
    showPrograma = false;
    showOrganico = false;
    showEconomica = false;

    private _typeClasification: CLASIFICATION_TYPE;
    private _radioButtonSelected = 'radio-1';
    private _tabSelected: TYPE_TAB = 'tab1';
    private _treemap = 'treemap1';
    private _tabOrRadio = false;
    public hasDataChange$ = this._hasDataChangeService.currentHasDataChange;
    public HasDataChange: boolean = true;

    constructor(
        private _dataStoreService: DataStoreService,
        private _tableService: TableService,
        private _prepareDataTreemapService: PrepareDataTreemapService,
        private _avalaibleYearsService: AvalaibleYearsService,
        private _tabStateService: TabStateService,
        private _hasDataChangeService: HasDataChangeService
    ) {}

    async ngOnInit(): Promise<void> {
        this.hasDataChange$.subscribe(async (response) => {
            if (response) {
                console.log(response);
                await this.showTreemap();
            }
        });

        if (localStorage.getItem('activeTab') != null) {
            this._tabSelected = localStorage.getItem('activeTab') as TYPE_TAB;
        }

        this._treemap = `treemap${this._tabSelected.charAt(
            this._tabSelected.length - 1
        )}`;

        this._tabStateService.selectedTabPrincipal(this._tabSelected);
        this.setValues(this._tabSelected);
        await this._loadData();

        let years = this._avalaibleYearsService.getYearsSelected();
        if (years.length === 1 && years[0] === 2023) {
            this.showGraphInTab = true;
        } else {
            this.showGraphInTab = false;
        }
    }

    private async _loadData(): Promise<void> {
        const loadData = await this._tableService.loadData(
            this._typeClasification
        );

        if (this._tabOrRadio) {
            // Si vengo de un tab o radio no hay que volver a generar la data.
            this._tabOrRadio = false;
        } else {
            // Si se recarga la pagina hay que volver a generar la data.
            // this._dataTable = await this._tableService.loadDataInitial();
            this._dataTable = loadData;
        }

        if (this._tabSelected === 'tab1') {
            await this.dataTreemap(loadData.rowDataIngresos);
        } else {
            await this.dataTreemap(loadData.rowDataGastos);
        }

        setTimeout(() => {
            this.showTreemap();
        }, 15);
    }

    async checkedTab(e: any) {
        this._tabSelected = e.target.id;
        this._treemap = `treemap${e.target.id.charAt(e.target.id.length - 1)}`;
        localStorage.setItem('activeTab', this._tabSelected);
        this._tabOrRadio = true;
        this.setValues(e.target.id);
        await this._loadData();
        this._tabStateService.selectedTabPrincipal(this._tabSelected);
    }

    // async checkedTab(tabSelected: TYPE_TAB) {
    //     this._tabSelected = tabSelected;
    //     this._treemap = `treemap${tabSelected.charAt(tabSelected.length - 1)}`;
    //     localStorage.setItem('activeTab', this._tabSelected);
    //     this._tabOrRadio = true;
    //     this.setValues(tabSelected);
    //     await this._loadData();
    //     this._tabStateService.selectedTabPrincipal(this._tabSelected);
    // }
    checkedRadio(e: any) {
        this._radioButtonSelected = e.target.id;
        this._tabOrRadio = true;
        this._loadData();
    }

    setValues(tab: TYPE_TAB) {
        switch (tab) {
            case 'tab1':
                this._typeClasification = 'ingresosEconomicaEconomicos';
                break;
            case 'tab2':
                this._typeClasification = 'gastosProgramaPoliticas';
                break;
            case 'tab3':
                this._typeClasification = 'gastosOrganicaOrganicos';
                break;
            case 'tab4':
                this._typeClasification = 'gastosEconomicaConceptos';
                break;
        }
    }

    async dataTreemap(data) {
        // Datos para grafico
        switch (this._tabSelected) {
            case 'tab1':
                switch (this._radioButtonSelected) {
                    case 'radio-1': //Presupuestado
                        await this._prepareDataTreemapService.calcSeries(
                            data,
                            'CodEco',
                            'DesEco',
                            'Definitivas2023'
                        );
                        break;
                    case 'radio-2': //Recaudado
                        await this._prepareDataTreemapService.calcSeries(
                            data,
                            'CodEco',
                            'DesEco',
                            'DerechosReconocidosNetos2023'
                        );
                        break;
                    case 'radio-3': //Diferencia
                        await this._prepareDataTreemapService.calcSeries(
                            data,
                            'CodEco',
                            'DesEco',
                            'Definitivas2023',
                            'DerechosReconocidosNetos2023'
                        );
                        break;
                }
                break;
            case 'tab2':
                await this._prepareDataTreemapService.calcSeries(
                    data,
                    'CodPro',
                    'DesPro',
                    'Definitivas2023'
                );
                break;
            case 'tab3':
                await this._prepareDataTreemapService.calcSeries(
                    data,
                    'CodOrg',
                    'DesOrg',
                    'Definitivas2023'
                );
                break;
            case 'tab4':
                await this._prepareDataTreemapService.calcSeries(
                    data,
                    'CodCap',
                    'DesCap',
                    'Definitivas2023'
                );
                break;
        }

        this._showComponent();
    }

    showTreemap() {
        if (this.showGraphInTab) {
            const data = this._dataStoreService.dataTreemap;
            Highcharts.chart(this._treemap, {
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

    private _showComponent() {
        this.showIngresos = false;
        this.showPrograma = false;
        this.showOrganico = false;
        this.showEconomica = false;
        switch (this._tabSelected) {
            case 'tab1':
                setTimeout(() => {
                    this.showIngresos = true;
                }, 10);
                break;
            case 'tab2':
                setTimeout(() => {
                    this.showPrograma = true;
                }, 10);
                break;
            case 'tab3':
                setTimeout(() => {
                    this.showOrganico = true;
                }, 10);
                break;
            case 'tab4':
                setTimeout(() => {
                    this.showEconomica = true;
                }, 10);
                break;
        }
    }
}
