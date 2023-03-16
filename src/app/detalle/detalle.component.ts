import { Component, OnInit } from '@angular/core';

import { AvalaibleYearsService } from '../services/avalaibleYears.service';
import { DataStoreService } from '../services/dataStore.service';
import { HasDataChangeService } from '../services/hasDataChange.service';
import { PrepareDataTotalesPresupuestoService } from '../services/prepareDataTotalesPresupuesto.service';
import { PrepareDataTreemapService } from '../services/prepareDataTreemap.service';
import { TableService } from '../services/table.service';
import { TabStateService } from '../services/tabState.service';

import { IDataTable } from '../commons/interfaces/dataTable.interface';
import { IDataTotalesPresupuesto } from '../commons/interfaces/dataTotalesPresupuesto. interface';
import { TYPE_TAB } from '../commons/types/tabs.type';
import { CLASIFICATION_TYPE } from '../commons/util/util';

import { environment } from '../../environments/environment';

import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import heatmap from 'highcharts/modules/heatmap';
import HighchartsTreemap from 'highcharts/modules/treemap';
HighchartsMore(Highcharts);
HighchartsTreemap(Highcharts);
heatmap(Highcharts);

@Component({
    selector: 'app-detalle-presupuesto',
    templateUrl: './detalle.component.html',
    styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
    private _dataTable: IDataTable;
    liqDate = environment.liqDate2023;
    showGraphInTab = true;
    showTablePresupuestos = true;
    showIngresos = false;
    showPrograma = false;
    showOrganico = false;
    showEconomica = false;
    DataTotalesPresupuesto: IDataTotalesPresupuesto = {
        year: 2023,
        totalPresupuestoIngresos: 0,
        totalPresupuestoGastos: 0,
        totalEjecutadoIngresos: 0,
        totalEjecutadoGastos: 0,
    };
    private _typeClasification: CLASIFICATION_TYPE;
    private _radioButtonSelected = 'radio-1';
    private _tabSelected: TYPE_TAB = 'tab1';
    private _treemap = 'treemap1';
    private _tabOrRadio = false;
    public hasDataChange$ = this._hasDataChangeService.currentHasDataChange;
    buttonName: string;
    tabName: string;
    public HasDataChange: boolean = true;

    constructor(
        private _dataStoreService: DataStoreService,
        private _tableService: TableService,
        private _prepareDataTreemapService: PrepareDataTreemapService,
        private _prepareDataTotalesPresupuestoService: PrepareDataTotalesPresupuestoService,
        private _avalaibleYearsService: AvalaibleYearsService,
        private _tabStateService: TabStateService,
        private _hasDataChangeService: HasDataChangeService
    ) {}

    async ngOnInit(): Promise<void> {
        this.hasDataChange$.subscribe(async (response) => {
            if (response) {
                await this.graphTreemap();
            }
        });

        if (localStorage.getItem('activeTab') != null) {
            this._tabSelected = localStorage.getItem('activeTab') as TYPE_TAB;
        }

        this._treemap = `treemap${this._tabSelected.charAt(
            this._tabSelected.length - 1
        )}`;

        this._tabStateService.selectedTabPrincipal(this._tabSelected);

        // this.setValues(this._tabSelected);
        this.setValues1(this._tabSelected);
        console.log('this._tabSelected', this._tabSelected);
        await this._loadData();

        let years = this._avalaibleYearsService.getYearsSelected();
        if (years.length === 1 && years[0] === 2023) {
            this.showGraphInTab = true;
            this.showTablePresupuestos = true;
        } else {
            this.showGraphInTab = false;
            this.showTablePresupuestos = false;
        }
    }

    async checkedTab(e: any) {
        this._tabSelected = e.target.id;
        this._treemap = `treemap${e.target.id.charAt(e.target.id.length - 1)}`;
        localStorage.setItem('activeTab', this._tabSelected);

        this._tabOrRadio = true;
        // this.setValues(e.target.id);
        this.setValues1(e.target.id);

        await this._loadData();
        this._tabStateService.selectedTabPrincipal(this._tabSelected);
    }

    checkedRadio(e: any) {
        this._radioButtonSelected = e.target.id;
        this._tabOrRadio = true;
        this._loadData();
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

        await this.setTotalesPresupuesto();

        if (this._tabSelected === 'tab1') {
            await this.treeGraph(loadData.rowDataIngresos);
        } else {
            await this.treeGraph(loadData.rowDataGastos);
        }

        await this.graphTreemap();
    }

    async setTotalesPresupuesto() {
        // Si se recarga la pagina hay que volver a calcular los totales.
        await this._prepareDataTotalesPresupuestoService.calcTotales();
        this.DataTotalesPresupuesto =
            this._dataStoreService.dataTotalesPresupuesto;
    }

    async treeGraph(data) {
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

    async graphTreemap() {
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

    setValues(tab: TYPE_TAB) {
        console.log('this._selectedButton', this.buttonName);
        switch (tab) {
            case 'tab1':
                this._typeClasification = 'ingresosEconomicaEconomicos';
                break;
            case 'tab2':
                // console.log('this._selectedButton', this.buttonName);

                switch (this.buttonName) {
                    case 'Por áreas':
                        // console.log('Por áreas');
                        this._typeClasification = 'gastosProgramaAreas';
                        break;
                    case 'Por política':
                        // console.log('Por política');
                        this._typeClasification = 'gastosProgramaPoliticas';
                        break;
                    case 'Por grupo programas':
                        // console.log('Por política');
                        this._typeClasification = 'gastosProgramaGrupos';
                        break;
                    case 'Por programa':
                        // console.log('Por programa');
                        this._typeClasification = 'gastosProgramaProgramas';
                        break;
                    default:
                        console.log('gastosProgramaPoliticas');
                        this._typeClasification = 'gastosProgramaPoliticas';
                        break;
                }
                break;
            case 'tab3':
                this._typeClasification = 'gastosOrganicaOrganicos';
                break;
            case 'tab4':
                switch (this.buttonName) {
                    case 'Por capítulo gasto':
                        // console.log('Por capítulo gasto');
                        this._typeClasification = 'gastosEconomicaCapitulos';
                        break;
                    case 'Por artículo':
                        // console.log('Por artículo');
                        this._typeClasification = 'gastosEconomicaArticulos';
                        break;
                    case 'Por concepto':
                        // console.log('Por concepto');
                        this._typeClasification = 'gastosEconomicaConceptos';
                        break;
                    case 'Por económico':
                        // console.log('Por económico');
                        this._typeClasification = 'gastosEconomicaEconomicos';
                        break;
                    default:
                        this._typeClasification = 'gastosEconomicaConceptos';
                        break;
                }
                break;
        }
    }

    setValues1(tab: TYPE_TAB) {
        switch (tab) {
            case 'tab1':
                console.log('ingresosEconomicaEconomicos');
                this._typeClasification = 'ingresosEconomicaEconomicos';
                break;
            case 'tab2':
                console.log('gastosProgramaPoliticas');
                this._typeClasification = 'gastosProgramaPoliticas';
                break;
            case 'tab3':
                console.log('gastosOrganicaOrganicos');
                this._typeClasification = 'gastosOrganicaOrganicos';
                break;
            case 'tab4':
                console.log('gastosEconomicaConceptos');
                this._typeClasification = 'gastosEconomicaConceptos';
                break;
        }
    }

    async hasChangeCheckbox() {
        let years = this._avalaibleYearsService.getYearsSelected();
        if (years.length === 1 && years[0] === 2023) {
            this.showGraphInTab = true;
            this.showTablePresupuestos = true;
            setTimeout(() => {
                this.graphTreemap();
            }, 10);
        } else {
            this.showGraphInTab = false;
            this.showTablePresupuestos = false;
        }

        let data = await this._tableService.loadData(this._typeClasification);
        await this.treeGraph(data.rowDataGastos);
        this._showComponent();
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
